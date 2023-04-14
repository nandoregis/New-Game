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

/**
 * ---------------------------
 */

const objetos = [
    { id: 1, name: 'Arbusto', sprite : './assets/terreno/arbusto.png', drop : [
        { id: 1, name: 'Folha', probabilite: 97, unidade: 3, sprite : '/'},
        { id: 2, name: 'Folha Vermelha', probabilite: 3, unidade : 1, sprite : '/' }
    ], colision : true },

    { id: 2, name: 'Tree', sprite : './assets/terreno/tree.png', drop : [
        { id: 2, name: 'Galho', probabilite: 97, unidade: 3, sprite : '/'}
    ], colision : false },

    { id: 3, name: 'Capim', sprite : './assets/terreno/capim.png', drop : [], colision : false }
];

/**
 * -----------------------
 */

class Chucks {
    constructor() {
        this.chucks;
    }

    generate_chucks() {

        const chucks = [];
    
        let valor_pixel = 64;

        let lengX = CANVAS.width / valor_pixel;
        let lengY = CANVAS.height / valor_pixel;

        for(let x = 0; x < lengX; x++) {

            let x1 = x * valor_pixel;

            for(let y = 0; y < lengY; y++) {

                let y1 = y * valor_pixel;
        
                const chuck = {
                    positionX: x1,
                    positionY: y1,
                    item: {},
                    colision: false
                };
                
                chucks.push(chuck);
            }
        
        }

        this.chucks = chucks;
    }

    get_chucks_division(quantidade) {

        let quantidade_max = quantidade;
        const new_chucks = [];

        for(let i = 0; i < quantidade_max; i++) {
            let numero = Math.floor(Math.random() * this.chucks.length - 1 );

            let pegar = this.chucks.splice(numero,1);

            new_chucks.push(pegar[0]);

        }

        return new_chucks;
    }


}

class Elemento {
    constructor({ position, sprite}) {
        this.image = new Image();
        this.image.src = sprite;
        this.position = position;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw();
    }
}

class Map {
    constructor() {
        this.items = [];
        this.chucks = new Chucks();
        this.chucks.generate_chucks();
    }

    insert_item ( id, count ) {
        const ch = this.chucks.get_chucks_division(count);
        const object = this.filter_item(id);
        const chucksAlteradas = this.insert_item_chuck(object,ch);

        this.items.push(chucksAlteradas);
    }

    filter_item(id) {
        const elemento = objetos.filter( item => {
            return item.id === id;
        })[0];

        return elemento;
    }

    insert_item_chuck(object, chucks) {
        chucks.forEach(element => {
            element.item = object ;
            element.colision = object.colision;
        });

        return chucks;
    }

    get_all_chuck() {
        const destruturar = []
        this.items.forEach( element => { destruturar.push(...element);});
        return destruturar;
    }

    draw_map() {
        
        for(let i = 0; i < this.items.length; i++) {

            this.items[i].forEach( object => {

                const element = new Elemento({
                    position: {x: object.positionX, y: object.positionY},
                    sprite : object.item.sprite
                });

                element.draw();
            });
        }
    }
}


const map = new Map;

map.insert_item(1, 10);
map.insert_item(2, 5);


const chucks = map.get_all_chuck();
console.log('por fora: ', chucks);



//----------------

const player = new Player({
    imgSrc : './assets/player/Idle.png'
});

const arbusto = new Elemento({
    position : { x: 0, y : 64 },
    sprite : './assets/terreno/arbusto.png'
});

player.render();

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

    condicao_movimentos();
    
    map.draw_map();
    arbusto.update();
    player.update();
    
}

loop();

// function adicionar_itens_nas_chucks() {
//     /**
//      * - saber quantos item quero de e ter o sprite.
//      * - ver se item deve dropar algo.
//      * 
//      */

//     let quantidade_max = 20;
//     const new_chucks = [];
//     // 160 - chucks

//     for(i = 0; i < quantidade_max; i++) {
//         let numero = Math.floor(Math.random() * chucks.length - 1 );

//         let pegar = chucks.splice(numero,1);

//         new_chucks.push(pegar[0]);

//     }


//     console.log('escolhidas ',new_chucks);
//     console.log('antigo ', chucks);

    

// }


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
    let posMaisWidthX = player.position.x + player.width;
    
    let pixel = 64;

   chucks.forEach(el => {
        if(el.colision) {
            
            if( 
                player.position.y + 32 > ( el.positionY) &&
                posMaisWidthX - 8 < el.positionX + pixel &&
                posMaisHeightY - 16 < el.positionY + pixel &&
                player.position.x + 16 > el.positionX
            
            ) { 
                velocity = 0.1
                player.time = 50;
                console.log('colidiu');

            }else {
                player.time = 10;
                
            }
           
        }
    });

    return velocity;
}