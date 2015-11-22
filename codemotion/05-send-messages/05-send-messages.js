var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 760
    }
});

var array = [
  "CasperJS nos permite",
  "- navegación paso a paso",
  "- rellenar y enviar formularios",
  "- pinchar en botones y/o enlaces",
  "- descargar recursos",
  "- hacer capturas de pantalla",
  "- realizar testing",
  "- webscraping",
  "- lo que se te ocurra ^__^",
];

casper.start('http://localhost:8080/', function() {

    this.echo(this.getHTML('title'));
    this.captureSelector('05-send-messages-html.png', 'html');
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
      this.captureSelector('05-send-messages-p.png', 'p#messages');
  });

});

casper.run();
