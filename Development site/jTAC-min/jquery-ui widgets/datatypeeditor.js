(function($){var datatypeeditor={options:new jTAC_DataTypeEditorOptions(),_create:function(){if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC.require(["Connections.FormElement","TypeManagers.Base"])},_init:function(){try{jTAC._internal.pushContext("datatypeeditor._init()");var tm=this._resolveTypeManager();if(!tm){return}this._tm=tm;var nElement=$("#"+this.element[0].id+"_neutral");if(nElement.length){this._nElement=nElement;this._initValue(tm,nElement,this.element)}var o=this.options;this._prepCommandKeys(o,tm);this._prepDefaultKeyResult(o);var passThruKey=false;var that=this;this.element.keypress(function(evt){if(passThruKey||(evt.which==0)){return true}var chr=String.fromCharCode(evt.which);var val=tm.isValidChar(chr);if(!val){if(that._cmdKeys.length){if(that._invokeCommand(evt)){if(o.keyResult){o.keyResult(that.element,evt,"command",o)}evt.preventDefault();evt.stopPropagation();return false}}if(o.filterkeys||(o.filterkeys===undefined)){var kc=evt.which||evt.keyCode;if(that._validKeyCodes.indexOf(kc)==-1){if(o.keyResult){o.keyResult(that.element,evt,"invalid",o)}evt.preventDefault();evt.stopPropagation();return false}}}if(o.keyResult){o.keyResult(that.element,evt,"valid",o)}return true});this._validKeyCodes=[13,27,9,8];if(this._cmdKeys.length){this.element.keydown(function(evt){passThruKey=false;if(that._invokeCommand(evt)){if(o.keyResult){o.keyResult(that.element,evt,"command",o)}evt.preventDefault();evt.stopPropagation();passThruKey=true;return false}else{return true}})}this.element.change(function(evt){if(o.reformat||(o.reformat===undefined)){that._reformat(tm)}});if(o.checkPastes||(o.checkPastes==undefined)){this._installonpaste(tm)}}finally{jTAC._internal.popContext()}},_resolveTypeManager:function(){try{jTAC._internal.pushContext("datatypeeditor._resolveTypeManager()");var o=this.options;var tm=o.typeManager||this.element.data("jtac-typemanager");if(tm){if(typeof tm=="string"){try{tm=eval("("+tm+");")}catch(e){jTAC.warn("JSon parsing error. "+e.message)}}if(tm.jtacClass){tm=jTAC.create(null,tm)}if(tm instanceof jTAC.TypeManagers.Base){return tm}}var dt=o.datatype||this.element.data("jtac-datatype");if(dt){if(o.datatype){this.element.data("jtac-datatype",o.datatype)}tm=jTAC.create(dt,tm);if(tm instanceof jTAC.TypeManagers.Base){return tm}}jTAC.warn("Specify the TypeManager. Use data-jtac-datatype='[name]' in the input field id=["+this.element[0].id+"].");return null}finally{jTAC._internal.popContext()}},_reformat:function(tm){try{jTAC._internal.pushContext("datatypeeditor._reformat()");try{var val=tm.toValue(this.element.val());this.element.val(tm.toString(val));if(this._nElement!=null){this._nElement.val(tm.toStringNeutral(val))}}catch(e){}}finally{jTAC._internal.popContext()}},_initValue:function(tm,neutralElement,visibleElement){var visVal=visibleElement.val();var neuVal=neutralElement.val();var initFromNeutral=this.options.initFromNeutral;if((visVal=="")||initFromNeutral||(initFromNeutral===undefined)){try{var n=tm.toValueNeutral(neuVal);if(n!=null){visibleElement.val(tm.toString(n))}}catch(e){jTAC.warn("Converting neutral value in "+visibleElement.id+" error: "+e.message)}}},_installonpaste:function(tm){function notify(){jTAC.warn("Paste was blocked.")}var el=this.element[0];if(!el||(el.onpaste===undefined)){return}el.onpaste=function(e){var text=undefined;if(window.clipboardData&&window.clipboardData.getData){text=window.clipboardData.getData("Text");if(text==null){notify();return false}}else{if(e.clipboardData&&e.clipboardData.getData){text=e.clipboardData.getData("text/plain");if(text==null){notify();return false}}}if(text){for(var i=0;i<text.length;i++){if(!tm.isValidChar(text.charAt(i))){notify();return false}}}return true}},_prepCommandKeys:function(opt,tm){this._cmdKeys=[];if(tm.invoke){if(tm.getCommandKeys){this._cmdKeys=tm.getCommandKeys()}if(opt.commandKeys){for(var i=0;i<opt.commandKeys.length;i++){var ck=opt.commandKeys[i];switch(ck.action){case"clear":this._cmdKeys=[];break;case"remove":for(var j=0;j<this._cmdKeys.length;j++){var old=this._cmdKeys[j];if(old.commandName==ck.commandName){if((ck.keyCode=="*")||((old.keyCode===ck.keyCode)&&(old.ctrl==ck.ctrl)&&(old.shift==old.shift))){this._cmdKeys.splice(j,1);break}}}break;default:this._cmdKeys.push(ck);break}}}}},_invokeCommand:function(evt){try{jTAC._internal.pushContext("datatypeeditor._invokeCommand()");var cmdName=null;var fnc=this.options.getCommandName;if(fnc){if(typeof fnc=="string"){if(window[fnc]==undefined){jTAC.warn("Could not find the function ["+fnc+"] globally defined.")}fnc=this.options.getCommandName=window[fnc]}cmdName=fnc.call(this,evt,this._cmdKeys,this._tm)}if(cmdName==""){return false}if(!cmdName){cmdName=this._getCommandName(this._cmdKeys,evt)}if(cmdName){var conn=this._conn;if(!conn){this._conn=conn=jTAC.connectionResolver.create(evt.currentTarget.id)}var args={commandName:cmdName,connection:conn};this._tm.invoke(args);return true}return false}finally{jTAC._internal.popContext()}},_getCommandName:function(cmdMap,evt){var keyCode=evt.keyCode,ctrl=evt.ctrlKey,shift=evt.shiftKey;if((keyCode==16)||(keyCode==17)){return false}for(var i=0;i<cmdMap.length;i++){var info=cmdMap[i];if((info.keyCode==keyCode)&&(!!info.ctrl==ctrl)&&(!!info.shift==shift)){return info.commandName}}if((evt.type!="keydown")||(keyCode<33)||((keyCode<91)&&(keyCode>47))){var keyChar=String.fromCharCode(keyCode);var keyCharUC=keyChar.toUpperCase();var useShift=false;if((keyCode<65)||(keyCode>90)){useShift=true}for(var i=0;i<cmdMap.length;i++){var info=cmdMap[i];if(typeof(info.keyCode)=="number"){continue}if(useShift&&(!!info.shift!=shift)){continue}if(!!info.ctrl!=ctrl){continue}if((info.keyCode==keyChar)||(info.keyCode.toUpperCase()==keyCharUC)){return info.commandName}}}return false},_prepDefaultKeyResult:function(options){if(options.keyResult===undefined){options.keyResult=jTAC_DefaultKeyResult}else{if(typeof options.keyResult=="string"){if(window[options.keyResult]){options.keyResult=window[options.keyResult]}else{jTAC.warn("Could not find the function ["+options.keyResult+"] globally defined.")}}}if(options.keyErrorClass===undefined){options.keyErrorClass="key-error"}if(options.keyErrorTime==undefined){options.keyErrorTime=200}},_setOption:function(key,value){$.Widget.prototype._setOption.apply(this,arguments)}};$.widget("ui.dataTypeEditor",datatypeeditor)})(jQuery);function jTAC_DefaultKeyResult(d,b,a,c){function e(){if(c.keyErrorIntervalID){d.removeClass(c.keyErrorClass);window.clearInterval(c.keyErrorIntervalID);c.keyErrorIntervalID=null}}if(!c.keyErrorClass){return}e();if(a=="invalid"){d.addClass(c.keyErrorClass);c.keyErrorIntervalID=window.setTimeout(e,c.keyErrorTime)}}function jTAC_DataTypeEditorOptions(){}jTAC_DataTypeEditorOptions.prototype={datatype:null,typeManager:null,reformat:true,initFromNeutral:true,filterkeys:true,checkPastes:true,commandKeys:null,getCommandName:null,keyResult:jTAC_DefaultKeyResult,keyErrorClass:"key-error",keyErrorTime:200};function jTAC_StdDateCmds(b,a){if(a){b.push({commandName:"Today",keyCode:"t"},{commandName:"Today",keyCode:"t",ctrl:true})}b.push({commandName:"NextDay",keyCode:38},{commandName:"PrevDay",keyCode:40},{commandName:"NextMonth",keyCode:33},{commandName:"PrevMonth",keyCode:34},{commandName:"NextMonth",keyCode:38,ctrl:true},{commandName:"PrevMonth",keyCode:40,ctrl:true},{commandName:"NextYear",keyCode:36},{commandName:"PrevYear",keyCode:35});return b}function jTAC_StdTimeCmds(b,a){if(a){b.push({commandName:"Now",keyCode:"N",ctrl:true})}b.push({commandName:"NextMinutes",keyCode:38},{commandName:"PrevMinutes",keyCode:40},{commandName:"NextHours",keyCode:33},{commandName:"PrevHours",keyCode:34},{commandName:"NextHours",keyCode:38,ctrl:true},{commandName:"PrevHours",keyCode:40,ctrl:true});return b}if(jTAC.isDefined("TypeManagers.BaseDate")){jTAC_Temp={getCommandKeys:function(){return jTAC_StdDateCmds([],true)}};jTAC.addMembers("TypeManagers.BaseDate",jTAC_Temp)}if(jTAC.isDefined("TypeManagers.TimeOfDay")){jTAC_Temp={getCommandKeys:function(){return jTAC_StdTimeCmds([],true)}};jTAC.addMembers("TypeManagers.TimeOfDay",jTAC_Temp)}if(jTAC.isDefined("TypeManagers.Duration")){jTAC_Temp={getCommandKeys:function(){return jTAC_StdTimeCmds([],false)}};jTAC.addMembers("TypeManagers.Duration",jTAC_Temp)}if(jTAC.isDefined("TypeManagers.DateTime")){jTAC_Temp={getCommandKeys:function(){var a=[{commandName:"Now",keyCode:"N",ctrl:true}];return jTAC_StdDateCmds(a,true)}};jTAC.addMembers("TypeManagers.DateTime",jTAC_Temp)}function jTAC_StdNumberCmds(b,a){b.push({commandName:"NextBy1",keyCode:38},{commandName:"PrevBy1",keyCode:40});if(a){b.push({commandName:"NextByPt1",keyCode:38,ctrl:true},{commandName:"PrevByPt1",keyCode:40,ctrl:true})}return b}if(jTAC.isDefined("TypeManagers.BaseFloat")){jTAC_Temp={getCommandKeys:function(){return jTAC_StdNumberCmds([],true)}};jTAC.addMembers("TypeManagers.BaseFloat",jTAC_Temp)}if(jTAC.isDefined("TypeManagers.Integer")){jTAC_Temp={getCommandKeys:function(){return jTAC_StdNumberCmds([],false)}};jTAC.addMembers("TypeManagers.Integer",jTAC_Temp)};