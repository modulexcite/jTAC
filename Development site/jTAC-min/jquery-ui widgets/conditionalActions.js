(function(b){var a={options:new jTAC_ConditionalActionsOptions(),_create:function(){if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC.require(["Conditions.Base","Connections.Base","TypeManagers.Base"])},_init:function(){try{jTAC._internal.pushContext("ConditionalActions._init()");var h=this;var c=this.options;if(c["0"]!==undefined){var g=[];for(var k=0;true;k++){var e=k.toString();var f=c[e];if(f===undefined){break}g.push(f)}c=this.options=g}else{c=this.options=[c]}for(var d=0;d<c.length;d++){this._prepOptions(c[d]);this._attachTriggers(c[d])}this._inInit=true;try{for(var d=0;d<c.length;d++){var j=c[d];if(j.runOnLoad){this._runOne(j)}}}finally{this._inInit=false}}finally{jTAC._internal.popContext()}},_prepOptions:function(c){var j=this;if(c.runOnLoad===undefined){c.runOnLoad=true}if(c.autoElementToChange===undefined){c.autoElementToChange=true}if(c.cannotEvalUses===undefined){c.cannotEvalUses=-1}if(c.autoTrigger===undefined){c.autoTrigger=null}if(c.keypressTriggers===undefined){c.keypressTriggers=true}if(c.depend===undefined){c.depend=null}var l=c.condition;if(l){var e=null;if(l instanceof jTAC.Connections.BaseElement){e=l.getElement(false).id}else{if(l instanceof jQuery){if(l.length){e=l.get()[0].id}}else{if((typeof l=="string")&&(l.indexOf("{")==-1)){e=l}}}if(e){var n=document.getElementById(e);if(!n){jTAC.error("Option.condition specifies the id of element ["+e+"]. This element is not found.")}if((n.tagName=="INPUT")&&/^(checkbox)|(radio)$/.test(n.type)){l=jTAC.create("Conditions.CompareToValue",{elementId:e,valueToCompare:true})}else{l=jTAC.create("Conditions.Required",{elementId:e})}}else{l=jTAC.checkAsConditionOrNull(l)}}c.condition=l||null;var h=c.triggers;if(h){h=jTAC.checkAsJquery(h)}if(l&&(c.autoTrigger||((c.autoTrigger==null)&&!h))){var k=[];c.condition.collectConnections(k);var p=jTAC.checkAsJquery(k);h=h?h.add(p):p}c.triggers=h;var m=c.actions;var d=c.actions=[];if(m){if(m instanceof Array){for(var g=0;g<m.length;g++){d.push(jTAC.checkAsAction(m[g]))}}else{d.push(jTAC.checkAsAction(m))}}if(c.actionFnc){var m=jTAC.create("jqActions.UserFunction");m.fnc=jTAC.checkAsFunction(c.actionFnc);d.push(m)}var f=c.elementsToChange;if(f){f=jTAC.checkAsJquery(f)}if(c.autoElementToChange){if(f){f=f.add(this.element)}else{f=this.element}}c.elementsToChange=f;for(var g=0;g<d.length;g++){d[g].prep(this,f)}if(c.depend){c.depend=jTAC.checkAsConditionOrNull(c.depend)}},_setOption:function(c,d){b.Widget.prototype._setOption.apply(this,arguments)},_attachTriggers:function(d){var c=this;d.triggers.each(function(f,g){var h=true;switch(g.tagName){case"INPUT":h=/^(checkbox)|(radio)$/.test(g.type);break;case"TEXTAREA":h=true;break;case"SELECT":h=true;break}if(h){b(g).click(function(i){c._runOne(d)})}else{b(g).change(function(i){c._runOne(d)})}if(d.keypressTriggers){var e=g.tagName=="TEXTAREA";if(!e&&(g.tagName=="INPUT")){e=!/^(checkbox)|(radio)|(button)|(submit)|(image)|(reset)|(range)$/.test(g.type)}if(e){b(g).keyup(function(i){c._runOne(d)})}}})},run:function(c){if(c==null){c=0}this._runOne(this.options[c])},run2:function(){this.run(1)},run3:function(){this.run(2)},runAll:function(){var d=this.options;for(var c=0;c<d.length;c++){this._runOne(d[c])}},_runOne:function(g){var f=this;if(g.actions){if(g.depend){if(!g.depend.canEvaluate()){return}if(g.depend.evaluate()!=1){return}}var c=-1;if(g.condition){if(!g.condition.canEvaluate()){return}c=g.condition.evaluate();if(c==-1){c=g.cannotEvalUses}}else{c=1}if(c!=-1){var d=g.actions;for(var e=0;e<d.length;e++){d[e].run(this,g.elementsToChange,c!=0)}}}}};b.widget("ui.ConditionalActions",a)})(jQuery);function jTAC_ConditionalActionsOptions(){}jTAC_ConditionalActionsOptions.prototype={condition:null,triggers:null,autoTrigger:null,keypressTriggers:true,actions:null,actionFnc:null,elementsToChange:null,autoElementToChange:true,cannotEvalUses:-1,runOnLoad:true,depend:null};jTAC.checkAsJquery=function(c){if(c instanceof jQuery){return c}if(c instanceof Array){var a=$();for(var b=0;b<c.length;b++){a=a.add(jTAC.checkAsJquery(c[b]))}return a}if(c instanceof jTAC.Connections.BaseElement){return $(c.getElement(true))}if(typeof c=="string"){return $(c)}if(c instanceof jTAC.Connections.Base){return $()}jTAC.error("Cannot convert to a jquery object")};