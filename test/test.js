var Browser = require('zombie');

Browser.localhost('example.com', 3000);

describe('User visits index page.', function(){
  var browser = new Browser();

  beforeEach(function(done){
    browser.visit('/', done);
  });

  it('should display the welcome message', function(){
    browser.assert.text('h1', 'Let\'s bowl!');
  });

  it('should have the correct page title', function(){
    browser.assert.text('title', 'Bowling');
  });

  it('should show the accuracy prompt', function(){
    browser.assert.text('#accuracy_form', 'Accuracy:');
  });

  describe('User fills in the accuracy form and clicks Roll.', function(){

    it('accuracy of 0.9 displays a 9 in the left scoring box', function(){
      browser
        .fill('#accuracy_field', '0.9')
        .pressButton('roll_button');
      browser.assert.text('#frame0left', '9');
    });

    it('accuracy of 0 displays a 0 in the left scoring box', function(){
      browser
        .fill('#accuracy_field', '0')
        .pressButton('roll_button');
      browser.assert.text('#frame0left', '0');
    });

    it('accuracy of 1 displays an x in the right scoring box', function(){
      browser
        .fill('#accuracy_field', '1')
        .pressButton('roll_button');
      browser.assert.text('#frame0right', 'x');
    });

    describe('User rolls again after rolling a 5.', function(){

      beforeEach(function(done){
          browser
            .fill('#accuracy_field', '0.5')
            .pressButton('roll_button', done);
      });

      it('accuracy of 0.2 displays 2 in right scoring box', function(){
        browser
          .fill('#accuracy_field', '0.2')
          .pressButton('roll_button');
        browser.assert.text('#frame0left', '5');
        browser.assert.text('#frame0right', '2');
      });

      it('accuracy of 0.5 displays / in the right scoring box', function(){
        browser
          .fill('#accuracy_field', '0.5')
          .pressButton('roll_button');
        browser.assert.text('#frame0left', '5');
        browser.assert.text('#frame0right', '/');
      });

    });

  });

});
