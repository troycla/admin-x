class SpritesheetAnimation{spritesheet;frameCount;fps;phaseShift;frameSpacing;frameSequence=[];frameWidth=0;currentFrame=0;isPaused=!1;_pauseOnFinish=!1;unpauseAfterFrames=-1;_pauseTimer=-1;targetScreenWidth=1280;targetScreenHeight=720;horizontalAlign="center";verticalAlign="center";constructor(e,t,i,s=0,h=0,r=[]){this.spritesheet=e,this.frameCount=t,this.fps=i,this.frameSpacing=s,this.frameSequence=r,this.phaseShift=h,this.spritesheet.complete&&0!==this.spritesheet.naturalHeight?this.updateFrameWidth():this.spritesheet.addEventListener("load",this.updateFrameWidth.bind(this))}updateFrameWidth(){this.frameWidth=this.spritesheet.width/this.frameCount-this.frameSpacing*(this.frameCount-1)}drawAnimation(e,t,i,s,h,r=!0,a=[]){var n;if(this._pauseTimer<0&&(this._pauseTimer=this.unpauseAfterFrames),this.isPaused)this.unpauseAfterFrames>=0&&(this._pauseTimer>0?this._pauseTimer--:(this._pauseTimer=this.unpauseAfterFrames,this.gotoAndPlay(0),this.currentFrame=0)),n=this.currentFrame;else{let e=a.length>0?a.length:this.frameCount;n=getAnimationFrameIndex(e,this.fps,this.phaseShift)}var m=this.drawFrame(e,t,i,s,h,n,r);return n==this.frameCount-1&&this._pauseOnFinish&&(this._pauseOnFinish=!1,this.pause()),this.currentFrame=n,m}loopFrames(e,t,i,s,h,r=!0,a,n){for(var m=[],p=a;p<n;p++)m.push(p);return this.drawAnimation(e,t,i,s,h,r,m)}drawFrame(e,t,i,s,h,r,a=!0){if(a){var n=fitBoxInBox(this.frameWidth,this.spritesheet.height,t,i,s,h,this.horizontalAlign,this.verticalAlign);t=n.x,i=n.y,s=n.width,h=n.height}return e.drawImage(this.spritesheet,r*(this.frameWidth+this.frameSpacing),0,this.frameWidth,this.spritesheet.height,t,i,s,h),{x:t,y:i,width:s,height:h}}pause(){this.isPaused=!0}play(){this.isPaused=!1}playUntilFinished(){this._pauseOnFinish=!0}goToFrame(e){this.phaseShift=Math.ceil(e*(IDLE_FRAMERATE/this.fps)-numFramesRendered)}gotoAndPlay(e){this.goToFrame(e),this.play()}gotoAndStop(e){this.goToFrame(e),this.pause()}getScaleFromScreenWidth(){return this.targetScreenWidth/window.innerWidth}getScaleFromScreenHeight(){return this.targetScreenHeight/window.innerHeight}clone(){var e=new this.constructor(this.spritesheet,this.frameCount,this.fps,this.frameSpacing,this.phaseShift,this.frameSequence);return Object.assign(e,this),e}}