const ConfigBuilder = function() {

    this.build_from_arguments = build_from_arguments;

    /* Parse params in format: /h activedatatools.cloudapp.net /port 21 /u ftpuser /p j8UY_91PP! /l D:/IT/NodeJS/FTP-Deploy/Example /r FTP-Deployer */
    function build_from_arguments() {

        var args = process.argv.slice(2);

        var argsConfig = [];
        for (let i = 0; i < args.length; i++) {

            switch (args[i]) {

                case '/c':
                case '/config':
                case '/configfile':
                    argsConfig['configFile'] = args[i + 1];
                    break;

                case '/h':
                case '/host':
                    argsConfig['host'] = args[i + 1];
                    break;

                case '/port':
                    argsConfig['port'] = args[i + 1];
                    break;

                case '/u':
                case '/user':
                case '/username':
                    argsConfig['user'] = args[i + 1];
                    break;

                case '/p':
                case '/pass':
                case '/password':
                    argsConfig['password'] = args[i + 1];
                    break;

                case '/d':
                case '/deleteremote':
                    argsConfig['deleteRemote'] = args[i + 1];
                    break;

                case '/f':
                case '/forcepasv':
                    argsConfig['forcePasv'] = args[i + 1];
                    break;

                case '/l':
                case '/local':
                    argsConfig['localRoot'] = args[i + 1];
                    break;

                case '/r':
                case '/remote':
                    argsConfig['remoteRoot'] = args[i + 1];
                    break;

                case '/i':
                case '/include':
                    argsConfig['include'] = args[i + 1];
                    break;

                case '/e':
                case '/exclude':
                    argsConfig['exclude'] = args[i + 1];
                    break;

                case '/w':
                case '/write':
                case '/writeconfig':
                    argsConfig['writeConfig'] = "";
                    break;
            }
        }

        return argsConfig;
    }
}

module.exports = ConfigBuilder;