if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._Calculations_Widget={require:["Connections.FormElement","TypeManagers.Integer","CalcItems.Null","CalcItems.NaN","CalcItems.Number","CalcItems.Group"],constructor:function(propertyVals){this._internal={events:null,readied:false,eval:false,lastValue:null,lastDisplayTxt:null}},config:{elementId:null,calcItem:"CalcItems.Group",expression:null,displayConnection:null,displayElementId:null,displayTypeManager:null,displayDatatype:null,displayErrorClass:"calcwidget-error",displayNullClass:"calcwidget-null",displayErrorText:"***",displayNullText:"",calcOnInit:true,useChangeEvt:true,useKeyEvt:false},configrules:{elementId:jTAC.checkAsStr,calcItem:jTAC.checkAsCalcItemOrNull,expression:jTAC.checkAsStrOrNull,displayConnection:jTAC.checkAsConnectionOrNull,displayTypeManager:jTAC.checkAsTypeManager},ready:function(){if(this._internal.readied){return}this._internal.readied=true;if(this.getCalcOnInit()){if(this.canEvaluate()){this.evaluate()}}if(this._needsEvts()){var a=[];this.getCalcItem().collectConnections(a);for(var b=0;b<a.length;b++){this._attachEvents(a[b])}}},canEvaluate:function(){return this.getCalcItem().canEvaluate()},evaluate:function(){try{this._pushContext();var intnl=this._internal;if(this._fireEvent("preCalc",null)==false){return null}if(intnl.eval){return null}intnl.eval=true;try{var val=this.getCalcItem().evaluate();this._storeValue(val);this._displayValue(val)}finally{intnl.eval=false}if(val!=intnl.lastValue){this._fireEvent("change",[val])}intnl.lastValue=val;this._fireEvent("postCalc",[val]);return val}finally{this._popContext()}},_storeValue:function(b){var a=this._getHiddenFld();if(b==null){b=""}a.value=isNaN(b)?"NaN":b.toString()},_displayValue:function(c){var b=this.getDisplayConnection();if(!b){return}b.removeClass(this.getDisplayNullClass());b.removeClass(this.getDisplayErrorClass());if(typeof c=="number"){if(isNaN(c)){this._displayError(b)}else{var a=this.getDisplayTypeManager();this._displayNumber(c,b,a)}}else{this._displayNull(b)}},_displayError:function(a){a.setTextValue(this.getDisplayErrorText());a.addClass(this.getDisplayErrorClass())},_displayNull:function(a){a.setTextValue(this.getDisplayNullText());a.addClass(this.getDisplayNullClass())},_displayNumber:function(c,b,a){b.setTextValue(a.toString(c))},_getHiddenFld:function(){try{this._pushContext();var b=this.getElementId();if(!b){this._error("Must assign the elementId property.")}var a=document.getElementById(b);if(!a){a=document.createElement("input");a.id=b;a.name=b;a.type="hidden";if(!document.forms.length){this._error("Must have a <form> tag.")}document.forms[0].appendChild(a)}if(!a.calcWidget){a.calcWidget=this}return a}finally{this._popContext()}},attachEvent:function(b,d){var c=this._internal.events;if(!c){c={};this._internal.events=c}var a=c[b];if(!a){a=[];c[b]=a}a.push(d)},detachEvent:function(b,f){var d=this._internal.events;if(!d){return}var a=d[b];if(a){if(!f){delete d[b]}else{var c=a.indexOf(f);if(c>-1){a.splice(c,1)}}}},_fireEvent:function(c,b){try{this._pushContext();if(!this._internal.events){return}if(typeof b!="object"){b=[b]}var a=this._internal.events[c];if(a){for(var d=0;d<a.length;d++){var e=a[d].apply(this,b);if(e!==undefined){return e}}}}finally{this._popContext()}},_changeEvt:function(a,b){if(this.canEvaluate()){this.evaluate()}},_keyUpEvt:function(a,b){if(!b||(this._internal.lastDisplayTxt==null)){return}if((this._internal.lastDisplayTxt!=b.getTextValue())&&this.canEvaluate()){this.evaluate()}},_keyDnEvt:function(a,b){this._internal.lastDisplayTxt=b?b.getTextValue():null},_needsEvts:function(){return this.getUseChangeEvt()||this.getUseKeyEvt()},_attachEvents:function(b){var a=this;if(this.getUseChangeEvt()){b.addEventListener("onchange",function(c){a._changeEvt.call(a,c,b)})}if(this.getUseKeyEvt()){b.addEventListener("onkeydown",function(c){a._keyDnEvt.call(a,c,b)});b.addEventListener("onkeyup",function(c){a._keyUpEvt.call(a,c,b)})}},setElementId:function(a){this.config.elementId=jTAC.checkAsStr(a);if(a){this._getHiddenFld()}},setExpression:function(b){try{this._pushContext(null,b!=null?b.toString():"");var c=jTAC.parser;if(!c){this._error("Must load Parser.js")}var a=jTAC.CalcItems.Base.prototype.calcexpr(jTAC.checkAsStr(b),c,this);if(!a){c.err(b,"syntax error",this)}this.setCalcItem(a.ci);this.config.expression=b}finally{this._popContext()}},getDisplayElementId:function(){var a=this.getDisplayConnection();return a&&a.getId?a.getId():null},setDisplayElementId:function(c){var b=jTAC.create("Connections.FormElement",{id:c,allowNone:true});var a=jTAC.connectionResolver.create(c,b);this.config.displayConnection=a?a:b},getDisplayTypeManager:function(){try{this._pushContext();if(!this.config.displayTypeManager){var a;var b=this.getDisplayConnection();if(b){a=b.getTypeManager()}if(!a){a=jTAC.create("TypeManagers.Float")}this.config.displayTypeManager=a}return this.config.displayTypeManager}finally{this._popContext()}},getDisplayDatatype:function(){return this.config.displayTypeManager?this.config.displayTypeManager.dataTypeName():null},setDisplayDatatype:function(a){this.setDisplayTypeManager(a)}};jTAC.define("Calculations.Widget",jTAC._internal.temp._Calculations_Widget);