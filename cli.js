const vorpal = require("vorpal")();
const fs = require("fs");
var Rayql = require("./query")
var inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
var flatten = require('flat')

response = undefined
responseIndex = 0
totalHits = 0

let rayql = new Rayql()

vorpal
	.mode("query")
	.delimiter("query:")
	.init(function (args, callback) {
		this.log(
			"Welcome to interactive Query mode.\nYou can now directly enter arbitrary rayql commands. To exit, type `exit`."
		);
		callback();
	})
	.action(async function (command, callback) {
		var self = this;

		if (command === 'next') {
			if (response && response[responseIndex]) {
				let prefix = `record ${responseIndex} of ${totalHits}`
				this.log(prefix, response[responseIndex])
				responseIndex++
			} else {
				this.log('no record found')
			}
			return
		} else if (command.startsWith('print')) {
			let limit = 100
			if (Number(command.split(' ')[1])) {
				limit = Number(command.split(' ')[1])
			}
			if (response) {
				console.table(response.map(hit => flatten(hit._source)).slice(0, limit))
			} else {
				this.log('no record found')
			}
			return
		}

		let resp = await rayql.exec(command)

		if (resp.aggregations) {
			this.log('aggs', resp.aggregations)
		} else {
			this.log('total: ' + resp.total.relation + ' ' + resp.total.value)
			this.log('invoke "next" to get records')
			this.log('invoke "print" to print records like table')
			response = resp.hits
			responseIndex = 0
			totalHits = resp.total.value
		}
		// console.log(ast)

	});

vorpal
	.command("query file <filename>", "executes rayql query from file")
	.autocomplete({
		data: function (input, callback) {
			// console.log('input', input)
			let path = ".";
			let prefix = input;
			if (input.includes("/")) {
				path = input.substring(0, input.lastIndexOf("/"));
				prefix = input.substring(input.lastIndexOf("/") + 1);
			}
			callback(
				fs.readdirSync(path).filter(value => value.startsWith(prefix))
			);
		}
	})
	.option("-e, --explain", "explain query steps")
	.option("-l, --live", "executes query live")
	.option("-s, --since <time>", "executes query in time window")
	.action(async function (args, callback) {
		console.log(args);
		let command = fs.readFileSync(args.filename)
		let resp = await rayql.exec(command)
		if (resp.aggregations) {
			this.log('aggs', resp.aggregations)
		} else {
			this.log('total: ' + resp.total.relation + ' ' + resp.total.value)
			this.log('invoke "next" to get records')
			this.log('invoke "print" to print records like table')
			response = resp.hits
			responseIndex = 0
			totalHits = resp.total.value
		}
		callback();
	});



vorpal.delimiter("rayql>").show();
