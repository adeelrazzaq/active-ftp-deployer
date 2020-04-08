const ConfigBuilder = function() {

    this.build_from_arguments = function() {

        var args = process.argv.slice(2);

        var argsConfig = [];
        for (let i = 0; i < args.length; i++) {

            switch (args[i]) {

                case '-c':
                case '-config':
                case '-configFile':
                    argsConfig['config'] = args[i + 1];
                    break;

                case '-h':
                case '-host':
                    argsConfig['host'] = args[i + 1];
                    break;

                case '-port':
                    argsConfig['port'] = args[i + 1];
                    break;

                case '-u':
                case '-user':
                case '-username':
                    argsConfig['user'] = args[i + 1];
                    break;

                case '-p':
                case '-pass':
                case '-password':
                    argsConfig['password'] = args[i + 1];
                    break;

                case '-d':
                case '-deleteRemote':
                    argsConfig['deleteRemote'] = args[i + 1];
                    break;

                case '-f':
                case '-forcePasv':
                    argsConfig['forcePasv'] = args[i + 1];
                    break;

                case '-l':
                case '-local':
                    argsConfig['localRoot'] = args[i + 1];
                    break;

                case '-r':
                case '-remote':
                    argsConfig['remoteRoot'] = args[i + 1];
                    break;

                case '-i':
                case '-include':
                    argsConfig['include'] = args[i + 1];
                    break;

                case '-e':
                case '-exclude':
                    argsConfig['exclude'] = args[i + 1];
                    break;
            }
        }

        return argsConfig;
    }
}

module.exports = ConfigBuilder;