jTAC._internal.temp._CalcItems_Number={extend:"CalcItems.Base",constructor:function(a){this.callParent([a])},config:{number:0},configrules:{number:jTAC.checkAsNumber},evaluate:function(){return this.getNumber()},parse:function(b,c){try{this._pushContext();var a=c.asNumber(b,false);if(a){return{obj:jTAC.create("CalcItems.Number",{number:a.number}),rem:a.rem}}return null}finally{this._popContext()}}};jTAC.define("CalcItems.Number",jTAC._internal.temp._CalcItems_Number);if(jTAC.parser){jTAC.parser.register("CalcItems.Number")};