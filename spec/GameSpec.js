'use strict';

describe('Game', function(){
  var game;
  var roll;

  beforeEach(function(){
    game = new Game();
    roll = function(){ game.roll(1) };
  });

  it('has an array of frames',function(){
    expect(game.frames()).toEqual([]);
  });

  it('stores a roll',function(){
    roll();
    expect(game.score()).toEqual(1);
  })

  it('raises error on roll if number of pins is invalid',function(){
    var roll = function(){ game.roll(11) };
    expect(roll).toThrowError('Invalid number of pins knocked down');
  })

  it('allows 10 frames to be played',function(){
    for(var i = 0; i < 20; i++){
      roll();
    }
    expect(roll).toThrowError('No frames left');
  })

  it('allocates a bonus for a strike',function(){
    game.roll(10);
    roll();
    roll();
    expect(game.score()).toEqual(14);
  })

});
