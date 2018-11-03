var button=document.getElementById("button");

button.onclick=function(event){
	// start program
	ticBoard.initCells();
	ticBoard.clearBoard();
	ticBoard.showBoard();
	// add click event on cell and send to bameObj.showSymbolEv
	// init gameClass
	gameObj.setWhoStarts();
	ticBoard.addRemoveCellsEvents();
};

var gameObj= {
	// this class should use the boardCells obj and manage the game
	// show the symbol O or X
	showSymbolEv(event){
		//console.log("Pressed on cell "+event.target.id+" whoStarts set to "+gameObj.whoStarts);
		if (event.target.textContent==""){
			event.target.textContent=gameObj.whoStarts;
			// disable cell to avoid double X or O
			ticBoard.removeCellEvent(event.target.id);
		}
		if (gameObj.whoStarts=="X"){
			gameObj.whoStarts="O";
		} else {
			gameObj.whoStarts="X";
		}
		gameObj.checkGame();
	},
	// check from the radio buttons who starts if O or X
	setWhoStarts(){
		var radio=document.getElementById("defaultChecked");
		if (radio.checked){
			this.whoStarts="X";
		} else {
			this.whoStarts="O";
		}
		//console.log("Variable Whostarts set to "+this.whoStarts)
	},
	checkGame(){ 
		// check if someone wins
		var goodCombos=[[0,3,6],[0,1,2],[0,4,8],[1,4,7],[3,4,5],[2,4,6],[2,5,8],[6,7,8]];
		var countX=0;
		var countO=0;
		for (var i = goodCombos.length - 1; i >= 0; i--) {
			//cellTable[i] is cell obj
			// check if any combo is on the table
			for (var j = 0; j <= 2; j++) {
				if (ticBoard.getCell(goodCombos[i][j]).textContent=="X"){
					countX++;
				}
				if (ticBoard.getCell(goodCombos[i][j]).textContent=="O"){
					countO++;
				}
			}
			// if some combination is found 
			if (countX==3){
				// X WINS!!
				//console.log("XX WINS FOR COMBO "+goodCombos[i]);
				ticBoard.evidenceWinner(goodCombos[i]);
				break;
			}
			if (countO==3){
				// X WINS!!
				//console.log("OO WINS FOR COMBO "+goodCombos[i]);
				ticBoard.evidenceWinner(goodCombos[i]);
				break;
			}
			countO=0;
			countX=0;
		}
	},
}

var ticBoard = {
	initCells(){
		// initialize cells as array of cells obj [0..8]
		this.cells=document.getElementsByTagName("td")
	},
	//	return cell obj i
	getCell(i){
		return this.cells[i]
	},
	// clear the board content
	clearBoard(){
		for (var i = this.cells.length - 1; i >= 0; i--) {
			this.cells[i].textContent="";
		}
	},
	// show the board with dark border
	showBoard(){
		for (var i = this.cells.length - 1; i >= 0; i--) {
			this.cells[i].style.border="5px solid black";
			// set cell content color
			this.cells[i].style.color="black";
		}
	},
	addRemoveCellsEvents(addEv=true){
		for (var i = this.cells.length - 1; i >= 0; i--) {
		// assign event onClick to all table cells objects
			if (addEv){
				this.getCell(i).addEventListener("click", gameObj.showSymbolEv);
			} else {
				this.removeCellEvent(i);
			}
		}
	},
	removeCellEvent(i){
		this.getCell(i).removeEventListener("click", gameObj.showSymbolEv);
	},
	evidenceWinner(combo){
		for (var i = combo.length - 1; i >= 0; i--) {
			this.getCell(combo[i]).style.color="red";
		}
		// disable listener
		this.addRemoveCellsEvents(false);
	}
}