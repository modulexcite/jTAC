﻿// jTAC/CalcItems/Max.js
/* -----------------------------------------------------------
JavaScript Types and Conditions ("jTAC")
Copyright (C) 2012  Peter L. Blum

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-------------------------------------------------------------
Module: Calculations
Class : CalcItems.Max
Extends: CalcItems.BaseFunction

Purpose:
Returns the highest valued number from the list passed in.

See \jTAC\CalcItems\Base.js for an overview of CalcItems.

Properties introduced by this class:
None

Parsing calculation expressions:
1) A function named "Max" that a comma delimited list of calculation expressions.
   Max(calculation expression1, calculation expression2, calculation expression3, etc)

   Max("TextBox1", "TextBox2", 100)

2) A function named "Math.Max" to mimic the javascript function of the same name.
   Math.Max(calculation expression1, calculation expression2, calculation expression3, etc)

   Math.Max("TextBox1", "TextBox2", 100)


Requires: 
ALWAYS LOAD jTAC.js BEFORE THIS FILE IS LOADED
CalcItems.Base
CalcItems.BaseFunction

----------------------------------------------------------- */
jTAC._internal.temp._CalcItems_Max = {
   extend: "CalcItems.BaseFunction",

   constructor: function ( propertyVals ) {
      this.callParent( [propertyVals] );

   },


   _func : function (parms) {
      return Math.max.apply(window, parms);
   },

/* ---- PARSER SUPPORT ------------------------------------- */

   _getParseName2: function () {
      return "Math.max";
   }

   /* --- PROPERTY GETTER AND SETTER METHODS ---------------------------
   These members are GETTER and SETTER methods associated with properties
   of this class.
   Not all are defined here. Any that are defined in this.config
   can be setup by the autoGet and autoSet capability. If they are, they 
   will not appear here.
   ---------------------------------------------------------------------*/

}
jTAC.define("CalcItems.Max", jTAC._internal.temp._CalcItems_Max);

if (jTAC.parser)
   jTAC.parser.register("CalcItems.Max");
