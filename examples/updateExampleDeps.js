const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const glob = require('glob')

fs.readdirSync(__dirname).forEach(function (dir) {
  const folder = path.join(__dirname, dir);
  // check for a package.json file
  if (!fs.existsSync(path.join(folder, 'package.json'))) {
    return
  }

  // install folder
  cp.spawn('npm', ['update'], { env: process.env, cwd: folder, stdio: 'inherit' })
});
