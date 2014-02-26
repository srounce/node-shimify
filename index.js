var fs = require('fs')
  , through = require('through')
  , shimPath = require.resolve('es5-shim')
  , shimCode = fs.readFileSync(shimPath, 'utf8')
  , applied = false;

module.exports = function (file) {
  var d = ""
    , stream = through(write, end);

  return stream;

  function write(buf) {
    d += buf;
  }

  function end() {
    d =  "\"use strict\";\n" + d;
    if(!applied) {
      d = shimCode + "\n/* ES5 SHIM END */\n" + d;
      applied = true;
    }
    //console.log(file, "size: ", d.length);
    stream.queue(d);
    stream.queue(null);
  }
};
