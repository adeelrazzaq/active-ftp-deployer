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
Configuration can be saved in a file in json format and specified as a parameter with one of these switches: `-c | -config | -configFile`.
2. Parameters
Configuration details can be provided as parameters as specified below in the **Parameters** section.

**With Configuration**

```js
 > ftp-deploy -c deployer-config.json
```
Starts deployment expecting the configuration in the file named **deployer-config.json**.

```js
 > ftp-deploy
```
If configuration file is not specified then it looks for the configuration file with default name `.ftp-deployer.config.json`.



**With Parameters**
```js
 > ftp-deploy -h [ftp.site.com] -u [username] -p [password]
```

```js
 > ftp-deploy -h [ftp.site.com] -port 21 -u [username] -p [password] -l [local_dir] -r [remote_dir] -i '["assets/**", "**/*.html", "**/*.js"]' -e '["node_modules/**", ".git/**", "**/*.js.map"]'
```

Parameters are explained in the section below.


## Parameters

Parameter | Description
------------ | -------------
-c or -config or -configFile | Path to the configuration file with FTP details. If none of the parameters is specified the default configuration  is expected to exist with the default name. `[default: .ftp-deployer.config.json`.
-h, -host | FTP host
-p, -port | FTP Port. [default: 21]  [optional]
-u, -user | FTP user
-p, -pass -password | FTP Password. Password optional, prompted if none given.
-l, -localRoot | Local directory path. [optional]
-r, -remoteRoot | Remote directory path. [optional]
-i, -include | Takes an array of glob patterns. Includes files only specified in patterns in this field. For example `["assets/**", "**/*.html", "**/*.js"]` includes all files in assets director including subdirectories, all files with `.html` and `.js` extensions in all directories and subdirectories. [optional]
-e, -exclude | Takes an array of glob patterns. Excludes the files matching the patterns in local directory from copying. For example `["node_modules/**", ".git/**", "**/*.js.map"]` excludes aLL files in node_modules & .git directory including their subdirectories and dot files and all files with extension `.js.map` in any directories or subdirectories. [optional]
-d, -deleteRemote | Delete ALL existing files at destination before uploading, if true. `[default: false]`
-f, -forcePasv | Passive mode is forced (EPSV command is not sent) `[default: true]`


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
