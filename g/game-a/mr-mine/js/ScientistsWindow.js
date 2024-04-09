class ScientistsWindow extends TabbedPopupWindow{layerName="Arch";domElementId="ARCHD";context=ARCH;scientistsPane;relicsPane;buttonHitboxes;constructor(t){super(t),t||this.setBoundingBox();var i={0:_("Scientist 1"),1:_("Scientist 2"),2:_("Scientist 3"),3:_("Relics")};this.initializeTabs(Object.values(i)),this.backgroundImage=scientistbg,this.scientistsPane=new Hitbox({x:0,y:0,width:this.boundingBox.width,height:this.boundingBox.height},{},"","scientistPane"),this.scientistsPane.allowBubbling=!0,this.addHitbox(this.scientistsPane),this.relicsPane=new Hitbox({x:0,y:0,width:this.boundingBox.width,height:this.boundingBox.height},{},"","relicsPane"),this.relicsPane.allowBubbling=!0,this.addHitbox(this.relicsPane),this.onTabChange()}onTabChange(){this.currentTabIndex<3?(this.relicsPane.setVisible(!1),this.relicsPane.setEnabled(!1),this.scientistsPane.setVisible(!0),this.scientistsPane.setEnabled(!0),this.initializeScientistHitboxes()):(this.relicsPane.setVisible(!0),this.relicsPane.setEnabled(!0),this.scientistsPane.setVisible(!1),this.scientistsPane.setEnabled(!1),this.initializeRelicsHitboxes())}initializeScientistHitboxes(){var t=this.currentTabIndex,i=activeScientists[t];if(this.scientistsPane.clearHitboxes(),0!=i.length){var n=new Hitbox({x:.4*this.boundingBox.width,y:.79*this.boundingBox.height,width:.2*this.boundingBox.width,height:.05*this.boundingBox.height},{onmousedown:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)&&(isScientistDead(t)?onClickBuryScientist(t):isExcavationDone(t)&&onClickClaimExcavationReward(t)),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()},onmouseenter:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)&&(isScientistDead(t)||isExcavationDone(t))&&(this.cursor="pointer")}},"default","buryAndCollectButton");this.scientistsPane.addHitbox(n);var e=new Hitbox({x:.4*this.boundingBox.width,y:.86*this.boundingBox.height,width:.2*this.boundingBox.width,height:.05*this.boundingBox.height},{onmousedown:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)?isExcavationDone(t)&&!isScientistDead(t)?confirmForfeitExcavation(t):isScientistDead(t)&&onClickResurrect(t):confirmRerollExcavations(t),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()},onmouseenter:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)?isExcavationDone(t)&&!isScientistDead(t)?(showTooltip(_("Forfeit Reward"),_("Forfeit your reward if you cannot claim it or do not want to claim it.")),this.cursor="pointer"):isScientistDead(t)&&(showTooltip(_("Resurrect Scientist"),_("Resurrect {0} for {1} tickets",scientists[activeScientists[t][0]].name,getCostToResurrect(t))),this.cursor="pointer"):(showTooltip(_("Refresh Excavations"),_("Pay 1 ticket to get two new excavation options")),this.cursor="pointer")},onmouseexit:function(){hideTooltip()}},"default","forfeitButton");this.scientistsPane.addHitbox(e);var o=new Hitbox({x:.15*this.boundingBox.width,y:.78*this.boundingBox.height,width:.2*this.boundingBox.width,height:.05*this.boundingBox.height},{onmousedown:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)||isScientistDead(t)||startExcavation(t,0),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()},onmouseenter:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)||isScientistDead(t)||(this.cursor="pointer")}},"default","leftStartButton");this.scientistsPane.addHitbox(o);var h=new Hitbox({x:.65*this.boundingBox.width,y:.78*this.boundingBox.height,width:.2*this.boundingBox.width,height:.05*this.boundingBox.height},{onmousedown:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)||startExcavation(t,1),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()},onmouseenter:function(){var t=this.parent.parent.currentTabIndex;isOnActiveExcavation(t)||(this.cursor="pointer")}},"default","rightStartButton");this.scientistsPane.addHitbox(h);var s=new Hitbox({x:.2125*this.boundingBox.width,y:.6*this.boundingBox.height,width:.075*this.boundingBox.width,height:.1125*this.boundingBox.height},{onmouseenter:function(){var t=this.parent.parent.currentTabIndex;if(firstOpenScientistSlot()>t&&!isOnActiveExcavation(t)&&!isOnActiveExcavation(t)){var i=getExcavationChoiceRewardValues(t,0);showTooltip(i.name,i.description),this.cursor="pointer"}},onmouseexit:function(){hideTooltip()}},"default","rewardOption1Icon");this.scientistsPane.addHitbox(s);var d=new Hitbox({x:.7125*this.boundingBox.width,y:.6*this.boundingBox.height,width:.075*this.boundingBox.width,height:.1125*this.boundingBox.height},{onmouseenter:function(){var t=this.parent.parent.currentTabIndex;if(firstOpenScientistSlot()>t&&!isOnActiveExcavation(t)&&!isOnActiveExcavation(t)){var i=getExcavationChoiceRewardValues(t,1);showTooltip(i.name,i.description),this.cursor="pointer"}},onmouseexit:function(){hideTooltip()}},"default","rewardOption2Icon");this.scientistsPane.addHitbox(d),this.scientistsPane.addHitbox(s);var a=new Hitbox({x:.45*this.boundingBox.width,y:.46*this.boundingBox.height,width:.1*this.boundingBox.width,height:.15*this.boundingBox.height},{onmouseenter:function(){var t=this.parent.parent.currentTabIndex;if(firstOpenScientistSlot()>t&&isOnActiveExcavation(t)&&isOnActiveExcavation(t)){var i=getActiveExcavationRewardValues(t);showTooltip(i.name,i.description),this.cursor="pointer"}},onmouseexit:function(){hideTooltip()}},"default","rewardActive");this.scientistsPane.addHitbox(a)}}initializeRelicsHitboxes(){this.scientistsPane.clearHitboxes();for(var t=.14,i=.21,n=.15*this.boundingBox.width,e=.16*this.boundingBox.height,o=0;o<absoluteMaxRelicSlots;o++){var h=t*this.boundingBox.width*(o%5)+n,s=i*this.boundingBox.height*Math.floor(o/5)+e;this.context.strokeRect(h,s,this.boundingBox.width*t,this.boundingBox.height*i);var d=new Hitbox({x:h,y:s,width:this.boundingBox.width*t,height:this.boundingBox.height*i},{onmouseenter:function(){var t=parseInt(this.id.split("_")[1]);equippedRelics[t]>-1&&(this.cursor="pointer",showTooltipForRelic(t))},onmouseexit:function(){hideTooltip()},onmousedown:function(){var t=parseInt(this.id.split("_")[1]);equippedRelics[t]>-1&&1==relicEditMode&&(showConfirmationPrompt(_("Are you sure you want to delete this relic?"),_("Yes"),(function(){deleteEquippedRelic(t),hideSimpleInput()}),_("No")),relicEditMode=0)}},"default","relicHitbox_"+o);this.relicsPane.addHitbox(d)}var a=new Hitbox({x:.45*this.boundingBox.width,y:.8*this.boundingBox.height,width:.1*this.boundingBox.width,height:.12*this.boundingBox.height},{onmouseenter:function(){this.cursor="pointer",0==relicEditMode?showTooltip(_("Trash"),_("Currently not set to delete, click this to toggle relic deletion mode.")):showTooltip(_("Trash"),_("Currently set to delete, click this to turn off relic deletion mode."))},onmouseexit:function(){hideTooltip()},onmousedown:function(){1==relicEditMode?relicEditMode=0:relicEditMode=1,mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()}},"default","relicTrashHitbox");this.relicsPane.addHitbox(a)}getRarityColor(t){return t==_("Common")?"#38b53a":t==_("Uncommon")?"#008dd9":t==_("Rare")?"#9c2828":t==_("Legendary")?"#ebab34":t==_("Warped")||t==_("Warped+")||t==_("Warped++")?1==quality?"#000000":"#ffffff":void 0}getDifficultyColor(t){return t==_("Easy")?"#46eb49":t==_("Medium")?"#ecf759":t==_("Hard")?"#fc8608":t==_("Nightmare")?"#d1000a":void 0}render(){if(this.context.save(),this.context.clearRect(0,0,this.boundingBox.width,this.boundingBox.height),this.context.restore(),super.render(),this.currentTabIndex<3){this.context.drawImage(darkdot,0,0,darkdot.width,darkdot.height,this.bodyContainer.boundingBox.x,this.bodyContainer.boundingBox.y,this.bodyContainer.boundingBox.width,this.bodyContainer.boundingBox.height);var t=this.currentTabIndex,i=activeScientists[t];if(0==i.length){var n=_("You do not have {0} scientists, you need to unlock more.",t+1);if(this.context.fillText(n,.5*this.boundingBox.width-this.context.measureText(n).width/2,.25*this.boundingBox.height),"english"==language){var e=_("Find more scientists from chests.");this.context.fillText(e,.5*this.boundingBox.width-this.context.measureText(e).width/2,.3*this.boundingBox.height)}}else{var o=scientists[i[0]],h=getScientistImage(i[0]);if(this.context.drawImage(characterInfoFrame,0,0,characterInfoFrame.width,characterInfoFrame.height,.25*this.boundingBox.width,.135*this.boundingBox.height,.5*this.boundingBox.width,.26*this.boundingBox.height),this.context.fillStyle="#211A14",this.context.fillRect(.3*this.boundingBox.width,.16*this.boundingBox.height,.12*this.boundingBox.width,.2*this.boundingBox.height),!o.isNormal&&1==quality){var s=[noise1,noise2,noise3,noise4,noise5,noise6],d=s[rand(0,s.length-1)];this.context.globalAlpha=.2+.15*Math.random(),this.context.drawImage(d,0,0,d.width,d.height,.3*this.boundingBox.width,.16*this.boundingBox.height,.12*this.boundingBox.width,.2*this.boundingBox.height),this.context.globalAlpha=1}isScientistDead(t)?1==t||3==t?this.context.drawImage(death1,0,0,death1.width,death1.height,.3*this.boundingBox.width,.16*this.boundingBox.height,.12*this.boundingBox.width,.2*this.boundingBox.height):this.context.drawImage(death2,0,0,death2.width,death2.height,.3*this.boundingBox.width,.16*this.boundingBox.height,.12*this.boundingBox.width,.2*this.boundingBox.height):this.context.drawImage(h,0,0,h.width,h.height,.3*this.boundingBox.width,.16*this.boundingBox.height,.12*this.boundingBox.width,.2*this.boundingBox.height);var a=o.name;this.context.fillStyle="#FFFFFF",this.context.font="20px Verdana",this.context.fillText(a,.45*this.boundingBox.width,.215*this.boundingBox.height),this.context.fillRect(.45*this.boundingBox.width,.215*this.boundingBox.height+3,this.context.measureText(a).width,1),this.context.font="16px Verdana";var r=_("Lvl")+" "+getScientistLevel(t)+" ("+Math.floor(100*getScientistPercentToNextLevel(t))+"%)";if(this.context.fillText(r,.46*this.boundingBox.width,.28*this.boundingBox.height),this.context.fillStyle=this.getRarityColor(o.rarity),this.context.save(),o.rarity==_("Legendary")&&1==quality){var x=.5+.5*oscillate(currentTime(),500);this.context.shadowColor="rgba(255, 255, 0, "+x+")",this.context.shadowOffsetX=0,this.context.shadowOffsetY=0,this.context.shadowBlur=1+2*oscillate(currentTime(),500)}else if(o.rarity.includes(_("Warped"))&&1==quality){x=.6+(.4+oscillate(currentTime(),79));this.context.shadowColor="rgba(255, 255, 255, "+x+")",this.context.shadowOffsetX=2*oscillate(currentTime(),499),this.context.shadowOffsetY=2*oscillate(currentTime(),331),this.context.shadowBlur=1.5+1.5*oscillate(currentTime(),oscillate(currentTime(),211))}var c=_("Rarity: {0}",o.rarity);if(this.context.fillText(c,.46*this.boundingBox.width,.33*this.boundingBox.height),this.context.restore(),this.context.fillStyle="#FFFFFF",this.context.font="14px Verdana",isOnActiveExcavation(t)){var u=activeExcavations[t],g=excavations[u[5]].difficulty;this.context.fillStyle=this.getDifficultyColor(g),this.context.font="bold 14px Verdana";var b=getActiveExcavationText(t);this.context.fillText(b,.5*this.boundingBox.width-this.context.measureText(b).width/2,.435*this.boundingBox.height),this.context.fillStyle="#FFFFFF",this.context.font="14px Verdana";var l=getActiveExcavationRewardValues(t);this.context.save(),this.context.fillStyle="rgba(255, 255, 255, 0.1)",this.context.fillRect(.45*this.boundingBox.width,.46*this.boundingBox.height,.1*this.boundingBox.width,.15*this.boundingBox.height),this.context.restore(),l.id>-1?excavationRewards[l.id].renderFunction(this.context,l.id,.45*this.boundingBox.width,.46*this.boundingBox.height,.1*this.boundingBox.width,.15*this.boundingBox.height):this.context.drawImage(darkdot,0,0,darkdot.width,darkdot.height,.45*this.boundingBox.width,.46*this.boundingBox.height,.1*this.boundingBox.width,.15*this.boundingBox.height);var B=l.name;this.context.fillText(B,.5*this.boundingBox.width-this.context.measureText(B).width/2,.66*this.boundingBox.height);var w=excavationPercentComplete(t),f=excavationTimeRemainingSeconds(t);if(isScientistDead(t)){var v=getDeathReason(t);renderProgressBar(this.context,v,darkdot,darkdot,.2*this.boundingBox.width,.7*this.boundingBox.height,.6*this.boundingBox.width,.08*this.boundingBox.height,"#CC3333",w),renderButton(this.context,craftb,_("BURY"),.4*this.boundingBox.width,.79*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000"),renderButton(this.context,craftb,_("RESURRECT"),.4*this.boundingBox.width,.86*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000")}else isExcavationDone(t)?(renderProgressBar(this.context,_("Excavation Complete"),darkdot,darkdot,.2*this.boundingBox.width,.69*this.boundingBox.height,.6*this.boundingBox.width,.08*this.boundingBox.height,"#22CC22",1),renderButton(this.context,craftb,_("COLLECT"),.4*this.boundingBox.width,.79*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000"),renderButton(this.context,craftb,_("FORFEIT"),.4*this.boundingBox.width,.86*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000")):renderProgressBar(this.context,_("Time Remaining: {0}",formattedCountDown(f)),greydot,darkdot,.2*this.boundingBox.width,.7*this.boundingBox.height,.6*this.boundingBox.width,.08*this.boundingBox.height,"#FFFFFF",w)}else for(var p=0;p<2;p++){var m=excavationChoices[t][p],T=excavations[m[0]],y=T.names[m[5]],R=Math.max(0,Math.round(m[2]*o.deathChanceMultiple*STAT.increasedExcavationSuccessRatePercent())),S=(g=T.difficulty,m[3]),E=m[4],F=m[1],C=excavationRewards[E],A=(C.image,C.renderFunction),P=C.name,H=(C.description,p*this.boundingBox.width*.5);this.context.font="bold 14px Verdana",this.context.fillStyle=this.getDifficultyColor(g),this.context.fillText(y,H+.25*this.boundingBox.width-this.context.measureText(y).width/2,.47*this.boundingBox.height),this.context.font="14px Verdana",this.context.fillStyle="#FFFFFF",this.context.fillText(_("Death Chance: {0}",R+"%"),H+.25*this.boundingBox.width-this.context.measureText(_("Death Chance: {0}",R+"%")).width/2,.52*this.boundingBox.height);var I=_("Duration")+": "+formattedCountDown(60*F);if(this.context.fillText(I,H+.25*this.boundingBox.width-this.context.measureText(I).width/2,.57*this.boundingBox.height),S){this.context.save(),this.context.fillStyle="rgba(255, 255, 255, 0.1)",this.context.fillRect(H+.2125*this.boundingBox.width,.6*this.boundingBox.height,.075*this.boundingBox.width,.1125*this.boundingBox.height),this.context.restore(),A(this.context,E,H+.2125*this.boundingBox.width,.6*this.boundingBox.height,.075*this.boundingBox.width,.1125*this.boundingBox.height);var k=this.context.font;this.context.font="14px Verdana","german"==language&&(this.context.font="11px Verdana");B=_("Reward")+": "+P;"german"==language&&(B=P),this.context.fillText(B,H+.25*this.boundingBox.width-this.context.measureText(B).width/2,.76*this.boundingBox.height),this.context.font=k}else{this.context.save(),this.context.fillStyle="rgba(255, 255, 255, 0.1)",this.context.fillRect(H+.2125*this.boundingBox.width,.6*this.boundingBox.height,.075*this.boundingBox.width,.1125*this.boundingBox.height),this.context.restore(),this.context.fillText("???",H+.2125*this.boundingBox.width+.075*this.boundingBox.width/2-this.context.measureText("???").width/2,.6*this.boundingBox.height+.1125*this.boundingBox.height/2);k=this.context.font;this.context.font="14px Verdana";B=_("Reward")+": ???";this.context.fillText(B,H+.25*this.boundingBox.width-this.context.measureText(B).width/2,.76*this.boundingBox.height),this.context.font=k}renderButton(this.context,craftb,_("START"),H+.15*this.boundingBox.width,.78*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000"),renderButton(this.context,craftb,_("REFRESH"),.4*this.boundingBox.width,.86*this.boundingBox.height,.2*this.boundingBox.width,.05*this.boundingBox.height,"14px Verdana","#000000")}}}else{var O=.14,D=.21,V=.15*this.boundingBox.width,M=.16*this.boundingBox.height;for(p=0;p<maxRelicSlots;p++){var q=O*this.boundingBox.width*(p%5)+V,L=D*this.boundingBox.height*Math.floor(p/5)+M;E=equippedRelics[p];if(this.context.strokeStyle="rgba(255, 255, 255, 1)",this.context.strokeRect(q,L,this.boundingBox.width*O,this.boundingBox.height*D),-1==E)this.context.save(),this.context.fillStyle="rgba(255, 255, 255, 0.3)",this.context.fillRect(q,L,this.boundingBox.width*O,this.boundingBox.height*D),this.context.restore();else{excavationRewards[E].image;this.context.save(),this.context.fillStyle="rgba(255, 255, 255, 0.3)",this.context.fillRect(q,L,this.boundingBox.width*O,this.boundingBox.height*D),this.context.restore(),excavationRewards[E].renderFunction(this.context,E,q,L,this.boundingBox.width*O,this.boundingBox.height*D)}}0==relicEditMode?this.context.drawImage(trashb,0,0,20,20,.45*this.boundingBox.width,.8*this.boundingBox.height,.1*this.boundingBox.width,.12*this.boundingBox.height):this.context.drawImage(trashb2,0,0,20,20,.45*this.boundingBox.width,.8*this.boundingBox.height,.1*this.boundingBox.width,.12*this.boundingBox.height)}}}