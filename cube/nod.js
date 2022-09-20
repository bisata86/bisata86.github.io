var cube = {
	f1 : ["r","r","r","r"],
	f2 : ["b","b","b","b"],
	f3 : ["w","w","w","w"],
	f4 : ["y","y","y","y"],
	f5 : ["g","g","g","g"],
	f6 : ["o","o","o","o"],
	// f1 : ["r","y","b","o"],
	// f2 : ["r","y","b","o"],
	// f3 : ["r","y","b","o"],
	// f4 : ["r","y","b","o"],
	// f5 : ["r","y","b","o"],
	// f6 : ["r","y","b","o"],
}

function movea() {
	var temp1 = cube.f1[1];
	var temp2 = cube.f1[3];
	cube.f1[1] = cube.f5[1];
	cube.f1[3] = cube.f5[3];
	cube.f5[1] = cube.f3[2];
	cube.f5[3] = cube.f3[0];
	cube.f3[2] = cube.f6[1];
	cube.f3[0] = cube.f6[3];
	cube.f6[1] = temp1;
	cube.f6[3] = temp2;
	var temp3 = cube.f2[0];
	cube.f2[0] = cube.f2[1];
	cube.f2[1] = cube.f2[3];
	cube.f2[3] = cube.f2[2];
	cube.f2[2] = temp3;
}
function moveb() {
	var temp1 = cube.f1[0];
	var temp2 = cube.f1[2];
	cube.f1[0] = cube.f5[0];
	cube.f1[2] = cube.f5[2];
	cube.f5[0] = cube.f3[3];
	cube.f5[2] = cube.f3[1];
	cube.f3[3] = cube.f6[0];
	cube.f3[1] = cube.f6[2];
	cube.f6[0] = temp1;
	cube.f6[2] = temp2;
	var temp3 = cube.f4[0];
	cube.f4[0] = cube.f4[2];
	cube.f4[2] = cube.f4[3];
	cube.f4[3] = cube.f4[1];
	cube.f4[1] = temp3;
}
function movec() {
	var temp1 = cube.f1[0];
	var temp2 = cube.f1[1];
	cube.f1[0] = cube.f4[0];
	cube.f1[1] = cube.f4[1];
	cube.f4[0] = cube.f3[0];
	cube.f4[1] = cube.f3[1];
	cube.f3[0] = cube.f2[0];
	cube.f3[1] = cube.f2[1];
	cube.f2[0] = temp1;
	cube.f2[1] = temp2;
	var temp3 = cube.f5[0];
	cube.f5[0] = cube.f5[1];
	cube.f5[1] = cube.f5[3];
	cube.f5[3] = cube.f5[2];
	cube.f5[2] = temp3;
}
function moved() {
	var temp1 = cube.f1[2];
	var temp2 = cube.f1[3];
	cube.f1[2] = cube.f4[2];
	cube.f1[3] = cube.f4[3];
	cube.f4[2] = cube.f3[2];
	cube.f4[3] = cube.f3[3];
	cube.f3[2] = cube.f2[2];
	cube.f3[3] = cube.f2[3];
	cube.f2[2] = temp1;
	cube.f2[3] = temp2;
	var temp3 = cube.f6[0];
	cube.f6[0] = cube.f6[2];
	cube.f6[2] = cube.f6[3];
	cube.f6[3] = cube.f6[1];
	cube.f6[1] = temp3;
}
var positions = [];
var moves = 0
var solved = 0
var alreadythere = 0

//$( document ).ready(function() {
	//drawCube();
		//var interval = setInterval(function(){ 
		while(moves<200000) {
			var randomint = random();
			if(randomint==0) movea();
			if(randomint==1) moveb();
			if(randomint==2) movec();
			if(randomint==3) moved();
			moves++;
			//drawCube();
			if(
				cube.f1[0]==cube.f1[1] && cube.f1[1]==cube.f1[2]  && cube.f1[2]==cube.f1[3] &&
				cube.f2[0]==cube.f2[1] && cube.f2[1]==cube.f2[2]  && cube.f2[2]==cube.f2[3] &&
				cube.f3[0]==cube.f3[1] && cube.f3[1]==cube.f3[2]  && cube.f3[2]==cube.f3[3] &&
				cube.f4[0]==cube.f4[1] && cube.f4[1]==cube.f4[2]  && cube.f4[2]==cube.f4[3] &&
				cube.f5[0]==cube.f5[1] && cube.f5[1]==cube.f5[2]  && cube.f5[2]==cube.f5[3] &&
				cube.f6[0]==cube.f6[1] && cube.f6[1]==cube.f6[2]  && cube.f6[2]==cube.f6[3]
				) {
				solved++
				//$('.solved span').html(solved)
			}
			// else {
			// 	positions.push(JSON.stringify(cube))
			// 	console.log(moves,randomint)
			// }
			var current = JSON.stringify(cube);
			if(positions.indexOf(current)==-1) {
				positions.push(current);
				//console.log(positions.length)
				//$('.positions span').html(positions.length)
			} else {
				alreadythere++
				//console.log("there")
			}
			// $('.tries span').html(moves)
			// $('.alreadythere span').html(alreadythere + ' ' + (100*alreadythere/moves).toFixed(2)+'%')
			// $('.positions span').html(positions.length+ ' '+(100*positions.length/moves).toFixed(2)+'%')
		}
		console.log(positions.length)
		console.log((100*alreadythere/moves).toFixed(2)+'%')
		console.log((100*positions.length/moves).toFixed(2)+'%')
		//}, 0);

//});

function mapColors(col) {
	if(col=='y') {
		return "yellow";
	}
	else if(col=='r') {
		return "red";
	}
	else if(col=='w') {
		return "white";
	}
	else if(col=='o') {
		return "orange";
	}
	else if(col=='b') {
		return "blue";
	}
	else {
		return "green";
	}
}

function drawCube() {
	var counter = 0;
	for (var i in cube) {
		
		//console.log(i)
		for (var k in cube[i]) {
			//console.log(k)
			$('#shape > div').eq(counter).find("div").eq(k).css("background",mapColors(cube[i][k]));
			//console.log(cube[i][k])
		}
		counter++;
	}
	//$('#shape > div').eq(0).find("div").eq(2).css("background","green");
} 

function random()
{
	var a = Math.floor(Math.random()*(3-0+1)+0);
    return a;
}

// $(document).ready(function(){
// 			$('button').click(function(){
// 				$('button').removeClass('active');
// 				$(this).addClass('active');
// 			});
// 			$('.ft').click(function(){ $('#shape').removeClass().addClass('show-ft'); });
// 			$('.rt').click(function(){ $('#shape').removeClass().addClass('show-rt'); });
// 			$('.bk').click(function(){ $('#shape').removeClass().addClass('show-bk'); });
// 			$('.lt').click(function(){ $('#shape').removeClass().addClass('show-lt'); });
// 			$('.tp').click(function(){ $('#shape').removeClass().addClass('show-tp'); });
// 			$('.bm').click(function(){ $('#shape').removeClass().addClass('show-bm'); });
			
// 			$('.zi').click(function(){ $('#shape').removeClass('zi').addClass('zi'); });
// 			$('.zo').click(function(){ $('#shape').removeClass('zi'); });

// 			$('.movea').click(function(){ movea(); drawCube();});
// 			$('.moveb').click(function(){ moveb(); drawCube();});
// 			$('.movec').click(function(){ movec(); drawCube();});
// 			$('.moved').click(function(){ moved(); drawCube();});
			
// 			$('.spinstart').click(function(){ $('#shape').addClass('spin'); });
// 			$('.spinstop').click(function(){ $('#shape').removeClass('spin'); });
// 		});