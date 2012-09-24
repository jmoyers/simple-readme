<p><a name="top" /></p>

<h1>Docs</h1>

<ul>
<li><a href="#Parser">Parser</a>
<ul><li><a href="#Parser-readFile">readFile(String file)</a> - Helper method for reading a file into the log parser directly. </li>
<li><a href="#Parser-write">write(String line)</a> - Write log file lines to be parsed</li>
<li><a href="#Parser-parseTransportData">parseTransportData(String logMessage)</a> - Parse sococo transport data out of a log line</li></ul></li>
</ul>

<p><a name="Parser" /></p>

<h2>Parser &bull; <a href="#top">top</a></h2>

<p><a name="Parser-readFile"></p>

<h3><a href="#Parser">Parser</a>#readFile<table><tr><td>String</td><td>file</td><td>name of file to be read in</td></tr></table></h3>

<p>Helper method for reading a file into the log parser directly. </p>

<p>Assumes first line of the file is going to be a header, so skips it for parsing. Buffers input <br />until newline, then feeds each line into the parser. When its finished, it emits an end event. <br />Because parsing is synchronous, you can depend on parsing being complete.</p>

<p><a name="Parser-write"></p>

<h3><a href="#Parser">Parser</a>#write<table><tr><td>String</td><td>line</td><td>a single line of formatted sococo log text</td></tr></table></h3>

<p>Write log file lines to be parsed</p>

<p>Conforming to the stream api, mostly so you can parse together data transform streams. This stream<br />expects lines in string format.</p>

<p><a name="Parser-parseTransportData"></p>

<h3><a href="#Parser">Parser</a>#parseTransportData<table><tr><td>String</td><td>logMessage</td><td>one line of a sococo log</td></tr></table></h3>

<p>Parse sococo transport data out of a log line</p>

<p>We have a header on log messages that conforms roughly to a {{name:value;name:value}} format. This<br />method parses that data off raw log message and returns a javascript object.</p>