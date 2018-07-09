const fs = require('fs-extra');

fs.remove('./build', function(error) {
  if (error) {
    console.error(error);
  } else {
    fs.ensureDir('./build', function(error) {
      if (error) {
        console.error(error);
      } else {
        if (!fs.existsSync('build/.env')) {
          fs.copy('.env', './build/.env', function(error) {
            if (error) {
              console.error(error);
            }
          });
        }
      }
    });
  }
});
