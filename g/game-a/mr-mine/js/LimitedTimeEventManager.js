const EVENT_NONE=0,EVENT_NEW_YEARS=1,EVENT_VALENTINES=2,EVENT_STPATRICKS=3,EVENT_APRIL_FOOLS=4,EVENT_EASTER=5,EVENT_OKTOBERFEST=6,EVENT_HALLOWEEN=7,EVENT_THANKSGIVING=8,EVENT_BLACKFRIDAY=9,EVENT_XMAS=10,MSEC_IN_ONE_DAY=864e5;var previouslyActiveHolidayIndex=0;class LimitedTimeEvent{id;name;description;isEnabled=!0;numDaysDuration=0;displayCountdown=!1;constructor(){}currentTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())).getTime()}startTime(){}endTime(){return this.startTime()+864e5*this.numDaysDuration}secondsRemainingInEvent(){return(this.endTime()-this.currentTime())/1e3}isActive(){return this.currentTime()>=this.startTime()&&this.currentTime()<this.endTime()}activate(e){}onGameLoad(){}}class NewYears extends LimitedTimeEvent{numberOfFireworks=isMobile()?7:15;maxFireworksPerLaunch=7;fireworksDepth=-1;fireworksOverlapFraction=.3;fireworksStaggerFraction=.45;minTimeBetweenFireworks=5e3;maxTimeBetweenFireworks=15e3;minFireworksDelay=50;maxFireworksDelay=500;fireworksRegionWidth=.95;fireworksHoldFrames=20;fireworksFadeOnHold=!0;progressForFullOpacity=.15;maxYOffsetOnHold=.05;fireworksFramerate=10;fireworksSprites=[];fireworksHitboxes=[];fireworksTimeout;constructor(){super(),this.id=1,this.name=_("New Years"),this.description=_("New Years"),this.numDaysDuration=5}startTime(){var e=new Date;return 0==e.getMonth()?new Date(Date.UTC(e.getUTCFullYear()-1,11,29,0,0,0,0)).getTime():new Date(Date.UTC(e.getUTCFullYear(),11,29,0,0,0,0)).getTime()}activate(){assetLoader.loadAsset("Shared/Assets/Events/NewYears/Firework_1.png","firework1"),assetLoader.loadAsset("Shared/Assets/Events/NewYears/Firework_2.png","firework2"),assetLoader.loadAsset("Shared/Assets/Events/NewYears/Firework_3.png","firework3"),assetLoader.loadAsset("Shared/Assets/Events/NewYears/Firework_4.png","firework4"),assetLoader.loadAsset("Shared/Assets/Events/NewYears/Firework_5.png","firework5")}onGameLoad(){this.initializeFireworks()}initializeFireworks(){this.fireworksSprites.push(new SpritesheetAnimation(firework1,10,this.fireworksFramerate)),this.fireworksSprites.push(new SpritesheetAnimation(firework2,10,this.fireworksFramerate)),this.fireworksSprites.push(new SpritesheetAnimation(firework3,11,this.fireworksFramerate)),this.fireworksSprites.push(new SpritesheetAnimation(firework4,10,this.fireworksFramerate)),this.fireworksSprites.push(new SpritesheetAnimation(firework5,12,this.fireworksFramerate));for(var e=this.fireworksRegionWidth*worldConfig.levelWidth,s=worldConfig.leftBound+worldConfig.levelWidth*(1-this.fireworksRegionWidth)/2,t=e/this.numberOfFireworks*(1+2*this.fireworksOverlapFraction),a=getScaledDimensions(this.fireworksSprites[0].frameWidth,this.fireworksSprites[0].spritesheet.height,t).height,r=0;r<this.numberOfFireworks;++r){var i=activeLayers.WorldLayer.addHitbox(new NewWorldEntityHitbox(this.fireworksDepth,{x:s+r*t*(1-this.fireworksOverlapFraction),y:-a-r%2*a*this.fireworksStaggerFraction,width:t,height:a},{},""));i.render=function(e){if(this.hadFirstLaunch&&e.isFireworkActive(this)){null==this.sprite&&(this.sprite=e.fireworksSprites[rand(0,e.fireworksSprites.length-1)].clone(),this.sprite.goToFrame(0),this.sprite.playUntilFinished(),this.startFrame=numFramesRendered);var s=this.getGlobalCoordinates(0,0),t=e.getFireworkProgress(this),a=0;t<e.progressForFullOpacity?MAIN.globalAlpha=lerp(0,1,t/e.progressForFullOpacity):e.fireworksFadeOnHold&&numFramesRendered-this.startFrame>this.sprite.frameCount&&(MAIN.globalAlpha=lerp(1,0,(numFramesRendered-this.startFrame-this.sprite.frameCount)/e.fireworksHoldFrames),a=this.boundingBox.height*e.maxYOffsetOnHold*lerp(0,1,(numFramesRendered-this.startFrame-this.sprite.frameCount)/e.fireworksHoldFrames)),this.sprite.drawAnimation(MAIN,s.x,s.y+a,this.boundingBox.width,this.boundingBox.height),MAIN.globalAlpha=1}}.bind(i,this),i.holdFrames=0,i.hadFirstLaunch=!1,i.isEnabled=()=>!1,this.fireworksHitboxes.push(i)}this.triggerFireworks(this.maxFireworksPerLaunch)}isFireworkActive(e){return null==e.sprite||this.getFireworkProgress(e)<1}getFireworkProgress(e){return(numFramesRendered-e.startFrame)/(e.sprite.frameCount+this.fireworksHoldFrames)}triggerFireworks(e){if(!platform.isPaused&&this.fireworksHitboxes[0].isVisible())for(var s=0;s<e;++s){var t=this.fireworksHitboxes[rand(0,this.fireworksHitboxes.length-1)];setTimeout(function(e){null!=e.sprite&&this.isFireworkActive(e)||(e.hadFirstLaunch=!0,e.sprite=null)}.bind(this,t),s*rand(this.minFireworksDelay,this.maxFireworksDelay))}var a=rand(this.minTimeBetweenFireworks,this.maxTimeBetweenFireworks);clearTimeout(this.fireworksTimeout),this.fireworksTimeout=setTimeout(this.triggerFireworks.bind(this,this.maxFireworksPerLaunch),a)}}class Valentines extends LimitedTimeEvent{constructor(){super(),this.id=2,this.name=_("Valentines"),this.description=_("Valentines"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),1,10,0,0,0,0)).getTime()}}class StPatricks extends LimitedTimeEvent{constructor(){super(),this.id=3,this.name=_("St.Patricks"),this.description=_("St.Patricks"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),3,13,0,0,0,0)).getTime()}}class AprilFools extends LimitedTimeEvent{constructor(){super(),this.id=4,this.name=_("April Fools"),this.description=_("April Fools"),this.numDaysDuration=1}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),4,1,0,0,0,0)).getTime()}}class Easter extends LimitedTimeEvent{constructor(){super(),this.id=5,this.name=_("Easter"),this.description=_("Easter"),this.numDaysDuration=7}startTime(){var e=new Date,s=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())).getFullYear(),t=Math.floor(s/100),a=s-19*Math.floor(s/19),r=Math.floor((t-17)/25),i=t-Math.floor(t/4)-Math.floor((t-r)/3)+19*a+15;i-=30*Math.floor(i/30),i-=Math.floor(i/28)*(1-Math.floor(i/28)*Math.floor(29/(i+1))*Math.floor((21-a)/11));var o=s+Math.floor(s/4)+i+2-t+Math.floor(t/4),n=i-(o-=7*Math.floor(o/7)),h=3+Math.floor((n+40)/44),d=n+28-31*Math.floor(h/4),l=new Date;return l.setUTCDate(d),l.setUTCMonth(h),l.setUTCFullYear(s),l.getTime()-3024e5}}class Oktoberfest extends LimitedTimeEvent{constructor(){super(),this.id=6,this.name=_("Oktoberfest"),this.description=_("Oktoberfest"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),8,23,0,0,0,0)).getTime()}}class Halloween extends LimitedTimeEvent{constructor(){super(),this.id=7,this.name=_("Halloween"),this.description=_("Halloween"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),9,26,0,0,0,0)).getTime()}activate(e){assetLoader.loadAsset("Shared/Assets/World/witchhat1.webp","witchhat1"),assetLoader.loadAsset("Shared/Assets/World/witchhat2.webp","witchhat2"),assetLoader.loadAsset("Shared/Assets/World/witchhat3.webp","witchhat3"),assetLoader.loadAsset("Shared/Assets/World/witchhat4.webp","witchhat4"),assetLoader.loadAsset("Shared/Assets/World/witchhat5.webp","witchhat5"),assetLoader.loadAsset("Shared/Assets/World/witchhat6.webp","witchhat6"),assetLoader.loadAsset("Shared/Assets/World/witchhat7.webp","witchhat7"),assetLoader.loadAsset("Shared/Assets/World/witchhat8.webp","witchhat8"),assetLoader.loadAsset("Shared/Assets/World/witchhat9.webp","witchhat9"),assetLoader.loadAsset("Shared/Assets/World/witchhat10.webp","witchhat10"),assetLoader.loadAsset("Shared/Assets/World/JackOLantern1.webp","jackolantern"),assetLoader.loadAsset("Shared/Assets/World/Spiderweb.webp","spiderweb"),assetLoader.loadAsset("Shared/Assets/World/halloweenlight.webp","halloweenlight"),minerHatImages=[witchhat1,witchhat1,witchhat2,witchhat3,witchhat4,bigtransblock,bigtransblock,witchhat7,witchhat8,witchhat9,bigtransblock]}}class Thanksgiving extends LimitedTimeEvent{constructor(){super(),this.id=8,this.name=_("Thanksgiving"),this.description=_("Thanksgiving"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),10,22,0,0,0,0)).getTime()}activate(){}}class BlackFriday extends LimitedTimeEvent{constructor(){super(),this.id=9,this.name=_("Black Friday"),this.description=_("Black Friday"),this.numDaysDuration=7}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),10,29,0,0,0,0)).getTime()}}class Christmas extends LimitedTimeEvent{constructor(){super(),this.id=10,this.name=_("Christmas"),this.description=_("It's Christmas time! <br> <br> Basic chests have turned into presents and now provide 2x the rewards. <br>  <br> Candy canes can be found in caves and turned in for rewards."),this.numDaysDuration=21,this.displayCountdown=!0}startTime(){var e=new Date;return new Date(Date.UTC(e.getUTCFullYear(),11,8,0,0,0,0)).getTime()}activate(e){assetLoader.loadAsset("Shared/Assets/Events/Christmas/chest1_blank.webp","chest1"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/chest1_blank_gold.webp","chest1gold"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat1.webp","hat1"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat2.webp","hat2"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat3.webp","hat3"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat4.webp","hat4"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat5.webp","hat5"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat6.webp","hat6"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat7.webp","hat7"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat8.webp","hat8"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat9.webp","hat9"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/hat10.webp","hat10"),minerHatImages=[hat1,hat2,hat3,hat4,hat5,hat6,hat7,hat8,hat9,hat10,hat10],assetLoader.loadAsset("Shared/Assets/World/xmasTree.webp","xmasTree"),assetLoader.loadAsset("Shared/Assets/World/xmasLights.webp","xmasLights"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_basicchesticon.webp","basicchesticon"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_closed.webp","basicChestIconClosed"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_open.webp","basicChestIconOpen"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/present_chest_spritesheet.webp","basicChestSpritesheet"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt.webp","foundt"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundmt.webp","foundmt"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt5.webp","foundt5"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt6.webp","foundt6"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt7.webp","foundt7"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt8.webp","foundt8"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt9.webp","foundt9"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/foundt10.webp","foundt10"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/button.webp","eventb"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/candy_cane_25x25.webp","holidayCurrencyIcon"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/candy_cane_64x64.webp","holidayCurrencyIconHD"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp","earthCave1"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp","earthCave2"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp","moonCave1"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/christmas_cave.webp","moonCave2"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveUItile.webp","caveBgLight"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveUItile.webp","moonCaveBgLight"),assetLoader.loadAsset("Shared/Assets/UI/Caves/caveBg.webp","moonCaveBgDark"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveFrame.webp","eventCaveFrame"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/caveManagerFrame.webp","eventCaveManagerFrame"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/basic.webp","xmasPurchase1"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/black.webp","xmasPurchase2"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/gold.webp","xmasPurchase3"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/BG.webp","snowBG"),assetLoader.loadAsset({desktop:"Shared/Assets/Events/Christmas/frame.webp",mobile:"Shared/Assets/Events/Christmas/mobile_frame.png"},"xmasFrame"),assetLoader.loadAsset({mobile:"Shared/Assets/Events/Christmas/popup_lights.png"},"xmasPopupLights"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/holly_left.webp","hollyLeft"),assetLoader.loadAsset("Shared/Assets/Events/Christmas/holly_right.webp","hollyRIght"),assetLoader.loadAsset("Shared/Assets/Monsters/eventMonster01.webp","snowmanMonster1"),worldResources[HOLIDAY_RESOURCE_INDEX].name=_("Candy Cane"),worldResources[HOLIDAY_RESOURCE_INDEX].smallIcon=holidayCurrencyIcon,worldResources[HOLIDAY_RESOURCE_INDEX].largeIcon=holidayCurrencyIconHD,this.secondsRemainingInEvent()>10800&&(caveConfig.rewards.candyCane.probability=1),e.basicChestEventMultiplier=2,e.openHolidayUI=function(){openUi(EventPurchaseWindow)},BattleManager.registerEventMonster({name:"Evil Snowman",animation:new SpritesheetAnimation(snowmanMonster1,6,6),bonusReward:()=>{let e=rand(0,1);e>0&&(worldResources[HOLIDAY_RESOURCE_INDEX].numOwned+=e,newNews(_("You gained {0} Candy Canes",e)))}})}}class LimitedTimeEventManager{isEventActive=!1;activeEventType=0;activeEvent=null;openHolidayUI=null;debugForcedEventIndex=-1;basicChestEventMultiplier=1;isNewYears(){return 1==this.activeEventType}isValentines(){return 2==this.activeEventType}isStPatricks(){return 3==this.activeEventType}isEaster(){return 5==this.activeEventType}isAprilFools(){return 4==this.activeEventType}isOktoberfest(){return 6==this.activeEventType}isHalloween(){return 7==this.activeEventType}isThanksgiving(){return 8==this.activeEventType}isBlackFriday(){return 9==this.activeEventType}isXmas(){return 10==this.activeEventType}secondsRemainingInEvent(){return null!=this.activeEvent?Math.max(0,this.activeEvent.secondsRemainingInEvent()):0}eventTooltip(){return null!=this.activeEvent?{header:this.activeEvent.name,body:this.activeEvent.description}:{header:"",body:""}}constructor(){}init(){for(var e=[NewYears,Valentines,StPatricks,Easter,AprilFools,Oktoberfest,Halloween,Thanksgiving,BlackFriday,Christmas],s=0;s<e.length;s++){var t=new e[s];if(s==this.debugForcedEventIndex||t.isEnabled&&t.isActive()){this.activateEvent(t);break}}}activateEvent(e){this.activeEventType=e.id,this.activeEvent=e,this.isEventActive=!0,e.activate(this)}onGameLoad(){this.activeEvent&&this.activeEvent.onGameLoad()}displayCountdown(){return!!this.activeEvent&&this.activeEvent.displayCountdown}}var limitedTimeEventManager=new LimitedTimeEventManager;limitedTimeEventManager.init();