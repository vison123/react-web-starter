'use strict';

const fs = require('fs-extra');
const path = require('path');
const paths = require('./template/config/paths');
const chalk = require('chalk');
const cyan = chalk.cyan;

// function travel(dir, callback) {
//   fs.readdirSync(dir).forEach(function(file) {
//     var pathname = path.join(dir, file);
//
//     if(fs.statSync(pathname).isDirectory()) {
//       travel(pathname, callback);
//     }else {
//       callback(pathname);
//     }
//   });
// }

module.exports = function(projectName) {
  const ownPath = paths.ownPath;
  const appPath = path.join(fs.realpathSync(process.cwd()), projectName);
  const folders = ['config', 'public', 'scripts', 'src'];

  fs.copy(ownPath, appPath)
  // Make shallow array of files paths
  // const files = folders.reduce((files, folder) => {
  //   console.log('获取该文件夹下文件', folder)
  //   return files.concat(
  //     fs.readdirSync(path.join(ownPath, folder))
  //     // set full path
  //       .map(file => path.join(ownPath, folder, file))
  //       // omit dirs from file list
  //       .filter(file => fs.lstatSync(file).isFile())
  //   );
  // }, []);
  //
  //
  // fs.readdirSync(ownPath)
  //   .map(file => path.join(ownPath, file))
  //   .filter(file => fs.lstatSync(file).isFile())
  //   .map(file => files.push(file))

  // mkdir folders
  // folders.forEach(folder => {
  //   console.log('创建新的文件夹', folder)
  //   fs.mkdirSync(path.join(appPath, folder));
  // });
  //
  // // copy template file
  // files.forEach(file => {
  //   console.log('file', file)
  //   let content = fs.readFileSync(file, 'utf8');
  //   console.log('file', file)
  //   // Skip flagged files
  //   // if (content.match(/\/\/ @remove-file-on-eject/)) {
  //   //   return;
  //   // }
  //   // content =
  //   //   content
  //   //   // Remove dead code from .js files on eject
  //   //     .replace(
  //   //       /\/\/ @remove-on-eject-begin([\s\S]*?)\/\/ @remove-on-eject-end/gm,
  //   //       ''
  //   //     )
  //   //     // Remove dead code from .applescript files on eject
  //   //     .replace(
  //   //       /-- @remove-on-eject-begin([\s\S]*?)-- @remove-on-eject-end/gm,
  //   //       ''
  //   //     )
  //   //     .trim() + '\n';
  //   console.log(`  Adding ${cyan(file.replace(ownPath, ''))} to the project`);
  //   fs.writeFileSync(file.replace(ownPath, appPath), content);
  // });
};


