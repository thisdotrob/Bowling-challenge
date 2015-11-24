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

  it('is completed after two rolls', function() {
    frame.roll(1);
    frame.roll(1);
    expect(frame.isComplete()).toBeTruthy();
  })

  it('has a link to the next frame', function() {
    frame2 = new Frame();
    frame.setNextFrame(frame2);
    expect(frame._nextFrame).toEqual(frame2);
  })

  it('returns the first roll', function() {
    frame.roll(2);
    frame.roll(5);
    expect(frame.firstRoll()).toEqual(2);
  })

  it('is mid-frame after 1 roll', function() {
    frame.roll(1);
    expect(frame.isMidFrame()).toBeTruthy();
  })

  it('is not mid-frame if the frame is complete', function() {
    frame.roll(1);
    frame.roll(1);
    expect(frame.isMidFrame()).toBeFalsy();
  })

  it('is not mid-frame after a strike', function() {
    frame.roll(10);
    expect(frame.isMidFrame()).toBeFalsy();
  })

  it('reports the number of pins left standing  before any rolls', function() {
    expect(frame.pinsLeft()).toEqual(10);
  })

  it('reports the number of pins left standing after the first roll', function() {
    frame.roll(8);
    expect(frame.pinsLeft()).toEqual(2);
  })

  it('reports that it is a strike', function() {
    frame.roll(10);
    expect(frame.isStrike).toBeTruthy();
  })

  it('reports that it is a spare', function() {
    frame.roll(5);
    frame.roll(5);
    expect(frame.isSpare).toBeTruthy();
  })

  it('returns a score', function() {
    frame.roll(1);
    frame.roll(9);
    frame2 = new Frame();
    frame.setNextFrame(frame2);
    frame2.roll(1);
    expect(frame.score()).toEqual(11);
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

  it('reports whether it is a strike', function() {
    frame.roll(10);
    expect(frame.isStrike).toBeTruthy();
  })

})
