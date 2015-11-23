var casper = require('casper').create();

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    var url = this.getElementAttribute('img', 'src');
    this.echo(url);
    this.download(url, '07-download.png');
});

casper.run(function() {
    this.echo('Done.').exit();
});
