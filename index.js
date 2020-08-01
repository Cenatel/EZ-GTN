process.title = 'Easy-GTN - by Tenclea';
console.clear();
const chalk = require('chalk');
console.log(chalk.cyan(`
 _____                 _____ _____ _____ 
|   __|___ ___ _ _ ___|   __|_   _|   | |
|   __| .'|_ -| | |___|  |  | | | | | | |
|_____|__,|___|_  |   |_____| |_| |_|___|
              |___|          ${chalk.gray('- by Tenclea')}
`));

// Client initialization
const { Client } = require('discord.js');
const client = new Client();

// Useful functions & modules
const { readdirSync, readFileSync, watchFile } = require('fs');
const { checkConfig } = require('./utils/functions');

// Config variables & auto update on file edit
client.config = require('./config.json');
watchFile('./config.json', () => {
	// Reads new config & updates it
	client.config = JSON.parse(readFileSync('./config.json'));

	// Updates logger
	logger.level = client.config.debugMode ? 'debug' : 'info';

	logger.info('Updated the config variables.');
	return checkConfig(client.config);
});

// Initialize logger
const logger = require('./utils/logger');

// Handlers launch
const handlers = readdirSync('./handlers/');
for (const h of handlers) require(`./handlers/${h}`)(client);

// Login
client.login(client.config.token);