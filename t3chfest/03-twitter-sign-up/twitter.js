var casper = require('casper').create({
    waitTimeout: 10000,
    viewportSize: {
        width: 1024,
        height: 760
    }
});

/*
 * PARAMETERS
 */
var username = casper.cli.args[0];
var password = casper.cli.args[1];

casper.start('https://twitter.com/signup', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-1.png', 'html');
});

casper.thenEvaluate(function(username, password) {

    document.querySelector('input#full-name').setAttribute('value', username);
    document.querySelector('input#email').setAttribute('value', username+'@gmail.com');
    document.querySelector('input#password').setAttribute('value', password);
    document.querySelector('input#username').setAttribute('value', username);
}, username, password);

casper.waitUntilVisible('div.select-username p.isaok', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-2.png', 'html');
});

casper.then(function() {

    this.click('input#submit_button');
});

casper.waitForSelector('title', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-3.png', 'html');
});

casper.then(function() {

    this.click('input#submit_button');
});

casper.run();
