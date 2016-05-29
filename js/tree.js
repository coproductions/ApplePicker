// recursive branch drawing function, resulting in a tree
My.drawBranch = function(ctx, startX, startY, len, angle, iterations, brnchWdth){
  var rand = Math.random,
    maxBranch = 3,
    maxAngle = Math.PI / 2,
    newLen,
    newAngle,
    endX,
    endY,
    subBranches,
    lenShrink;

    //DRAW A BRANCH
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.linCap = 'round';
    ctx.lineWidth = brnchWdth;

    // Determine the end position of the branch in relation to start position based on the angle, using basic trigonometry
    endX = startX + len * Math.cos(angle);
    endY = startY + len * Math.sin(angle);

    ctx.lineTo(endX, endY);

    // If at or near end of branches, make them green, otherwise a random brown color
    ctx.strokeStyle = iterations <= 2 ? 'rgb(10,' + Math.floor(((rand() * 64) + 120)) + ',0)' : 'rgb(' + Math.floor(((rand() * 64) + 64)) + ',60,25)';
    ctx.stroke();

    // reduce the nr of remaining iterations
    iterations--;

   //Basecase, if remaining iterations has reached 0
    if(!iterations){
     // if menu items are available, and distance is sufficient from last apple, draw an apple
      if(My.menuItems.length
        && Math.abs(startX - My.lastApple.x) > len *10
        && Math.abs(startY - My.lastApple.y) > len *10
      ){
        var item = My.menuItems.pop();
        My.lastApple = new My.apple(startX, startY, 7+len/2, ctx, item);
        My.lastApple.draw();
      }
      return;
    }

    // split current branch into a random number of subBranches (max limit is maxBranch), and reduce the width
    subBranches = (rand() * (maxBranch -1)) + 1;
    brnchWdth *= 0.7;

   //Recursively draw new branches
   setTimeout(function(){
        for (var i = 0; i < subBranches; i++) {
       newAngle = angle + rand() * maxAngle - maxAngle / 2;
       newLen = len * (0.69 + rand() * 0.3);
       My.drawBranch(ctx, endX, endY, newLen, newAngle, iterations, brnchWdth);
    }
   },300)

};
