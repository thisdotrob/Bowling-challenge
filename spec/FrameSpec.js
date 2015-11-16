describe('frame', function() {
  var frame;

  beforeEach(function() {
    frame = new Frame();
  })

  it('has an array of rolls', function() {
    expect(frame.rolls()).toEqual([]);
  })

  it('stores a roll', function() {
    frame.roll(1);
    expect(frame.rolls()).toEqual([1]);
  })

  it('returns a score', function() {
    frame.roll(1);
    frame.roll(1);
    expect(frame.score()).toEqual(2);
  })

  it('is completed after two rolls', function() {
    frame.roll(1);
    frame.roll(1);
    expect(frame.isComplete()).toBeTruthy();
  })

  it('is completed after a strike', function() {
    frame.roll(10);
    expect(frame.isComplete()).toBeTruthy();
  })

  it('correctly calculates a spare bonus', function() {
    var nextFrame = new Frame();
    frame.setNextFrame(nextFrame);
    frame.roll(5);
    frame.roll(5);
    nextFrame.roll(2);
    nextFrame.roll(2);
    expect(frame.score()).toEqual(12);
  })

  it('correctly calculates a strike bonus', function() {
    var nextFrame = new Frame();
    frame.setNextFrame(nextFrame);
    frame.roll(10);
    nextFrame.roll(2);
    nextFrame.roll(2);
    expect(frame.score()).toEqual(14);
  })

  it('returns the first roll', function() {
    frame.roll(2);
    frame.roll(5);
    expect(frame.firstRoll()).toEqual(2);
  })

  it('reports whether it is a strike', function() {
    frame.roll(10);
    expect(frame.isStrike).toBeTruthy();
  })

})
