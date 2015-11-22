var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('03-send-message-html.png', 'html');
});

casper.thenEvaluate(function() {

    document.querySelector('input#author').setAttribute('value', "CasperJS");
    document.querySelector('input#text').setAttribute('value', "Hola Codemotion");
});

casper.then(function() {

    this.click('input#submit');
});

casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('p#messages br').length > 1;
    });
}, function then() {
    this.captureSelector('03-send-message-p.png', 'p#messages');
});

casper.run();
