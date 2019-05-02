import * as fs from 'fs';
import * as path from 'path';
const ncu = require('npm-check-updates');
import * as _ from 'lodash';
import { JSONResult, config, FrameworkData, initializeFrameworks, BenchmarkError, ErrorsAndWarning, BenchmarkOptions } from './common'

var exec = require('child_process').execSync;

async function main() {
let frameworks = process.argv.length<=2 ? [] : process.argv.slice(2,process.argv.length);

if (frameworks.length === 0) {
    console.log("usage: rebuild.js [directory1, directory2, ...]");
} else {
    for (let framework of frameworks) {
        let dir = path.resolve(path.join('..','frameworks',framework));
        console.log("rebuilding "+framework+" in directory ", dir);
        if (!fs.existsSync(dir)) throw "ERROR: directory "+dir+" not found";
        else {
            console.log("running rm -rf package-lock.json yarn.lock dist elm-stuff bower_components node_modules");
            try {
                exec('rm -rf package-lock.json yarn.lock dist elm-stuff bower_components node_modules', {
                    cwd: dir,
                    stdio: 'inherit'
                });
            } catch {}
            console.log("running npm install && npm run build-prod");
            exec('npm install && npm run build-prod', {
                cwd: path.resolve(dir),
                stdio: 'inherit'
            });
        }
    }
    exec('npm run index', {
        stdio: 'inherit'
    });

    let frameworkInfos = await initializeFrameworks((filePath: string) => frameworks.indexOf(filePath) > -1);
    // console.log("frameworkInfos", frameworkInfos, frameworks);
    let frameworkNames = frameworkInfos.map(f => "'"+f.fullNameWithKeyedAndVersion+"'").join(' ');
    if (frameworkInfos.length === 0) {
        throw "expected to find some version information for the framework";
    }
    console.log('npm run bench -- --headless --count 1 --framework '+frameworkNames);
    exec('npm run bench -- --headless --count 1 --framework '+frameworkNames, {
        stdio: 'inherit'
    });
    console.log('npm run isKeyed -- --headless --framework '+frameworkNames);
    exec('npm run isKeyed -- --headless --framework '+frameworkNames, {
        stdio: 'inherit'
    });

    console.log("All checks are fine!");
    console.log("======> Please rerun the benchmark: npm run bench -- --framework ", frameworkNames);
}
}

main();