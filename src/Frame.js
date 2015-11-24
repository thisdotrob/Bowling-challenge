function Frame() {
  this._rolls = [];
}

Frame.prototype.rolls = function() {
  return this._rolls;
}

Frame.prototype.roll = function(pinsDown) {
  this._rolls.push(pinsDown);
  console.log("rolled a " + pinsDown);
}

Frame.prototype.isComplete = function() {
  return this._rolls.length === 2 || this.isStrike();
}

Frame.prototype.setNextFrame = function(nextFrame) {
  this._nextFrame = nextFrame;
}

Frame.prototype.firstRoll = function() {
  return this._rolls[0];
}

Frame.prototype.isMidFrame = function() {
  return this._rolls.length === 1 && !this.isStrike();
}

Frame.prototype.pinsLeft = function() {
  return this.isMidFrame() ? 10 - this.firstRoll() : 10;
}

Frame.prototype.isStrike = function() {
  return this.firstRoll() === 10;
}

Frame.prototype.isSpare = function() {
  return this.baseScore() === 10;
}

Frame.prototype.score = function() {
  console.log("base: " + this.baseScore() + " bonus: " + this._bonusScore())
  return this.baseScore() + this._bonusScore();
}

Frame.prototype.baseScore = function() {
  var baseScore = 0;
  if (typeof this.firstRoll() !== 'undefined') {
    baseScore += this.firstRoll();
  }
  if (typeof this._secondRoll() !== 'undefined') {
    baseScore += this._secondRoll();
  }
  return baseScore;
}

Frame.prototype._secondRoll = function() {
  var secondRoll = this._rolls[1];
  return typeof secondRoll === 'undefined' ? 0 : secondRoll;
}

Frame.prototype._bonusScore = function() {
  if(this.isStrike()) {
    return this._strikeBonusScore();
  }
  if(this.isSpare()) {
    return this._spareBonusScore();
  }
  return 0;
}

Frame.prototype._strikeBonusScore = function() {
  var bonus = 0
  var nextBaseScore = this._nextFrame.baseScore();
  if (typeof nextBaseScore !== 'undefined') {
    bonus = bonus + this._nextFrame.baseScore();
  }
  if (this._nextFrame.isStrike()) {
    var bonusRoll = this._nextFrame._nextFrame.firstRoll();
    if (typeof bonusRoll !== 'undefined') {
      bonus = bonus + bonusRoll;
    }
  }
  return bonus;
}

Frame.prototype._spareBonusScore = function() {
  var bonus = 0
  var nextFrameFirstRoll = this._nextFrame.firstRoll();
  if (typeof nextFrameFirstRoll !== 'undefined') {
    bonus = bonus + nextFrameFirstRoll;
  }
  return bonus;
}
