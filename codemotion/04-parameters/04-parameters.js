var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});

/*
 * PARAMETERS
 */
var author = casper.cli.args[0];
var text = casper.cli.args[1];

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('04-parameters-html.png', 'html');
});

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
    this.captureSelector('04-parameters-p.png', 'p#messages');
});

casper.run();
