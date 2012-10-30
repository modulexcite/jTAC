if(jTAC.isDefined("Conditions.Base")){jTAC._internal.temp._CalcItems_Conditional={extend:"CalcItems.Base",require:["CalcItems.Group","Conditions.Base"],constructor:function(a){this.callParent([a]);jTAC.require("Conditions.Base")},config:{condition:null,success:"CalcItems.Group",failed:"CalcItems.Group",cannotEvalMode:"error"},configrules:{condition:jTAC.checkAsCondition,success:jTAC.checkAsCalcItem,failed:jTAC.checkAsCalcItem,cannotEvalMode:["error","zero","success","failed"]},canEvaluate:function(){var a=this.getCondition();if(!a||!a.canEvaluate()){return false}return this.callParent()},evaluate:function(){try{this._pushContext();var a=this.getCondition();if(!a||!a.canEvaluate()){return -1}var c=a.evaluate();if(c==-1){switch(this.getCannotEvalMode()){case"error":return NaN;case"zero":return 0;case"success":c=1;break;case"failed":c=0;break}}var b=c?this.getSuccess():this.getFailed();if(!b||!b.canEvaluate()){return null}return b.evaluate()}finally{this._popContext()}},parse:function(f,b){try{this._pushContext();this._checkParser(b);var a=b.asExact(f,"Condition(",false,false,null),e,i,c,g,d;if(a){f=a.rem;a=b.asJSon(f,true);e=jTAC.create(null,a.JSon);if(!(e instanceof jTAC.Conditions.Base)){b.err(f,"JSon for condition must specify a Condition class",this)}f=a.rem;a=b.asParmDelim(f,true);f=a.rem;a=b.asNull(f);if(!a){a=this.calcexpr(f,b);if(a){i=a.ci}else{b.err(f,"Missing success parameter",this)}}f=a.rem;a=b.asParmDelim(f,false);if(!a||(a.delim=="}")){b.err("Illegal delimiter",this)}f=a.rem;if(a.delim==","){a=b.asNull(f);if(!a){a=this.calcexpr(f,b);if(a){c=a.ci}}if(a){f=a.rem;a=b.asParmDelim(f,false);if(!a||(a.delim=="}")){b.err("Illegal delimiter",this)}f=a.rem;if(a.delim==","){a=b.asId(f,false);if(a){d=a.id}else{a=b.asJSon(f,true);g=a.JSon}f=a.rem;a=b.cParen(f,true);f=a.rem}}}var h=jTAC.create("CalcItems.Conditional");h.condition=e;h.success=i;h.failed=c;if(d!=null){h.cannotEvalMode=d}if(g){h.setProperties(g)}return{obj:h,rem:f}}return null}finally{this._popContext()}}};jTAC.define("CalcItems.Conditional",jTAC._internal.temp._CalcItems_Conditional);if(jTAC.parser){jTAC.parser.register("CalcItems.Conditional")}};