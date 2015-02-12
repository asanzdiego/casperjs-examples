var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});
    
casper.start('https://twitter.com/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter.png', 'html');
});

casper.run();