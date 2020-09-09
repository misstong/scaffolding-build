#!/usr/bin/env node
// console.log('first cli')

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?',
    }
]).then(answers => {
    const destDir = process.cwd()
    const tmpDir = path.join(__dirname,'templates')
    fs.readdir(tmpDir,(err,files)=> {
        if (err) throw err;
        files.forEach(file=>{
            ejs.renderFile(path.join(tmpDir,file),answers,(err,result)=>{
                if (err) throw err
                fs.writeFileSync(path.join(destDir,file),result)
            })

            
        })
    })
})