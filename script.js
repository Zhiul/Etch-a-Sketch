 const gameGrid = document.querySelector(".etch-a-sketch-grid");
 const gridSquare = document.createElement("div");
 let gridSquares;
 let gridIsNotClicked = true;
 let drawMode = 'color-mode';
 const colorSelection = document.querySelector('#color-selection');
 const gridSizePara = document.querySelector('#grid-size-para');

 const gridColorButton = document.querySelector('#color-mode');
 const gridRandomColorButton = document.querySelector('#random-color-mode');
 const gridEraseButton = document.querySelector('#erase');
 const gridClearButton = document.querySelector('#grid-clear');
 const gridRange = document.querySelector('#grid-size');
 let gridSize = gridRange.value;
 const gridCreateButton = document.querySelector('#grid-create');
 const gameButtons = document.querySelectorAll('.game-button');

 let mobileResolution = window.matchMedia("(max-width: 480px)");

 createGrid();

 function createGrid(gridColumns = 16){
    gameGrid.textContent = '';
    numberOfSquares = gridColumns ** 2;
    gameGrid.appendChild(gridSquare);
    for(i = 1; i < numberOfSquares; i++){
        gameGrid.appendChild(gridSquare.cloneNode(true));
    }

    gameGrid.style.cssText = `grid-template-columns: repeat(${gridColumns}, 1fr [col-start])`;
    gridSquares = document.querySelectorAll(".etch-a-sketch-grid div");
 }

 gameGrid.addEventListener('click', () =>{
    if(mobileResolution.matches === false){
       gridIsNotClicked = !gridIsNotClicked
       if (gridIsNotClicked === false){
          gridSquares.forEach(gridSquare =>{
              gridSquare.addEventListener('mouseover', draw)
          })
       } else if(gridIsNotClicked === true){
          gridSquares.forEach(gridSquare =>{
              gridSquare.removeEventListener('mouseover', draw);
          })
       }
    } else{
        gridIsNotClicked = false;
       if (gridIsNotClicked === false){
           gridSquares.forEach(gridSquare =>{
               gridSquare.addEventListener('click', draw)
           })
        }
    }
});

function draw(){
    if (drawMode === 'color-mode'){
        this.style.backgroundColor = `${colorSelection.value}`;
    } else if(drawMode === 'random-color-mode'){
        this.style.backgroundColor = `${random_rgb()}`
    } else if (drawMode === 'erase'){
        this.style.backgroundColor = '';
        }
 }

 gridRandomColorButton.addEventListener('click', () =>{
    drawMode = 'random-color-mode';
    changeSelectedButton();
})
gridColorButton.addEventListener('click', () =>{
    drawMode = 'color-mode';
    changeSelectedButton();
})


 gridColorButton.addEventListener('click', () =>{
    drawMode = 'color-mode';
    changeSelectedButton();
})

 gridRandomColorButton.addEventListener('click', () =>{
     drawMode = 'random-color-mode';
     changeSelectedButton();
 })

 gridEraseButton.addEventListener('click', () =>{
    drawMode = 'erase';
    changeSelectedButton();
})

 gridClearButton.addEventListener('click', clearGrid)


 gridCreateButton.addEventListener('click', () =>{
     createGrid(gridSize);
 })


 function changeSelectedButton(){
    gameButtons.forEach(gameButton => {
        if(gameButton.id != drawMode){
           gameButton.classList.remove('selected');
        } else{
            gameButton.classList.add('selected');
        }
    })
 }

function clearGrid(){
    gridSquares.forEach(gridSquare =>{
        gridSquare.style.backgroundColor = '';
    })
}

 function random_rgb() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function onRangeChange(r,f) {
    var n,c,m;
    r.addEventListener("input",function(e){n=1;c=e.target.value;if(c!=m)f(e);m=c;});
    r.addEventListener("change",function(e){if(!n)f(e);});
  }
  
  onRangeChange(gridRange, ()=>{
      gridSize = gridRange.value;
      gridSizePara.textContent = `${gridSize}x${gridSize}`
  })
 


