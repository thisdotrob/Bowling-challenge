describe('feature', function() {
  var game;

  var newFrameConstructor = function() {
    return new Frame();
  }

  beforeEach(function() {
    game = new Game(newFrameConstructor);
  })

  it('calculates the score midway through a game', function() {
      for(var i = 0; i < 2; i++) {
        game.roll(8);
        game.roll(2);
        game.roll(1);
        game.roll(6);
      }
      game.roll(10);
      game.roll(0);
      game.roll(4);
      expect(game.score()).toEqual(54);
  })

  it('calculates a gulley score', function() {
    for(var i = 0; i < 20; i++) {
      game.roll(0);
    }
    expect(game.score()).toEqual(0);
  })

  it('calculates the maximum score', function() {
    for(var i = 0; i < 12; i++) {
      game.roll(10);
    }
    expect(game.score()).toEqual(300);
  })

  it('calculates an all spares score', function() {
    for(var i = 0; i < 20; i++) {
      game.roll(5);
    }
  })

  it('returns the number of pins left standing', function() {
    game.roll(3);
    expect(game.pinsLeft()).toEqual(7);
  })

  it('ends the game when there are no rolls left', function() {
    var roll = function() { game.roll(1) }
    for(var i = 0; i < 20; i++) {
      roll();
    }
    expect(roll).toThrowError('No rolls left')
  })

})
