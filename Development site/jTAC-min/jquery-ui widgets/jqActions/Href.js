if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp.jqActions_Href={extend:"jqActions.Base",constructor:function(a){},config:{Url:null,UrlFailed:null},configrules:{Url:jTAC.checkAsStrOrNull,UrlFailed:jTAC.checkAsStrOrNull},_prep:function(a,c){val="";var b=c.first();val=b.attr("src");if(val===undefined){val=b.attr("href")}this._internal.orig=val},onsuccess:function(a,c){if(this.Url==null){return}var b=this;c.each(function(d,e){b._replaceUrl(e,b.Url)})},onfailed:function(b,d){var a=this.UrlFailed;if(a==null){a=this._internal.orig}var c=this;d.each(function(e,f){c._replaceUrl(f,a)})},_replaceUrl:function(b,a){if(b.src!=undefined){b.src=a}else{if(b.href!=undefined){b.href=a}}}};jTAC.define("jqActions.Href",jTAC._internal.temp.jqActions_Href);jTAC.defineAlias("Href","jqActions.Href");