#!/usr/bin/env node

const fs = require('fs');
const FtpDeployer = require('../lib/ftp-deployer');
const ConfigBuilder = require('../lib/config-builder');

const deployer = new FtpDeployer();
const configBuilder = new ConfigBuilder();

const args = process.argv.splice(2);

if (['-w', '-write', '-writeconfig'].includes(args[0].toLowerCase())) { //args[0] === '-w' || args[0] === '-write' || args[0] === '-writeconfig'
    deployer.create_config_file(args[1]);
    process.exit();
}

if (!deployer.validate_config()) {
    var argsConfig = configBuilder.build_from_arguments();
    deployer.set_config(argsConfig);
}

if (['-c', '-config'].includes(args[0].toLowerCase())) { //args[0] === '-c' || args[0] === '-config'

    let configFilePath = args[1];

    if (!configFilePath)
        configFilePath = __dirname + '.ftp-deployer.config.json';

    deployer.config_from_file(configFilePath);
}

if (!deployer.validate_config()) {
    console.error('Invalid configuration!');
    process.exit();
}

deployer.deploy();