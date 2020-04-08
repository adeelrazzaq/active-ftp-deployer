/* 
ftp-deploy
https://www.npmjs.com/package/ftp-deploy 
https://github.com/adeelrazzaq/ftp-deploy
A Node.js package to help with deploying code. Ftp a folder from your local disk to a remote ftp destination. Does not delete from destination directory.
*/

const fs = require('fs');
var FtpDeploy = require("ftp-deploy");

var ftpDeploy = new FtpDeploy();

const FtpDeployer = function() {

    this.config = get_config_template();

    this.config_from_file = function(configFilePath) {

        let config = null;
        if (!fs.existsSync(configFilePath)) {
            console.error('Config not found at: ' + configFilePath);
            return;
        }

        console.log('Loading config file: ' + configFilePath);

        let configStr = fs.readFileSync(configFilePath, 'utf8');

        // Strip comments from json.
        configStr = StripCommentsFromJSON(configStr);
        config = JSON.parse(configStr);
        set_config(config);
    }

    this.deploy = function(config) {

        // Register Events for ftp-deploy
        ftpDeploy.on("log", data => console.log("[log]", data));
        //ftpDeploy.on("uploading", data => console.log(`[uploading ${data.transferredFileCount} of ${data.totalFilesCount}] ${data.filename}`));
        ftpDeploy.on("uploaded", data => console.log(`[Uploaded ${data.transferredFileCount} of ${data.totalFilesCount}] ${data.filename}`));
        ftpDeploy.on("upload-error", data => console.log("[Upload-error]", data));

        // use with callback
        ftpDeploy.deploy(config, function(err, res) {
            if (err) console.log(err);
            else console.log("Finished"); //, res
        });

        // // use with promises
        // let ftoDeployPromise = ftpDeploy
        //     .deploy(config)
        //     .then(res => console.log("Finished: ", res))
        //     .catch(err => console.log(err));
        // // Promise.all([ftoDeployPromise]).then(process.exit);
    }

    this.create_config_file = function(path) {
        if (!path) path = '.ftp-deployer.config.json';
        var config = get_config_template();
        let data = JSON.stringify(config);
        fs.writeFileSync(path, data);
        console.error('Wrote configuration file at: ' + path);
    }

    this.validate_config = function() {
        if (!this.config['host'] || !this.config['username'] || !this.config['host'])
            return false;
    }

    // Source: https://www.apharmony.com/software-sagacity/2014/10/node-js-adding-comments-to-json-files/
    function StripCommentsFromJSON(txt) {
        var regEx = new RegExp("\/\/(.*)", "g");
        return txt.replace(regEx, '');
    }

    this.set_config = function(config) {
        this.config = get_config_template();
        this.config['host'] = config['host'];
        this.config['port'] = config['port'] || 21;

        this.config['user'] = config['user'] || 'anonymous';
        this.config['password'] = config['password'];

        this.config['deleteRemote'] = config['deleteRemote'] || false;
        this.config['forcePasv'] = config['forcePasv'] || true;

        this.config['localRoot'] = config['localRoot'];
        this.config['remoteRoot'] = config['remoteRoot'];

        this.config['include'] = config['include'];
        this.config['exclude'] = config['exclude'];
    }

    function get_config_template() {
        return config = {
            host: "",
            port: 21,

            user: "anonymous",
            password: "", // Password optional, prompted if none given

            deleteRemote: false, // delete ALL existing files at destination before uploading, if true
            forcePasv: true, // Passive mode is forced (EPSV command is not sent)

            localRoot: "",
            remoteRoot: "",

            include: [], // this would upload everything except dot files
            exclude: [] // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
        };
    }
};

module.exports = FtpDeployer;