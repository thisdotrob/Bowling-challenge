describe('game', function() {
  var game;
  var frame = jasmine.createSpyObj('frame',['roll',
                                            'isComplete',
                                            'setNextFrame',
                                            'score',
                                            'isStrike',
                                            'firstRoll'])
  var newFrameConstructor = function() {
    return frame;
  }

  beforeEach(function() {
    game = new Game(newFrameConstructor);
  })

  it('has an array of stored frames', function() {
    expect(game.frames()).toEqual([]);
  })

  it('has a current frame', function() {
    expect(game._currentFrame).toEqual(frame);
  })

  it('delegates roll to the current frame', function() {
    game.roll(1);
    expect(frame.roll).toHaveBeenCalledWith(1);
  })

  it('adds completed frames to the array of frames', function() {
    frame.isComplete.and.returnValue(true);
    game.roll(0);
    game.roll(0);
    expect(game.frames().length).toEqual(2);
  })

  it('calculates the score by delegating to each frame', function() {
    frame.isComplete.and.returnValue(true);
    game.roll(0);
    game.roll(0);
    game.score();
    expect(frame.score.calls.count()).toEqual(2);
  })

  it('prevents user rolling more than 10 standard frames', function() {
    frame.isComplete.and.returnValue(true);
    var roll = function() { game.roll(1); };
    for(var i = 0; i < 10; i++) {
      roll();
    }
    expect(roll).toThrowError('No rolls left');
  })

  it('raises error after the maximum three bonus rolls', function() {
    frame.isComplete.and.returnValue(true);
    frame.isStrike.and.returnValue(true);
    var roll = function() { game.roll(10) }
    for(var i = 0; i < 11; i++) {
      roll();
    }
    frame.firstRoll.and.returnValue('defined');
    expect(roll).toThrowError('No rolls left')
  })

})
