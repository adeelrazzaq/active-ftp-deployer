#!/usr/bin/env node

const fs = require('fs');
const FtpDeployer = require('../lib/ftp-deployer');
const ConfigBuilder = require('../lib/config-builder');

const deployer = new FtpDeployer();
const configBuilder = new ConfigBuilder();

const default_config_file_name = '.ftp-deployer.config.json';


var configArr = configBuilder.build_from_arguments();

if ('writeConfig' in configArr) {
    deployer.create_config_file(configArr['writeConfig']);
    process.exit();
}

if ('host' in configArr) {

    if ('include' in configArr && configArr['include']) {
        configArr['include'] = configArr['include'].split(',');
    } else {
        configArr['include'] = ['*', '**/*'];
    }

    if ('exclude' in configArr && configArr['exclude']) {
        configArr['exclude'] = configArr['exclude'].split(',');
    } else {
        configArr['exclude'] = [];
    }

    deployer.set_config(configArr);

} else {

    let configFilePath = '';

    if ('configFile' in configArr) {
        let configFileSpecified = configArr['configFile'];
        if (configFileSpecified) {
            if (!fs.existsSync(configFileSpecified)) {
                console.error(`Specified configuration file '${configFileSpecified}' does not exist.`);
                process.exit(0);
            }

            configFilePath = configFileSpecified;
        }
    }

    if (configFilePath === '') {
        configFilePath = default_config_file_name;
    }

    if (!fs.existsSync(configFilePath)) {
        console.error('No Configuration Found!');
        process.exit(0);
    }

    console.log(`Loading Configuration From File: ${configFilePath}`);

    deployer.config_from_file(configFilePath);
}

if (!deployer.validate_config()) {
    console.error('Configuration Invalid!', configArr);
    process.exit(0);
}

if (!deployer.config['localRoot']) {
    deployer.config['localRoot'] = './';
}

if (!deployer.config['remoteRoot']) {
    deployer.config['remoteRoot'] = '';
}

if (!deployer.config['include']) {
    deployer.config['include'] = ['*', '**/*'];
}

if (!deployer.config['exclude']) {
    deployer.config['exclude'] = [];
}

//console.log('Configuration:', deployer.config);

//process.exit(0);
deployer.deploy();