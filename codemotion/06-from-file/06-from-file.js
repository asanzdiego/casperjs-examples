var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});

var fs = require('fs');
var utils = require('utils');
var data = fs.read('./06-from-files.json');
var array = eval(data);

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('06-from-file.png', 'html');
});

array.forEach(function(text) {

  casper.echo(text);

  var author = "CasperJS";

  casper.thenEvaluate(function(author, text) {
      document.querySelector('input#author').setAttribute('value', author);
      document.querySelector('input#text').setAttribute('value', text);
  }, author, text);

  casper.then(function() {

      this.click('input#submit');
  });

  casper.waitFor(function check() {
      return this.evaluate(function() {
          return document.querySelectorAll('p#messages br').length > 1;
      });
  }, function then() {
      this.captureSelector('06-from-file.png', 'p#messages');
  });

});

casper.run();
