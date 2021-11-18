const superagent = require("superagent");
const fs = require("fs")
const config = require("./config")

async function workingHours() {
    const body = fs.readFileSync(config.queryTemplatePath, { encoding: 'utf-8' });
    const res = await superagent
        .post(config.workingTimeGetUrl)
        .send(body)
        .set("access-token", config.accessToken);
    return res.body;
}

async function fileInWorkingHours() {
    let t2 = new Date('2021-11-04');
    const body = await workingTimeParams(t2);
    const res = await superagent
        .post(config.workingTimeSubmitUrl)
        .send(body)
        .set("access-token", config.accessToken);
    console.log(res.body);
}

async function workingTimeGen() {
    let t2 = new Date('2021-11-04');
    // t2.setTime(t1);
    // t2.setHours(0, 0, 0, 0);
    console.log(t2.toString());
    return t2;
}

async function workingTimeParams(t) {
    const content = fs.readFileSync(config.submitTemplatePath, { encoding: 'utf-8' });
    const body = JSON.parse(content);
    body.timesheetLines.dateFrom = t.getTime();
    body.timesheetLines.dateThru = t.getTime();
    body.fromDate = t.getTime();
    body.thruDate = t.getTime();
    body.code = config.code;
    fs.writeFileSync(`${config.logPath}/${t.toISOString()}.json`, JSON.stringify(body), { encoding: 'utf-8' });
    return body;
}

async function convertTime() {
    let t = new Date();
    t.setTime(1635696000000);
    console.log(t.toString());
    t.setTime(1635782400000);
    console.log(t.toString());
    t.setTime(1637164800000);
    console.log(t.toString());
    t.setTime(1635868800000);
    console.log(t.toString());

    console.log(t.getTime());
    console.log(t1);
}

async function main() {
    let res = await workingHours();
    console.log(res);
}

eval(process.argv[2] + '()')

