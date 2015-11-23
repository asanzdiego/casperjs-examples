casper.test.begin('El Chat con Socket.io de HackathonLovers funciona', 4, function suite(test) {

    casper.start("http://localhost:8080", function() {
        test.assertTitle("Chat con Socket.io", "El título de la página es correcto");
        test.assertEquals("Chat con Socket.io", this.getHTML('h1'), "El encabezado es correcto");
        test.assertExists("img", "Tiene una imagen");
    });

    casper.thenEvaluate(function() {
        document.querySelector('input#author').setAttribute('value', "casperjs");
        document.querySelector('input#text').setAttribute('value', "esto es un test");
    });

    casper.then(function() {
        this.click('input#submit');
    });

    casper.waitForText("esto es un test", function then() {
        test.assertEval(function() {
            return document.querySelectorAll('p#messages br').length === 2;
        }, "Ha mandado el mensaje");
    });

    casper.run(function() {
        test.done();
    });
});
