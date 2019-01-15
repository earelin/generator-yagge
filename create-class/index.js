const YasgeGenerator = require('../commons/yagge-generator')
const generateUi = require('./prompt')
const chalk = require('chalk')
const Logo = require('../commons/logo')

/**
 * Generates a basic class code.
 */
module.exports = class extends YasgeGenerator {

  initializing() {
    this.props = {
      basePackage: this.config.get("promptValues").packageName
    }
    
    this.log(chalk.green(Logo.getAscii()));
    this.log("               === " + chalk.yellow("Class generation") + " ===")
  }

  prompting() {
    return this.prompt(
      [
        {
          type: 'input',
          name: 'className',
          message: 'Class name'
        }, {
          type: 'input',
          name: 'classPackage',
          message: 'Class package',
          default: this.props.basePackage
        }, {
          type: 'input',
          name: 'classDescription',
          message: 'Class description'
        }
      ]
    ).then((answers) => {
        this.props = Object.assign(answers, this.props)
        this.props.classVariableName = this.props.className.charAt(0).toLowerCase() + this.props.className.substr(1)
      })
  }

  writing() {
    const classPackagePath = this.props.classPackage.replace(/\./g, '/')
    
    const templates = [
      {
        template: 'Class.java',
        destination: `src/main/java/${classPackagePath}/${this.props.className}.java`
      }, {
        template: 'ClassTest.java',
        destination: `src/test/java/${classPackagePath}/${this.props.className}Test.java`
      }
    ]

    this._copyTemplates(templates);
  }
}
