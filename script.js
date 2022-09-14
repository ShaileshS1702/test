let playcanvas = document.getElementById('playcanvas')
let pc = playcanvas.getContext("2d")

pc.beginPath()
let tries = 0
let brikker = [ //[x,y, colorindex]
    [ [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], ],
    [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], ],
    [ [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], ],
    [ [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], ],
    [ [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], ],
    [ [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], ],
    [ [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], ],
    [ [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], ],
    [ [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], ],
    [ [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], ],
    [ [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], ], 
    [ [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], ], 
    [ [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], ], 
    [ [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], ],
]; 
let system = [[0,0]]
let farger = ['red', 'green', 'black', 'blue', 'yellow', 'white']/*,'orange','magenta','cyan','grey', 'brown']*/
playcanvas.addEventListener('click', fargevelger)
function chooseColor(){
    for (let ypos = 0; ypos < 14; ypos++) {
        for (let xpos = 0; xpos < 14; xpos++) {
            brikker[ypos][xpos][2] = Math.floor(Math.random()*farger.length)
            //console.log(brikker[ypos][xpos][3])
            coloring()

        }
   
    }
}
function coloring(){
    for (let ypos = 0; ypos < 14; ypos++) {
        for (let xpos = 0; xpos < 14; xpos++) {
            //console.log(brikker[ypos][xpos][3])
            pc.fillStyle = farger[brikker[ypos][xpos][2]]
            
            /* console.log('rgb(' + index*255/14 + ', '+ index2*256/14 + ', 255)') */
            pc.fillRect(xpos*25,ypos*25,25,25)

        }
   
    }
}


function fargevelger(eventhos){
    tries++
    document.getElementById('poeng').innerHTML = "Number of tries:" + tries
    event = eventhos.target
    //offset er avstand fra side, client er tykkelse på border, clientx/y er pos av pil.

    tempX = Math.floor((eventhos.clientX - event.offsetLeft - event.clientLeft)/25)
    tempY = Math.floor((eventhos.clientY - event.offsetTop - event.clientTop)/25)
/*     console.log( tempX, tempY)
    console.log(farger[brikker[tempY][tempX][2]]) */
    // dette gir oss farge til det som blir trykket på
    for (const sysbricks of system) {
        // console.log(brikker[sysbricks[1]][sysbricks[0]][2],  brikker[tempY][tempX][2] )
        brikker[sysbricks[1]][sysbricks[0]][2] = brikker[tempY][tempX][2]
        //console.log(brikker[sysbricks[1]][sysbricks[0]][2])
    }
    coloring()
    expandsys()
}

function expandsys(){
    for (let i = 0; i < system.length; i++) {
        let sysbricks = system[i]
        //brikker[sysbricks[1]][sysbricks[0]][2] farge til brikke i sys
        if (sysbricks[1]<13){
            if (brikker[sysbricks[1] + 1][sysbricks[0]][2] == brikker[sysbricks[1]][sysbricks[0]][2] /**brikken under*/){
               
                for (let j = 0; j < system.length; j++) { // her sjekkes det om systemet allerede har den blokken
                    let iterator = system[j]
                    if (iterator[0] == sysbricks[0] && iterator[1] == (sysbricks[1]+1)) {
                        break
                    }
                    else if (j == system.length-1){
                            system.push([sysbricks[0], sysbricks[1]+1])
                    }
                }
            } 
        }
        if (sysbricks[0]<13){
            if (brikker[sysbricks[1]][sysbricks[0] + 1][2] == brikker[sysbricks[1]][sysbricks[0]][2] /**brikken til høyre*/){
                
                for (let j = 0; j < system.length; j++) { // her sjekkes det om systemet allerede har den blokken
                    let iterator = system[j]
                    if (iterator[0] == (sysbricks[0] + 1) && iterator[1] == sysbricks[1]) {
                        break
                    }
                    else if (j == system.length-1){
                        system.push([sysbricks[0] + 1, sysbricks[1]])
                    }
                }
            }
            
            
        }
        if (sysbricks[1]>0){
            if (brikker[sysbricks[1] -1 ][sysbricks[0]][2] == brikker[sysbricks[1]][sysbricks[0]][2] /**brikken over*/){
                for (let j = 0; j < system.length; j++) { // her sjekkes det om systemet allerede har den blokken
                    let iterator = system[j]
                    if (iterator[0] == sysbricks[0] && iterator[1] == (sysbricks[1] - 1)) {
                        break
                    }
                    else if (j == system.length - 1){
                        system.push([sysbricks[0], sysbricks[1]- 1])
                    }
                }
                
            }
            
            
        }
        if (sysbricks[0]> 0){
            if (brikker[sysbricks[1]][sysbricks[0] - 1][2] == brikker[sysbricks[1]][sysbricks[0]][2] /**brikken til venstre*/){
                for (let j = 0; j < system.length; j++) { // her sjekkes det om systemet allerede har den blokken
                    let iterator = system[j]
                    if (iterator[0] == (sysbricks[0] - 1) && iterator[1] == sysbricks[1]) {
                        break
                    }
                    else if (j == system.length-1){
                        system.push([sysbricks[0] - 1, sysbricks[1]])
                    }
                }
                
            }
        }
        
    }
    document.getElementById('ratio').innerHTML = "Blocks colored: " + system.length + '/196'
    if (system.length == 196) {
        playcanvas.removeEventListener('click', fargevelger)
       
    }
}






chooseColor()
expandsys()


//temp x og tmepy må få nye navn