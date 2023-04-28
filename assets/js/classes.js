/**
 * ----------------------- CLASSES PARA RENDERIZAÇÃO DE SPRITE DO GAME. -----------------------------------
 */

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


class Chucks {
    constructor() {
        this.chucks;
        this.chucks_total;
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


        this.chucks_total = chucks.length;
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

    get_chucks_count() {
        return this.chucks.length;
    }

    total_generate() {
        return this.chucks_total;
    }

}

class Map {
    constructor() {
        this.chucks = new Chucks();
        this.chucks.generate_chucks();
        this.chucks_alteradas = [];
        this.total_chucks = this.chucks.total_generate();
        this.contador = [];
    }

    get_chucks_count() {
       return this.chucks.get_chucks_count();
    }

    insert_item ( id, count) {
        const ch = this.chucks.get_chucks_division(count);
        const object = this.get_item_by_id(id);

        if(!object) {
            return;
        }

        const chucksAlteradas = this.insert_item_chuck(object,ch);
        this.chucks_alteradas.push(chucksAlteradas);

        return chucksAlteradas;
    }
    
    get_sprite(id) {
        const item = this.filter_item(id);
        if(!item) return '';
        return item.sprite;
    }

    get_item_by_id(id) {
        const item = this.filter_item(id);

        if( !item ) return null;  
        return item;
    }

    filter_item(id) {
        const elemento = DADOS.filter( item => {
            return item.id === id;
        })[0];
        
        return elemento;
    }

    insert_item_chuck(object, chucks) {

        chucks = this.check_limite_chucks(chucks);
       
        if(chucks[0].desabled){
            
        }else {

            chucks.forEach(element => {
                element.item = object ;
                element.colision = object.colision;
            });
        }
    
        
        return chucks;
        
    }

    check_limite_chucks(chucks) {

        let countChucks = chucks.length;
        let countChucksReaming = this.get_chucks_count();
        let countChucksMax = this.total_chucks;
        
        this.contador.push(countChucks);
        
        if(countChucksReaming < countChucks) 
        {
            const quant = this.contador.length;
            let crono = 0;
    
            this.contador.forEach( num => {
                crono += num;
            });

            if(crono > countChucksMax) {
                let count = crono  - countChucksMax;
                let index = countChucks - count;

                chucks.splice( index, count);
            }
        }

        
        if(!chucks[0]) {
            console.error("Nâo pode mais adicionar mais Sprites, chegou a o limite de terreno!");
            chucks = [ { positionX: -100, positionY: -100, item: { sprite: './assets/terreno/invisible.png'}, colision: false, desabled : true }];
        }

        return chucks;
    }

    get_all_chuck() {
        const all_chucks = []
        this.chucks_alteradas.forEach( element => { all_chucks.push(...element);});
        return all_chucks;
    }

}

class Create {
    constructor(chucks, sprite) {
        this.chucks = chucks; // array
        this.img = new Image();
        this.img.src = sprite; // string
        
    }

    draw() {
        this.chucks.forEach( item => {
            ctx.drawImage(this.img, item.positionX, item.positionY);
        });
    }

    update() {
       this.draw();
    }
}