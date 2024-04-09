class BuffLabWindow extends TabbedPopupWindow{layerName="bufflab";domElementId="PITD";context=PIT;buffListPane;buffListPaneDefaultWidth;buffListHitboxes;buffCraftingPane;isBuffCraftingPaneInitialized=!1;selectedBuffIndex;currentEnergyDisplayFontSize=18;constructor(t){super(t),t||this.setBoundingBox(),this.context.imageSmoothingEnabled=!1,this.setFrameImagesByWorldIndex(MOON_INDEX),this.initializeTabs([_("Craft Buffs"),_("Lab Stats")]),this.buffListPaneDefaultWidth=.4*this.bodyContainer.boundingBox.width,this.buffListPane=new Scrollbox(this.buffListPaneDefaultWidth-15,this.bodyContainer.boundingBox.height,this.context,this.bodyContainer.boundingBox.x,this.bodyContainer.boundingBox.y,this.buffListPaneDefaultWidth,this.bodyContainer.boundingBox.height,15),this.addHitbox(this.buffListPane),this.buffCraftingPane=new Hitbox({x:this.buffListPaneDefaultWidth,y:0,width:this.bodyContainer.boundingBox.width-this.buffListPaneDefaultWidth,height:this.bodyContainer.boundingBox.height},{},"","buffCraftingPane"),this.buffCraftingPane.render=function(t){var e,i=this.getRootLayer(),n=this.getRelativeCoordinates(0,0,i),o=i.getContext();void 0!==i.selectedBuffIndex&&null!==i.selectedBuffIndex&&(e=buffsPurchaseOptions[i.selectedBuffIndex].staticBuff()),t.selectedBuffIndex||0===t.selectedBuffIndex?(o.save(),o.fillStyle="#444444",o.fillRect(n.x,n.y,3,this.boundingBox.height),o.fillStyle="#FFFFFF",o.textBaseline="top",o.font="24px Verdana",fillTextShrinkToFit(o,_("{0} Buff",e.name),n.x+15,n.y+15+t.currentEnergyDisplayFontSize,.9*this.boundingBox.width),o.font="14px Verdana",fillTextWrap(o,buffsPurchaseOptions[i.selectedBuffIndex].formattedDescription(),n.x+15,n.y+50+t.currentEnergyDisplayFontSize,.9*this.boundingBox.width),o.restore(),this.renderChildren()):(o.fillStyle="#FFFFFF",o.textBaseline="middle",fillTextWrap(o,_("Click a buff on the left to purchase it with energy"),n.x,n.y+this.boundingBox.height/2-30+t.currentEnergyDisplayFontSize,this.boundingBox.width))}.bind(this.buffCraftingPane,this),this.buffCraftingPane.allowBubbling=!0,this.bodyContainer.addHitbox(this.buffCraftingPane),this.initializeBuffList();var e=new Hitbox({x:.05*this.buffCraftingPane.boundingBox.width,y:.8*this.buffCraftingPane.boundingBox.height,width:.9*this.buffCraftingPane.boundingBox.width,height:38},{onmousedown:function(){if(null!=this.selectedBuffIndex){var t=buffsPurchaseOptions[this.selectedBuffIndex];t.canPurchase()&&(t.purchase(),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play())}}.bind(this),onmouseexit:function(){hideTooltip()}},"pointer","craftButton");e.onmouseenter=function(t){var e=buffsPurchaseOptions[t.selectedBuffIndex];if(!e.canPurchase()){var i=this.getGlobalCoordinates(0,this.boundingBox.height);showTooltip(_("Missing {0} Energy",beautifynum(e.energyCost-worldResources[NUCLEAR_ENERGY_INDEX].numOwned)),"",i.x,i.y)}}.bind(e,this),e.render=function(t){var e=t.context;e.save();var i,n=this.getRelativeCoordinates(0,0,t),o=buffsPurchaseOptions[t.selectedBuffIndex];o.canPurchase()?(this.cursor="pointer",e.drawImage(upgradeb,n.x,n.y,this.boundingBox.width,this.boundingBox.height),e.fillStyle="#000000"):(this.cursor="",e.drawImage(upgradebg_blank,n.x,n.y,this.boundingBox.width,this.boundingBox.height),e.fillStyle="#444444"),e.textBaseline="middle",i=_("{0} Energy",beautifynum(o.modifiedEnergyCost())),e.font="32px KanitB",fillTextShrinkToFit(e,i,n.x+10,n.y+this.boundingBox.height/2+2,this.boundingBox.width-20,"center"),e.restore()}.bind(e,this),this.currentEnergyDisplay=new Hitbox({x:this.buffCraftingPane.boundingBox.x,y:0,width:this.buffCraftingPane.boundingBox.width,height:this.currentEnergyDisplayFontSize},{},""),this.currentEnergyDisplay.render=function(t){var e=t.context;e.save(),e.font=t.currentEnergyDisplayFontSize+"px Verdana",e.fillStyle="#FFFFFF",e.textBaseline="top";var i=this.getRelativeCoordinates(0,0,t);fillTextWrap(e,_("Stored Energy: {0}",beautifynum(worldResources[NUCLEAR_ENERGY_INDEX].numOwned))+"  ",i.x,i.y,this.boundingBox.width,"right"),drawImageFitInBox(e,worldResources[NUCLEAR_ENERGY_INDEX].smallIcon,i.x+this.boundingBox.width-t.currentEnergyDisplayFontSize,i.y,t.currentEnergyDisplayFontSize,t.currentEnergyDisplayFontSize),e.fillStyle="#444444",e.fillRect(i.x,i.y+this.boundingBox.height+2,this.boundingBox.width,3),e.restore()}.bind(this.currentEnergyDisplay,this),this.bodyContainer.addHitbox(this.currentEnergyDisplay),this.buffCraftingPane.addHitbox(e),this.buffCraftingPane.setEnabled(!1)}onTabChange(){this.selectedBuffIndex=null,this.buffCraftingPane.setVisible(0==this.currentTabIndex),this.buffCraftingPane.setEnabled(0==this.currentTabIndex),this.buffListPane.setEnabled(0==this.currentTabIndex),this.buffListPane.setVisible(0==this.currentTabIndex),this.currentEnergyDisplay.setEnabled(0==this.currentTabIndex),this.currentEnergyDisplay.setVisible(0==this.currentTabIndex),this.initializeBuffList()}render(){if(this.context.clearRect(0,0,this.boundingBox.width,this.boundingBox.height),super.render(),1==this.currentTabIndex){if(this.context.save(),this.context.fillStyle="#FFFFFF",this.context.strokeStyle="#000000",this.context.textBaseline="bottom",this.context.lineWidth=3,bufflab.isMaxLevel()){var t=_("You Are At the Max Level");i=_("Lab Level: {0}",buffLabStructure.level),n=_("Discount: {0}%",100*bufflab.currentDiscount());this.context.strokeText(t,.5*this.boundingBox.width-this.context.measureText(t).width/2,.4*this.boundingBox.height),this.context.fillText(t,.5*this.boundingBox.width-this.context.measureText(t).width/2,.4*this.boundingBox.height),this.context.strokeText(i,.5*this.boundingBox.width-this.context.measureText(i).width/2,.5*this.boundingBox.height),this.context.fillText(i,.5*this.boundingBox.width-this.context.measureText(i).width/2,.5*this.boundingBox.height),this.context.strokeText(n,.5*this.boundingBox.width-this.context.measureText(n).width/2,.6*this.boundingBox.height),this.context.fillText(n,.5*this.boundingBox.width-this.context.measureText(n).width/2,.6*this.boundingBox.height)}else{var e=_("CURRENT"),i=_("Lab Level: {0}",buffLabStructure.level),n=_("Discount: {0}%",100*bufflab.currentDiscount());this.context.font="bold 20px Verdana",this.context.strokeText(e,.25*this.boundingBox.width-this.context.measureText(e).width/2,.2*this.boundingBox.height),this.context.fillText(e,.25*this.boundingBox.width-this.context.measureText(e).width/2,.2*this.boundingBox.height),this.context.font="20px Verdana",this.context.strokeText(i,.25*this.boundingBox.width-this.context.measureText(i).width/2,.27*this.boundingBox.height),this.context.fillText(i,.25*this.boundingBox.width-this.context.measureText(i).width/2,.27*this.boundingBox.height),this.context.strokeText(n,.25*this.boundingBox.width-this.context.measureText(n).width/2,.34*this.boundingBox.height),this.context.fillText(n,.25*this.boundingBox.width-this.context.measureText(n).width/2,.34*this.boundingBox.height);e=_("NEXT LEVEL");var i=_("Lab Level: {0}",buffLabStructure.level+1),n=_("Discount: {0}%",100*bufflab.nextLevelDiscount());this.context.font="bold 20px Verdana",this.context.strokeText(e,.75*this.boundingBox.width-this.context.measureText(e).width/2,.2*this.boundingBox.height),this.context.fillText(e,.75*this.boundingBox.width-this.context.measureText(e).width/2,.2*this.boundingBox.height),this.context.font="20px Verdana",this.context.strokeText(i,.75*this.boundingBox.width-this.context.measureText(i).width/2,.27*this.boundingBox.height),this.context.fillText(i,.75*this.boundingBox.width-this.context.measureText(i).width/2,.27*this.boundingBox.height),this.context.strokeText(n,.75*this.boundingBox.width-this.context.measureText(n).width/2,.34*this.boundingBox.height),this.context.fillText(n,.75*this.boundingBox.width-this.context.measureText(n).width/2,.34*this.boundingBox.height)}this.context.restore()}}initializeBuffList(){var t=this.buffListPane;t.clearHitboxes(),this.buffListHitboxes=[],this.generateMenuContents(this.currentTabIndex,this.buffListPane),t.isDirty=!0}generateMenuContents(t,e){var i=50;if(e.context.save(),e.context.clearRect(0,0,e.canvas.width,e.canvas.height),t>=0){var n=buffsPurchaseOptions.length,o=Math.floor((e.boundingBox.width-6-15)/i),s=Math.ceil(n/o),h=(e.boundingBox.width-6-15-i*o)/(o-1);e.contentHeight=s*(i+h)+6;for(var a=0;a<n;++a){var u,d,r=3+a%o*(i+h),x=3+Math.floor(a/o)*(i+h),f=buffsPurchaseOptions[a];u=f.staticBuff().name,d=f.formattedDescription();var b=f.staticBuff().image;e.context.globalAlpha=.2,e.context.fillStyle="#000000",e.context.fillRect(r,x,i,i),e.context.globalAlpha=1,e.context.drawImage(b,r,x,i,i),this.selectedBuffIndex==a&&(e.context.strokeStyle="#76E374",e.context.lineWidth=3,e.context.beginPath(),e.context.strokeRect(r+e.context.lineWidth,x+e.context.lineWidth,i-2*e.context.lineWidth,i-2*e.context.lineWidth),e.context.stroke());var l=new Hitbox({x:r,y:x,width:i,height:i},{onmousedown:function(t){this.selectedBuffIndex=t,this.buffCraftingPane.setEnabled(!0),this.buffCraftingPane.setVisible(!0),this.generateMenuContents(this.currentTabIndex,this.buffListPane)}.bind(this,a),onmouseenter:function(t,e,i,n){var o=this.getGlobalCoordinates(i,n);showTooltip(t,e,o.x*uiScaleX,o.y*uiScaleY)}.bind(e,u,d,r,x+i),onmouseexit:function(){hideTooltip()}},"pointer");e.addHitbox(l,!0)}}e.context.restore()}getBuffEnergyCost(t){return Math.ceil(buffsPurchaseOptions[t].modifiedEnergyCost())}}