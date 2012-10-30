﻿// jTAC/TypeManagers/PowerDateParser.js
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
Additional licensing:
Portions adapted from the commercial product, Peter's Data Entry Suite v5,
a product from Peter L. Blum who is the author of jTAC.
http://www.peterblum.com/des/home.aspx
Used by permission and covered by the same license as above.
-------------------------------------------------------------
Module: TypeManager objects
Class : TypeManger.PowerDateParser

Purpose:
Parser of text representing date values.

It uses fuzzy logic to overlook minor errors and missing values.
For example, if the user types "Jaxuary" (instead of "January"),
it recognizes the correct month. You can customize how flexible it is
with the properties of the 'options' property of the TypeManager passed to it.

Fuzzy logic cases:
- Automatically handles month names or numbers. If your default DateFormat specifies
  the month name and digits are found in the location, those digits determine the month.
- Matches a partial month name, such as "Ja" for "January". It matches all characters
   typed to the same number of charcters of the first full or abbreviated month name found.
- Fills in missing year and month values with the current date's month and year.
- The user can omit date separator characters. A pattern like 01252012 will
  know its 01/25/2012 when using the MM/dd/yyyy pattern.
- Years can be two digit. They will convert to 2000 or 1900 based on a century break
  rule.
- Automatically detects dates in the culture neutral format of yyyy-MM-dd.
  So this is legal, unless the culture defines a date separator of "-": 2012-01-25.
- Short date pattern allows spaces around the date separators: "01 / 25 / 2012".
- Supports alternative date separators in addition to the culture's date separator character.

You can customize these behaviors with its properties.

Caveats:
- Does not support week days, eras, or anything except day, month and year parts of a date.
  (It does respect literal strings between these parts.)
- The server side code must also be able to handle text that was accepted by this
  in its server side validation and string conversion.
  It is valuable to replace the contents of a textbox that have been parsed here
  with the string generated by the toString() method. This reformatting should
  occur on the textbox's onchange event. The datatypeeditor plugin
  takes advantage of this.
  However, the server side should still anticipate the textbox has not been reformatted.
- If you need a stricter parser, consider using the original classes or write your own.
- The DateFormat property has several values that are unnecessary including those
  that omit the year. They were intended to create a list of patterns that
  Globalize.parseDate() would use, in an attempt to provide a smarter parser.
  DateFormats that are not directly supported will use a fallback format.


Properties introduced by this class:
   defaultYear (int) - When there is no year entered, this is the year to use.
      When not defined, it uses the current year.
   defaultMonth (int) - When there is no month entered, this is the month to use. Specify 0 to 11.
      When not defined, it uses the current year.
   moreDateSeps (string) - User can enter additional date separator characters that are valid as a string. 
      This string consists of those date separator characters. 
      The characters are not delimited. All in the string are separators.
   cultureNeutral (boolean)- 
      When true, the string is checked for the culture neutral format of: yyyy-MM-DD.
      It will always require a 4 digit year, but month and day can be one digit.
      Month names are not allowed and the separator must be "-".
      Cultures that use "-" for there own separator disable this feature.
      It defaults to true.
   monthAllows (int) - 
      When parsing the month,this determines if digits and/or month names are allowed.
      Its values are:
         0 - Allow either digits or month names.
         1 - Digits only
         2 - Month names only, allowing either long or abbreviated names
         3 - Month names only, allowing only abbreviated names
      It defaults to 0.
   monthAsTwoCharName (boolean) -
      When parsing the month and looking for month names, if there is no match 
      to abbreviated or long, try again, matching the first two letters 
      in the text to the first two letters in the abbreviated month name.
      It defaults to true.
   insertDateSeps (boolean) - 
      When using the short DateFormat and there are no date separator characters found,
      insert date separator characters when true.
      It defaults to true.
   trimParts (boolean) -
      When true, spaces are allowed around each part of the date in short date format.
      This does not apply in abbrev and long date formats because spaces are essential to them.
      It defaults to false.
      This does not impact trimming lead and trailing spaces around the entire string. That always happens.

Requires: 
ALWAYS LOAD jTAC.js BEFORE THIS FILE IS LOADED
TypeManagers.Base
TypeManagers.BaseCulture
TypeManagers.BaseDatesAndTimes

----------------------------------------------------------- */
jTAC.require("TypeManagers.BaseDate");

jTAC._internal.temp._TypeManagers_PowerDateParser = {
//   require: ["TypeManagers.BaseDate"],

   constructor: function ( propertyVals ) {
      if (propertyVals != null)
         owner = propertyVals.owner;
   },

   config: {
      defaultYear: null,
      defaultMonth: null,
      moreDateSeps: null,
      cultureNeutral: true,
      monthAllows: 0,
      monthAsTwoCharName : true,
      insertDateSeps : true,
      trimParts : false
   },

   configrules: {
      defaultYear: jTAC.checkAsIntOrNull,
      defaultMonth: jTAC.checkAsIntOrNull,
      moreDateSeps: jTAC.checkAsStrOrNull,
      monthAllows: {
         values: [0, 1, 2, 3],
         clearCache: true
      }
   },

/* REQUIRED to use with jTAC.PluginParser object
Reference to the TypeManager that owns this. It should be based on BaseDatesAndTimes.
*/
   owner: null,


/* REQUIRED to use with jTAC.PluginParser object
   Parses the text to determine the date it represents. Uses fuzzy logic.
   text (string) - text to parse.
   Returns an object with these properties: "d", "M", "y",
   as required by TypeManagers._parseDate(). The value of M is 1-12.
*/
   parse: function (text) {
      var owner = this.owner;
      if (!owner)
         this._error("Must assign the owner field.");
      var r, 
      cnParts, // culture neutral parts. The results of a RegExp where array elements 1, 2 and 3 are y, m, d
      shortDateFmt = owner.getDateFormat() < 10,
      dSep = owner.dateTimeFormat("ShortDateSep"),
      opt = this.config;

      text = jTAC.trimStr(text);

      // if in culture neutral format, yyyy-MM-dd, process using that format.
      // Doesn't matter if DateFormat is abbrev or long
      if (opt.cultureNeutral && (dSep != "-") && (text.indexOf("-") == 4)) {
         var re = this._internal.cnRE;
         if (!re) {
            re = this._internal.cnRE = /^(\d{4})\-(\d{1,2})-(\d{1,2})$/;
         }
         cnParts = re.exec(text);
      }

      if (!cnParts) {

         if (shortDateFmt) {
            // using more Date Separators. If any are found, replace them with the default DateSeparator
            if (opt.moreDateSeps) {
               var re = new RegExp("[" + jTAC.escapeRE(opt.moreDateSeps) + "]", "ig");
               text = text.replace(re, dSep);
            }

            // are spaces around each part allowed? 
            // Note: later, parseInt() is used. It ignores lead spaces as it processes the number.
            // This leads to it always allowing spaces. So this code will eliminate that case when not desired.
            if (!opt.trimParts && (dSep != " ") && /[ ]/.test(text))
               this._inputError("Spaces not allowed");

            // insert date separators if none are present
            if (opt.insertDateSeps && (text.length > 2) && (text.indexOf(dSep) == -1)) {
               text = this._insertDSeps(text);
            }
         }
      }

      var y = 0,
      m = 0,
      d = 0,
      order = owner._patternOrder(true, "dMy"),
      parts,
      partCount = 0,
      i;

      if (cnParts) {
         parts = [cnParts[1], cnParts[2], cnParts[3]];
         order = ["y", "M", "d"];
      }
      else if (shortDateFmt) {
         parts = text.split(dSep);
      }
      else {
         parts = this._splitNonShort(text);
      }

      if (parts.length > order.length) // cannot have more parts than the order allows, but you can have fewer parts than order (because missing values are handled)
         return null;

      for (i = 0; (partCount < parts.length) && (i < order.length); i++) {
         var part = parts[partCount];
         switch (order[i]) {
            case 'd':
               d = parseInt(part, 10);
               if (!isNaN(d) && (d > 0))
                  partCount++;
               else
                  this._inputError("Invalid day number");
               break;

            case 'M':
               if ((parts.length == 1) && (order.length == 3)) break;  // we only have a Day. Don't increment partCount 
               if (m == 0) {
                  if (parts[partCount] == '') {
                     m = 0; // flags the use of opt.defaultYear later
                     partCount++;
                     break;
                  }
                  else {
                     m = this._parseMonth(part);
                  }
                  // because we filter out invalid characters, the only errors are due to empty string and too large a number
                  if (isNaN(m)) {
                     m = 0; // flags the use of opt.defaultYear later
                     partCount++;
                  }
                  else if ((m <= 12) && (m > 0)) {  // exceeds limit. Error
                     partCount++;
                  }
                  else
                     this._inputError("Invalid month");
               }
               break;

            case 'y':
               if ((parts.length < 3) && (order.length == 3)) break;  // we only have a Day and Month. Don't increment partCount 
               if (y == 0) {
                  if (part == '') {
                     y = 0;   // flags the use of opt.defaultYear later
                     break;
                  }
                  else {
                     y = parseInt(part, 10);
                  }
                  var err = "Illegal year";  // to avoid assigning the same text multiple times
                  if (isNaN(y)) {
                     partCount++;
                     this._inputError(err);
                  }
                  else if (y <= 9999) { // if exceeds limit, error
                     if (y < 100) {
                        if (owner.getTwoDigitYear())
                           y += (2000 + y) < owner.dateTimeFormat("TwoDigitYearMax") ? 2000 : 1900;
                        else
                           this._inputError(err);
                     }
                     partCount++;
                  }
                  else
                     this._inputError(err);
               }
               break;

         }  // switch
      }  // for i

      if ((m == 0) && (d == 0) && (y == 0))
         this._inputError("Missing digits");

      // assign defaults to any missing part
      if (m == 0)
         m = this.getDefaultMonth() + 1;
      if (d == 0)
         d = 1;
      if (y == 0)
         y = this.getDefaultYear();

      // check if day was higher than last day of the month
      var vy, vm;
      if (opt.useUTC) {
         r = jTAC.TypeManagers.Base.prototype.asUTCDate(y, m - 1, d);
         vy = r.getUTCFullYear();
         vm = r.getUTCMonth();
      }
      else {
         r = new Date(y, m - 1, d, 0, 0, 0, 0);
         vy = r.getFullYear();
         vm = r.getMonth();
      }


      if ((vy != y) || (vm != (m - 1))) {
         this._inputError("Day exceeds month range");
      }

      return {y: y, M: m, d: d};
   },

   /*
   Converts a string into a month number, from 1 to 12.
   Handles both digit and alphabetic month names.
   It compares names to abbreviated or full month names,
   depending on the date format.
   When there is no match, it returns 0 to indicate an error.
      text (string) - Text to parse
   Returns 1 to 12 or NaN if the caller can use a default month.
   */
   _parseMonth: function (text) {
      var owner = this.owner,
      opt = this.config,
      monthAllows = this.getMonthAllows(),
      chr = text.charAt(0);
      if ((chr >= '0') && (chr <= '9')) {
         if (monthAllows < 2) {
            return parseInt(text, 10);
         }
         this._inputError("Month name required.");
      }
      else {
         if (monthAllows == 1)   // digits are required
            this._inputError("Months must be digits.");
         var dateFormat = owner.getDateFormat();
         if ((monthAllows == 3) && (dateFormat == 20))   // illegal case
            monthAllows = 2;
         var mn = owner.dateTimeFormat("Months");
         var amn = owner.dateTimeFormat("MonthsAbbr");

         var names = this._cache.monthNames;
         if (names === undefined) {
           // short date format is limited to Abbreviated. All others use full unless monthAllows = 3 which means use abbr.
            names = ((dateFormat < 10) || (monthAllows == 3)) ? amn : mn; 
            for (var i = 0; i < names.length; i++)
               names[i] = names[i].toUpperCase();
            this._cache.monthNames = names;
         }
         if (names) {
            var len = text.length;
            text = text.toUpperCase(); // compare uppercase version
            for (var j = 0; j <= 1; j++) { // try twice
               for (var i = 0; i < names.length; i++) {
                  var name = names[i]; // all names are uppercase
                  if (!name)
                     continue;
                  if (len >= name.length) {
                     if (text.indexOf(name) == 0) {
                        if ((monthAllows == 3) && (len > name.length))
                           this._inputError("Full name not allowed");
                        return i + 1;
                     }
                  }
                  else if (name.indexOf(text) == 0) {
                     return i + 1;
                  }
               }  // for i

               if (!opt.monthAsTwoCharName)
                  break;
               // Use 2 character sized text, the abbreviated month names, and try again
               var abbvFmt = dateFormat == 10;
               if ((len > 2) || abbvFmt) {
                  len = 2;
                  text = text.substr(0, 2);
                  if (abbvFmt) // abbrev format should switch to short pattern. Long should not.
                     names = amn;
               }
               else
                  break;   // done

            }  // for j

            return 0;   // not found
         }
         else  // no abbrev months. Cannot convert
            return 0;
      }
   },


   /*
   Creates an array hosting the values of each part of the date (day, month, year)
   Used with abbreviated and long date patterns.
      text (string) - Text to parse
   */
   _splitNonShort: function (text) {
      var i, m, re,
      owner = this.owner;

      // some patterns have a literal between single or double quotes
      // remove that literal
      var ptn = owner._datePattern();
      m = this._removeLiterals(ptn);
      if (m) {
         for (i = 1; i < m.length; i++) {
            if (/^[^'"]/.test(m[i])) {  // ignore those inside quotes. We want inner text
               text = text.replace(m[i], " ");
            }  // for/if
         }
      }

      // use a regex to extract all parts that are digits and/or letters. Allows letters and digits to be side-by-side to handle typos
      // There are cases where month names contain a space. Example: ecuador (qze-EC), which has these month names:
      // "Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi"
      // As a result, it looks for [letters]([space][more letters})? as a pattern.
      re = /([A-Za-z\u00C0-\u7FFF]+([\s'][A-Za-z\u00C0-\u7FFF]+)?)|(\d+)/ig; // NOTE: RE is not cached because it uses global search
      var parts = [];

      for (i = 0; i < 3; i++) {
         m = re.exec(text);   // get next part
         if (m) {
            parts.push(m[0]);
         }
         else if (i == 0)  // no parts is an error
            this._inputError("y/m/d parts not found");
         else // found the last part
            break;
      }  // for

      return parts;

   },


   /*
   Call when there are no date separators present and using the DateFormat=Short. 
   It adds them and returns the updated string. 
      text (string) - Text to parse
   */
   _insertDSeps: function (text) {
      var len = text.length,
      owner = this.owner,
      dateFormat = owner.getDateFormat(),
      letterCnt = 0,  // month letter count
      letterStart = -1,  //month letter start
      f, i;
      if ((dateFormat == 1) || (dateFormat == 2)) {   // when month names are supported (dateFormats 1 and 2), find the start and end of letters in the string
         var f = 0;
         var uc = text.toUpperCase();
         for (var i = 0; i < len; i++) {
            var chr = uc.charAt(i);
            if (!((chr >= '0') && (chr <= '9'))) {  // accept all non-digits as limiting to A..Z doesn't handle international languages
               if (letterStart == -1)
                  letterStart = i;
               letterCnt++;
               f = 1;
            }
            else if (f)
               break;   // passed a sequence of letters
         }  // for
      }  // if 

      var order = owner._patternOrder(true, "dMy");

      var offset = [];
      for (var i = 0; i < order.length - 1; i++) {
         switch (order[i]) {
            case 'd':
               // special case. When d-M-yyyy and M is letters, we know that day is one digit when the first letter
               // of the month name is the 2nd character. This handles nl-NL culture
               if ((i == 0) && (letterStart == 1)) {
                  offset[i] = 1;
               }
               else {
                  offset[i] = 2; // all others assign two digit dates
               }
               break;
            case 'M':
               if (letterCnt > 0) {
                  offset[i] = letterCnt;
               }
               // months are 2 digits if even string length, 1 if odd
               else if (len % 2 == 0) {  // even number of characters
                  offset[i] = 2;
               }
               else {
                  offset[i] = 1;
               }
               break;
            case 'y':
               // years are 0 digits if length is 3-4; 2 if 5-6; 4 if 7-8
               if (len >= 5) {
                  if (len >= 7)
                     offset[i] = 4;
                  else
                     offset[i] = 2;
               }
               break;
         }  // switch
      }  // for i

      // apply the results. If a offset is 0, skip it
      var dSep = owner.dateTimeFormat("ShortDateSep");
      var r = "";
      if (order.length == 3) {
         r = text.substring(0, offset[0]) + dSep + text.substring(offset[0], offset[0] + offset[1]);
         if (len > 4) {
            r = r + dSep + text.substring(offset[0] + offset[1], len + 1);
         }
      }
      else {  // two part date
         if (offset[0] < text.length)
            r = text.substring(0, offset[0]) + dSep + text.substring(offset[0], len + 1);
         else
            r = text;
      }
      return r;

   },

   // Some patterns have a literal between single or double quotes.
   // Gets any literal text inside the date pattern
   // It actually returns a Regex.exec result
   // where result[0] is the quoted result 
   // and result[1] is the unquoted result.
   // Returns null if there is no literal
   _removeLiterals: function (ptn) {
      var re = this._internal.REPtnLit
      if (!re)
         re = this._internal.REPtnLit = /(['"]([^'"]+)['"])(?:[^'"]+(['"]([^'"]+)['"])?)?/;
      return re.exec(ptn);
   },

/* REQUIRED to use with jTAC.PluginParser object
   Returns a string of characters that are valid for this parser.
      orig (string) - the characters already defined by BaseDate._valChars.
         Its value can be modified or replaced.
*/
   valChars: function(orig) {
      return orig;
   },

   /* --- PROPERTY GETTER AND SETTER METHODS ---------------------------
   These members are GETTER and SETTER methods associated with properties
   of this class.
   Not all are defined here. Any that are defined in this.config
   can be setup by the autoGet and autoSet capability. If they are, they 
   will not appear here.
   ---------------------------------------------------------------------*/

/*
Returns the user defined value or today's year
*/
   getDefaultYear: function() {
      var y = this.config.defaultYear;
      if (y == null) {
         var d = new Date();  // current date and time
         y = this.config.defaultYear = d.getFullYear();
      }
      return y;
   },

/*
Returns the user defined value or today's month.
Months are from 0 to 11.
*/
   getDefaultMonth: function() {
      var m = this.config.defaultMonth;
      if (m == null) {
         var d = new Date();  // current date and time
         m = this.config.defaultMonth = d.getMonth();
      }
      return m;
   }

}
jTAC.define("TypeManagers.PowerDateParser", jTAC._internal.temp._TypeManagers_PowerDateParser);

jTAC.plugInParser("TypeManagers.PowerDateParser", "TypeManagers.BaseDate");
