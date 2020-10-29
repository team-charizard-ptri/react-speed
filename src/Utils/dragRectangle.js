export default function DragRectangle() {
  let p1;
  let p2;
  let p3;
  let p4;
  this.isFull = false;


  Object.defineProperties(this, {
    p1: {
      get() {return p1},
      set(pointObj) {return pointObj}, 
    },
    p2: {
      get() {return p2},
      set(pointObj) {return pointObj},
    },
    p3: {
      get() {return p3},
      set(pointObj) {return pointObj}, 
    },
    p4: {
      get() {return p4},
      set(pointObj) {return pointObj},
    },   
  })
}

DragRectangle.prototype.setPoint = function(x,y) {
  if(!this.p1) {
    this.p1 = new Point(x,y);
    return 
  }
  if(!this.p2) {
    this.p2 = new Point(x,y);
    return 
  }
  if(!this.p3) {
    this.p3 = new Point(x,y);
    return 
  }
  if(!this.p4) {
    this.p4 = new Point(x,y);
    this.isFull = true;
    return 
  }
  throw new Error('Rectangle Object Full');
}

DragRectangle.prototype.calcOppositeVerts = function() {
  
    if(this.isFull) return 'NO!';
    if(!(this.p1 && this.p2)) return 'NO!';
    if(this.p3 || this.p4) return 'NO!';

    this.p3 = this.setPoint(this.p1.xCoord, this.p2.yCoord);
    this.p4 = this.setPoint(this.p2.xCoord, this.p1.yCoord); 
}


function Point(x,y) {
  this.xCoord = x;
  this.yCoord = y;
};