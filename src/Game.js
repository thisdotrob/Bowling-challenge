function Game(newFrameConstructor) {
  this._frames = [];
  this._newFrameConstructor = newFrameConstructor;
  this._currentFrame = newFrameConstructor();
}

Game.prototype.frames = function() {
  return this._frames;
}

Game.prototype.roll = function(numberOfPinsKnockedDown) {
  if(this._gameOver()) {
    throw new Error('No rolls left');
  }
  this._currentFrame.roll(numberOfPinsKnockedDown);
  if (this._currentFrame.isComplete()) {
    this._startNextFrame();
  }
}

Game.prototype.score = function() {
  var scores = 0;
  var numFramesToSum = this._frames.length > 10 ? 10 : this._frames.length;
  for(var i = 0; i < numFramesToSum; i++) {
    scores = scores + this._frames[i].score();
  }
  return scores;
}

Game.prototype._startNextFrame = function() {
  var nextFrame = this._newFrameConstructor();
  this._currentFrame.setNextFrame(nextFrame);
  this._storeCurrentFrame();
  this._currentFrame = nextFrame;
}

Game.prototype._storeCurrentFrame = function() {
  this._frames.push(this._currentFrame);
}

Game.prototype._gameOver = function() {
  var frames = this.frames();
  if(frames.length === 10) {
    return !this._lastFrameIsStrike();
  }
  if(frames.length === 11 && this._lastFrameIsStrike()) {
    return typeof this._currentFrame.firstRoll() !== 'undefined';
  }
  return false
}

Game.prototype._lastFrameIsStrike = function() {
  return this._frames[this._frames.length - 1].isStrike();
}
