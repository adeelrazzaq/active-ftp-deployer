# ftp-deployer
This is a wrapper package on top of [ftp-deploy](https://github.com/simonh1000/ftp-deploy).

##### ftp-deploy

**[ftp-deploy](https://github.com/simonh1000/ftp-deploy)** is a Node.js package to help with deploying code. Ftp a folder from your local disk to a remote ftp destination. Does not delete from destination directory.
**ftp-deploy** requires writing a script. This package does not require writing that script and adds a cli command instead.
**ftp-deploy** is also forked [here](https://github.com/adeelrazzaq/ftp-deploy) for reference/backup purposes.

## Installation

```js
 > npm install --save-dev https://github.com/adeelrazzaq/ftp-deployer.git
```

## Usage Examples
FTP details and other required configuration can be provided in two ways.
1. Configuration Files
Configuration can be saved in a file in json format and specified as a parameter with one of these switches: `/c | /config | /configFile`.
2. Parameters
Configuration details can be provided as parameters as specified below in the **Parameters** section.

**With Configuration**

` > ftp-deploy /c deployer-config.json`
Starts deployment expecting the configuration in the file named **deployer-config.json**.

` > ftp-deploy`
If configuration file is not specified then it looks for the configuration file with default name `.ftp-deployer.config.json`.

**With Parameters**
` > ftp-deploy /h host_name /u user /p password`

` > ftp-deploy /h ftp.site.com /port 21 /u username /p password /l local_dir /r remote_dir /i 'assets/**, **/*.html, **/*.js' /e 'node_modules/**, .git/**, **/*.js.map'`

Parameters are explained in the section below.


## Parameters

Parameters are to be provided in a fashion where each parameter value is preceded with a switch starting with a `/` specified the name of the parameter coming in as next argument e.g. `ftp-deploy /switch value`.

`/c or /config or /configFile`
Path to the configuration file with FTP details. If none of the parameters is specified the default configuration  is expected to exist with the default name.
**[default: .ftp-deployer.config.json]**

`/h, /host`
FTP host

`/p, /port`
FTP Port.
**[optional]** **[default: 21]**

`/u, /user`
FTP user

`/p, /pass /password`
FTP Password. Password optional, prompted if none given.

`/l, /localRoot`
Local directory path.
**[optional]**

`/r, /remoteRoot`
Remote directory path.
**[optional]**

`/i, /include`
Takes in a list of glob patterns in a string separated by a `,`. Includes files only specified in patterns in this field. For example `assets/**, **/*.html, **/*.js` includes all files in assets director including subdirectories, all files with `.html` and `.js` extensions in all directories and subdirectories.

`/e, /exclude`
Takes in a list of glob patterns in a string separated by a `,`. Excludes the files matching the patterns in local directory from copying. For example `node_modules/**, .git/**, **/*.js.map` excludes aLL files in node_modules & .git directory including their subdirectories and dot files and all files with extension `.js.map` in any directories or subdirectories.
**[optional]**

`/d, /deleteRemote`
Delete ALL existing files at destination before uploading, if true.
**[default: false]**

`/f, /forcePasv`
Passive mode is forced (EPSV command is not sent).
**[default: true]**

`/w, /write, /writeConfig`
Use this switch without any value to write an empty config file to the disk for use.

## Sample Configuration File

```json
{
    "host": "",
    "port": 21,

    "user": "anonymous",
    "password": "",

    "deleteRemote": false,
    "forcePasv": true,

    "localRoot": "",
    "remoteRoot": "",

    "include": [],
    "exclude": []
}
```
An empty configuration file can be created by calling the `ftp-deploy` command with one of the following switches by providing a name as parameter `/w | /write | /writeConfig`. If no value is provided default name `.ftp-deployer.config.json` is used.

**CLI Command**
There are two commands you can use to run the package. `ftp-deploy` and `deploy`.
Since this package is installed from git instead of npm repository, the cli commands cannot be run directly. The command has to be added to the script for it in package.json file.

```json
"scripts": {
        "deploy": "ftp=deploy /c .ftp-deployer.config.json"
    }
```

or

```json
"scripts": {
        "deploy": "deploy /h {ip_or_domain} /port {ftp_port} /u {ftp_user} /p {password} /l {local_path} /r {remote_path}"
    }
```

***Providing parameters from cli to script***

If the commands are setup in script tag in package.json file then the parameters can also be provided to  the command being specified in the scritps tag.

For exammple, if the deploy script is setup in the scripts tag inside package.json file as following:
```json
"scripts": {
        "deploy": "deploy /h {ip_or_domain} /port {ftp_port} /u {ftp_user} /p {password} /l {local_path} /r {remote_path}"
    }
```

Then the following command will forward all the parameters specified after `--` to the deploy command.

```js
 > npm run deploy /h {ip_or_domain} /port {ftp_port} /u {ftp_user} /p {password} /l {local_path} /r {remote_path}
```

Once the package is published to npm respository and is installed from there, the cli commands can be run directly from the command prompt.
