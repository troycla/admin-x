const TRADE_TYPE_ORE=0,TRADE_TYPE_MONEY=1,TRADE_TYPE_CHEST=2,TRADE_TYPE_BLUEPRINT=3,TRADE_TYPE_RELIC=4,TRADE_TYPE_BUFF=5,TRADE_INDEX_START_TIME=0,TRADE_INDEX_DURATION=1,TRADE_INDEX_PAYMENT_TYPE=2,TRADE_INDEX_PAYMENT_SUBTYPE=3,TRADE_INDEX_PAYMENT_AMOUNT=4,TRADE_INDEX_REWARD_TYPE=5,TRADE_INDEX_REWARD_SUBTYPE=6,TRADE_INDEX_REWARD_AMOUNT=7,TRADE_INDEX_TRADER=8,tradeConfig={tradingPosts:[{depth:15,image:tradingPostLevel,unbuiltImage:tradingPostLevelBroken,buildingTextCoords:new ScaledPosition(.33,.053),playerHasSeenNewTrade:!1},{depth:1047,image:lunarTradingPostLevel,unbuiltImage:lunarTradingPostLevelBroken,buildingTextCoords:new ScaledPosition(.291,.046),playerHasSeenNewTrade:!1}],duration:1500,medianValueGain:1.1,valueSpread:.1,medianTimeBetweenTrades:3600,timeBetweenTradesSpread:3600,minTimeForTradesAfterTimelapse:120};var tradingPostStructures=[tradingPostStructure,moonTradingPostStructure],totalCompletedTrades=0,nextTradeTimeEarth=0,earthTradeOffer1=[],earthTradeOffer2=[],nextTradeTimeMoon=0,moonTradeOffer1=[],moonTradeOffer2=[],timeBetweenTradesTestMultiplier=1;function checkForNewTrade(){for(var e=0;e<tradeConfig.tradingPosts.length;++e)!(depth>=tradeConfig.tradingPosts[0].depth&&tradingPostStructures[e].level>0&&playtime>=getNextTradeTimeForWorld(e))||isTradeAvailable(getTradesForWorld(e)[0])&&isTradeAvailable(getTradesForWorld(e)[1])||generateTrade(e)}function getTradesForWorld(e){if(depth<tradeConfig.tradingPosts[e].depth)return[[],[]];switch(parseInt(e)){case 0:return[earthTradeOffer1,earthTradeOffer2];case 1:return[moonTradeOffer1,moonTradeOffer2];default:throw"Error: No trades exist for World "+e}}function getNextTradeTimeForWorld(e){if(!(depth<tradeConfig.tradingPosts[e].depth))switch(parseInt(e)){case 0:return isNaN(nextTradeTimeEarth)&&(nextTradeTimeEarth=0),nextTradeTimeEarth;case 1:return isNaN(nextTradeTimeMoon)&&(nextTradeTimeMoon=0),nextTradeTimeMoon;default:throw"Error: No trades exist for World "+e}}function setNextTradeTimeForWorld(e,t){if(!(depth<tradeConfig.tradingPosts[e].depth))switch(parseInt(e)){case 0:nextTradeTimeEarth=t;break;case 1:nextTradeTimeMoon=t;break;default:throw"Error: No trades exist for World "+e}}function generateTrade(e){if(0==e&&0==totalCompletedTrades&&playtime<21600)return setFirstTrade(),void totalCompletedTrades++;var t=selectTrader(e),r=traders[e][t],a=getTradesForWorld(e);return generateTradeOffer(r,a[0],e)&&!0===isTradeAvailable(a[0])&&0!=a[0][4]&&!Number.isNaN(a[0][4])&&isFinite(Number(a[0][4]))&&0!=a[0][7]&&!Number.isNaN(a[0][7])&&isFinite(Number(a[0][7]))&&generateTradeOffer(r,a[1],e)&&!0===isTradeAvailable(a[1])&&0!=a[1][4]&&!Number.isNaN(a[1][4])&&isFinite(Number(a[1][4]))&&0!=a[1][7]&&!Number.isNaN(a[1][7])&&isFinite(Number(a[1][7]))?(a[0][8]=t,a[1][8]=t,setNextTradeTimeForWorld(e,Math.floor(playtime+tradeConfig.duration+getTimeBetweenTrades(e))),depth>=tradeConfig.tradingPosts[1].depth?newNews(_("A new trader has arrived at the {0} trading post!",worlds[e].name),!0):newNews(_("A new trader has arrived at the trading post!"),!0),void(tradeConfig.tradingPosts[e].playerHasSeenNewTrade=isTradingPostWindowShown(e)||!1)):(a[0].length=0,a[1].length=0,console.log("TRADE FAILED - "+t),setNextTradeTimeForWorld(e,0),null)}function getTimeBetweenTrades(e){var t=tradingPostStructures[e].statValueForCurrentLevel();return 1500*timeBetweenTradesTestMultiplier*(4*e+1+parseInt(t)/100)}function isTradingPostWindowShown(e){return windowState[15]==e+1}function generateTradeOffer(e,t,r){var a=selectTradePaymentType(e,r);if(!a)return null;var i=selectTradeRewardType(e,a.paymentType,r,1==a.paymentType);if(!i)return null;var o=a.paymentType,n=a.paymentSubtype,l=i.rewardType,y=i.rewardSubtype,s=determineTradeAmounts(o,n,l,y,r);return null==s?null:(t[0]=currentTime()/1e3,t[1]=getTimeBetweenTrades(r),t[2]=o,t[3]=n,t[4]=s.paymentAmount,t[5]=l,t[6]=y,t[7]=s.rewardAmount,t)}function selectTrader(e){return tradeRoller.rand(0,traders[e].length-1)}function selectTradePaymentType(e,t){for(var r=[...e.paymentTypes],a=null;r.length>0&&null===a;){var i=selectWeightedRandomType(e.paymentTypes),o=r[i];switch(o.type){case 0:if(o.subtypes)for(n=[...o.subtypes];null===a&&n.length>0;){(s=n[l=selectWeightedRandomType(n)].type)<=highestOreUnlocked&&worldResources[s].isTradable?a=s:n.splice(l,1)}else{for(var n=[...worlds[t].mineralIdsToSell];null===a&&n.length>0;){var l=tradeRoller.rand(0,n.length-1),y=n.indexOf(highestOreUnlocked);y<0&&(y=n.length);var s,p=worlds[t].mineralIdsToSell.filter((e=>estimateTotalMineralsMinedPerSecond()[e]));(s=p[tradeRoller.rand(Math.max(0,p.length-3),p.length-1)])<=highestOreUnlocked&&worldResources[s].isTradable?a=s:n.splice(l,1)}null===a&&(a=worlds[t].mineralIdsToSell[tradeRoller.rand(0,2)])}break;case 1:a=0;break;default:return null}null===a&&(r.splice(i,1),o=null)}return null===o||null===a?null:{paymentType:o.type,paymentSubtype:a}}function selectTradeRewardType(e,t,r,a=!1){for(var i=[...e.rewardTypes],o=null;i.length>0&&null===o;){var n=selectWeightedRandomType(i),l=i[n];if(!a||1!=l.type)switch(l.type){case 3:0!=t&&(o=rollForBlueprint());break;case 4:hasUnlockedScientists&&(o=rollForRelic());break;case 2:var y=Math.round(1580*STAT.goldChestSpawnFrequencyMultiplier());o=tradeRoller.rand(0,y)<=10?1:0;break;case 5:o=buffs.getChestAndTradeBuffs()[tradeRoller.rand(0,buffs.getChestAndTradeBuffs().length-1)].id;break;case 0:if(l.subtypes)for(s=[...l.subtypes];null===o&&s.length>0;){s[p=selectWeightedRandomType(s)].type<=highestOreUnlocked?o=s[p].type:s.splice(p,1)}else{for(var s=[...worlds[r].mineralIdsToSell];null===o&&s.length>0;){var p,d=s[p=tradeRoller.rand(0,s.length-1)];d<=highestOreUnlocked&&worldResources[d].isTradable?o=d:s.splice(p,1)}null===o&&(o=worlds[r].mineralIdsToSell[tradeRoller.rand(0,2)])}break;case 1:o=0;break;default:return null}null===o&&(i.splice(n,1),l=null)}return null===l||null===o?null:{rewardType:l.type,rewardSubtype:o}}function rollForRelic(){var e=[];for(rewardId in excavationRewards)excavationRewards[rewardId].isRelic&&excavationRewards[rewardId].isCandidateFunction()&&e.push(rewardId);e.sort((function(e,t){return excavationRewards[e].rarity-excavationRewards[t].rarity}));for(var t=Math.random(),r=0;r<e.length-1;++r)if(excavationRewards[e[r+1]].rarity>t)return e[r];return e[r]}function rollForBlueprint(){for(var e,t=[],r=drillBlueprints.length-1;r>=0;--r){var a=drillBlueprints[r].id;if(isBlueprintKnown(1,a)){e=getDrillEquipByBlueprintId(a).level;break}}for(r=0;r<drillBlueprints.length;++r){a=drillBlueprints[r].id;if(isBlueprintKnown(1,a)||drillBlueprints[r].isFromShop||getDrillEquipByBlueprintId(a).level!=e&&getDrillEquipByBlueprintId(a).level!=e+1){if(getDrillEquipByBlueprintId(a).level>e+1)break}else t.push(r)}return 0==t.length?null:t[tradeRoller.rand(0,t.length-1)]}function determineTradeAmounts(e,t,r,a,i){var o,n,l,y,s=tradingPostStructures[i].statValueForCurrentLevel(),p=tradeConfig.medianValueGain+parseInt(s)/100,d=tradeConfig.valueSpread+parseInt(s)/100,b=gaussianRand(p,d);if(2==r||3==r||5==r||4==r){if(o=(n=determineTimeValueOfTradeType(r,a)).divide(b),3==r){var u=craftingBlueprints[1][a].price;o=parseInt(getMoneyBasedTimeValue(o,b,u,1))}}else o=determineTimeValueOfTradeType(e,t),n=doBigNumberDecimalMultiplication(o,b);return l=calculateAmountOfTradeType(e,t,o,!0,r,a),y=calculateAmountOfTradeType(r,a,n,!1,e,t,l),l<=0||y<=0?null:{paymentAmount:l,rewardAmount:y}}function getMoneyBasedTimeValue(e,t,r,a){var i=valueOfMineralsPerSecond().multiply(e).divide(t),o=r.multiply(a),n=bigNumberMax(money.add(getValueOfMinerals()),o).divide(2),l=bigNumberMin(i,o,n),y=bigNumberMax(i,o,n),s=i.add(o).add(n).subtract(l).subtract(y);return tradeRoller.randBigNumber(s,y).divide(valueOfMineralsPerSecond())}function determineTimeValueOfTradeType(e,t=null){var r=0;switch(e){case 0:r=3600;break;case 2:r=0==t?600:7200;break;case 1:r=3600;break;case 3:r=14400;break;case 5:r=900;break;case 4:t&&(r=36e3*Math.pow(excavationRewards[t].rarity,2.5));break;default:throw"Invalid trade type"}return r>playtime/2?new BigNumber(parseInt(playtime/2)):new BigNumber(r)}function calculateAmountOfTradeType(e,t,r,a,i=null,o=null,n=null){switch(r=parseInt(r),n=parseInt(n),e){case 2:case 3:case 5:case 4:return new BigNumber(1);case 0:if(a||1!=i){if(a||0!=i){if(a&&4==i)return(l=new BigNumber(r).multiply(valueOfMineralsPerSecond()).divide(worldResources[t].sellValue)).lessThanOrEqualTo(0)&&l.setValue(1),l;{let e=Math.max(1,r),a=Math.max(1,estimateTotalMineralsMinedPerSecond()[t]);return doBigNumberDecimalMultiplication(new BigNumber(e),a)}}var l;return(l=new BigNumber(r).multiply(valueOfMineralsPerSecond()).divide(worldResources[t].sellValue)).lessThanOrEqualTo(0)&&l.setValue(1),l}return new BigNumber(r).multiply(valueOfMineralsPerSecond()).divide(worldResources[t].sellValue);case 1:return new BigNumber(valueOfMineralsPerSecond()).multiply(r);default:throw"Invalid trade type"}}function isTradeAvailable(e){return e.length>0&&e[0]&&e[0]+e[1]>currentTime()/1e3}function canMakeTrade(e,t=!1){var r,a;return 0==e[2]?(r=isTradeAvailable(e)&&worldResources[e[3]].numOwned>=e[4],a=_("You can't afford that trade.")):1==e[2]&&(r=isTradeAvailable(e)&&money.greaterThanOrEqualTo(e[4]),a=_("You can't afford that trade.")),r&&4==e[5]&&isRelicInventoryFull()&&(r=!1,a=_("You can't make that trade because your relic inventory is full.")),r||!t||isSimulating||newNews(_(a)),r}function makeTrade(e,t){if(!canMakeTrade(t,!0))return!1;switch(0==t[2]?worldResources[t[3]].numOwned-=parseInt(t[4]):1==t[2]&&subtractMoney(t[4]),t[5]){case 0:worldResources[t[6]].numOwned+=parseInt(t[7]);let e=new BigNumber(t[7]).multiply(worldResources[t[6]].sellValue);trackEvent_GainedMoney(e,4,!0);break;case 1:addMoney(t[7]),trackEvent_GainedMoney(t[7],4);break;case 2:t[6]?openGoldChest():openBasicChest();break;case 4:equipRelic(t[6]);break;case 5:buffs.staticBuffs[t[6]];6!=t[6]?buffs.startBuff(t[6],600,"trade",50):buffs.startBuff(t[6],30,"trade",50);break;case 3:learnBlueprint(1,t[6]);break;default:return!1}var r=generateTradeOfferStrings(t);newNews(_("You traded {0} for {1}",r.paymentString,r.rewardString),!0),mutebuttons||tradeAudio.play();var a=getTradesForWorld(e);return a[0].length=0,a[1].length=0,totalCompletedTrades++,setNextTradeTimeForWorld(e,Math.floor(playtime+getTimeBetweenTrades(e))),!0}function generateTradeOfferStrings(e){var t,r,a="",i="";switch(e[2]){case 1:t="$"+beautifynum(e[4]).toLowerCase(),a="$"+beautifynum(e[4]);break;case 0:t=beautifynum(e[4]).toLowerCase()+" "+worldResources[e[3]].name,a="$"+beautifynum(worldResources[e[3]].sellValue.multiply(e[4]))}switch(e[5]){case 1:r="$"+beautifynum(e[7]).toLowerCase(),i="$"+beautifynum(e[7]);break;case 0:r=beautifynum(e[7]).toLowerCase()+" "+worldResources[e[6]].name,i="$"+beautifynum(worldResources[e[6]].sellValue.multiply(e[7]));break;case 2:r=0==e[6]?_("Basic Chest"):_("Gold Chest"),i=_("Unknown");break;case 3:r=""+getDrillEquipByBlueprintId(e[6]).translatedName+" Blueprint",i=_("Unknown");break;case 4:r=""+excavationRewards[e[6]].name,i=_("Unknown");break;case 5:r=""+buffs.staticBuffs[e[6]].name+" buff",i=_("Unknown")}return{paymentString:t,rewardString:r,paymentValueString:a,rewardValueString:i}}function handleTradeTimelapse(e){for(var t=0;t<tradeConfig.tradingPosts.length;++t){var r=getTradesForWorld(t);if(r[0].length>0){var a=r[0][0],i=r[0][1]-(currentTime()/1e3-a),o=60*e;(isSimulating||i>tradeConfig.minTimeForTradesAfterTimelapse)&&(!isSimulating&&i-o<tradeConfig.minTimeForTradesAfterTimelapse&&(o=i-tradeConfig.minTimeForTradesAfterTimelapse),r[0][0]-=o,r[1][0]-=o)}setNextTradeTimeForWorld(t,getNextTradeTimeForWorld(t)-60*e)}}function extendTradeDuration(e,t){var r=getTradesForWorld(e);for(var a in r)r[a][1]+=t;setNextTradeTimeForWorld(e,getNextTradeTimeForWorld(e)+t)}function setFirstTrade(){var e=getTradesForWorld(0);e[0][8]=2,e[0][0]=currentTime()/1e3,e[0][1]=tradeConfig.duration,e[0][2]=0,e[0][3]=COAL_INDEX,e[0][4]=new BigNumber(1e3),e[0][5]=0,e[0][6]=GOLD_INDEX,e[0][7]=new BigNumber(20),e[1][8]=2,e[1][0]=currentTime()/1e3,e[1][1]=tradeConfig.duration,e[1][2]=0,e[1][3]=COPPER_INDEX,e[1][4]=new BigNumber(2e3),e[1][5]=2,e[1][6]=0,e[1][7]=new BigNumber(1),setNextTradeTimeForWorld(0,Math.floor(playtime+tradeConfig.duration+getTimeBetweenTrades(EARTH_INDEX)))}function selectWeightedRandomType(e){var t=0;for(var r in e)t+=e[r].probability;var a=Math.random(),i=0;for(var r in e)if(a<=(i+=e[r].probability/t))return r;return null}function getTraderImage(e,t){var r=CHARACTER_BLINK_PERIOD,a=traders[e][t];return a.blinkPortrait&&(numFramesRendered+t)%r<=1?a.blinkPortrait:a.portrait}var traders=[[{id:0,name:"Dennis",portrait:trader1,blinkPortrait:null,introDialogue:[_("Hmmmm yes let's see, what have you got there?"),_("This looks to be a rare specimen. I shall have to add it to my collection."),_("My collection is nearing completion can you help me?")],paymentTypes:[{type:0,probability:1,subtypes:[{type:1,probability:1},{type:2,probability:1},{type:3,probability:1},{type:4,probability:2},{type:5,probability:2},{type:6,probability:2},{type:7,probability:2},{type:8,probability:3},{type:9,probability:3},{type:10,probability:3},{type:11,probability:3},{type:12,probability:3},{type:13,probability:4},{type:14,probability:4},{type:15,probability:4},{type:16,probability:4},{type:17,probability:4},{type:18,probability:5},{type:19,probability:5},{type:20,probability:5}]}],rewardTypes:[{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:1,name:"Cornelius",portrait:trader2,blinkPortrait:null,introDialogue:[_("Ooooh what have we here?"),_("I need specimens for my research. You have something to sell me, yes?"),_("I'm nearly done with my research, but I'm missing something. Would you be willing to trade?")],paymentTypes:[{type:0,probability:1}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:2,name:"Red Jack",portrait:trader3,blinkPortrait:trader3_blink,introDialogue:[_("Well shoot! Hang me up and put a diaper on me, it's a traveler! Wanna trade?"),_("Ooh boy, we got a live one here! Need any sundries? I'm willing to trade anything."),_("Howdy partner! Ol' Sally says I best be getting rid of this stuff now."),_("Aint here to give ya'll a tear squeezer but I'm 'bout darn near down to the blanket."),_("'bout Yee'd my last Haw partner, just trying to sell some goods and settle down."),_("Ain't here to be jawing around, either you buying or you ain't.")],paymentTypes:[{type:1,probability:50}],rewardTypes:[{type:0,probability:1,subtypes:[{type:3,probability:1},{type:4,probability:2},{type:6,probability:.5}]},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:3,name:"Humphrey",portrait:trader4,blinkPortrait:trader4_blink,introDialogue:[_("Hello old chap. Would you mind trading a few things with this footsore trader?"),_("Golly, I haven't seen anyone for days down here. I have some excellent wares for sale."),_("This mine is looking mighty spiffy, old chap. I'd be willing to trade for something"),_("Gee willikers, I've been looking for that. Would be interested in trading?")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:4,name:"Karen",portrait:trader5,blinkPortrait:trader5_blink,introDialogue:[_("Excuse me! Hello!! I lost my lipstick and I can't find it. One of your workers stole it and I need it back, like NOW."),_("Can you keep it down? We've gotten a few complaints from nearby mines."),_("Hey! We're doing a fund raiser are you interested in any of this garbage?"),_("You need to add more grass.  This place is a nightmare."),_("Can you hurry up and make up your mind on whether you want this? I have places to go."),_("I am very important, please don't waste my time."),_("Where is your manager!? This is horrible service.")],paymentTypes:[{type:1,probability:50}],rewardTypes:[{type:0,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:5,name:"Sylvia",portrait:trader6,blinkPortrait:trader6_blink,introDialogue:[_("Hi! All these big miner men have nothing but talk. I got the real stuff here."),_("Don't listen to anyone else now, honey. I promise to give you the best prices."),_("I am the real deal. You better treat me right if you want to do future business.")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:6,name:"Skeeter",portrait:trader7,blinkPortrait:trader7_blink,introDialogue:[_("Wha? Why is it so dark here? I think I fell through a hole but I can't remember."),_("I got some rocks, I got some rocks. You, uh, need them? I'm desperate man!"),_("Come on man, stop looking so hard. I swear it's legit, just buy it already")],paymentTypes:[{type:1,probability:50}],rewardTypes:[{type:0,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:7,name:"Kai",portrait:trader8,blinkPortrait:trader8_blink,introDialogue:[_("Yep, yep this be the best mine ever. Can't beat this scenery."),_("You got a kleenex? This dust is making me...achoo!"),_("Ahh bro this mine is the dopest. Mind if I trade you for a souvenir?")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:8,name:"Ivan",portrait:trader9,blinkPortrait:null,introDialogue:[_("Welcome! I've got a few items you may want.  Perhaps a trade?"),_("I have come from very far and have things of great value."),_("I see those bags you're carrying are heavy. Maybe we can come to an arrangement?"),_("You sure these are legitimate? You will not sneak one past me!")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:9,name:"Hex",portrait:trader10,blinkPortrait:trader10_blink,introDialogue:[_("Hey yo, you got any 'special gems' know what I mean?"),_("I need more gold for my grill. It's only half done you know. Chicks dig that golden smile.")],paymentTypes:[{type:0,probability:50,subtypes:[{type:4,probability:1}]}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:10,name:"Bala",portrait:trader11,blinkPortrait:trader11_blink,introDialogue:[_("Harumph.  Quickly now, I don't have much time."),_("I hate being down here in these mines. My beard gets dirt in it and I can never get it out."),_("There are mysteries below this earth you would never believe. I will not speak of them.")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:11,name:"Lil' Lila",portrait:trader12,blinkPortrait:trader12_blink,introDialogue:[_("Hiya! Aren't these gems so pretty? Oh I just love all the colors and shapes!"),_("I can't wait to see what you have for me!! I'm sure you have something good right?"),_("Oh boy! Oh Boy! What do you have for me today darling?")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:12,name:"Gus",portrait:trader13,blinkPortrait:trader13_blink,introDialogue:[_("I only trade in the finest materials. Don't waste my time."),_("Let me inspect that. I must make sure it is real first."),_("I'm looking for quality. Either you have it or you don't.")],paymentTypes:[{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:13,name:"Yarmouth",portrait:trader14,blinkPortrait:trader14_blink,introDialogue:[_("Whatcha doing down here? You come here for the rocks too?"),_("Be careful when you test the rocks. I've broken a lot of teeth heehee."),_("I don't know about you, but I love rooting around in the dirt. So many treasures to be had.")],paymentTypes:[{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:14,name:"Maynard",portrait:trader15,blinkPortrait:trader15_blink,introDialogue:[_("Errr... I dunno maybe I got a few minerals in my pockets."),_("What do ya know? I found a rock here under my foot ... It's a red diamond you say? Guess it's my lucky day!"),_("I found this all by myself! Want to trade?"),_("I always wanted to be a dancer but they said I was naturally too stinky."),_("If I strike it rich I am going to get the nicest haircut.")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:15,name:_("Granny G"),portrait:trader17,blinkPortrait:trader17_blink,introDialogue:[_("Give granny something nice."),_("Come give granny a little kiss.")],paymentTypes:[{type:1,probability:50},{type:0,probability:50}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]}],[{id:0,name:"Lil Nuggz",portrait:moonTrader1,blinkPortrait:moonTrader1_blink,introDialogue:[_("Me and King have the best prices. We have the only prices."),_("Ever since we settled here we've become insanely wealthy. All it took was a little monopoly."),_("Monopoly profits are the best profits."),_("They might call me Lil Nuggz but there isn't anything little about my wallet."),_("Our business is our business, you better stay out of it if you know what's good for you.")],paymentTypes:[{type:0,probability:1},{type:1,probability:1}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]},{id:1,name:"King Coal",portrait:moonTrader2,blinkPortrait:moonTrader2_blink,introDialogue:[_("Hi there Ol' Chap. You won't find a better price here. We are the only shop in town."),_("Nobody will move in on our territory, Nuggz makes sure of that."),_("Sure you can cry about the prices but there are no laws here."),_("There used to be three of us but Nuggz wanted an extra 16%."),_("We are not a monopoly, the other traders are just out of town.")],paymentTypes:[{type:0,probability:1},{type:1,probability:1}],rewardTypes:[{type:0,probability:1},{type:1,probability:1},{type:3,probability:.1},{type:2,probability:.5},{type:5,probability:.15},{type:4,probability:.1}]}]];