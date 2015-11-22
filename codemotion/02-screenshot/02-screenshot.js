var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('02-screenshot-html.png', 'html');
    this.captureSelector('02-screenshot-p.png', 'p#messages');
});

casper.run();
