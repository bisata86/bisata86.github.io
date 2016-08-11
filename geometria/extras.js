function display(uno,due) {
    ctx.font = "12px Arial";
    var curText = '';
    var curTextTit = '';
    var curcolor = 'black';
    if (uno==undefined) {
    }
    else if(uno[0]=='point') {
        if(askrettaperp1 || askrettapar1)
        curText += 'through this '
        if(askmedium) {
            curText += 'between this '
        }
        if(askmedium2) {
            curText += '...and this '
        }
        if(askline1 || askretta1) {
            curText += 'from this '
        }
        if(askcircle) {
            curText += 'center on this '
        }
        if(askline2 || askcircle2 || askretta2) {
            curText += '...to this '
        }
        if(mainFigure.points[uno[1]][2]!=undefined && mainFigure.points[uno[1]][6]!=undefined) {
            if(mainFigure.points[uno[1]][6].indexOf('-')!=-1)
            curText += 'intersection '
            else if(mainFigure.points[uno[1]][6].indexOf('med')!=-1)
            curText += 'medium '
        }
        curText += 'point'
        if(mainFigure.points[uno[1]][2]!=undefined && mainFigure.points[uno[1]][5]==undefined && mainFigure.points[uno[1]][8]==undefined  && mainFigure.lines[mainFigure.points[uno[1]][2]]!='niente') {
            curText += ' on line'
        }
        else if(mainFigure.points[uno[1]][3]!=undefined & mainFigure.points[uno[1]][3]=='circular') {
            curText += ' on circle '
        }
        if(askrettaperp2 || askrettapar2) {
            curText = 'choose a line'
        }
        if(askmedium || askrettaperp1 || askrettapar1 || askline1) {
            curText += '...'
        }
        if(askpoint) {
            curText = "already a point"
        }
    }
    else if(uno[0]=='line') {
        if(askmedium)
        curText = 'choose the first point'
        else if(askmedium2)
        curText = 'choose the second point'
        else if(askrettaperp1 || askrettapar1) {
        curText = 'trough this line...'
        }
        else if(askrettaperp2)
        curText += '...and parallel to this line'
        else if(askrettapar2)
        curText += '..and perpendicular to this line'
        else if(askpoint)
        curText = 'on this line'
        else if(askline1 || askretta1)
        curText = 'from this line...'
        else if(askcircle)
        curText = 'center on this line...'
        else if(askline2  || askretta2 || askcircle2)
        curText = '...to this line'
        else curText = 'line'
    }
    else if(uno[0]=='circle') {
        if(askmedium)
        curText = 'choose the first point'
        else if(askmedium2)
        curText = 'choose the second point'
        else if(askrettaperp1 || askrettapar1) {
        curText = 'trough this circle...'
        }
        else if(askrettaperp2  || askrettapar2)
        curText = 'choose a line'
        else if(askpoint)
        curText = 'on this circle'
        else if(askline1  || askretta1)
        curText = 'from this circle...'
        else if(askcircle)
        curText = 'center on this circle...'
        else if(askline2 || askretta2 || askcircle2)
        curText = '...to this circle'
        else curText = 'circle'
    }
    else {
        if(askmedium)
        curText = 'choose the first point'
        if(askmedium2)
        curText = 'choose the second point'
        if(askline1 || askretta1)
        curText = 'from here...'
        if(askrettaperp1 || askrettapar1)
        curText = 'trough here...'
        if(askline2 || askretta1 || askretta2 || askcircle2)
        curText = '...to here'
        if(askcircle)
        curText = 'center here...'
        if(askrettaperp2  || askrettapar2)
        curText = 'choose a line'
        if(askpoint)
        curText = 'here'
    }

    if(askmedium || askmedium2)
    curTextTit = 'FIND MEDIUM'
    if(askrettaperp1 || askrettaperp2)
    curTextTit = 'FIND PARALLEL'
    if(askrettapar1 || askrettapar2)
    curTextTit = 'FIND PERPENDICULAR'
    if(askpoint)
    curTextTit = 'DRAW POINT'
    if(askline1 || askline2)
    curTextTit = 'DRAW SEGMENT'
    if(askretta1 || askretta2)
    curTextTit = 'DRAW LINE'
    if(askcircle || askcircle2)
    curTextTit = 'DRAW CIRCLE'

    ctx.fillStyle = curcolor;
    ctx.fillText(curTextTit,due[0]+15,due[1]+10);
    ctx.fillText(curText,due[0]+15,due[1]+25);
    $('.alert').show();
}



function rotate(x, y, xm, ym, a) {
    var cos = Math.cos,
        sin = Math.sin,

        a = a * Math.PI / 180, // Convert to radians because that is what
                               // JavaScript likes

        // Subtract midpoints, so that midpoint is translated to origin
        // and add it in the end again
        xr = (x - xm) * cos(a) - (y - ym) * sin(a)   + xm,
        yr = (x - xm) * sin(a) + (y - ym) * cos(a)   + ym;

    return [xr, yr];
}

function saveTextAsFile()
{
    var textToSave = JSON.stringify(mainFigure);
    var textToSaveAsBlob = new Blob([textToSave], {type:"besaz"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "geo";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];
   // console.log($("#fileToLoad").files[0])
    var fileinterval = setInterval(function(){
        fileToLoad = document.getElementById("fileToLoad").files[0];
        if(fileToLoad==undefined) {
        }
        else {
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent)
            {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                if(textFromFileLoaded != null) {
                    mainFigure = JSON.parse(textFromFileLoaded);
                     drawAll();
                     $("#fileToLoad").remove();
                     $('body').prepend('<input type="file" id="fileToLoad" style="display:none;">')
                }

            };
            fileReader.readAsText(fileToLoad, "UTF-8");
            clearInterval(fileinterval)
        }

    }, 100);

}

var drawLine= function(linea) {
    ctx.beginPath();
    ctx.moveTo(linea[0],linea[1]);
    ctx.lineTo(linea[2],linea[3]);
    ctx.stroke()
}
var drawPoint= function(centerX,centerY,radius,color) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      if(color) ctx.fillStyle = color;
      ctx.fill();
}
var drawCirlce2= function(centerX,centerY,radius) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      //ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
}

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}

function getLineXY(startPt, endPt, extent) {
    var isnegative = extent < 0 ? -1 : 1;
    extent = Math.abs(extent)
    extent = 2
    var dx = endPt[0] - startPt[0];
    var dy = endPt[1] - startPt[1];
    var X = startPt[0] + dx * (extent*isnegative);
    var Y = startPt[1] + dy * (extent*isnegative);
    while((X<canvasWidth && X>0 && Y<canvasHeight && Y>0 ) && extent<150) {
        extent++;
        X = startPt[0] + dx * (extent*isnegative);
        Y = startPt[1] + dy * (extent*isnegative);
    }
    return [X,Y]
}

function ancora(a,b) {
    var ladistanza =  (distanceBetween2(a,b))
    if(ladistanza>20) {
        var puntomedio = medioPoint(a,b);
        collpoints.push(puntomedio);
        ancora(a,puntomedio)
        ancora(b,puntomedio)
    } else return;
}


var collpoints = [];
function IsPointOnLine(linePointA,linePointB,point,retta) {

	var m = (linePointB[1] - linePointA[1]) / (linePointB[0] - linePointA[0]);
    var b = linePointA[1] - m * linePointA[0];
    if(Math.abs(m)>3) {
        if (retta) {
        var o =  getLineXY(linePointA,linePointB,2)
        var u =  getLineXY(linePointA,linePointB,-2)
       collpoints = [o,u];
        }
        else
        collpoints = [linePointA,linePointB];
        ancora(collpoints[collpoints.length-1],collpoints[collpoints.length-2]);
        var ishit = false;
        $.each(collpoints, function( index, el ) {
            if(distanceBetween2(el,point)<10)
            ishit = true;
        });
        return ishit;

    }
    else {
    if ( Math.abs(point[1] - (m*point[0]+b)) < 10){
    	var punomedio = medioPoint(linePointA,linePointB);
    	var dist1 = distanceBetween2(punomedio,linePointA)
    	var dist2 = distanceBetween2(punomedio,point)
            if (retta) return true;
        	if(dist2>dist1 ) {
                //console.log('is on the line: false')
                return false;
            }
        	else {
                //console.log('is on the line: true')
                return true;
            }
    }
    //console.log('is on the line: false')
    return false;
    }
}
function medioPoint(a,b) {
	return [(b[0]+a[0])/2,(b[1]+a[1])/2];
}
function distanceBetween2(f,s) {
	var x1 = f[0];
	var y1 = f[1];
	var x2 =  s[0];
	var y2 =  s[1];
	return  Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};
function findCircleLineIntersections(r, h, k, m, b) {
 	var A,B,C;
    A = 1 + m * m;
    B = -2 * h + 2 * m * b - 2 * k * m;
    C = h * h + b * b + k * k - 2 * k * b - r * r;
    delta = B * B - 4 * A * C;
    if (delta < 0) {
        console.log("No points of intersections");
        return false;
    }
    if (delta >= 0) {
        x1 = (-B + Math.sqrt(delta)) / (2 * A);
        x2 = (-B - Math.sqrt(delta)) / (2 * A);
        y1 = m * x1 + b;
        y2 = m * x2 + b;
        return [[x1,y1],[x2,y2]];
    }
}
function findCircleCircleIntersections(h1,k1,r1,h2,k2,r2) {
    a = -(k1 - k2) / (h1 - h2);
    b = 2 * (h1 - h2);
    c = (-r1 * r1 + r2 * r2 + h1 * h1 - h2 * h2 + k1 * k1 - k2 * k2) / b;
    A = a * a + 1;
    B = 2 * a * c - 2 * h1 * a - 2 * k1;
    C = c * c + h1 * h1 - 2 * h1 * c + k1 * k1 - r1 * r1;
    delta = B * B - 4 * A * C;
    0 <= delta ? (y1 = (-B + Math.sqrt(delta)) / (2 * A), x1 = a * y1 + c, y2 = (-B - Math.sqrt(delta)) / (2 * A), x2 = a * y2 + c, x1 = x1, y1 = y1, x2 = x2, y2 =
        y2, result = [[x1,y1],[x2,y2]]) : result = false;
    return result

}
function coefficientFromFraction(d, e) {
    var f, g, h = "",
        k;
    f = parseFloat(d[0]);
    g = parseFloat(d[1]);
    0 == f && (k = "0");
    0 == g && (k = NaN);
    if (0 != f && 0 != g) {
        0 > f * g && (h = "-");
        0 < f * g && (h = "+");
        0 < f * g && 1 == e && (h = "");
        if (1 == g || -1 == g) k = h + Math.abs(f).toString();
        1 != g && -1 != g && (k = h + "\\dfrac{" + Math.abs(f).toString() + "}{" + Math.abs(g).toString() + "}")
    }
    return k
}
function constructFraction(d) {
    var e, f; - 1 == d.indexOf(".") && -1 == d.indexOf("/") && (e = simplifyFraction(parseFloat(d), 1)); - 1 != d.indexOf(".") && -1 == d.indexOf("/") && (e = retr_dec(d), f = parseFloat(d) * Math.pow(10, e), e = simplifyFraction(f, Math.pow(10, e))); - 1 == d.indexOf(".") && -1 != d.indexOf("/") && (d = d.split("/"), e = simplifyFraction(parseFloat(d[0]), parseFloat(d[1])));
    return e
}
function retr_dec(d) {
    return (d.split(".")[1] || []).length
}

function addFractions(d, e) {
    return simplifyFraction(d[0] * e[1] + e[0] * d[1], d[1] * e[1])
}

function subtractFractions(d, e) {
    return simplifyFraction(d[0] * e[1] - e[0] * d[1], d[1] * e[1])
}

function multiplyFractions(d, e) {
    return simplifyFraction(d[0] * e[0], d[1] * e[1])
}

function divideFractions(d, e) {
    return simplifyFraction(d[0] * e[1], d[1] * e[0])
}

function findGCF(d, e) {
    d = Math.abs(d);
    e = Math.abs(e);
    if (0 == d) return e;
    for (; 0 != e;) {
        var f = e;
        e = d % e;
        d = f
    }
    return d
}
var waypoint = function (start, end, q) {
    return [start[0] + (end[0] - start[0]) * q,start[1] + (end[1] - start[1]) * q];
}
function simplifyFraction(d, e) {
    var f, g, h = findGCF(d, e);
    f = d / h;
    g = e / h;
    0 > f && 0 > g && (f = -d / h, g = -e / h);
    return [f, g]
};
function find_angle(p0,p1,c) {
    var p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+
                        Math.pow(c.y-p0.y,2)); // p0->c (b)
    var p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+
                        Math.pow(c.y-p1.y,2)); // p1->c (a)
    var p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+
                         Math.pow(p1.y-p0.y,2)); // p0->p1 (c)
    return Math.acos((p1c*p1c+p0c*p0c-p0p1*p0p1)/(2*p1c*p0c));
}
function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}