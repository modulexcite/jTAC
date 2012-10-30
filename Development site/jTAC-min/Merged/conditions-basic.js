if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._Conditions_Base={"abstract":true,constructor:function(a){this._createConnections(this.config.connections)},config:{enabled:true,lastEvaluateResult:null,trim:true,connections:new Array(),not:false,typeManager:null,datatype:null,autoDisable:true},configrules:{typeManager:jTAC.checkAsTypeManager,lastEvaluateResult:jTAC.checkAsIntOrNull,connections:{autoSet:false}},canEvaluate:function(){if(!this.getEnabled()){return false}if(this.getAutoDisable()&&!this._connsEditable()){return false}return true},evaluate:function(){try{this._pushContext();switch(this._evaluateRule()){case 1:return this.config.lastEvaluateResult=this.getNot()?0:1;case 0:return this.config.lastEvaluateResult=this.getNot()?1:0;default:this.config.lastEvaluateResult=-1;return -1}}finally{this._popContext()}},isValid:function(){return this.evaluate()!=0},_evaluateRule:function(){this.AM()},_createConnections:function(a){},_connsEditable:function(){var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){if(!a[b].isEditable()){return false}}}return true},collectConnections:function(d){var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){var c=a[b];d.push(c);if(c.collectConnections){c.collectConnections(d)}}}},_applyTrimToConns:function(a){var b=this.config.connections;for(var c=0;c<b.length;c++){var d=b[c];if(d.trim!==undefined){d.trim=a}}},_checkTypeManager:function(){if(!this.config.typeManager){jTAC.require("TypeManagers.Base");var b=this.config.connections;if(b&&b.length){var c=b[0];var a=c.getTypeManager();if(a){this.config.typeManager=a;return a}}this.config.typeManager=jTAC.create("TypeManagers.Integer")}return this.config.typeManager},setTrim:function(a){this.config.trim=jTAC.checkAsBool(a);this._applyTrimToConns(a)},setTypeManager:function(a){jTAC.require("TypeManagers.Base");this.config.typeManager=a?jTAC.checkAsTypeManager(a,this.config.typeManager):null},getDatatype:function(){return this.config.typeManager?this.config.typeManager.storageTypeName():null},setDatatype:function(a){this.setTypeManager(a)}};jTAC.define("Conditions.Base",jTAC._internal.temp._Conditions_Base);jTAC.checkAsCondition=function(b,a){return jTAC.checkAsClass(b,a,jTAC.Conditions.Base)};jTAC.checkAsConditionOrNull=function(a){if(!a){return null}return jTAC.checkAsCondition(a)};jTAC.evaluate=function(a){var b=jTAC.create(null,a);return b.evaluate()};jTAC.isValid=function(a){var b=jTAC.create(null,a);return b.isValid()};jTAC._internal.temp._Conditions_BaseOneConnection={extend:"Conditions.Base","abstract":true,require:["Connections.FormElement"],constructor:function(a){this.callParent([a])},config:{connection:null,elementId:null},_createConnections:function(a){a[0]=jTAC.create("Connections.FormElement")},getConnection:function(){return this.config.connections[0]},setConnection:function(a){this.config.connections[0]=jTAC.checkAsConnection(a,this.config.connections[0])},getElementId:function(){var a=this.config.connections[0];return a&&a.getId?a.getId():null},setElementId:function(c){var a=this.config.connections;var b=jTAC.connectionResolver.create(c,a[0]);if(b){a[0]=b}else{a[0].id=c}}};jTAC.define("Conditions.BaseOneConnection",jTAC._internal.temp._Conditions_BaseOneConnection);jTAC._internal.temp._Conditions_BaseTwoConnections={extend:"Conditions.BaseOneConnection","abstract":true,constructor:function(a){this.callParent([a])},config:{connection2:null,elementId2:null},_createConnections:function(a){this.callParent([a]);a[1]=jTAC.create("Connections.FormElement")},getConnection2:function(){return this.config.connections[1]},setConnection2:function(a){this.config.connections[1]=jTAC.checkAsConnection(a,this.config.connections[1])},getElementId2:function(){var a=this.config.connections[1];return a&&a.getId?a.getId():null},setElementId2:function(c){var a=this.config.connections;var b=jTAC.connectionResolver.create(c,a[1]);if(b){a[1]=b}else{a[1].id=c}}};jTAC.define("Conditions.BaseTwoConnections",jTAC._internal.temp._Conditions_BaseTwoConnections);jTAC._internal.temp._Conditions_BaseOneOrMoreConnections={extend:"Conditions.BaseOneConnection","abstract":true,constructor:function(a){this.callParent([a]);this._internal.allMustBeEditable=true},config:{moreConnections:[],ignoreNotEditable:true},_connsEditable:function(){if(this._internal.allMustBeEditable){return this.callParent()}var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){if(a[b].isEditable()){return true}}}return false},getConnections:function(){var b=[];if(this.config.connections){b=this.config.connections.concat(b)}var a=this.getMoreConnections();for(var c=0;c<a.length;c++){b.push(a[c])}return b},_cleanupConnections:function(){var c=[];var a=this.getConnections();if(a){for(var b=0;b<a.length;b++){if(!this.getIgnoreNotEditable()||a[b].isEditable()){c.push(a[b])}}}return c},_resolveMoreConnections:function(){var a=this.config.moreConnections;for(var b=0;b<a.length;b++){var c=a[b];if(typeof c=="string"){var e=c;var d=jTAC.create("Connections.FormElement",{id:e});c=jTAC.connectionResolver.create(e,d);a[b]=c?c:d}else{if(!(c instanceof jTAC.Connections.Base)&&(typeof(c)=="object")){if(!c.jtacClass){this._error("Must define the Connection's class in the 'jtacClass' property of the object that describes a Connection.")}c=jTAC.create(null,c);a[b]=c}else{if(!(c instanceof jTAC.Connections.Base)){this._error("The moreConnections property must only contain Connection objects and JSon objects that generate Connection objects.")}}}}},getMoreConnections:function(){if(this.config.moreConnections){this._resolveMoreConnections()}return this.config.moreConnections}};jTAC.define("Conditions.BaseOneOrMoreConnections",jTAC._internal.temp._Conditions_BaseOneOrMoreConnections);jTAC._internal.temp._Conditions_BaseOperator={extend:"Conditions.BaseTwoConnections","abstract":true,constructor:function(a){this.callParent([a])},config:{operator:"="},configrules:{operator:["=","<>",">","<",">=","<="]},_compare:function(c,b){var a=this.getTypeManager().compare(c,b);switch(this.getOperator()){case"=":return a==0;case"<>":return a!=0;case">":return a==1;case"<":return a==-1;case">=":return a>-1;case"<=":return a<1}}};jTAC.define("Conditions.BaseOperator",jTAC._internal.temp._Conditions_BaseOperator);jTAC._internal.temp._Conditions_BaseCounter={extend:"Conditions.BaseOneOrMoreConnections","abstract":true,constructor:function(a){this.callParent([a])},config:{minimum:null,maximum:null},configrules:{minimum:jTAC.checkAsIntOrNull,maximum:jTAC.checkAsIntOrNull},canEvaluate:function(){if((this.getMinimum()==null)&&(this.getMaximum()==null)){return false}return this.callParent()},_evaluateRule:function(){var c=this._cleanupConnections();var b=c.length;if(!b){return -1}var f=0;for(var e=0;e<c.length;e++){f+=this._connCount(c[e])}this.count=f;var d=this.getMinimum();var a=this.getMaximum();if((d!=null)&&(f<d)){return 0}if((a!=null)&&(f>a)){return 0}return 1},_connCount:function(a){this._AM()}};jTAC.define("Conditions.BaseCounter",jTAC._internal.temp._Conditions_BaseCounter);jTAC._internal.temp._Conditions_Required={extend:"Conditions.BaseOneOrMoreConnections",constructor:function(a){this.callParent([a]);this._internal.allMustBeEditable=false},config:{mode:"OneOrMore",minimum:0,maximum:999},configrules:{mode:["All","OneOrMore","AllOrNone","One","Range"]},_evaluateRule:function(){var b=this.getMoreConnections();if(b.length==0){var f=this.getConnection();if(!f.isEditable()){return -1}return this.count=(f.isNullValue(true)?0:1)}var c=this._cleanupConnections();var a=c.length;if(!a){return -1}var e=0;for(var d=0;d<c.length;d++){if(!c[d].isNullValue(true)){e++}}this.count=e;switch(this.getMode()){case"All":return e==a?1:0;case"OneOrMore":return(e>0)?1:0;case"AllOrNone":return((e==0)||(e==a))?1:0;case"One":return(e==1)?1:0;case"Range":return((this.getMinimum()<=e)&&(e<=this.getMaximum()))?1:0;default:this._error("Unknown mode name.")}}};jTAC.define("Conditions.Required",jTAC._internal.temp._Conditions_Required);jTAC.defineAlias("Required","Conditions.Required");jTAC._internal.temp._Conditions_DataTypeCheck={extend:"Conditions.BaseOneConnection",constructor:function(a){this.callParent([a])},_evaluateRule:function(){var b=this.getConnection();if(b.isNullValue()){return -1}try{var a=this.getTypeManager().toValueFromConnection(b);return a!=null?1:-1}catch(c){return 0}},getTypeManager:function(){return this._checkTypeManager()}};jTAC.define("Conditions.DataTypeCheck",jTAC._internal.temp._Conditions_DataTypeCheck);jTAC.defineAlias("DataTypeCheck","Conditions.DataTypeCheck");jTAC._internal.temp._Conditions_Range={extend:"Conditions.BaseOneConnection",constructor:function(a){this.callParent([a])},config:{minimum:null,maximum:null,lessThanMax:false},canEvaluate:function(){return this.callParent()&&((this.config.minimum!=null)||(this.config.maximum!=null))},_evaluateRule:function(){var d=this.getConnection();if(d.isNullValue()){return -1}var b=this.getTypeManager();var c,a;var h="minimum";try{c=b.toValueNeutral(this.getMinimum());if((c==null)&&b.getMinValue){c=b.getMinValue}h="maximum";a=b.toValueNeutral(this.getMaximum());if((a==null)&&b.getMaxValue){a=b.getMaxValue}}catch(g){var i=h+" property must be in the culture neutral format for "+b.storageTypeName()+" on element id "+d.getId()+". "+g.message;this._error(i)}try{var f=b.toValueFromConnection(d);if(f==null){return -1}}catch(g){return -1}if(c!=null){if(b.compare(f,c)<0){return 0}}if(a!=null){if(this.getLessThanMax()){if(b.compare(f,a)>=0){return 0}}else{if(b.compare(f,a)>0){return 0}}}return 1},getTypeManager:function(){return this._checkTypeManager()}};jTAC.define("Conditions.Range",jTAC._internal.temp._Conditions_Range);jTAC.defineAlias("Range","Conditions.Range");