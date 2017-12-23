const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function runCommand(folder, args) {
  cp.spawn('npm', args, { env: process.env, cwd: folder, stdio: 'inherit' })
}

function getPackages(category) {
  const folder = path.join(__dirname, category);
  return fs.readdirSync(folder)
    .map(function (dir) {
      const fullPath = path.join(folder, dir);
      // check for a package.json file
      if (!fs.existsSync(path.join(fullPath, 'package.json'))) {
        return
      }
      return fullPath;
    })
    .filter(function(pkg) {
      return pkg !== undefined;
    })
}

function runCommandInCategory(category, args) {
  const pkgs = getPackages(category);
  
  pkgs.forEach(function(pkg) {
    runCommand(pkg, args);
  });
}

const CATEGORIES = ['react', 'vue', 'svelte', 'misc'];
const category = process.argv[2];
const args = process.argv.slice(3);

if (category === 'all') {
  CATEGORIES.forEach(function(c) {
    runCommandInCategory(c, args);
  });
} else {
  runCommandInCategory(category, args);
}


