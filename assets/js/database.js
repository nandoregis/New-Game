// INFORMAÇÕES DAS SPRITES: TIPO BANCO DE DADOS.

const DADOS = [
    { id: 1, name: 'Arbusto', sprite : './assets/terreno/arbusto.png', drop : [
        { id: 1, name: 'Folha', probabilite: 97, unidade: 3, sprite : '/'},
        { id: 2, name: 'Folha Vermelha', probabilite: 3, unidade : 1, sprite : '/' }
    ], colision : true },

    { id: 2, name: 'Tree', sprite : './assets/terreno/tree.png', drop : [
        { id: 2, name: 'Galho', probabilite: 97, unidade: 3, sprite : '/'}
    ], colision : false },

    { id: 3, name: 'Capim', sprite : './assets/terreno/capim.png', drop : [], colision : false }
];