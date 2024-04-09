class DialogueManager{isDirty=!1;currentDialogueIndex=0;dialogueId=null;speakers={};dialogue=[];onEndFunction=null;initialize(e,i,t){this.onEnd(),this.dialogueId=e,this.speakers=i,this.dialogue=t,this.currentDialogueIndex=0,this.isDirty=!0}next(e=null){this.goTo(this.currentDialogueIndex+1,e)}previous(e=null){this.goTo(this.currentDialogueIndex-1,e)}goTo(e,i=null){null==i||i==this.dialogueId?(this.isDirty=!0,e<0&&(e=0),e>=this.dialogue.length?this.finish():(this.getCurrentDialogue().onEnd&&this.getCurrentDialogue().onEnd(),this.currentDialogueIndex=e,this.getCurrentDialogue().onStart&&this.getCurrentDialogue().onStart())):console.warn("DialogueManager: Attempting to advance invalid dialogue")}goToEntryWithKey(e,i=null){for(var t=0;t<this.dialogue.length;++t)if(this.dialogue[t].entryKey==e)return this.goTo(t,i);throw"DialogueManager: Attempted to go to invalid dialogue entry"}finish(){this.dialogue[this.dialogue.length-1].onEnd&&this.dialogue[this.dialogue.length-1].onEnd(),this.currentDialogueIndex=0,this.hide()}getCurrentDialogue(){return this.dialogue[this.currentDialogueIndex]}getCurrentSpeaker(){return this.speakers[this.dialogue[this.currentDialogueIndex].speaker]}compareDialogueId(e){return e==this.dialogueId}compareEntryKey(e){return this.dialogue[this.currentDialogueIndex].entryKey&&Array.isArray(e)&&e.includes(this.dialogue[this.currentDialogueIndex].entryKey)||this.dialogue[this.currentDialogueIndex].entryKey==e}show(){openUiWithoutClosing(DialogueWindow)}hide(){closeUiByName("DialogueWindow"),this.onEnd()}setOnEndFunction(e){this.onEndFunction=e}onEnd(){this.onEndFunction&&(this.onEndFunction(),this.onEndFunction=null)}initTestDialogue(){dialogueManager.initialize("testDialogue",{testSpeaker:{name:_("Test"),spritesheet:new SpritesheetAnimation(unicornDrilling,7,20)}},[{entryKey:"test1",speaker:"testSpeaker",text:"This is some test dialogue!",clickToContinue:!0},{entryKey:"test1",speaker:"testSpeaker",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",clickToContinue:!0},{entryKey:"test1",speaker:"testSpeaker",text:"Goodbye!",clickToContinue:!0}])}}var dialogueManager=new DialogueManager;