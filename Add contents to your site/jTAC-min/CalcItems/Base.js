if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._CalcItems_Base={"abstract":true,constructor:function(a){},config:{enabled:true,operator:"+",stopProcessing:false},configrules:{operator:["+","-","*","/"]},canEvaluate:function(){if(!this.getEnabled()){return false}return true},evaluate:function(){this.AM()},collectConnections:function(a){},_cleanupCalcItemInput:jTAC_CleanupCalcItemInput,calcexpr:function(e,h,d){try{jTAC._internal.pushContext();var c=jTAC.CalcItems.Base.prototype;c._checkParser(h);var b,g=null,f="+";if(!c._opRE){c._opRE=new RegExp("^\\s*([\\+\\-\\*/])")}while(b=h.next(e)){e=b.rem;b.obj.operator=f;var a=c._opRE.exec(e);if(a){if(!g){g=jTAC.create("CalcItems.Group")}f=a[1];e=e.substr(a[0].length)}if(g){g.addItem(b.obj)}if(!a){return{ci:g?g:b.obj,rem:e}}}h.err(e,"Invalid calculation expression.",d||this)}finally{jTAC._internal.popContext()}},_checkParser:function(a){if(!a){this._error("Parser script has not been loaded.")}}};jTAC.define("CalcItems.Base",jTAC._internal.temp._CalcItems_Base);function jTAC_CleanupCalcItemInput(b){try{jTAC._internal.pushContext("convert data into CalcItem");if(b==null){return jTAC.create("CalcItems.Null")}if(b instanceof Array){var d=jTAC.create("CalcItems.Group");for(var c=0;c<b.length;c++){d.items.push(b[c])}return d}if(typeof(b)=="number"){return isNaN(b)?jTAC.create("CalcItems.NaN"):jTAC.create("CalcItems.Number",{number:b})}if(b instanceof jTAC.CalcItems.Base){return b}if(typeof(b)=="object"){if(!b.jtacClass){jTAC.error("Must define the CalcItem's class in the 'jtacClass' property of the object that describes a CalcItem.")}return jTAC.create(null,b)}if(typeof(b)=="string"){var a=jTAC.createByClassName(b,null,true);if(a&&a instanceof jTAC.CalcItems.Base){return a}if(b.indexOf("CalcItems.")>-1){jTAC.error("Must load scripts for the class ["+b+"]")}return jTAC.create("CalcItems.Element",{elementId:b})}jTAC.error("Must supply a CalcItem object or an array of CalcItem objects.")}finally{jTAC._internal.popContext()}}jTAC.checkAsCalcItem=function(a){return jTAC_CleanupCalcItemInput(a)};jTAC.checkAsCalcItemOrNull=function(a){if(!a){return null}return jTAC.checkAsCalcItem(a)};