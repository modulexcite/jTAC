if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._Conditions_Base={"abstract":true,constructor:function(a){this._createConnections(this.config.connections)},config:{enabled:true,lastEvaluateResult:null,trim:true,connections:new Array(),not:false,typeManager:null,datatype:null,autoDisable:true},configrules:{typeManager:jTAC.checkAsTypeManager,lastEvaluateResult:jTAC.checkAsIntOrNull,connections:{autoSet:false}},canEvaluate:function(){if(!this.getEnabled()){return false}if(this.getAutoDisable()&&!this._connsEditable()){return false}return true},evaluate:function(){try{this._pushContext();switch(this._evaluateRule()){case 1:return this.config.lastEvaluateResult=this.getNot()?0:1;case 0:return this.config.lastEvaluateResult=this.getNot()?1:0;default:this.config.lastEvaluateResult=-1;return -1}}finally{this._popContext()}},isValid:function(){return this.evaluate()!=0},_evaluateRule:function(){this.AM()},_createConnections:function(a){},_connsEditable:function(){var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){if(!a[b].isEditable()){return false}}}return true},collectConnections:function(d){var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){var c=a[b];d.push(c);if(c.collectConnections){c.collectConnections(d)}}}},_applyTrimToConns:function(a){var b=this.config.connections;for(var c=0;c<b.length;c++){var d=b[c];if(d.trim!==undefined){d.trim=a}}},_checkTypeManager:function(){if(!this.config.typeManager){jTAC.require("TypeManagers.Base");var b=this.config.connections;if(b&&b.length){var c=b[0];var a=c.getTypeManager();if(a){this.config.typeManager=a;return a}}this.config.typeManager=jTAC.create("TypeManagers.Integer")}return this.config.typeManager},setTrim:function(a){this.config.trim=jTAC.checkAsBool(a);this._applyTrimToConns(a)},setTypeManager:function(a){jTAC.require("TypeManagers.Base");this.config.typeManager=a?jTAC.checkAsTypeManager(a,this.config.typeManager):null},getDatatype:function(){return this.config.typeManager?this.config.typeManager.storageTypeName():null},setDatatype:function(a){this.setTypeManager(a)}};jTAC.define("Conditions.Base",jTAC._internal.temp._Conditions_Base);jTAC.checkAsCondition=function(b,a){return jTAC.checkAsClass(b,a,jTAC.Conditions.Base)};jTAC.checkAsConditionOrNull=function(a){if(!a){return null}return jTAC.checkAsCondition(a)};jTAC.evaluate=function(a){var b=jTAC.create(null,a);return b.evaluate()};jTAC.isValid=function(a){var b=jTAC.create(null,a);return b.isValid()};