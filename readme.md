Currently unmaintained.

<a name="top" />

#simple-doc

##creating a simple readme from inline documentation


###test/function-proto.js

* [Parser](#test/function-proto.js/Parser) - A class for parsing sococo log files and emitting structured data
    * [readFile(file)](#test/function-proto.js/Parser/readFile) - Helper method for reading a file into the log parser directly. 
    * [write(line)](#test/function-proto.js/Parser/write) - Write log file lines to be parsed
    * [parseTransportData(line)](#test/function-proto.js/Parser/parseTransportData) - Parse sococo transport data out of a log line
* [ATestFunction2](#ATestFunction2)

###test/functions.js

* [functions.js](#functions.js)
* [ATestFunction2](#ATestFunction2)

###test/proto.js

* [Parser](#test/proto.js/Parser) - A class for parsing sococo log files and emitting structured data
    * [readFile(file)](#test/proto.js/Parser/readFile) - Helper method for reading a file into the log parser directly. 
    * [write(line)](#test/proto.js/Parser/write) - Write log file lines to be parsed
    * [parseTransportData(line)](#test/proto.js/Parser/parseTransportData) - Parse sococo transport data out of a log line


<a name="test/function-proto.js/Parser" />
##Parser &bull; [top](#top)

Location: test/function-proto.js

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



<a name="test/function-proto.js/Parser/readFile">
###[Parser](#test/function-proto.js/Parser)#readFile(file)

Helper method for reading a file into the log parser directly. 

Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
until newline, then feeds each line into the parser. When its finished, it emits an end event. 
Because parsing is synchronous, you can depend on parsing being complete.


<a name="test/function-proto.js/Parser/write">
###[Parser](#test/function-proto.js/Parser)#write(line)

Write log file lines to be parsed

Conforming to the stream api, mostly so you can parse together data transform streams. This stream
expects lines in string format.


<a name="test/function-proto.js/Parser/parseTransportData">
###[Parser](#test/function-proto.js/Parser)#parseTransportData(line)

Parse sococo transport data out of a log line

We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
method parses that data off raw log message and returns a javascript object.
<a name="test/proto.js/Parser" />
##Parser &bull; [top](#top)

Location: test/proto.js

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



<a name="test/proto.js/Parser/readFile">
###[Parser](#test/proto.js/Parser)#readFile(file)

Helper method for reading a file into the log parser directly. 

Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
until newline, then feeds each line into the parser. When its finished, it emits an end event. 
Because parsing is synchronous, you can depend on parsing being complete.


<a name="test/proto.js/Parser/write">
###[Parser](#test/proto.js/Parser)#write(line)

Write log file lines to be parsed

Conforming to the stream api, mostly so you can parse together data transform streams. This stream
expects lines in string format.


<a name="test/proto.js/Parser/parseTransportData">
###[Parser](#test/proto.js/Parser)#parseTransportData(line)

Parse sococo transport data out of a log line

We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
method parses that data off raw log message and returns a javascript object.
<a name="ATestFunction2-ATestFunction2">
###ATestFunction2(stuff, things) &bull; [top](#top)

Location: test/function-proto.js

A test function summary for a second function

With a full summary
    
    ATestFunction2(stuff, things);
<a name="functions.js-functions.js">
###functions.js(stuff, things) &bull; [top](#top)

Location: test/functions.js

A test function summary

With a full summary
    
    ATestFunction(stuff, things);


<a name="ATestFunction2-ATestFunction2">
###ATestFunction2(stuff, things) &bull; [top](#top)

Location: test/functions.js

A test function summary for a second function

With a full summary
    
    ATestFunction2(stuff, things);
