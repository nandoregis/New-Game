/* -------------- CONSTANTES E VARIAVEIS GLOBAIS ------------*/

const map = new Map;

const player = new Player({
    imgSrc : './assets/player/Idle.png'
});

/**
 *  Adicionar items a o mapa.
 */

var arbusto = map.insert_item(1, 10); // ---> retorna uma array
var grama = map.insert_item(3, 60);
var tree = map.insert_item(2, 10);
var stone = map.insert_item(2, 10);

/**
 *  # PARAMETROS
 *  1 - Array contendo objetos chamados chuck.
 *  2 - String do item para ser renderizado.
 */

arbusto = new Create(arbusto, arbusto[0].item.sprite);
grama = new Create(grama, grama[0].item.sprite);
tree = new Create(tree, tree[0].item.sprite); 

function render_sprites_map() {
    
    arbusto.update(); 
    grama.update();
    tree.update();
    
    player.update();
}

const chucks = map.get_all_chuck(); // CONST GLOBAL

