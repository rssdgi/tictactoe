var button=document.getElementById("button");

button.onclick=function(ev){
	// this is the starting application function
	//console.log("Button presses");
	var gameObj=new gameClass();
	whoPlays.initWhoPlays();
	whoPlays.setWhoPlays();
	winnerObj.hide();
	//console.log("GAMEOBJ initialized");	
};

// this obj is needed as a global variable to store who plays value called by click event on board
var whoPlays = {
	// this var manage who plays if X or O
	// if who variable not set then decide who starts from radio button
	setWhoPlays(){
		if (this.who==null){
			//console.log("Who is null initializing from radio buttons");
			var radio=document.getElementById("defaultChecked");
			if (radio.checked){
				this.who="X";
			} else {
				this.who="O";
			}
			//console.log("WhoStarts set to "+this.who)
		} else {
			// who already inizialized - value to be inverted
			//console.log("Who is "+this.who + " inverting value ");
			if (this.who=="X") {
				this.who="O";
				//console.log(this.who);
			} else {
				this.who="X";
				//console.log(this.who);
			}
		}
	},
	getWhoPlays(){
		return this.who;
	},
	initWhoPlays(){
		// needed to reset who value to null
		this.who=null;
	}
}

class gameClass{
	constructor(){
		this.boardObj=new boardClass();
		// show board 
		this.boardObj.showBoard();
		// add eventlistner
		this.boardObj.addRemoveCellsEvents();
	}
	static showSymbolEv(event){
		//console.log("Pressed on cell "+event.target.id+" whoStarts set to "+gameObj.whoStarts);
		if (event.target.textContent==""){
			// input X or O
			event.target.textContent=whoPlays.getWhoPlays();
			// disable cell to avoid double X or O
			boardClass.removeCellEvent(event.target);
		}
		gameClass.checkGame();
		whoPlays.setWhoPlays();
	}
	static checkGame(){
		// check if someone wins
		var goodCombos=[[0,3,6],[0,1,2],[0,4,8],[1,4,7],[3,4,5],[2,4,6],[2,5,8],[6,7,8]];
		var countX=0;
		var countO=0;
		var cells=document.getElementsByTagName("td");
		for (var i = goodCombos.length - 1; i >= 0; i--) {
			//cellTable[i] is cell obj
			// check if any combo is on the table
			for (var j = 0; j <= 2; j++) {
				if (cells[goodCombos[i][j]].textContent=="X"){
					countX++;
				}
				if (cells[goodCombos[i][j]].textContent=="O"){
					countO++;
				}
			}
			// if some combination is found 
			if (countX==3){
			// X WINS!!
				//console.log("XX WINS FOR COMBO "+goodCombos[i]);
				boardClass.evidenceWinner(goodCombos[i]);
				break;
			}
			if (countO==3){
				// X WINS!!
				//console.log("OO WINS FOR COMBO "+goodCombos[i]);
				boardClass.evidenceWinner(goodCombos[i]);
				break;
			}
			countO=0;
			countX=0;
		}
	}
}

class boardClass{
	constructor(){
		this.cells=document.getElementsByTagName("td");
		this.clearBoard();
		this.showBoard();
		this.att
		//console.log("Cells initialized")
	}
	// clear the board content
	clearBoard(){
		for (var i = this.cells.length - 1; i >= 0; i--) {
			this.cells[i].textContent="";
		}
	}
	// show the board with dark border
	showBoard(){
		for (var i = this.cells.length - 1; i >= 0; i--) {
			this.cells[i].style.border="5px solid black";
			// set cell content color
			this.cells[i].style.color="black";
		}
	}
	addRemoveCellsEvents(addEv=true){
		for (var i = this.cells.length - 1; i >= 0; i--) {
		// assign event onClick to all table cells objects
			if (addEv){
				this.cells[i].addEventListener("click", gameClass.showSymbolEv);
			} else {
				boardClass.removeCellEvent(this.cells[i]);
			}
		}
	}
	static removeCellEvent(cell){
		cell.removeEventListener("click", gameClass.showSymbolEv);
	}
	static evidenceWinner(combo){
		var cells=document.getElementsByTagName("td");
		// show winning combination
		for (var i = combo.length - 1; i >= 0; i--) {
			cells[combo[i]].style.color="red";
		}
		// disable listener
		for (var i=cells.length-1;i>=0;i--){
			boardClass.removeCellEvent(cells[i]);
		}
		whoPlays.setWhoPlays();
		winnerObj.showWinner=setInterval(winnerObj.show,500);
	}
}

var winnerObj={
	showWinner:null,
	winnerLogo:document.getElementById("winner"),
	show(){
		winnerObj.winnerLogo.textContent=whoPlays.getWhoPlays() + " is the WINNER !!";
		var color='#'+Math.floor(Math.random()*16777215).toString(16);
		winnerObj.winnerLogo.style.color=color;
		//console.log("WinnerLogo is "+this.winnerLogo);
	},
	hide(){
		clearInterval(this.showWinner);
		this.winnerLogo.textContent="";
	}
}
