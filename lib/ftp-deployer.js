/* 
ftp-deploy
https://www.npmjs.com/package/ftp-deploy 
https://github.com/adeelrazzaq/ftp-deploy
A Node.js package to help with deploying code. Ftp a folder from your local disk to a remote ftp destination. Does not delete from destination directory.
*/

const fs = require('fs');
var FtpDeploy = require("ftp-deploy");

const FtpDeployer = function() {

    var me = this;

    me.config = get_config_template();

    me.config_from_file = function(configFilePath) {

        let config = null;
        if (!fs.existsSync(configFilePath)) {
            console.error('Config not found at: ' + configFilePath);
            return;
        }

        let configStr = fs.readFileSync(configFilePath, 'utf8');

        // Strip comments from json.
        configStr = StripCommentsFromJSON(configStr);
        config = JSON.parse(configStr);
        me.set_config(config);
    }

    me.deploy = function() {

        var ftpDeploy = new FtpDeploy();

        // Register Events for ftp-deploy
        ftpDeploy.on("log", data => console.log("[log]", data));
        //ftpDeploy.on("uploading", data => console.log(`[uploading ${data.transferredFileCount} of ${data.totalFilesCount}] ${data.filename}`));
        ftpDeploy.on("uploaded", data => console.log(`[Uploaded ${data.transferredFileCount} of ${data.totalFilesCount}] ${data.filename}`));
        ftpDeploy.on("upload-error", data => console.log("[Upload-error]", data));

        // use with callback
        ftpDeploy.deploy(me.config, function(err, res) {
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

    me.create_config_file = function(path) {
        if (!path) path = '.ftp-deployer.config.json';
        var config = get_config_template();
        let data = JSON.stringify(config);
        fs.writeFileSync(path, data);
        console.error('Wrote configuration file at: ' + path);
    }

    me.validate_config = function() {
        if (!me.config['host'] || !me.config['user'] || !me.config['password'])
            return false;

        return true;
    }

    // Source: https://www.apharmony.com/software-sagacity/2014/10/node-js-adding-comments-to-json-files/
    function StripCommentsFromJSON(txt) {
        var regEx = new RegExp("\/\/(.*)", "g");
        return txt.replace(regEx, '');
    }

    me.set_config = function(config) {
        me.config = get_config_template();
        me.config['host'] = config['host'];
        me.config['port'] = config['port'] || 21;

        me.config['user'] = config['user'] || 'anonymous';
        me.config['password'] = config['password'];

        me.config['deleteRemote'] = config['deleteRemote'] || false;
        me.config['forcePasv'] = config['forcePasv'] || true;

        me.config['localRoot'] = config['localRoot'];
        me.config['remoteRoot'] = config['remoteRoot'];

        me.config['include'] = config['include'];
        me.config['exclude'] = config['exclude'];

        //console.log('me.config:', me.config);
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