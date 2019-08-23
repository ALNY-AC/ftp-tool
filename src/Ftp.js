var node_ssh = require('node-ssh')

module.exports = class Ftp extends node_ssh {

    constructor(host, username, password) {
        super();
        // super({ host: host, username: username, password: password });
        this.host = host;
        this.username = username;
        this.password = password;
        this.config = { port: 22, host: this.host, username: this.username, password: this.password };

        // this.sftp = new SFTPClient(this.config);
    }
    async connect() {
        return await super.connect(this.config);
    }
    // async ls(src) {
    //     return await this.sftp.ls(src);
    // }

}