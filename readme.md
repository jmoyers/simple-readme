* [Parser2](#Parser2) (test2.js)
    * [readFile(String file)](#Parser2-readFile) - Helper method for reading a file into the log Parser2 directly. 
    * [write(String line)](#Parser2-write) - Write log file lines to be parsed
    * [parseTransportData(String line)](#Parser2-parseTransportData) - Parse sococo transport data out of a log line
* [Parser](#Parser) (test.js)
    * [readFile(String file)](#Parser-readFile) - Helper method for reading a file into the log parser directly. 
    * [write(String line)](#Parser-write) - Write log file lines to be parsed
    * [parseTransportData(String line)](#Parser-parseTransportData) - Parse sococo transport data out of a log line


<a name="Parser2" />
##Parser2 &bull; [top](#top)

Location: test2.js

A class for parsing sococo log files and emitting structured data

This conforms to the node Stream base class, and can be chained together with other stream filters
using the `.pipe()` method. This class expects data to be in line format rather than chunks of
data coming directly from the file. You can use readFile to pass in a file directly, and it will
convert into buffered lines for you.
    
    var p = new Parser22();
    p.on('data', function(data){
        console.log(data);
    });
    p.on('end', function(){
        console.log('parsing complete');
    });
    p.readFile('test-log.txt');



<a name="Parser2-readFile">
###[Parser2](#Parser2)#readFile(String file)

Helper method for reading a file into the log Parser2 directly. 

Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
until newline, then feeds each line into the Parser2. When its finished, it emits an end event. 
Because parsing is synchronous, you can depend on parsing being complete.


<a name="Parser2-write">
###[Parser2](#Parser2)#write(String line)

Write log file lines to be parsed

Conforming to the stream api, mostly so you can parse together data transform streams. This stream
expects lines in string format.


<a name="Parser2-parseTransportData">
###[Parser2](#Parser2)#parseTransportData(String line)

Parse sococo transport data out of a log line

We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
method parses that data off raw log message and returns a javascript object.
<a name="Parser" />
##Parser &bull; [top](#top)

Location: test.js

A class for parsing sococo log files and emitting structured data

This conforms to the node Stream base class, and can be chained together with other stream filters
using the `.pipe()` method. This class expects data to be in line format rather than chunks of
data coming directly from the file. You can use readFile to pass in a file directly, and it will
convert into buffered lines for you.
    
    var p = new Parser();
    p.on('data', function(data){
        console.log(data);
    });
    p.on('end', function(){
        console.log('parsing complete');
    });
    p.readFile('test-log.txt');



<a name="Parser-readFile">
###[Parser](#Parser)#readFile(String file)

Helper method for reading a file into the log parser directly. 

Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
until newline, then feeds each line into the parser. When its finished, it emits an end event. 
Because parsing is synchronous, you can depend on parsing being complete.


<a name="Parser-write">
###[Parser](#Parser)#write(String line)

Write log file lines to be parsed

Conforming to the stream api, mostly so you can parse together data transform streams. This stream
expects lines in string format.


<a name="Parser-parseTransportData">
###[Parser](#Parser)#parseTransportData(String line)

Parse sococo transport data out of a log line

We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
method parses that data off raw log message and returns a javascript object.
