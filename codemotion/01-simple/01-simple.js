var casper = require('casper').create();

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
});

casper.run();
