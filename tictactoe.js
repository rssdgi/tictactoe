var button=document.getElementById("button");
var cellTable=document.getElementsByTagName("td");
var whoStarts="";

// clear the board
function clearBoard(){
	for (var i = cellTable.length - 1; i >= 0; i--) {
		cellTable[i].textContent="";
	};
}

function addEventListener(addEv=true){
	for (var i = cellTable.length - 1; i >= 0; i--) {
		// assign event onClick to all table cells objects
		if (addEv){
			cellTable[i].addEventListener("click", tictactoeFunction);
		} else {
			cellTable[i].removeEventListener("click", tictactoeFunction);
		}
	}
}

// setUp the board
function showBoard(){
	for (var i = cellTable.length - 1; i >= 0; i--) {
		cellTable[i].style.border="5px solid black";
		cellTable[i].style.color="black";
	}
	addEventListener(true);
}

button.onclick=function(event){
	// get who starts if X or O
	// default is X set in html radio button
	showBoard();
	var radio=document.getElementById("defaultChecked");
	if (radio.checked){
		whoStarts="X";
	} else {
		whoStarts="O";
	}
	console.log("Starts "+whoStarts);
	clearBoard();
}

// event function attached to cells
function tictactoeFunction(event){
	 //console.log(event.target.id+event.type);
	if (event.target.textContent==""){
		event.target.textContent=whoStarts;
		// disable cell to avoid double X or O
		event.target.removeEventListener("click", tictactoeFunction);
	}
	
	if (whoStarts=="X"){
		whoStarts="O";
	} else {
		whoStarts="X";
	}
	checkGame();	
}	

// winner found 
function evidenceWinner(combo){
	// combo is a 3 elements array that corrisponds
	// to a good combo
	for (var i = combo.length - 1; i >= 0; i--) {
		cellTable[combo[i]].style.color="red";
	}
	// disable listener
	addEventListener(false);
}

// check if there is a winner
function checkGame(){
	// check if someone wins
	var goodCombos=[[0,3,6],[0,1,2],[0,4,8],[1,4,7],[3,4,5],[2,4,6],[2,5,8],[6,7,8]];
	var countX=0;
	var countO=0;

	for (var i = goodCombos.length - 1; i >= 0; i--) {
		//cellTable[i] is cell obj
		// check if any combo is on the table
		for (var j = 0; j <= 2; j++) {
			if (cellTable[goodCombos[i][j]].textContent=="X"){
				countX++;
			}
			if (cellTable[goodCombos[i][j]].textContent=="O"){
				countO++;
			}
		}
		// if some combination is found 
		if (countX==3){
			// X WINS!!
			console.log("XX WINS FOR COMBO "+goodCombos[i]);
			evidenceWinner(goodCombos[i]);
			break;
		}
		if (countO==3){
			// X WINS!!
			console.log("OO WINS FOR COMBO "+goodCombos[i]);
			evidenceWinner(goodCombos[i]);
			break;
		}
		countO=0;
		countX=0;
	}
}