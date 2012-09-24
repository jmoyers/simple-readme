var fs = require('fs'),
  program = require('commander'),
  _ = require('lodash'),
  dox = require('dox'),
  md = require('github-flavored-markdown').parse,
  fs = require('fs');

program
  .option('-t, --title [title]', 'Title for your markdown document', 'Docs')
  .option('-n, --nolink', 'Don\'t link back to the top of the document', false)
  .parse(process.argv)

console.log(program.l);

function generateParamsString(params){
  return _.reduce(params, function(memo, tag) {
       return memo + tag.types.join('|') + ' ' + tag.name + ', ';
    }, '(')
    .slice(0, -2) + ')';
};

function generateParamsTable(params){
  return _.reduce(params, function(memo, tag) {
      return memo + '<tr><td>' + tag.types.join('|') + '</td><td>' + tag.name +
        '</td><td>'+tag.description+'</td></tr>';
    }, '<table>') + '</table>';
};

function linkify(link, display){
  if (typeof(display) === 'undefined') {
    display = link;
  };
  return '[' + display + '](#' + link + ')'; 
};

var buf = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk){ buf += chunk; });
process.stdin.on('end', function(){
  var doxInput = dox.parseComments(buf, {raw: true});

  doxInput = _.chain(doxInput)
    .filter(function(input) {
      // Filter out module exports for initial proto definitions
      return input.ctx.receiver !== 'module';
    })
    .groupBy(function(o) {
      return o.ctx.constructor;
    })
    .value();
  
  var protos = Object.keys(doxInput).map(function(constructor) {

    // Generate a nice method definition including a formatted param string
    var methods = doxInput[constructor].map(function(property){
      var methodString = property.ctx.name;

      var params = _.filter(property.tags, function(tag) {
        return tag.type === 'param';
      });

      return {
        name: methodString,
        params: params,
        summary: property.description.summary,
        full: property.description.full
      }  
    });

    return {
      name: constructor,
      methods: methods
    }
  });

  var output = '<a name="top" />\n\n#' + program.title + '\n\n';

  protos.forEach(function(proto) {
    output += '* '+ linkify(proto.name) + '\n';
    output += proto.methods.map(function(method) {
      return '    * ' + 
        linkify(proto.name + '-' + method.name, method.name +  
        generateParamsString(method.params)) + ' - ' + method.summary;
    }).join('\n');
  });

  output += '\n\n';

  protos.forEach(function(proto) {
    output += '<a name="'+proto.name+'" />\n';
    
    output += '##'+ proto.name +
      (program.n ? '' : ' &bull; ' + linkify('top') + '\n\n') +
      '\n\n';

    output += proto.methods.map(function(method) {
      return '<a name="' + proto.name + '-' + method.name+'">\n' +
        '###' + linkify(proto.name) + '#' + method.name + 
        generateParamsTable(method.params) + '\n\n' +
        method.full;
    }).join('\n\n');
  })

  console.log(output);
  console.log();
  console.log(md(output));
  fs.writeFile('output.html', md(output));
}).resume();