class PinnedBlueprintsLayer extends UiLayer{layerName="PinnedBlueprintsLayer";context=MAIN;zIndex=3;constructor(i,e){super(i,e),this.context&&(this.context.canvas.style.x=i.x,this.context.canvas.style.y=i.y,this.context.canvas.style.width=i.width,this.context.canvas.style.height=i.height),this.setBoundingBox()}setBoundingBox(){this.boundingBox=this.context.canvas.getBoundingClientRect(),this.boundingBox.x/=uiScaleX,this.boundingBox.y/=uiScaleY,this.boundingBox.width/=uiScaleX,this.boundingBox.height/=uiScaleY,this.initializeBlueprints()}initializeBlueprints(){this.clearHitboxes(),this.pinnedBlueprintContainer=new Hitbox({x:Math.ceil(.81*this.boundingBox.width),y:Math.ceil(.12*this.boundingBox.height),width:Math.ceil(.12*this.boundingBox.width),height:0},{},"","pinnedBlueprintContainer"),this.pinnedBlueprintContainer.render=function(){Math.min(4,pinnedBlueprintsManager.pinnedBlueprints.length)>0&&(this.parent.context.save(),renderRoundedRectangle(this.parent.context,this.boundingBox.x*uiScaleX,this.boundingBox.y*uiScaleY,this.boundingBox.width*uiScaleX,this.boundingBox.height*uiScaleY,0,"#bebebe","#000000"),this.parent.context.font=.1*this.parent.boundingBox.height+"px Verdana",this.parent.context.fillStyle="#FFFFFF",fillTextShrinkToFit(this.parent.context,_("Pinned Blueprints"),(this.boundingBox.x+.05*this.boundingBox.width)*uiScaleX,(this.boundingBox.y+.024*this.parent.boundingBox.height)*uiScaleY,.9*this.boundingBox.width*uiScaleX,"center"),this.parent.context.fillRect((this.boundingBox.x+.05*this.boundingBox.width)*uiScaleX,(this.boundingBox.y+.03*this.parent.boundingBox.height)*uiScaleY,.9*this.boundingBox.width*uiScaleX,.005*this.boundingBox.height*uiScaleY),this.parent.context.restore(),this.renderChildren())}.bind(this.pinnedBlueprintContainer,this),this.addHitbox(this.pinnedBlueprintContainer),this.pinnedBlueprintContainer.clearHitboxes();let i=.035*this.boundingBox.width,e=.02*this.pinnedBlueprintContainer.boundingBox.width,n=Math.min(4,pinnedBlueprintsManager.pinnedBlueprints.length);this.pinnedBlueprintContainer.boundingBox.height=Math.ceil(.055*this.boundingBox.height)+1.05*i*n;for(var t=0;t<n;t++){var o=new Hitbox({x:.02*this.pinnedBlueprintContainer.boundingBox.width,y:1.05*i*t+.75*i,width:this.pinnedBlueprintContainer.boundingBox.width-2*e,height:i},{onmousedown:function(i){if(console.log(pinnedBlueprintsManager.pinnedBlueprints[i]),9!==pinnedBlueprintsManager.pinnedBlueprints[i][0]&&10!==pinnedBlueprintsManager.pinnedBlueprints[i][0]){let t=1==pinnedBlueprintsManager.pinnedBlueprints[i][0]?0:1,o=getBlueprintById(pinnedBlueprintsManager.pinnedBlueprints[i][0],pinnedBlueprintsManager.pinnedBlueprints[i][1]);var e=openUi(CraftingWindow,null,worldBeingViewed().index,t);if(e){if(e.openTab(t),e.selectedBlueprint=o,o.hasOwnProperty("levels")){var n=o.craftedItem.item.getCurrentLevel();o.craftedItem.item.isAtMaxLevel()?e.discountedIngredients=null:e.discountedIngredients=getIngredientListWithDiscounts(o.levels[n].ingredients)}else e.discountedIngredients=getIngredientListWithDiscounts(o.ingredients);e.initializeCraftingPane()}}else openUi(HireWindow,null,pinnedBlueprintsManager.pinnedBlueprints[i][1])}.bind(this,t)},"pointer");o.render=function(i,e,n){i.context.save();var t=this.getRelativeCoordinates(0,0,i);let o=.9*this.boundingBox.height;var d;if(i.context.fillStyle="#bebebe80",i.context.fillRect(t.x*uiScaleX,t.y*uiScaleY,this.boundingBox.width*uiScaleX,o*uiScaleY),drawImageFitInBox(i.context,e.craftedItem.item.getIcon(e.craftedItem.item.getCurrentLevel()+1),(t.x+.025*this.boundingBox.width)*uiScaleX,(t.y+.05*o)*uiScaleY,.9*o*uiScaleY,this.boundingBox.width*uiScaleX,"center","left"),e.hasOwnProperty("levels")){var l=e.craftedItem.item.getCurrentLevel();d=e.craftedItem.item.isAtMaxLevel()?0:getIngredientListWithDiscounts(e.levels[l].ingredients)}else d=getIngredientListWithDiscounts(e.ingredients);canCraftBlueprint(e.category,e.id,0,d)&&(i.context.globalAlpha=.6-.4*oscillate(currentTime(),350),i.context.fillStyle="#bebebe",i.context.fillRect(t.x*uiScaleX,t.y*uiScaleY,this.boundingBox.width*uiScaleX,this.boundingBox.height*uiScaleY),i.context.globalAlpha=1);let a=[];for(var s=0;s<d.length;s++){var h=d[s].item;a[s]=d[s].item.percentageOfQuanity(d[s].quantity);var u=.24*this.boundingBox.width+s*this.boundingBox.width*.15;drawImageFitInBox(i.context,h.getIcon(),(t.x+u)*uiScaleX,(t.y+.175*o)*uiScaleY,.6*o*uiScaleY,this.boundingBox.width*uiScaleX,"center","left"),d[s].item.hasQuantity(d[s].quantity)?renderCheckmark(i.context,(t.x+.085*this.boundingBox.width+u)*uiScaleX,(t.y+.55*o)*uiScaleY,.05*this.boundingBox.width*uiScaleY,.05*this.boundingBox.width*uiScaleX):renderXMark(i.context,(t.x+.085*this.boundingBox.width+u)*uiScaleX,(t.y+.55*o)*uiScaleY,.05*this.boundingBox.width*uiScaleY,.05*this.boundingBox.width*uiScaleX)}let r=calculateAverageOfArray(a);i.context.fillStyle="#cccccc",i.context.fillRect((t.x+.01*this.boundingBox.width)*uiScaleX,(t.y+.925*this.boundingBox.height)*uiScaleY,.98*this.boundingBox.width*r*uiScaleX,.05*this.boundingBox.height*uiScaleY),i.context.restore()}.bind(o,this,getBlueprintById(pinnedBlueprintsManager.pinnedBlueprints[t][0],pinnedBlueprintsManager.pinnedBlueprints[t][1]),t),this.pinnedBlueprintContainer.addHitbox(o)}}}