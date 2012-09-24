<a name="top" />

#Docs

* [Parser](#Parser)
    * [readFile(String file)](#Parser-readFile) - Helper method for reading a file into the log parser directly. 
    * [write(String line)](#Parser-write) - Write log file lines to be parsed
    * [parseTransportData(String logMessage)](#Parser-parseTransportData) - Parse sococo transport data out of a log line

<a name="Parser" />
##Parser &bull; [top](#top)



A class for parsing sococo log files and emitting structured data

This conforms to the node Stream base class, and can be chained together with other stream filters
using the `.pipe()` method. This class expects data to be in line format rather than chunks of
data coming directly from the file. You can use readFile to pass in a file directly, and it will
convert into buffered lines for you.

## Example
    
    var p = new Parser();
    p.on('data', function(data){
        console.log(data);
    });
    p.on('end', function(){
        console.log('parsing complete');
    });
    p.readFile('test-log.txt');

<table></table>

<a name="Parser-readFile">
###[Parser](#Parser)#readFile<table><tr><td>String</td><td>file</td><td>name of file to be read in</td></tr></table>

Helper method for reading a file into the log parser directly. 

Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input 
until newline, then feeds each line into the parser. When its finished, it emits an end event. 
Because parsing is synchronous, you can depend on parsing being complete.


<a name="Parser-write">
###[Parser](#Parser)#write<table><tr><td>String</td><td>line</td><td>a single line of formatted sococo log text</td></tr></table>

Write log file lines to be parsed

Conforming to the stream api, mostly so you can parse together data transform streams. This stream
expects lines in string format.


<a name="Parser-parseTransportData">
###[Parser](#Parser)#parseTransportData<table><tr><td>String</td><td>logMessage</td><td>one line of a sococo log</td></tr></table>

Parse sococo transport data out of a log line

We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This
method parses that data off raw log message and returns a javascript object.
