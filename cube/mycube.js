var cube = {
	// f1 : ["w","b","g","y"],
	// f2 : ["b","v","y","r"],
	// f3 : ["v","n","r","o"],
	// f4 : ["n","w","o","g"],
	// f5 : ["n","v","w","b"],
	// f6 : ["g","y","o","r"],
	f1 : ["r","r","r","r"],
	f2 : ["b","b","b","b"],
	f3 : ["o","o","o","o"],
	f4 : ["g","g","g","g"],
	f5 : ["w","w","w","w"],
	f6 : ["y","y","y","y"],
}
var totalmoves = 0;
function moveai() {
	movea();
	movea();
	movea();
}
function movea() {
	totalmoves++;
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
function movebi() {
	totalmoves++
	moveb();
	moveb();
	moveb();
}
function moveb() {
	totalmoves++
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
function moveci() {
	totalmoves--
	totalmoves--
	movec();
	movec();
	movec();
}
function movec() {
	totalmoves++
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
function movedi() {
	totalmoves--
	totalmoves--
	moved();	
	moved();
	moved();
}
function moved() {
	totalmoves++
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
function moveei() {
	totalmoves--
	totalmoves--
	movee();	
	movee();
	movee();
}
function movee() {
	totalmoves++
	var temp1 = cube.f4[1];
	var temp2 = cube.f4[3];
	cube.f4[1] = cube.f5[3];
	cube.f4[3] = cube.f5[2];
	cube.f5[3] = cube.f2[2];
	cube.f5[2] = cube.f2[0];
	cube.f2[2] = cube.f6[0];
	cube.f2[0] = cube.f6[1];
	cube.f6[0] = temp1;
	cube.f6[1] = temp2;
	var temp3 = cube.f1[0];
	cube.f1[0] = cube.f1[1];
	cube.f1[1] = cube.f1[3];
	cube.f1[3] = cube.f1[2];
	cube.f1[2] = temp3;
}
function movefi() {
	totalmoves--
	totalmoves--
	movef();	
	movef();
	movef();
}
function movef() {
	totalmoves++
	var temp1 = cube.f4[0];
	var temp2 = cube.f4[2];
	cube.f4[0] = cube.f5[1];
	cube.f4[2] = cube.f5[0];
	cube.f5[1] = cube.f2[3];
	cube.f5[0] = cube.f2[1];
	cube.f2[3] = cube.f6[2];
	cube.f2[1] = cube.f6[3];
	cube.f6[3] = temp2;
	cube.f6[2] = temp1;

	var temp3 = cube.f3[0];
	cube.f3[0] = cube.f3[2];
	cube.f3[2] = cube.f3[3];
	cube.f3[3] = cube.f3[1];
	cube.f3[1] = temp3;
}

$( document ).ready(function() {
	drawCube();
});

function scrumble() {
		var positions = [];
var moves = 0
var solved = 0
var alreadythere = 0
			var interval = setInterval(function(){ 
		//while(moves<0) {
			var randomint = random();
			if(randomint==0) movea();
			if(randomint==1) moveb();
			if(randomint==2) movec();
			if(randomint==3) moved();
			moves++;
			drawCube();
			if(
				cube.f1[0]==cube.f1[1] && cube.f1[1]==cube.f1[2]  && cube.f1[2]==cube.f1[3] &&
				cube.f2[0]==cube.f2[1] && cube.f2[1]==cube.f2[2]  && cube.f2[2]==cube.f2[3] &&
				cube.f3[0]==cube.f3[1] && cube.f3[1]==cube.f3[2]  && cube.f3[2]==cube.f3[3] &&
				cube.f4[0]==cube.f4[1] && cube.f4[1]==cube.f4[2]  && cube.f4[2]==cube.f4[3] &&
				cube.f5[0]==cube.f5[1] && cube.f5[1]==cube.f5[2]  && cube.f5[2]==cube.f5[3] &&
				cube.f6[0]==cube.f6[1] && cube.f6[1]==cube.f6[2]  && cube.f6[2]==cube.f6[3]
				) {
				solved++
				$('.solved span').html(solved)
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
			if(moves>1000) {
				clearInterval(interval)
				drawCube();
			}
			$('.tries span').html(moves)
			$('.alreadythere span').html(alreadythere + ' ' + (100*alreadythere/moves).toFixed(2)+'%')
			$('.positions span').html(positions.length+ ' '+(100*positions.length/moves).toFixed(2)+'%')
		//}
		},0);
}

function solve() {
	totalmoves = 0;
	solveCorner2();
}

function solveCorner2() {
	var corners = [];
	var myref = [cube.f5[3],cube.f1[1],cube.f2[0]]
	var corner2 = [cube.f5[1],cube.f3[0],cube.f2[1]]
	var corner3 = [cube.f5[0],cube.f4[0],cube.f3[1]]
	var corner4 = [cube.f5[2],cube.f4[1],cube.f1[0]]
	var corner5 = [cube.f6[1],cube.f1[3],cube.f2[2]]
	var corner6 = [cube.f6[3],cube.f2[3],cube.f3[2]]
	var corner7 = [cube.f6[2],cube.f4[2],cube.f3[3]]
	var corner8 = [cube.f6[0],cube.f4[3],cube.f1[2]]
	corners.push(corner2,corner3,corner4,corner5,corner6,corner7,corner8)
	// console.log("my corner: "+myref)
	// console.log("solve corner 2");
	for (var i = 0; i < corners.length; i++) {
		//console.log(corners[i])
		if(corners[i].indexOf(myref[0])!=-1 &&
			corners[i].indexOf(theOpposite(myref[1]))!=-1 &&
			corners[i].indexOf(myref[2])!=-1
		) {
			//console.log("found the corner 2: "+corners[i])
			// console.log(i)
			// console.log(corners[i])
			break;
		}
	}
	if(i==0) {
		//console.log('state 1');
		drawCube();
		corner2step2Procedure()
	}
	if(i==1) {
		//console.log('state 3');
		movefi();
		solveCorner2();
	}
	if(i==2) {
		//console.log('state 4');
		movebi();
		movefi();
		solveCorner2();
	}
	if(i==4) {
		//console.log('state 2');
		drawCube();
		corner2step2Procedure();
	}
	if(i==3 || i==5 || i==6) {
		//console.log('somewhere else in the bottom layer');
		moved();
		solveCorner2();

	}


}
function corner2step2Procedure() {
	if(cube.f5[3]==cube.f5[1] && cube.f2[0]==cube.f2[1]) {
		//console.log("corner 2 solved");
		drawCube();
		solveCorner3();
	} else {
		//console.log("step 2 procedure")
		movefi();
		movedi();
		movef();
		moved();
		drawCube();
		corner2step2Procedure();
	}
}
function solveCorner3() {
	var corners = [];
	var myref = [cube.f5[1],cube.f3[0],cube.f2[1]]
	var corner2 = [cube.f5[0],cube.f4[0],cube.f3[1]]
	var corner3 = [cube.f5[2],cube.f4[1],cube.f1[0]]
	var corner4 = [cube.f6[1],cube.f1[3],cube.f2[2]]
	var corner5 = [cube.f6[3],cube.f2[3],cube.f3[2]]
	var corner6 = [cube.f6[2],cube.f4[2],cube.f3[3]]
	var corner7 = [cube.f6[0],cube.f4[3],cube.f1[2]]
	corners.push(corner2,corner3,corner4,corner5,corner6,corner7)
	for (var i = 0; i < corners.length; i++) {
		if(corners[i].indexOf(myref[0])!=-1 &&
			corners[i].indexOf(theOpposite(myref[2]))!=-1 &&
			corners[i].indexOf(myref[1])!=-1
		) {
			break;
		}
	}
	//console.log(corners[i])
	//console.log("step 3 procedure")
	if(i==0) {
		//console.log("state 1")
		corner3step2Procedure();
	}
	if(i==4) {
		//console.log("state 2");
		corner3step2Procedure();
	}
	if(i==2 || i==3 || i==5 ) {
		//console.log("somewhere in the bottom layer")
		moved();
		solveCorner3();
	}
	if(i==1 ) {
		//console.log("in the top layer")
		movebi();
		solveCorner3();
	}
}

function corner3step2Procedure() {
	if(cube.f5[0]==cube.f5[1] && cube.f3[0]==cube.f3[1]) {
		//console.log("corner 3 solved");
		drawCube();
		solveCorner4();
	} else {
		movebi();
		movedi();
		moveb();
		moved();
		corner3step2Procedure();
	}
}

function solveCorner4() {
	var corners = [];
	var myref = [cube.f5[0],cube.f3[1],cube.f4[0]]
	var corner2 = [cube.f5[2],cube.f4[1],cube.f1[0]]//[cube.f5[0],cube.f4[0],cube.f3[1]]
	var corner3 = [cube.f6[1],cube.f1[3],cube.f2[2]]
	var corner4 = [cube.f6[3],cube.f2[3],cube.f3[2]]
	var corner5 = [cube.f6[2],cube.f4[2],cube.f3[3]]
	var corner6 = [cube.f6[0],cube.f4[3],cube.f1[2]]
	corners.push(corner2,corner3,corner4,corner5,corner6)
	for (var i = 0; i < corners.length; i++) {
		if(corners[i].indexOf(myref[0])!=-1 &&
			corners[i].indexOf(theOpposite(myref[1]))!=-1 &&
			corners[i].indexOf(myref[2])!=-1
		) {
			break;
		}
	}
	//console.log(corners[i])
	//console.log("step 4 procedure")
	if(i==0) {
		//console.log("state 1")
		corner4step2Procedure();
	}
	if(i==4) {
		//console.log("state 2")
		corner4step2Procedure();
	}
	if(i==1 || i==2 || i==3 ) {
		//console.log("somewhere in the bottom layer")
		moved();
		solveCorner4();
	}
}
function corner4step2Procedure() {
	if(cube.f5[0]==cube.f5[2]) {
		//console.log("corner 4 solved");
		solveOppositeLayer();
		drawCube();
	} else {
		movee();
		movedi();
		moveei();
		moved();
		corner4step2Procedure();
	}
}

function solveOppositeLayer() {
	var mb = theOpposite(cube.f5[0])
	//console.log("must be "+mapColors(mb))


	// for (var i in cube) {
	// 	for (var j in cube[i]) {
	// 		if(cube[i][j]!=mb) cube[i][j] = "v"
	// 	}
	// }
	drawCube();

	if(cube.f6[0] == cube.f6[1] && cube.f6[1] == cube.f6[2] && cube.f6[2] == cube.f6[3] && cube.f6[3] == mb) {
		//console.log("opposite layer solved");
		//window.location.reload()
		tryToRotate();
	} else {

		if(cube.f6[0]==mb && cube.f1[3]==mb && cube.f3[3]==mb && cube.f2[3]==mb) {
			//console.log("case 4 (1) tested");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();
		}
		else if(cube.f6[1]==mb && cube.f4[3]==mb && cube.f3[3]==mb && cube.f2[3]==mb) {
			//console.log("case 4 (2) tested");
			//contrario;
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()
		}
		else if(cube.f6[2]==mb && cube.f4[3]==mb && cube.f1[3]==mb && cube.f2[3]==mb) {
			//console.log("case 4 (3) totest")
			// dritto
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();
		}
		else if(cube.f6[3]==mb && cube.f4[3]==mb && cube.f1[3]==mb && cube.f3[3]==mb) {
			//console.log("case 4 (4) to test")
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();

		}
		else if(cube.f6[0]==mb && cube.f4[2]==mb && cube.f3[2]==mb && cube.f2[2]==mb) {
			//console.log("case 1 (1) tested");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();
		}
		else if(cube.f6[1]==mb && cube.f4[2]==mb && cube.f3[2]==mb && cube.f1[2]==mb) {
			//console.log("case 1 (2) tested");
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()

		}
		else if(cube.f6[2]==mb && cube.f1[2]==mb && cube.f3[2]==mb && cube.f1[2]==mb) {
			//console.log("case 1 (3) tested");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();

		}
		else if(cube.f6[3]==mb && cube.f4[2]==mb && cube.f1[2]==mb && cube.f2[2]==mb) {
			//console.log("case 1 (4) tested");
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if( (cube.f6[0]!=mb && cube.f6[1]!=mb && cube.f6[2]!=mb && cube.f6[3]!=mb) && cube.f1[2]==mb && cube.f1[3]==mb && cube.f3[2]==mb && cube.f3[3]==mb  ) {
			//console.log("case 2 (1) to test")
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if( (cube.f6[0]!=mb && cube.f6[1]!=mb && cube.f6[2]!=mb && cube.f6[3]!=mb) && cube.f2[2]==mb && cube.f2[3]==mb && cube.f4[2]==mb && cube.f4[3]==mb  ) {
			//console.log("case 2 (2) tested");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();		
		}
		else if(cube.f1[2]==mb && cube.f1[3]==mb && cube.f2[3]==mb && cube.f4[2]==mb) {
			//console.log("case 3 (1)");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();
		}
		else if(cube.f2[2]==mb && cube.f2[3]==mb && cube.f1[2]==mb && cube.f3[3]==mb) {
			//console.log("case 3 (2) to test");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();

		}
		else if(cube.f3[2]==mb && cube.f3[3]==mb && cube.f2[2]==mb && cube.f4[3]==mb) {
			//console.log("case 3 (3) to test");
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()
		}
		else if(cube.f4[2]==mb && cube.f4[3]==mb && cube.f1[3]==mb && cube.f3[2]==mb) {
			//console.log("case 3 (4) tested");
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if(cube.f6[0]==mb && cube.f6[1]==mb && cube.f2[3]==mb && cube.f4[2]==mb) {
			//console.log("case 5 (1) tested");
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if(cube.f6[1]==mb && cube.f6[3]==mb && cube.f1[2]==mb && cube.f3[3]==mb) {
			//console.log("case 5 (2) to test");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();
		}
		else if(cube.f6[0]==mb && cube.f6[2]==mb && cube.f1[3]==mb && cube.f3[2]==mb) {
			//console.log("case 5 (3) tested");
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()
		}
		else if(cube.f6[2]==mb && cube.f6[3]==mb && cube.f4[3]==mb && cube.f2[2]==mb) {
			//console.log("case 5 (4) to test");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();
		}
		else if(cube.f6[0]==mb && cube.f6[1]==mb && cube.f3[2]==mb && cube.f3[3]==mb) {
			//console.log("case 6 (1) tested");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();
		}
		else if(cube.f6[1]==mb && cube.f6[3]==mb && cube.f4[3]==mb && cube.f4[2]==mb) {
			//console.log("case 6 (2) to test");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();

		}
		else if(cube.f6[0]==mb && cube.f6[2]==mb && cube.f2[3]==mb && cube.f2[2]==mb) {
			//console.log("case 6 (3) to test");
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if(cube.f6[2]==mb && cube.f6[3]==mb && cube.f1[3]==mb && cube.f1[2]==mb) {
			//console.log("case 6 (4) to test");
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()
		}
		else if(cube.f6[0]==mb && cube.f6[3]==mb && cube.f2[2]==mb && cube.f3[3]==mb) {
			//console.log("case 7 (1) to test");
			moveai();
			moved();
			movea();
			moved();
			moveai();
			moved();
			moved();
			movea();
			solveOppositeLayer();

		}
		else if(cube.f6[0]==mb && cube.f6[3]==mb && cube.f1[3]==mb && cube.f4[2]==mb) {
			//console.log("case 7 (2) tested");
			moveb();
			moved();
			movebi();
			moved();
			moveb();
			moved();
			moved();
			movebi();
			solveOppositeLayer()
		}
		else if(cube.f6[1]==mb && cube.f6[2]==mb && cube.f1[2]==mb && cube.f2[3]==mb) {
			//console.log("case 7 (3) tested");
			moveei();
			moved();
			movee();
			moved();
			moveei();
			moved();
			moved();
			movee();
			solveOppositeLayer();
		}
		else if(cube.f6[1]==mb && cube.f6[2]==mb && cube.f3[2]==mb && cube.f4[3]==mb) {
			//console.log("case 7 (4) to test");
			movef();
			moved();
			movefi();
			moved();
			movef();
			moved();
			moved();
			movefi();
			solveOppositeLayer();
		}
		else {
			//console.log("not handled")
			alert("male")
		}

	}
}
function tryToRotate() {
	if(!isSolved()) {
		movec();
	}
	if(!isSolved()) {
		movec();
	}
	if(!isSolved()) {
		movec();
	}
	if(isSolved()) {
		//window.location.reload();
		end()
	}
	else {
		movec();
		var max = 0
		var isaved = 0;
		for (var i = 0; i < 4; i++) {
			if(countFaceCompleted()>max) {
				max = countFaceCompleted();
				isaved = i
			}
			movec();
		}
		for (var i = 0; i < isaved; i++) {
			movec();
		}
		drawCube();
		if (max == 0) {
			console.log("angoli opposti")
			while(cube.f1[0]!=cube.f1[3]) {
				movec();
			}
			movebi();
			moveei();
			movebi();
			movef();
			movef();
			moveb();
			movee();

			movebi();
			movef();
			movef();
			moveb();
			moveb();
			tryToRotate()
			
		} else {
			if(cube.f1[3]!=cube.f1[2] && cube.f2[2]==cube.f4[3]) {
				// dritto
				movebi();
				moveei();
				movebi();
				movef();
				movef();
				moveb();
				movee();

				movebi();
				movef();
				movef();
				moveb();
				moveb();
				moved();
				
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				drawCube();

			} else if(cube.f2[3]!=cube.f2[2] && cube.f1[3]==cube.f3[2]) {
				movee();
				moveai();
				movee();
				moveb();
				moveb();
				moveei();
				movea();

				movee();
				moveb();
				moveb();
				moveei();
				moveei();
				moved();
				
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				drawCube();
			} else if(cube.f3[3]!=cube.f3[2] && cube.f2[3]==cube.f4[2]) {
				movea();
				movef();
				movea();
				moveei();
				moveei();
				moveai();
				movefi();

				movea();
				moveei();
				moveei();
				moveai();
				moveai();
				moved();
				
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				drawCube();
				//window.location.reload();
			} else if(cube.f4[3]!=cube.f4[2] && cube.f1[2]==cube.f3[3]) {
				movefi();
				moveb();
				movefi();
				moveai();
				moveai();
				movef();
				movebi();

				movefi();
				moveai();
				moveai();
				movef();
				movef();
				moved();
				
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				if(!isSolved()) {
					movec();
				}
				drawCube();				
			}
			
			if(isSolved()) {
					//window.location.reload();
					end()
			}
		}
		//window.location.reload();
	}
}
function end() {
	console.log("fine")
	console.log(totalmoves)
	// window.location.reload();
}
function countFaceCompleted() {
	var count = 0
	if(cube.f1[0] == cube.f1[1] && cube.f1[1] == cube.f1[2] && cube.f1[2] == cube.f1[3] && cube.f1[1] == cube.f1[3]) {
		count++
	}
	if(cube.f2[0] == cube.f2[1] && cube.f2[1] == cube.f2[2] && cube.f2[2] == cube.f2[3] && cube.f2[1] == cube.f2[3]) {
		count++
	}
	if(cube.f3[0] == cube.f3[1] && cube.f3[1] == cube.f3[2] && cube.f3[2] == cube.f3[3] && cube.f3[1] == cube.f3[3]) {
		count++
	}
	if(cube.f4[0] == cube.f4[1] && cube.f4[1] == cube.f4[2] && cube.f4[2] == cube.f4[3] && cube.f4[1] == cube.f4[3]) {
		count++
	}
	return count;
}
function isSolved() {
	if(cube.f1[0] == cube.f1[1] && cube.f1[1] == cube.f1[2] && cube.f1[2] == cube.f1[3] && cube.f1[1] == cube.f1[3]) {
		if(cube.f2[0] == cube.f2[1] && cube.f2[1] == cube.f2[2] && cube.f2[2] == cube.f2[3] && cube.f2[1] == cube.f2[3]) {
			if(cube.f3[0] == cube.f3[1] && cube.f3[1] == cube.f3[2] && cube.f3[2] == cube.f3[3] && cube.f3[1] == cube.f3[3]) {
				if(cube.f4[0] == cube.f4[1] && cube.f4[1] == cube.f4[2] && cube.f4[2] == cube.f4[3] && cube.f4[1] == cube.f4[3]) {
					if(cube.f5[0] == cube.f5[1] && cube.f5[1] == cube.f5[2] && cube.f5[2] == cube.f5[3] && cube.f5[1] == cube.f5[3]) {
						if(cube.f6[0] == cube.f6[1] && cube.f6[1] == cube.f6[2] && cube.f6[2] == cube.f6[3] && cube.f6[1] == cube.f6[3]) {
							return true;
						}
						return false;
					}
					return false;
				}
				return false;
			}
			return false;
		}
		return false;	
	}
	return false;
}
function theOpposite(c) {
	if(c=="w") return "y"
	if(c=="y") return "w"
	if(c=="r") return "o"
	if(c=="o") return "r"
	if(c=="g") return "b"
	if(c=="b") return "g"

}
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
	else if(col=='n') {
		return "black";
	}
	else if(col=='b') {
		return "blue";
	}
	else if(col=='v') {
		return "violet";
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

$(document).ready(function(){
			$('button').click(function(){
				$('button').removeClass('active');
				$(this).addClass('active');
			});
			$('.ft').click(function(){ $('#shape').removeClass().addClass('show-ft'); });
			$('.rt').click(function(){ $('#shape').removeClass().addClass('show-rt'); });
			$('.bk').click(function(){ $('#shape').removeClass().addClass('show-bk'); });
			$('.lt').click(function(){ $('#shape').removeClass().addClass('show-lt'); });
			$('.tp').click(function(){ $('#shape').removeClass().addClass('show-tp'); });
			$('.bm').click(function(){ $('#shape').removeClass().addClass('show-bm'); });
			
			$('.zi').click(function(){ $('#shape').removeClass('zi').addClass('zi'); });
			$('.zo').click(function(){ $('#shape').removeClass('zi'); });

			$('.movea').click(function(){ movea(); drawCube();});
			$('.moveb').click(function(){ moveb(); drawCube();});
			$('.movec').click(function(){ movec(); drawCube();});
			$('.moved').click(function(){ moved(); drawCube();});
			$('.movee').click(function(){ movee(); drawCube();});
			$('.movef').click(function(){ movef(); drawCube();});
			$('.moveai').click(function(){ moveai(); drawCube();});
			$('.movebi').click(function(){ movebi(); drawCube();});
			$('.moveci').click(function(){ moveci(); drawCube();});
			$('.movedi').click(function(){ movedi(); drawCube();});
			$('.moveei').click(function(){ moveei(); drawCube();});
			$('.movefi').click(function(){ movefi(); drawCube();});
			$('.solve').click(function(){ solve(); drawCube();});
			$('.scrumble').click(function(){ scrumble(); drawCube();});
			
			$('.spinstart').click(function(){ $('#shape').addClass('spin'); });
			$('.spinstop').click(function(){ $('#shape').removeClass('spin'); });
		});