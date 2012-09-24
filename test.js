var fs = require('fs'),
  util = require('util'),
  lazy = require('lazy'),
  Stream = require('stream').Stream;

/**
* A class for parsing sococo log files and emitting structured data
* 
* This conforms to the node Stream base class, and can be chained together with other stream filters
* using the `.pipe()` method. This class expects data to be in line format rather than chunks of
* data coming directly from the file. You can use readFile to pass in a file directly, and it will
* convert into buffered lines for you.
*
* Example:
*     
*     var p = new Parser();
*     p.on('data', function(data){
*         console.log(data);
*     });
*     p.on('end', function(){
*         console.log('parsing complete');
*     });
*     p.readFile('test-log.txt');
*/
function Parser(){
  Stream.call(this);
}

util.inherits(Parser, Stream);

/**
* Helper method for reading a file into the log parser directly. 
* 
* Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
* until newline, then feeds each line into the parser. When its finished, it emits an end event. 
* Because parsing is synchronous, you can depend on parsing being complete.
*
* @param {String} file name of file to be read in
* @api public
*/
Parser.prototype.readFile = function(file) {
  var that = this;

  new lazy(fs.createReadStream(file))
    .lines
    .skip(1)
    .forEach(function(line){
      that.write(line.toString());
    })
    .join(function(){
      that.emit('end');
    });
}

/**
* Write log file lines to be parsed
* 
* Conforming to the stream api, mostly so you can parse together data transform streams. This stream
* expects lines in string format.
*
* @param {String} line a single line of formatted sococo log text
* @api private
*/
Parser.prototype.write = function(line) {
  var that = this,
    items = line.split(',');

  if (items.length < 8) {
    return;
  }

  var mess = items[8].replace(/\n/g, '').replace(/\r/g, '');

  if (items.length > 9) {
    for (var j = 9; j < items.length; j++) {
      mess += ',' + items[j];
    }
  }

  if (mess[0] == ' '){
    mess = mess.substring(1);
  }

  var transportData = this.parseTransportData(mess);
  mess = !~mess.indexOf('}}') ? mess : mess.split('}}')[1].replace(/^\s+/,"");

  var entry = {
    cpuId: items[0].replace(/ /g, ''),
    processId: items[1].replace(/ /g, ''),
    threadId: items[2].replace(/ /g, ''),
    diffTime: items[3].replace(/ /g, ''),
    systemDate: items[4].replace(/ /g, ''),
    systemTime: items[5].replace(/ /g, ''),
    severity: items[6].replace(/ /g, ''),
    facility: items[7].replace(/ /g, ''),
    transportData: transportData,
    message: mess
  };

  this.emit('data', entry);
}

/**
* Parse sococo transport data out of a log line
* 
* We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
* method parses that data off raw log message and returns a javascript object.
*
* @param {String} logMessage one line of a sococo log
* @api private
*/
Parser.prototype.parseTransportData = function(logMessage) {
  if (!~logMessage.indexOf('{{')) {
    return false;
  }

  var data = logMessage.split('}}')[0].split('{{')[1];

  data = data.split(';');

  var transportData = {}

  if (data[0] == 'r') {
    transportData['direction'] = 'receiving';
  } else if (data[0] == 's') {
    transportData['direction'] = 'sending';
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i].indexOf('#=') != -1) {
      transportData['packetNumber'] = data[i].split('=')[1];
    }
    if (data[i].indexOf('s=') != -1) {
      transportData['session'] = data[i].split('=')[1];
    }
    if (data[i].indexOf('c=') != -1) {
      transportData['channel'] = data[i].split('=')[1];
    }
    if (data[i].indexOf('t=') != -1) {
      transportData['payloadType'] = data[i].split('=')[1];
    }
    if (data[i].indexOf('m=') != -1) {
      transportData['mediaElementId'] = data[i].split('=')[1];
    }
  }

  return transportData;
}

module.exports = Parser;