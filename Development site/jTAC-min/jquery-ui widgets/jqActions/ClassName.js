if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp.jqActions_ClassName={extend:"jqActions.Base",constructor:function(a){},config:{className:null,classNameFailed:null,mode:"replace"},configrules:{className:jTAC.checkAsStrOrNull,classNameFailed:jTAC.checkAsStrOrNull,mode:["replace","add","remove"]},_prep:function(a,b){this._internal.orig=b.first().attr("class")},onsuccess:function(a,b){var c=this.className;if(c==null){return}switch(this.mode){case"replace":b.attr("class",c);break;case"add":b.addClass(c);break;case"remove":b.removeClass(c);break}},onfailed:function(a,b){var c=this.className;switch(this.mode){case"replace":c=this.classNameFailed;if(c==null){c=this._internal.orig}if(c==null){return}b.attr("class",c);break;case"add":b.removeClass(c);break;case"remove":b.addClass(c);break}}};jTAC.define("jqActions.ClassName",jTAC._internal.temp.jqActions_ClassName);jTAC.defineAlias("ClassName","jqActions.ClassName");jTAC.defineAlias("AddClassName","jqActions.ClassName",{mode:"add"});jTAC.defineAlias("RemoveClassName","jqActions.ClassName",{mode:"remove"});