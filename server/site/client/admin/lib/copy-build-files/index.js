/*jshint node:true*/
var fs = require('fs-extra');

module.exports = {
  name: 'copy-build-files',

  isDevelopingAddon: function() {
    return true;
  },
  postBuild: function (results, x) {
    // only run in production env:
    if (this.app.env != 'production') {
      return null;
    }

    var fs = this.project.require('fs-extra');
    var originFolder = process.cwd() + '/dist';
    var distFolder = process.cwd() + '/prod';
    // cleanup:
    fs.emptyDirSync(distFolder);
    // copy:
    fs.copySync(originFolder, distFolder);
  }
};