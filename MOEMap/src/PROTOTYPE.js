var globalConfig = globalConfig || {};
if (typeof console == "undefined") {
	window.console = {
		log: function () {}
	};
}
/*Add trim function to String. This function will remove the spaces and tabs in the beginning and ending of a String.*/
if (!('trim' in String.prototype)){   
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); };    
}
/*Add contains function to Array. This function will test whether an Array contains an element or not.*/			
if (!('contains' in Array.prototype)){
	Array.prototype.contains = function(obj) {
		return (this.indexOf(obj) >= 0);
		/*var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;*/
	};
}
/*Add unique function to Array. This function will return the unique elements in an array*/						
if (!('unique' in Array.prototype)){
	Array.prototype.unique = function() {
		var n = [];
		for(var i = 0; i < this.length; i++) {
			if(n.indexOf(this[i]) < 0) {
				n.push(this[i]);
			}
		}
		return n;
	/*
		var a = this.concat();
		for(var i=0; i<a.length; ++i) {
			for(var j=i+1; j<a.length; ++j) {
				if(a[i] === a[j]){
					a.splice(j, 1);
				}
			}
		}
		return a;*/
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisp */){
		"use strict";

		if (this == null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun != "function")
			throw new TypeError();

		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t){
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
					res.push(val);
			}
		}
		return res;
	};
}


// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
	Array.prototype.map = function(callback, thisArg) {

		var T, A, k;

		if (this === null) {
			throw new TypeError(" this is null or not defined");
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (thisArg) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len) where Array is
		// the standard built-in constructor with that name and len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while(k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[ k ];

				// ii. Let mappedValue be the result of calling the Call internal method of callback
				// with T as the this value and argument list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

				// For best browser support, use the following:
				A[ k ] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};      
}			

if ('function' !== typeof Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, opt_initialValue){
    'use strict';
    if (null === this || 'undefined' === typeof this) {
      // At the moment all modern browsers, that support strict mode, have
      // native implementation of Array.prototype.reduce. For instance, IE8
      // does not support strict mode, so this check is actually useless.
      throw new TypeError(
          'Array.prototype.reduce called on null or undefined');
    }
    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }
    var index = 0, length = this.length >>> 0, value, isValueSet = false;
    if (1 < arguments.length) {
      value = opt_initialValue;
      isValueSet = true;
    }
    for ( ; length > index; ++index) {
      if (!this.hasOwnProperty(index)) continue;
      if (isValueSet) {
        value = callback(value, this[index], index, this);
      } else {
        value = this[index];
        isValueSet = true;
      }
    }
    if (!isValueSet) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    return value;
  };
}

Array.range = function (a, b, step) {
    var A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    } else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}

/** Converts numeric degrees to radians http://www.movable-type.co.uk/scripts/latlong.html */
if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

globalConfig.replaceChar =  globalConfig.replaceChar || function(str, charA, charB) {
	var temp = [];
	temp = str.split(charA);
	var result = temp[0];
	if (temp.length >= 2) {
		for (var i = 1; i < temp.length; i++) {
			result = result + charB + temp[i];
		}
	}
	return result;
};
globalConfig.wordCapitalize = globalConfig.wordCapitalize || function (str){
	var strArray = str.trim().split(' ');
	for(var i=0; i < strArray.length; i++) {
				strArray[i] = strArray[i].substring(0,1).toUpperCase() + strArray[i].substring(1,strArray[i].length).toLowerCase();
	}
	return strArray.join(' ');
};
	
globalConfig.convertLatLngtoUTM = globalConfig.convertLatLngtoUTM || function(lat, lng) {
	var pi = 3.14159265358979; //PI
	var a = 6378137; //equatorial radius for WGS 84
	var k0 = 0.9996; //scale factor
	var e = 0.081819191; //eccentricity
	var e_2 = 0.006694380015894481; //e'2
	var A0 = 6367449.146;
	var B0 = 16038.42955;
	var C0 = 16.83261333;
	var D0 = 0.021984404;
	var E0 = 0.000312705;

	var zone = 31 + Math.floor(lng / 6);
	var lat_r = lat * pi / 180.0;
	var t1 = Math.sin(lat_r); // SIN(LAT)
	var t2 = e * t1 * e * t1;
	var t3 = Math.cos(lat_r); // COS(LAT)
	var t4 = Math.tan(lat_r); // TAN(LAT)
	var nu = a / (Math.sqrt(1 - t2));
	var S = A0 * lat_r - B0 * Math.sin(2 * lat_r) + C0 * Math.sin(4 * lat_r) - D0 * Math.sin(6 * lat_r) + E0 * Math.sin(8 * lat_r);
	var k1 = S * k0;
	var k2 = nu * t1 * t3 * k0 / 2.0;
	var k3 = ((nu * t1 * t2 * t2 * t2) / 24) * (5 - t4 * t4 + 9 * e_2 * t3 * t3 + 4 * e_2 * e_2 * t3 * t3 * t3 * t3) * k0;
	var k4 = nu * t3 * k0;
	var k5 = t3 * t3 * t3 * (nu / 6) * (1 - t4 * t4 + e_2 * t3 * t3) * k0;

	//var lng_r = lng*pi/180.0;
	var lng_zone_cm = 6 * zone - 183;
	var d1 = (lng - lng_zone_cm) * pi / 180.0;
	var d2 = d1 * d1;
	var d3 = d2 * d1;
	var d4 = d3 * d1;

	var x = 500000 + (k4 * d1 + k5 * d3);
	var rawy = (k1 + k2 * d2 + k3 * d4);
	var y = rawy;
	if (y < 0) {
		y = y + 10000000;
	}
	var res = {
		Zone: zone,
		Easting: x.toFixed(0),
		Northing: y.toFixed(0)
	};
	return res;
};	

globalConfig.convertUTMtoLatLng = globalConfig.convertUTMtoLatLng || function(zone, north, east) {
	var pi = 3.14159265358979; //PI
	var a = 6378137; //equatorial radius for WGS 84
	var k0 = 0.9996; //scale factor
	var e = 0.081819191; //eccentricity
	var e_2 = 0.006694380015894481; //e'2
	//var corrNorth = north; //North Hemishpe
	var estPrime = 500000 - east;
	var arcLength = north / k0;
	var e_4 = e_2 * e_2;
	var e_6 = e_4 * e_2;
	var t1 = Math.sqrt(1 - e_2);
	var e1 = (1 - t1) / (1 + t1);
	var e1_2 = e1 * e1;
	var e1_3 = e1_2 * e1;
	var e1_4 = e1_3 * e1;

	var C1 = 3 * e1 / 2 - 27 * e1_3 / 32;
	var C2 = 21 * e1_2 / 16 - 55 * e1_4 / 32;
	var C3 = 151 * e1_3 / 96;
	var C4 = 1097 * e1_4 / 512;

	var mu = arcLength / (a * (1 - e_2 / 4.0 - 3 * e_4 / 64 - 5 * e_6 / 256));
	var FootprintLat = mu + C1 * Math.sin(2 * mu) + C2 * Math.sin(4 * mu) + C3 * Math.sin(6 * mu) + C4 * Math.sin(8 * mu);
	var FpLatCos = Math.cos(FootprintLat);
	//var C1_an = e_2*FpLatCos*FpLatCos;
	var FpLatTan = Math.tan(FootprintLat);
	var T1 = FpLatTan * FpLatTan;
	var FpLatSin = Math.sin(FootprintLat);
	var FpLatSin_e = e * FpLatSin;
	var t2 = 1 - FpLatSin_e * FpLatSin_e;
	var t3 = Math.sqrt(t2);
	var N1 = a / t3;
	var R1 = a * (1 - e_2) / (t2 * t3);
	var D = estPrime / (N1 * k0);
	var D_2 = D * D;
	var D_4 = D_2 * D_2;
	var D_6 = D_4 * D_2;
	var fact1 = N1 * FpLatTan / R1;
	var fact2 = D_2 / 2;
	var fact3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e_2) * D_4 / 24;
	var fact4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e_2 - 3 * C1 * C1) * D_6 / 720;
	var lofact1 = D;
	var lofact2 = (1 + 2 * T1 + C1) * D_2 * D / 6;
	var lofact3 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e_2 + 24 * T1 * T1) * D_4 * D / 120;
	var delta_Long = (lofact1 - lofact2 + lofact3) / FpLatCos;
	var zone_CM = 6 * zone - 183;
	var latitude = 180 * (FootprintLat - fact1 * (fact2 + fact3 + fact4)) / pi;
	var longitude = zone_CM - delta_Long * 180 / pi;
	var res = {
		Latitude: latitude.toFixed(8),
		Longitude: longitude.toFixed(8)
	};
	return res;
};
globalConfig.isInsidePolygon = globalConfig.isInsidePolygon || function (gLatLng, poly) {
	var lat = gLatLng.lat();
	var lng = gLatLng.lng();
	var numPoints = poly.length;
	var inPoly = false;
	var j = numPoints - 1;
	for (var i = 0; i < numPoints; i++) {
		var vertex1 = {x: poly[i].lng(), y: poly[i].lat()};
		var vertex2 = {x: poly[j].lng(), y: poly[j].lat()}; //poly[j];

		if (vertex1.x < lng && vertex2.x >= lng || vertex2.x < lng && vertex1.x >= lng) {
			if (vertex1.y + (lng - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < lat) {
				inPoly = !inPoly;
			}
		}

		j = i;
	}
	return inPoly;
};
globalConfig.deciToDegree = globalConfig.deciToDegree || function (degree){
	if(Math.abs(degree) <= 0.1){
		return "N/A";
	}
	var sym = "N";
	if(degree<0){
		degree = -degree;
		sym = globalConfig.westSymbolLang;
	}
	var deg = Math.floor(degree);
	var temp = (degree - deg)*60;
	var minute = Math.floor(temp);
	//var second = Math.floor((temp- minute)*60);
	var second = ((temp- minute)*60).toFixed(0);
	var res = "";
	if(second<1){
		res ="" + deg + globalConfig.degreeSymbolLang + minute + "'";
	}else if(second>58){
		res ="" + deg + globalConfig.degreeSymbolLang + (minute+1) + "'";
	}else{
		res ="" + deg + globalConfig.degreeSymbolLang + minute + "'" + second + "\"";
	}
	return res + sym;
};

/*
 * This function adds HTML tag <br> to a long text and returns it as the results. 
 * When a line has more than 50 letters including spaces, a <br> will be inserted
 * into the first space appears. 
 * 
 * @param text the input text
 * @return the text with <br> inserted or if the length of text is less than 50
 * No <br> is inserted. 
*/	
globalConfig.addBRtoLongText = function (text) {
	var lineCount = 0;
	var readyForBreak = false;
	if (text.length <= 40) {
		return text;
	}
	var textArray = text.split('');
	var result = "";	
	for (var i = 0; i < textArray.length; i++) {
		if (lineCount > 40) {
			readyForBreak = true;
		}
		result = result + textArray[i];
		if ((readyForBreak) && (textArray[i] === " ")) {
			lineCount = 0;
			result = result + "<br>";
			readyForBreak = false;
		}
		lineCount = lineCount + 1;
	}
	return result;
};

globalConfig.processNA = function (str) {
	if (typeof(str) === 'undefined') {
		return "N/A";
	}
	if (str === "null") {
		return "N/A";
	}
	if (str === "Null") {
		return "N/A";
	}
	return str;
};	