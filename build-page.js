const path = require('path');
const {
    execFile
} = require('child_process');
const fs = require('fs');
const viewsUrl = require('./package.json').buildfolder;
console.log(viewsUrl);
// const viewsUrl = './src/views/example';
const distPath = __dirname;

fs.readdirSync(viewsUrl).forEach(function (file) {
    let name = file.split('.')[0];

    // const child = spawnSync(`vue build --target lib --name ${name}  ${viewsUrl+file}`, {
    //     shell: true,
    //     cwd: distPath
    // });

    const child = execFile('vue build ', [`--target lib --name ${name}  ${viewsUrl + '/' +  file} --dest pages/${name}`], {
        shell: true,
        cwd: distPath
    }, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
    console.log(`vue build --target lib --name ${name}  ${viewsUrl +'/'+ file} --dest pages/${name}`)
})

