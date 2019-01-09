'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the marvelous ${chalk.red(' SPARK APP ')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the App called ?',
        default: 'mySparkApp'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const appName = this.props.appName;

    this.fs.copyTpl(
      `${this.templatePath()}/[^_]*`,
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_appName.code-workspace'),
      this.destinationPath(`${appName}.code-workspace`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.vscode'),
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/_appName.js'),
      this.destinationPath(`src/${appName}.js`),
      this.props
    );

  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
