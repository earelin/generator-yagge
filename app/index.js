const chalk = require('chalk')
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)
    this.props = {}
  }

  initializing() {
    // ASCII font Modular
    this.log(chalk.green(`             
           __   __  _______  _______  _______  _______ 
          |  | |  ||   _   ||       ||       ||       |
          |  |_|  ||  |_|  ||    ___||    ___||    ___|
          |       ||       ||   | __ |   | __ |   |___ 
          |_     _||       ||   ||  ||   ||  ||    ___|
            |   |  |   _   ||   |_| ||   |_| ||   |___ 
            |___|  |__| |__||_______||_______||_______|
      `));
    this.log("                ===" + chalk.yellow(" Yet Another Gradle Project Generator ") + "===\n")
  }

  prompting() {
    return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Name',
        store   : true,
        default : this.appname // Default to current folder name
      }, {
        type    : 'input',
        name    : 'projectDescription',
        message : 'Description',
        store   : true
      }, {
        type    : 'input',
        name    : 'projectGroup',
        message : 'Project group',
        store   : true,
        default : 'com-example'
      }, {
        type: 'input',
        name: 'packageName',
        message: 'Default package name',
        store   : true,
        default: this.appname
      }, {
        type: 'list',
        name: 'javaVersion',
        message: 'Java version',
        store: true,
        choices: [
          '1.8',
          '11.0'
        ]
      }, {
        type: 'checkbox',
        name: 'components',
        message: 'Select additional components',
        store: true,
        choices: [          
          'Lombok', 'JSON Jackson'
        ]
      }]).then((answers) => {
        this.props = Object.assign(answers, this.props)
      })
  }

  writing() {
    this._createBasicStructure()
  }

  installing() {
    this.spawnCommand('gradle', ['wrapper', 'check'])
  }

  end() {
    this.log(chalk.green("Bye!"))
  }

  _createBasicStructure() {

    this.basePackagePath = this.props.packageName.replace(/\./g, '/')

    const folders = [
      'src/main/java/' + this.basePackagePath,
      'src/test/java/' + this.basePackagePath
    ]

    this._createFolders(folders)

    const templates = [
      {
        template: 'gitignore',
        destination: '.gitignore'
      },
      {
        template: 'checkstyle.xml',
        destination: 'checkstyle.xml'
      },
      {
        template: 'build.gradle',
        destination: 'build.gradle'
      },
      {
        template: 'gradle.properties',
        destination: 'gradle.properties'
      },
    ]

    this._copyTemplates(templates)    
  }

  _createFolders(folders) {
    for (let i = 0; i < folders.length; i++) {
      mkdirp(folders[i])
    }
  }

  _copyTemplates(templates) {
    for (let i = 0; i < templates.length; i++) {
      this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        this.props
      )
    }
  }
}
