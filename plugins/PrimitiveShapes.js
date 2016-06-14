Phaser.Plugin.PrimitiveTextures = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
};

Phaser.Plugin.PrimitiveTextures.prototype =
  Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PrimitiveTextures.prototype.constructor =
  Phaser.Plugin.PrimitiveTextures;

Phaser.Plugin.PrimitiveTextures.prototype.rectTexture = function(key, color, w, h, fill) {
  var texture = new Phaser.BitmapData(this.game, key, w, h);
  if (fill) {
    texture.context.fillStyle = color;
    texture.context.fillRect(0, 0, w, h);
  }
  else {
    texture.context.lineWidth = 2;
    texture.context.strokeStyle = color;
    texture.context.rect(0, 0, w, h);
    texture.context.stroke();
  }

  return texture;
};

Phaser.Plugin.PrimitiveTextures.prototype.circleTexture = function(key, color, r, fill) {
  var texture = new Phaser.BitmapData(this.game, key, r*2, r*2);

  if (fill) {
    texture.context.fillStyle = color;
    texture.context.beginPath();
    texture.context.arc(r, r, r, 0, 2*Math.PI);
    texture.context.fill();
  }
  else {
    texture.resize(texture.width+2, texture.height+2);
    texture.context.lineWidth = 2;
    texture.context.strokeStyle = color;
    texture.context.arc(r+1, r+1, r, 0, 2*Math.PI);
    texture.context.stroke();
  }
  
  return texture;
};

Phaser.Plugin.PrimitiveTextures.prototype.triangleTexture = function(key, color, w, fill) {
  var texture = new Phaser.BitmapData(this.game, key, w, w);
  if (fill) {
    texture.context.fillStyle = color;
    texture.context.beginPath();
    texture.context.moveTo(0,   0);
    texture.context.lineTo(0,   w);
    texture.context.lineTo(w, w/2);
    texture.context.lineTo(0,   0);
    texture.context.fill();
  }
  else {
    texture.resize(texture.width+2, texture.height+2);
    texture.context.lineWidth = 2;
    texture.context.strokeStyle = color;
    texture.context.beginPath();
    texture.context.moveTo(2,   0);
    texture.context.lineTo(2,   w+2);
    texture.context.lineTo(w, w/2);
    texture.context.lineTo(2,   0);
    texture.context.stroke();
  }
  
  return texture;
};

Phaser.Plugin.PrimitiveTextures.prototype.diamondTexture = function(key, color, w, fill) {
  var texture = new Phaser.BitmapData(this.game, key, w, w);
  if (fill) {
    texture.context.fillStyle = color;
    texture.context.beginPath();
    texture.context.moveTo(w/2+2, 0);
    texture.context.lineTo(    2, w/2);
    texture.context.lineTo(w/2+2,   w);
    texture.context.lineTo(  w+2, w/2);
    texture.context.lineTo(w/2+2,   0);
    texture.context.fill();
  }
  else {
    texture.resize(texture.width+2, texture.height+2);
    texture.context.lineWidth = 2;
    texture.context.strokeStyle = color;
    texture.context.beginPath();
    texture.context.moveTo(w/2+2, 0);
    texture.context.lineTo(    2, w/2);
    texture.context.lineTo(w/2+2,   w);
    texture.context.lineTo(  w+2, w/2);
    texture.context.lineTo(w/2+2,   0);
    texture.context.stroke();
  }
  
  return texture;
};
