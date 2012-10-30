if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC.parser={_registered:new Array(),register:function(b){var a=jTAC.create(b,null,false);this._registered.push(a)},next:function(d){var b=this._registered;for(var a=0;a<b.length;a++){var c=b[a].parse(d,this);if(c){return c}}return null},err:function(e,a,d,b){var c="Could not parse the expression starting here: "+e;if(a){c="Error: "+a+" "+c}jTAC.error(c,d,b?b:(d?null:"Parser"))},asExact:function(h,b,f,g,e){var d=this._peREs;if(!d){this._peREs=d=[]}var i=d[b];if(!i){var c="^\\s*"+jTAC.escapeRE(b);if(e){c+="(?="+e+"|$)"}d[b]=i=new RegExp(c,g?"i":"")}var a=i.exec(h);if(a){return{rem:h.substr(a[0].length)}}if(f){this.err(h,b+" expected.",null,"Parser.asExact")}return null},asNumber:function(c,b){if(!this._numRE){this._numRE=new RegExp("^\\s*(\\-?\\d+(\\.\\d+)?)(?![\\.\\dA-Za-z])")}var a=this._numRE.exec(c);if(a){var d=parseFloat(a[1]);return{number:d,rem:c.substr(a[0].length)}}if(b){this.err(c,"Number expected.",null,"Parser.asNumber")}return null},asInt:function(c,b){if(!this._numRE){this._numRE=new RegExp("^\\s*(\\-?\\d+)(?!\\.A-Za-z)")}var a=this._numRE.exec(c);if(a){var d=parseInt(a[1],10);return{number:d,rem:c.substr(a[0].length)}}if(b){this.err(c,"Integer expected.",null,"Parser.asInt")}return null},asBool:function(c,b){var a=this.asExact(c,"true",false,false,"\\W");if(a){a.bool=true;return a}a=this.asExact(c,"false",false,false,"\\W");if(a){a.bool=false;return a}if(b){this.err(c,"true or false expected.",null,"Parser.asBool")}return null},asParmDelim:function(c,b){if(!this._sepRE){this._sepRE=new RegExp("^\\s*(\\,|\\)|\\})")}var a=this._sepRE.exec(c);if(a){return{delim:a[1],rem:c.substr(a[0].length)}}if(b){this.err(c,"Comma or ) character expected.",null,"Parser.asParmDelim")}return null},oParen:function(b,a){return this.asExact(b,"(",a,false,null)},cParen:function(b,a){return this.asExact(b,")",a,false,null)},asJSon:function(text,req){var m,obj,re;if(!/^\s*\{/.test(text)){return null}m=/^\s*/.exec(text);if(m){text=text.substr(m[0].length)}var nest=0;re=new RegExp("([\\{\\}])","g");while(m=re.exec(text)){if(m[1]=="{"){nest++}else{if(nest){nest--;if(!nest){try{obj=eval("("+text.substr(0,m.index+1)+");")}catch(e){this.err(text,"JSon parsing error. "+e.message,null,"Parser.asJSon")}return{JSon:obj,rem:text.substr(m.index+1)}}}}}this.err(text,"JSon parsing error. Missing closing }.",null,"Parser.asJSon")},asNull:function(b,a){return this.asExact(b,"null",a,false,"\\W")},asNaN:function(b,a){return this.asExact(b,"NaN",a,false,"\\W")},asId:function(d,c){if(!this._idRE){this._idRE=new RegExp("^\\s*((\"([A-Za-z_][\\w]*)\")(?=\\W|$))|^\\s*(('([A-Za-z_][\\w]*)')(?=\\W|$))","i")}var a=this._idRE.exec(d);if(a){var b=a[0];if(b){return{id:a[3]||a[6],rem:d.substr(b.length)}}}if(c){this.err(d,"Id required",null,"Parser.asId")}return null},asClass:function(h,a,b,d){var g;var c=this.asId(h,false);if(c){try{g=jTAC.create(c.id)}catch(f){this.err(h,f.message)}}else{c=this.asJSon(h,false);if(c){try{g=jTAC.create(null,c.JSon)}catch(f){this.err(h,f.message)}}else{if(a){c=this.asNull(h,false);if(c){return{obj:null,rem:c.rem}}}}}if(g){if(b&&!b(g)){this.err(h,"Unexpected class",null,"Parser.asClass")}return{obj:g,rem:c.rem}}if(d){this.err(h,"Class name expected.",null,"Parser.asClass")}return null}};if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._CalcItems_Base={"abstract":true,constructor:function(a){},config:{enabled:true,operator:"+",stopProcessing:false},configrules:{operator:["+","-","*","/"]},canEvaluate:function(){if(!this.getEnabled()){return false}return true},evaluate:function(){this.AM()},collectConnections:function(a){},_cleanupCalcItemInput:jTAC_CleanupCalcItemInput,calcexpr:function(e,h,d){try{jTAC._internal.pushContext();var c=jTAC.CalcItems.Base.prototype;c._checkParser(h);var b,g=null,f="+";if(!c._opRE){c._opRE=new RegExp("^\\s*([\\+\\-\\*/])")}while(b=h.next(e)){e=b.rem;b.obj.operator=f;var a=c._opRE.exec(e);if(a){if(!g){g=jTAC.create("CalcItems.Group")}f=a[1];e=e.substr(a[0].length)}if(g){g.addItem(b.obj)}if(!a){return{ci:g?g:b.obj,rem:e}}}h.err(e,"Invalid calculation expression.",d||this)}finally{jTAC._internal.popContext()}},_checkParser:function(a){if(!a){this._error("Parser script has not been loaded.")}}};jTAC.define("CalcItems.Base",jTAC._internal.temp._CalcItems_Base);function jTAC_CleanupCalcItemInput(b){try{jTAC._internal.pushContext("convert data into CalcItem");if(b==null){return jTAC.create("CalcItems.Null")}if(b instanceof Array){var d=jTAC.create("CalcItems.Group");for(var c=0;c<b.length;c++){d.items.push(b[c])}return d}if(typeof(b)=="number"){return isNaN(b)?jTAC.create("CalcItems.NaN"):jTAC.create("CalcItems.Number",{number:b})}if(b instanceof jTAC.CalcItems.Base){return b}if(typeof(b)=="object"){if(!b.jtacClass){jTAC.error("Must define the CalcItem's class in the 'jtacClass' property of the object that describes a CalcItem.")}return jTAC.create(null,b)}if(typeof(b)=="string"){var a=jTAC.createByClassName(b,null,true);if(a&&a instanceof jTAC.CalcItems.Base){return a}if(b.indexOf("CalcItems.")>-1){jTAC.error("Must load scripts for the class ["+b+"]")}return jTAC.create("CalcItems.Element",{elementId:b})}jTAC.error("Must supply a CalcItem object or an array of CalcItem objects.")}finally{jTAC._internal.popContext()}}jTAC.checkAsCalcItem=function(a){return jTAC_CleanupCalcItemInput(a)};jTAC.checkAsCalcItemOrNull=function(a){if(!a){return null}return jTAC.checkAsCalcItem(a)};jTAC._internal.temp._CalcItems_Null={extend:"CalcItems.Base",constructor:function(a){this.callParent([a])},evaluate:function(){return null},parse:function(b,c){this._checkParser(c);var a=c.asNull(b,false);if(a){return{obj:jTAC.create("CalcItems.Null"),rem:a.rem}}return null}};jTAC.define("CalcItems.Null",jTAC._internal.temp._CalcItems_Null);if(jTAC.parser){jTAC.parser.register("CalcItems.Null")}jTAC._internal.temp._CalcItems_NaN={extend:"CalcItems.Base",constructor:function(a){this.callParent([a])},evaluate:function(){return NaN},parse:function(b,c){this._checkParser(c);var a=c.asNaN(b,false);if(a){return{obj:jTAC.create("CalcItems.NaN"),rem:a.rem}}return null}};jTAC.define("CalcItems.NaN",jTAC._internal.temp._CalcItems_NaN);if(jTAC.parser){jTAC.parser.register("CalcItems.NaN")}jTAC._internal.temp._CalcItems_Number={extend:"CalcItems.Base",constructor:function(a){this.callParent([a])},config:{number:0},configrules:{number:jTAC.checkAsNumber},evaluate:function(){return this.getNumber()},parse:function(b,c){try{this._pushContext();var a=c.asNumber(b,false);if(a){return{obj:jTAC.create("CalcItems.Number",{number:a.number}),rem:a.rem}}return null}finally{this._popContext()}}};jTAC.define("CalcItems.Number",jTAC._internal.temp._CalcItems_Number);if(jTAC.parser){jTAC.parser.register("CalcItems.Number")}jTAC._internal.temp._CalcItems_Element={extend:"CalcItems.Base",require:["CalcItems.Null","CalcItems.NaN","Connections.FormElement","TypeManagers.BaseNumber"],constructor:function(a){this.callParent([a])},config:{datatype:"",typeManager:null,connection:"Connections.FormElement",elementId:null,valueWhenNull:"CalcItems.Null",valueWhenInvalid:"CalcItems.NaN"},configrules:{typeManager:jTAC.checkAsTypeManagerOrNull,connection:jTAC.checkAsConnectionOrNull,valueWhenNull:jTAC.checkAsCalcItem,valueWhenInvalid:jTAC.checkAsCalcItem},canEvaluate:function(){var a=this.getConnection();if(!a||!a.getElement(true)){return false}return this.callParent()},evaluate:function(){try{this._pushContext();var c=this.getConnection();if(c){if(c.isNullValue()){var d=this.getValueWhenNull();if(!d||!d.canEvaluate()){return null}return d.evaluate()}var b=this.getTypeManager();if(!b){b=c.getTypeManager();if(!b){b=jTAC.create("TypeManagers.Float")}this.setTypeManager(b)}try{if(!c.isValidValue(b.storageTypeName())){throw new Error()}var g=b.toValueFromConnection(c);return b.toNumber(g)}catch(f){var a=this.getValueWhenInvalid();if(!a||!a.canEvaluate()){return NaN}return a.evaluate()}}else{return NaN}}finally{this._popContext()}},collectConnections:function(b){var a=this.getConnection();if(a){b.push(a)}},parse:function(d,f){try{this._pushContext();this._checkParser(f);var c,e,a,b;c=f.asId(d);if(c){return{obj:jTAC.create("CalcItems.Element",{elementId:c.id}),rem:c.rem}}c=f.asExact(d,"Element(",false,false,null);if(c){d=c.rem;c=f.asId(d,true);d=c.rem;var e=c.id;c=f.cParen(d,true);d=c.rem;return{obj:jTAC.create("CalcItems.Element",{elementId:e}),rem:d}}return null}finally{this._popContext()}},getDatatype:function(){return this.config.typeManager?this.config.typeManager.dataTypeName():null},setDatatype:function(a){this.setTypeManager(a)},getElementId:function(){var a=this.config.connection;return a&&a.getId?a.getId():null},setElementId:function(c){if(typeof c=="object"){this.setConnnection(c)}else{var b=jTAC.create("Connections.FormElement",{id:c,allowNone:true});var a=jTAC.connectionResolver.create(c,b);this.config.connection=a?a:b}}};jTAC.define("CalcItems.Element",jTAC._internal.temp._CalcItems_Element);if(jTAC.parser){jTAC.parser.register("CalcItems.Element")}jTAC._internal.temp._CalcItems_Group={extend:"CalcItems.Base",require:["CalcItems.NaN","CalcItems.Number","TypeManagers.Float"],constructor:function(a){this.callParent([a])},config:{items:[],valueWhenEmpty:"CalcItems.Number",valueWhenInvalid:"CalcItems.NaN",valueWhenNull:"CalcItems.Number"},configrules:{valueWhenEmpty:jTAC.checkAsCalcItem,valueWhenInvalid:jTAC.checkAsCalcItem,valueWhenNull:jTAC.checkAsCalcItem},canEvaluate:function(){if(!this.getItems().length){return false}return this.callParent()},evaluate:function(){try{this._pushContext();this._cleanupItems();var h=this.getItems();var b=0;var a=jTAC.create("TypeManagers.Float");var f=true;for(var d=0;d<h.length;d++){if(h[d].canEvaluate()){f=false;var c=h[d].evaluate();if(isNaN(c)){var j=this.getValueWhenInvalid();if(!j||!j.canEvaluate()){return NaN}c=j.evaluate();if(isNaN(c)||(c==null)||j.getStopProcessing()){return c}}else{if(c==null){var k=this.getValueWhenNull();if(!k||!k.canEvaluate()){return null}c=k.evaluate();if(isNaN(c)||(c==null)||k.getStopProcessing()){return c}}}if(!d){b=c;continue}var e=1;var l=a.numDecPlaces(c);var g=a.numDecPlaces(b);switch(h[d].getOperator()){case"+":l=Math.max(l,g);b+=c;break;case"-":l=Math.max(l,g);b-=c;break;case"*":l=l+g;b*=c;break;case"/":if(c!=0){b=b/c}else{return NaN}e=0;break}if(e){b=a.round(b,0,l)}}}if(f){var k=this.getValueWhenEmpty();if(!k||!k.canEvaluate()){return null}return k.evaluate()}return b}finally{this._popContext()}},_cleanupItems:function(){var a=this.getItems();var c=null;for(var b=0;b<a.length;b++){var d=a[b];if((typeof d=="string")&&("+-*/".indexOf(d)>-1)){c=d;a.splice(b,1);if(b>=a.length){continue}d=a[b]}d=this._cleanupCalcItemInput(d);a[b]=d;if(c){d.operator=c;c=null}}},addItem:function(b,a){this._cleanupItems();b=this._cleanupCalcItemInput(b);if(a){b.operator=a}this.getItems().push(b)},collectConnections:function(c){this._cleanupItems();var a=this.getItems();for(var b=0;b<a.length;b++){a[b].collectConnections(c)}},parse:function(c,d){try{this._pushContext();this._checkParser(d);var b=d.oParen(c),a;if(b){c=b.rem;b=this.calcexpr(c,d);if(b){c=b.rem;a=b.ci;b=d.cParen(c);if(b){return{obj:a,rem:b.rem}}else{d.err(c,"Missing closing paren.",this)}}}return null}finally{this._popContext()}}};jTAC.define("CalcItems.Group",jTAC._internal.temp._CalcItems_Group);if(jTAC.parser){jTAC.parser.register("CalcItems.Group")}if(jTAC.isDefined("Conditions.Base")){jTAC._internal.temp._CalcItems_Conditional={extend:"CalcItems.Base",require:["CalcItems.Group","Conditions.Base"],constructor:function(a){this.callParent([a]);jTAC.require("Conditions.Base")},config:{condition:null,success:"CalcItems.Group",failed:"CalcItems.Group",cannotEvalMode:"error"},configrules:{condition:jTAC.checkAsCondition,success:jTAC.checkAsCalcItem,failed:jTAC.checkAsCalcItem,cannotEvalMode:["error","zero","success","failed"]},canEvaluate:function(){var a=this.getCondition();if(!a||!a.canEvaluate()){return false}return this.callParent()},evaluate:function(){try{this._pushContext();var a=this.getCondition();if(!a||!a.canEvaluate()){return -1}var c=a.evaluate();if(c==-1){switch(this.getCannotEvalMode()){case"error":return NaN;case"zero":return 0;case"success":c=1;break;case"failed":c=0;break}}var b=c?this.getSuccess():this.getFailed();if(!b||!b.canEvaluate()){return null}return b.evaluate()}finally{this._popContext()}},parse:function(f,b){try{this._pushContext();this._checkParser(b);var a=b.asExact(f,"Condition(",false,false,null),e,i,c,g,d;if(a){f=a.rem;a=b.asJSon(f,true);e=jTAC.create(null,a.JSon);if(!(e instanceof jTAC.Conditions.Base)){b.err(f,"JSon for condition must specify a Condition class",this)}f=a.rem;a=b.asParmDelim(f,true);f=a.rem;a=b.asNull(f);if(!a){a=this.calcexpr(f,b);if(a){i=a.ci}else{b.err(f,"Missing success parameter",this)}}f=a.rem;a=b.asParmDelim(f,false);if(!a||(a.delim=="}")){b.err("Illegal delimiter",this)}f=a.rem;if(a.delim==","){a=b.asNull(f);if(!a){a=this.calcexpr(f,b);if(a){c=a.ci}}if(a){f=a.rem;a=b.asParmDelim(f,false);if(!a||(a.delim=="}")){b.err("Illegal delimiter",this)}f=a.rem;if(a.delim==","){a=b.asId(f,false);if(a){d=a.id}else{a=b.asJSon(f,true);g=a.JSon}f=a.rem;a=b.cParen(f,true);f=a.rem}}}var h=jTAC.create("CalcItems.Conditional");h.condition=e;h.success=i;h.failed=c;if(d!=null){h.cannotEvalMode=d}if(g){h.setProperties(g)}return{obj:h,rem:f}}return null}finally{this._popContext()}}};jTAC.define("CalcItems.Conditional",jTAC._internal.temp._CalcItems_Conditional);if(jTAC.parser){jTAC.parser.register("CalcItems.Conditional")}}jTAC._internal.temp._CalcItems_BaseFunction={extend:"CalcItems.Base","abstract":true,require:["CalcItems.Number","CalcItems.NaN"],constructor:function(a){this.callParent([a])},config:{parms:[],valueWhenInvalid:"CalcItems.NaN",valueWhenNull:"CalcItems.Number"},configrules:{valueWhenInvalid:jTAC.checkAsCalcItem,valueWhenNull:jTAC.checkAsCalcItem},evaluate:function(){try{this._pushContext();this._cleanupParms();var f=this._numParms();var e=[];var d=this.getParms();for(var b=0;b<d.length;b++){if(f&&b>f){break}var h=d[b];var g=null;if(h.canEvaluate()){g=h.evaluate();if(isNaN(g)){var a=this.getValueWhenInvalid();if(!a||!a.canEvaluate()){return NaN}g=a.evaluate();if(isNaN(g)||(g==null)||a.getStopProcessing()){return g}}else{if(g==null){var c=this.getValueWhenNull();if(!c||!c.canEvaluate()){return null}g=c.evaluate();if(isNaN(g)||(g==null)||c.getStopProcessing()){return g}}}e.push(g)}}if(f&&e.length<f){return NaN}if(f==1){e=e[0]}return this._func(e)}finally{this._popContext()}},_func:function(a){this._AM()},_numParms:function(){return 0},_cleanupParms:function(){var b=this.getParms();for(var a=0;a<b.length;a++){b[a]=this._cleanupCalcItemInput(b[a])}},addParm:function(a){this._cleanupParms();a=this._cleanupCalcItemInput(a);this.getParms().push(a)},collectConnections:function(c){this._cleanupParms();var b=this.getParms();for(var a=0;a<b.length;a++){b[a].collectConnections(c)}},parse:function(c,d){try{this._pushContext();this._checkParser(d);var a=d.asExact(c,this._getParseName()+"(",false,false,null);if(!a){var b=this._getParseName2();if(b){a=d.asExact(c,b+"(",false,false,null)}if(!a){return null}}c=a.rem;a=this._getParseParms(c,d);return{obj:this._convertParseParms(a.parms),rem:a.rem}}finally{this._popContext()}},_getParseName:function(){return this.$className},_getParseName2:function(){return null},_numParserParms:function(){return this._numParms()},_getParseParms:function(e,f){var c,b=[],d=this._numParserParms(),a=0;while(true){c=this.calcexpr(e,f);if(!c){f.err(e,"Missing parameter",this)}e=c.rem;b.push(c.ci);c=f.asParmDelim(e,false);if(!c||c.delim=="}"){f.err(e,"parameter missing terminating delimiter",this)}e=c.rem;if(c.delim==")"){return{parms:b,rem:e}}a++;if(d&&(a>=d)){f.err(e,"too many calc expressions",this)}}},_convertParseParms:function(b){var a=jTAC.create(this.$fullClassName);a.setParms(b);return a},setParms:function(a){if(a instanceof Array){this.config.parms=a}else{this.config.parms=[this._cleanupCalcItemInput(a)]}}};jTAC.define("CalcItems.BaseFunction",jTAC._internal.temp._CalcItems_BaseFunction);jTAC._internal.temp._CalcItems_Abs={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},_func:function(a){return Math.abs.apply(window,[a])},_numParms:function(){return 1},_getParseName2:function(){return"Math.abs"}};jTAC.define("CalcItems.Abs",jTAC._internal.temp._CalcItems_Abs);if(jTAC.parser){jTAC.parser.register("CalcItems.Abs")}jTAC._internal.temp._CalcItems_Avg={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},_func:function(d){var a=d.length;if(!a){return NaN}var c=0;for(var b=0;b<a;b++){c+=d[b]}return c/a}};jTAC.define("CalcItems.Avg",jTAC._internal.temp._CalcItems_Avg);if(jTAC.parser){jTAC.parser.register("CalcItems.Avg")}jTAC._internal.temp._CalcItems_Fix={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},_func:function(a){return a},_numParms:function(){return 1},_getParseName:function(){return"Fix"},_numParserParms:function(){return 3},_convertParseParms:function(d){var b,a,c;b=d[0];a=d[1]||null;c=d[2]||null;var e=jTAC.create("CalcItems.Fix");e.setParms([b]);if(a){e.valueWhenNull=a}if(c){e.valueWhenInvalid=c}return e}};jTAC.define("CalcItems.Fix",jTAC._internal.temp._CalcItems_Fix);if(jTAC.parser){jTAC.parser.register("CalcItems.Fix")}jTAC._internal.temp._CalcItems_Max={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},_func:function(a){return Math.max.apply(window,a)},_getParseName2:function(){return"Math.max"}};jTAC.define("CalcItems.Max",jTAC._internal.temp._CalcItems_Max);if(jTAC.parser){jTAC.parser.register("CalcItems.Max")}jTAC._internal.temp._CalcItems_Min={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},_func:function(a){return Math.min.apply(window,a)},_getParseName2:function(){return"Math.min"}};jTAC.define("CalcItems.Min",jTAC._internal.temp._CalcItems_Min);if(jTAC.parser){jTAC.parser.register("CalcItems.Min")}jTAC._internal.temp._CalcItems_Round={extend:"CalcItems.BaseFunction",require:"TypeManagers.Base",constructor:function(a){this.callParent([a])},config:{roundMode:2,maxDecimalPlaces:3},_func:function(a){try{return jTAC.TypeManagers.Base.prototype.round(a,this.getRoundMode(),this.getMaxDecimalPlaces())}catch(b){return NaN}},_numParms:function(){return 1},parse:function(d,e){this._checkParser(e);var b=e.asExact(d,"Round(");if(b){d=b.rem;return this._parseRound(d,e)}var a,c=0;b=e.asExact(d,"Math.round(");if(b){c=0}else{b=e.asExact(d,"Math.floor(");if(b){c=2}else{b=e.asExact(d,"Math.ceil(");if(b){c=3}else{return null}}}d=b.rem;b=this._getParseParms(d,e);a=jTAC.create("CalcItems.Round");a.setParms(b.parms);a.setRoundMode(c);a.setMaxDecimalPlaces(0);return{obj:a,rem:b.rem}},_parseRound:function(g,c){var i,b=3,e=0,a=this.calcexpr(g,c);if(!a){c.err(g,"Must be an expression.",this)}g=a.rem;i=a.ci;a=c.asParmDelim(g,false);if(!a||a.delim=="}"){c.err(g,"parameter missing terminating delimiter",this)}g=a.rem;if(a.delim==","){var h=/^\s*([01234])/;var d=h.exec(g);if(!d){a=c.asId(g);if(a){g=a.rem;switch(a.id){case"point5":case"round":e=0;break;case"currency":e=1;break;case"truncate":case"floor":e=2;break;case"ceiling":case"ceil":e=3;break;case"nextwhole":e=4;break;default:c.err(g,"Valid values: point5, truncate, currency, ceiling, nextwhole",this)}}else{a=c.asNull(g,true)}g=a.rem}else{e=parseInt(d[1],10);g=g.substr(d[0].length)}a=c.asParmDelim(g,false);if(!a||a.delim=="}"){c.err(g,"parameter missing terminating delimiter",this)}g=a.rem;if(a.delim==","){a=c.asInt(g,false);if(a){b=a.number}else{a=c.asNull(g,true)}g=a.rem;a=c.asParmDelim(g,false);if(!a||a.delim!=")"){c.err(g,"parameter missing terminating delimiter",this)}g=a.rem}}var f=jTAC.create("CalcItems.Round");f.setParms(i);f.setRoundMode(e);f.setMaxDecimalPlaces(b);return{obj:f,rem:g}}};jTAC.define("CalcItems.Round",jTAC._internal.temp._CalcItems_Round);if(jTAC.parser){jTAC.parser.register("CalcItems.Round")}jTAC._internal.temp._CalcItems_UserFunction={extend:"CalcItems.BaseFunction",constructor:function(a){this.callParent([a])},config:{func:null},configrules:{func:jTAC.checkAsFunctionOrNull},canEvaluate:function(){var a=this.getFunc();if(!a){return false}return this.callParent()},_func:function(a){var b=this.getFunc();if(!b){return NaN}return b.call(this,a)},_getParseName:function(){return"Function"},_getParseParms:function(c,d){var b,a=[];b=d.asId();if(!b){d.err(c,"First parameter must be a function name.",this)}a.push(b.id);c=b.rem;b=this.callParent([c]);if(b){a=a.concat(b.parms);c=b.rem}return a},_convertParseParms:function(c){var a=c.shift();var b=this.callParent([c]);b.setFunc(a);return b}};jTAC.define("CalcItems.UserFunction",jTAC._internal.temp._CalcItems_UserFunction);if(jTAC.parser){jTAC.parser.register("CalcItems.UserFunction")}if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._Calculations_Widget={require:["Connections.FormElement","TypeManagers.Integer","CalcItems.Null","CalcItems.NaN","CalcItems.Number","CalcItems.Group"],constructor:function(propertyVals){this._internal={events:null,readied:false,eval:false,lastValue:null,lastDisplayTxt:null}},config:{elementId:null,calcItem:"CalcItems.Group",expression:null,displayConnection:null,displayElementId:null,displayTypeManager:null,displayDatatype:null,displayErrorClass:"calcwidget-error",displayNullClass:"calcwidget-null",displayErrorText:"***",displayNullText:"",calcOnInit:true,useChangeEvt:true,useKeyEvt:false},configrules:{elementId:jTAC.checkAsStr,calcItem:jTAC.checkAsCalcItemOrNull,expression:jTAC.checkAsStrOrNull,displayConnection:jTAC.checkAsConnectionOrNull,displayTypeManager:jTAC.checkAsTypeManager},ready:function(){if(this._internal.readied){return}this._internal.readied=true;if(this.getCalcOnInit()){if(this.canEvaluate()){this.evaluate()}}if(this._needsEvts()){var a=[];this.getCalcItem().collectConnections(a);for(var b=0;b<a.length;b++){this._attachEvents(a[b])}}},canEvaluate:function(){return this.getCalcItem().canEvaluate()},evaluate:function(){try{this._pushContext();var intnl=this._internal;if(this._fireEvent("preCalc",null)==false){return null}if(intnl.eval){return null}intnl.eval=true;try{var val=this.getCalcItem().evaluate();this._storeValue(val);this._displayValue(val)}finally{intnl.eval=false}if(val!=intnl.lastValue){this._fireEvent("change",[val])}intnl.lastValue=val;this._fireEvent("postCalc",[val]);return val}finally{this._popContext()}},_storeValue:function(b){var a=this._getHiddenFld();if(b==null){b=""}a.value=isNaN(b)?"NaN":b.toString()},_displayValue:function(c){var b=this.getDisplayConnection();if(!b){return}b.removeClass(this.getDisplayNullClass());b.removeClass(this.getDisplayErrorClass());if(typeof c=="number"){if(isNaN(c)){this._displayError(b)}else{var a=this.getDisplayTypeManager();this._displayNumber(c,b,a)}}else{this._displayNull(b)}},_displayError:function(a){a.setTextValue(this.getDisplayErrorText());a.addClass(this.getDisplayErrorClass())},_displayNull:function(a){a.setTextValue(this.getDisplayNullText());a.addClass(this.getDisplayNullClass())},_displayNumber:function(c,b,a){b.setTextValue(a.toString(c))},_getHiddenFld:function(){try{this._pushContext();var b=this.getElementId();if(!b){this._error("Must assign the elementId property.")}var a=document.getElementById(b);if(!a){a=document.createElement("input");a.id=b;a.name=b;a.type="hidden";if(!document.forms.length){this._error("Must have a <form> tag.")}document.forms[0].appendChild(a)}if(!a.calcWidget){a.calcWidget=this}return a}finally{this._popContext()}},attachEvent:function(b,d){var c=this._internal.events;if(!c){c={};this._internal.events=c}var a=c[b];if(!a){a=[];c[b]=a}a.push(d)},detachEvent:function(b,f){var d=this._internal.events;if(!d){return}var a=d[b];if(a){if(!f){delete d[b]}else{var c=a.indexOf(f);if(c>-1){a.splice(c,1)}}}},_fireEvent:function(c,b){try{this._pushContext();if(!this._internal.events){return}if(typeof b!="object"){b=[b]}var a=this._internal.events[c];if(a){for(var d=0;d<a.length;d++){var e=a[d].apply(this,b);if(e!==undefined){return e}}}}finally{this._popContext()}},_changeEvt:function(a,b){if(this.canEvaluate()){this.evaluate()}},_keyUpEvt:function(a,b){if(!b||(this._internal.lastDisplayTxt==null)){return}if((this._internal.lastDisplayTxt!=b.getTextValue())&&this.canEvaluate()){this.evaluate()}},_keyDnEvt:function(a,b){this._internal.lastDisplayTxt=b?b.getTextValue():null},_needsEvts:function(){return this.getUseChangeEvt()||this.getUseKeyEvt()},_attachEvents:function(b){var a=this;if(this.getUseChangeEvt()){b.addEventListener("onchange",function(c){a._changeEvt.call(a,c,b)})}if(this.getUseKeyEvt()){b.addEventListener("onkeydown",function(c){a._keyDnEvt.call(a,c,b)});b.addEventListener("onkeyup",function(c){a._keyUpEvt.call(a,c,b)})}},setElementId:function(a){this.config.elementId=jTAC.checkAsStr(a);if(a){this._getHiddenFld()}},setExpression:function(b){try{this._pushContext(null,b!=null?b.toString():"");var c=jTAC.parser;if(!c){this._error("Must load Parser.js")}var a=jTAC.CalcItems.Base.prototype.calcexpr(jTAC.checkAsStr(b),c,this);if(!a){c.err(b,"syntax error",this)}this.setCalcItem(a.ci);this.config.expression=b}finally{this._popContext()}},getDisplayElementId:function(){var a=this.getDisplayConnection();return a&&a.getId?a.getId():null},setDisplayElementId:function(c){var b=jTAC.create("Connections.FormElement",{id:c,allowNone:true});var a=jTAC.connectionResolver.create(c,b);this.config.displayConnection=a?a:b},getDisplayTypeManager:function(){try{this._pushContext();if(!this.config.displayTypeManager){var a;var b=this.getDisplayConnection();if(b){a=b.getTypeManager()}if(!a){a=jTAC.create("TypeManagers.Float")}this.config.displayTypeManager=a}return this.config.displayTypeManager}finally{this._popContext()}},getDisplayDatatype:function(){return this.config.displayTypeManager?this.config.displayTypeManager.dataTypeName():null},setDisplayDatatype:function(a){this.setDisplayTypeManager(a)}};jTAC.define("Calculations.Widget",jTAC._internal.temp._Calculations_Widget);jTAC._internal.temp._CalcItems_WidgetConnection={extend:"Connections.BaseElement",require:["Calculations.Widget"],constructor:function(a){this.callParent([a])},_getCalcWidget:function(){var a=this.getElement(true);if(this._checkElement(a)){return a.calcWidget}return null},getTextValue:function(){var a=this._getCalcWidget();if(a&&a.canEvaluate()){var b=a.evaluate();if((b!=null)&&!isNaN(b)){return a.getDisplayTypeManager().toString(b)}}},setTextValue:function(a){},typeSupported:function(a){return(a=="integer")||(a=="float")},getTypedValue:function(b){if(!b||this.typeSupported(b)){var a=this._getCalcWidget();if(a&&a.canEvaluate()){var c=a.evaluate();if((b=="integer")&&(Math.floor(c)!=c)){return null}return c}}return null},setTypedValue:function(a){},isNullValue:function(b){var a=this._getCalcWidget();if(a&&a.canEvaluate()){var c=a.evaluate();return c==null}return false},isEditable:function(){return false},testElement:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}return this._checkElement(a)},_checkElement:function(a){if(a&&a.calcWidget){return true}return false},isEnabled:function(){return true},isVisible:function(){var a=this._getCalcWidget();if(a&&a.getDisplayConnection()){return a.getDisplayConnection().isVisible()}return false},isEditable:function(){return true},collectConnections:function(b){var a=this._getCalcWidget();if(a){a.getCalcItem().collectConnections(b)}},addEventListener:function(b,c,d){if(b=="onchange"){var a=this._getCalcWidget();if(a){a.attachEvent("change",c);return true}}return false},getClass:function(){var a=this._getCalcWidget();if(a){var b=a.getDisplayConnection();if(b){return b.getClass()}}return""},setClass:function(b){var a=this._getCalcWidget();if(a){var c=a.getDisplayConnection();if(c){c.setClass(b)}}}};jTAC.define("CalcItems.WidgetConnection",jTAC._internal.temp._CalcItems_WidgetConnection);jTAC.connectionResolver.register("CalcItems.WidgetConnection");jTAC._internal.temp._Connections_InnerHtml={extend:"Connections.BaseElement",constructor:function(a){this.callParent([a])},getTextValue:function(){var a=this.getElement();if(this._checkElement(a)){return a.innerHTML}return""},setTextValue:function(b){var a=this.getElement();if(this._checkElement(a)){a.innerHTML=b}},typeSupported:function(a){return false},isNullValue:function(a){return false},isEditable:function(){return false},testElement:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}return this._checkElement(a)},_checkElement:function(a){if(a&&(typeof(a)=="object")&&(a.tagName!==undefined)&&(a.innerHTML!==undefined)&&(a.form===undefined)){if(typeof a.innerHTML=="string"){return true}}return false},isEnabled:function(){return true},isEditable:function(){return false}};jTAC.define("Connections.InnerHtml",jTAC._internal.temp._Connections_InnerHtml);if(jTAC.connectionResolver){jTAC.connectionResolver.register("Connections.InnerHtml")}(function(b){var a={_calcWidget:null,options:new jTAC_CalculatorOptions(),_create:function(){if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC.require(["CalcItems.Base","Calculations.Widget","TypeManagers.Float"]);var d=this;var c=jTAC.create("Calculations.Widget");d._calcWidget=c;c.elementId=d.element.get()[0].id;c.attachEvent("preCalc",function(){return d._trigger("preCalc",null,{})});c.attachEvent("postCalc",function(e){return d._trigger("postCalc",null,{value:e})});c.attachEvent("change",function(e){d._trigger("change",null,{value:e})})},_init:function(){try{jTAC._internal.pushContext("calculator._init()");var e=this;var g=this.options;this._convertEvent("preCalc");this._convertEvent("postCalc");this._convertEvent("change");var c=this._calcWidget;for(var d in g){var f=g[d];if((f!=null)&&(c[d]!==undefined)&&(typeof(f)!="function")){c[d]=f}}c.ready()}finally{jTAC._internal.popContext()}},_convertEvent:function(d){var c=this.options[d];if(c){if(typeof c=="string"){c=window[c];if(!c){jTAC.warn("Calculator ["+this.element.get()[0].id+"] options include ["+d+"]. This must be a globally defined function name to be used.");c=null}this.options[d]=c}}},_setOption:function(d,e){b.Widget.prototype._setOption.apply(this,arguments);var c=this._calcWidget;switch(d){case"calcItem":c.calcItem=e;if(c.calcOnInit&&c.canEvaluate()){c.evaluate()}break;case"calcOnInit":if(e){if(c.canEvaluate()){c.evaluate()}}break;case"displayErrorClass":c.displayErrorClass=e;break;case"displayNullClass":c.displayNullClass=e;break;case"displayErrorText":c.displayErrorText=e;break;case"displayNullText":c.displayNullText=e;break;case"preCalc":case"postCalc":case"change":this._convertEvent(d);break;default:}}};b.widget("ui.calculator",a)})(jQuery);function jTAC_CalculatorOptions(){}jTAC_CalculatorOptions.prototype={calcItem:null,expression:null,calcOnInit:null,useChangeEvt:null,useKeyEvt:null,displayConnection:null,displayElementId:null,displayTypeManager:null,displayDatatype:null,displayErrorClass:null,displayNullClass:null,displayErrorText:null,displayNullText:null,preCalc:null,postCalc:null,change:null};