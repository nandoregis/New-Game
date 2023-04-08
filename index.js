const CANVAS = document.getElementById('canvas');
const ctx = CANVAS.getContext('2d');

CANVAS.width = 1024;
CANVAS.height = 640;


CANVAS.style = `
    background: #53DE58
`;

/**--------- */

const keys = {
    a : { pressed : false },
    d : { pressed: false },
    w : { pressed: false },
    s : { pressed: false }
}


class Player {
    
    constructor ({imgSrc, frames = {max : 4}}) {
        this.position = {x: 0, y: 150}       
        this.image = new Image();
        this.image.src = imgSrc;
        this.frames = {...frames, val: 0, elapsed : 0}
        
        this.trocar = 0;
        this.time = 10;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height / this.frames.max;
        }

        this.moving = true;
        
    }
    
    draw() {
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.width * this.trocar,
            this.frames.val * this.height,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            this.position.x, 
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            
            );
        
        if(!this.moving) return;

        if(this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if(this.trocar > this.frames.max) {
            this.trocar = this.frames.max;
        }

        if(this.frames.elapsed % this.time === 0) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val++
            }else this.frames.val = 0;
        }   

    }

    render() {
        this.draw();
    }

    update() {
        this.draw();
    }
}

class Terreno {
    constructor() {

    }
}



// gerar chucks 
/**
 *  
 * 
 */

const gerenate_chucks = () => {
    
    const chucks = [];
    
    let valor_pixel = 64;
    let lengX = CANVAS.width / valor_pixel;
    let lengY = CANVAS.height / valor_pixel;

    for(x = 0; x < lengX; x++) {

        let x1 = x * valor_pixel;

        for(y=0; y < lengY; y++) {

            let y1 = y * valor_pixel;
    
            const chuck = {
                positionX: x1,
                positionY: y1,
                items: [],
                colision: false
            };
            
            chucks.push(chuck);
        }
        
    }

    return chucks;
}

const chucks = gerenate_chucks();

//----------------

const player = new Player({
    imgSrc : './assets/player/Idle.png'
});
player.render();

const img = new Image();
img.src = "./assets/terreno/arbusto.png";


const movimentacao = () => {

    window.addEventListener('keydown', (e)=> {

        switch (e.keyCode) {
            case 65:
                keys.a.pressed = true;
              break;
          
            case 68:
                keys.d.pressed = true;
              break;
    
            case 87:
                keys.w.pressed = true;
              break;
            
            case 83:
                keys.s.pressed = true;
              break;   
            
        }

        console.log('X: '+player.position.x + ' / ' + 'Y: ' + player.position.y);

        
    });
    
    window.addEventListener('keyup', (e)=> {
         //a - 65 d-68 w - 87, s - 83
        switch (e.keyCode) {
            case 65:
                keys.a.pressed = false;
              break;
          
            case 68:
                keys.d.pressed = false;
              break;
    
            case 87:
                keys.w.pressed = false;
              break;
            
            case 83:
                keys.s.pressed = false;
              break;
         
            
        }
        
    });
}

movimentacao();

function loop () {
    window.requestAnimationFrame(loop);
    
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    
    chucks[1].colision = true;

    ctx.drawImage(img, chucks[1].positionX, chucks[1].positionY);
    

    player.update();
    condicao_movimentos();
    
}

loop();

function condicao_movimentos() {
    // movimento

    let velocity = get_velocity();

    // 0 = s, 1 = a, 2 = w, 3 = d

    if(keys.d.pressed) {

        player.position.x += velocity;
        player.trocar = 3;
        player.moving = true;

    }else if(keys.a.pressed) {
        player.position.x -= velocity;
        player.trocar = 1;
        player.moving = true;

    }else if(keys.w.pressed) {

        player.position.y -= velocity;
        player.trocar = 2;
        player.moving = true;

    }else if(keys.s.pressed) {
        player.position.y += velocity; 
        player.trocar = 0;
        player.moving = true;
    }else {
        player.moving = false;
        player.frames.val = 0;
    }



    colision_map();

}

function colision_map() {

    if(player.position.x < 0 ) {
        player.position.x = 0;
    } else if (player.position.x > CANVAS.width) {
        player.position.x = 0;
    }

    if(player.position.y < 0 ) {
        player.position.y = 0;
    } else if (player.position.y > CANVAS.height) {
        player.position.y = 0;
    }
}

function get_velocity() {

    let velocity = colision_chuck();

    return velocity;
}

function colision_chuck() {

    let velocity = 2;
  
    let posMaisHeightY = player.position.y + player.height;
    let posMaidWidthX = player.position.x + player.width;
    
    let pixel = 64;

   chucks.forEach(el => {
        if(el.colision) {

            if( 
                posMaisHeightY - 10 > ( el.positionY) &&
                posMaidWidthX < el.positionX + pixel &&
                posMaisHeightY < el.positionY + pixel &&
                player.position.x  > el.positionX
            
            ) { 
                velocity = 0.1
                player.time = 50;

            }else {
                player.time = 10;
            }
           
        }
    });

    return velocity;
}