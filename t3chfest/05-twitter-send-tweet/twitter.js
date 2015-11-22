var casper = require('casper').create({
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
var datetime = casper.cli.args[2];

var tweet = "Esto es un tweet enviado por @asanzdiego el "+datetime+" para probar @casperjs_org en el @t3chfest #t3chfest2015 ^__^";

casper.start('https://twitter.com/login/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-1.png', 'html'); 
});

casper.thenEvaluate(function(username, password) {

    document.querySelector('div.signin-wrapper input.js-username-field').setAttribute('value', username);
    document.querySelector('div.signin-wrapper input.js-password-field').setAttribute('value', password);
}, username, password);

casper.then(function() {

    this.captureSelector('twitter-2.png', 'html');
    this.echo('click to sign-in');
    this.click('div.signin-wrapper button.submit');
});

casper.waitForSelector('title', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-3.png', 'html');
    this.echo('sign-in');
});

casper.then(function() {

    this.echo('click tweet button');
    this.click('button#global-new-tweet-button');
});

casper.waitUntilVisible('div#tweet-box-global', function() {

    this.captureSelector('twitter-4.png', 'html');
    this.echo('show tweet modal window');
});

casper.thenEvaluate(function(tweet) {

    document.querySelector('div#tweet-box-global').innerHTML = '<div>'+tweet+'</div>';
}, tweet);

casper.then(function() {

    this.captureSelector('twitter-5.png', 'html');
    this.echo('write text');
    this.echo(tweet);
    this.echo('click to tweet');
    this.click('div.modal-tweet-form-container button.tweet-action');
});

casper.reload(function() {

    this.echo('reload page');    
});


casper.waitForSelector('title', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('twitter-6.png', 'html');
    this.echo('tweet sended');
});

casper.run();
