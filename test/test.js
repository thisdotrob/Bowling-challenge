var Browser = require('zombie');

Browser.localhost('example.com', 3000);

describe('User visits index page', function(){
  var browser = new Browser();

  before(function(done){
    browser.visit('/', done);
  });

  it('should display the welcome message', function(){
    browser.assert.text('h1', 'Let\'s bowl!');
  });

  it('should have the correct page title', function(){
    browser.assert.text('title', 'Bowling');
  });

  it('should show the accuracy prompt', function(){
    browser.assert.text('#accuracy_form', 'Accuracy: Roll!');
  });

  describe('User fills in the accuracy form', function(){

    before(function(done){
      browser
        .fill('accuracy_field', '9')
        .pressButton('roll_button', done);
    });

    it('should display the roll in the scoring table', function(){
      browser.assert.text('#frame0roll1', '9');
    });

  });

});
