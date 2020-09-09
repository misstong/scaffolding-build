const Generator = require('yeoman-generator')


module.exports = class extends Generator{

    prompting() {
        return this.prompt([
            {
            type: 'input',
            name: 'name',
            message: 'input your project name',
            default: 't'
            }

        ]).then(answers=> this.answers=answers)
    }
    writing() {
        // this.fs.write(
            // this.destinationPath('temp.txt'),
            // Math.random().toString()
        // )
        const dest = this.destinationPath('temp.html')
        const src = this.templatePath('temp.html')
        // const ctx = {name: 'tang'}
        const ctx = this.answers;
        // this.copyTemplate(src,dest,ctx)
        this.fs.copyTpl(src,dest,ctx)
    }
}