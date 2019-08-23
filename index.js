#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const Ftp = require('./src/Ftp');
const fs = require('fs-extra');



program
    .version('0.0.1')
    .option('-h, --host <lang>', '服务端地址')
    .option('-u, --user <lang>', '指定用户名')
    .option('-p, --password <lang>', '指定密码')
    .option('-s, --remotepath <lang>', '指定服务端路径')
    .option('-l, --localpath <lang>', '指定本地路径')
    .option('-r, --rmrf', '是否先清空后上传')

program.parse(process.argv);


(async () => {

    const ftp = new Ftp(program.host, program.user, program.password);
    const url = path.join(process.cwd(), program.localpath);
    // const url = program.localpath;
    await ftp.connect();
    try {
        if (program.rmrf) {
            const res = await ftp.exec('rm -rf *', [], { cwd: program.remotepath });
            console.warn("清空==========");
        }
    } catch (error) {
        console.warn("清空失败==========");
        ftp.dispose();
        return;
    }

    try {
        const res = await ftp.putDirectory(url, program.remotepath);
        console.warn("提交成功==========");
        console.warn(res);
        ftp.dispose();
        return;
    } catch (error) {
        console.warn("失败==========");
        console.warn(error);
        ftp.dispose();
        return
    }


    try {
        const res = await ftp.exec('ls', [], { cwd: program.remotepath });
        console.warn(res);
        ftp.dispose();
    } catch (error) {
        ftp.dispose();
    }
    // const file = await fs.readdir(url);

    // const list = await ftp.ls(program.remotepath);
    // console.log(list.entries.map(el => el.longname).join('\r\n'));

    // const res = await ftp.put(url, program.remotepath);
    // console.warn(res);

    // console.warn(url);
    // console.warn(file);

})()



