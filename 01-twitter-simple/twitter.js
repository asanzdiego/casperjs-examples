var casper = require('casper').create();
    
casper.start('https://twitter.com/', function() {

    this.echo(this.getHTML('title'));
});

casper.run();