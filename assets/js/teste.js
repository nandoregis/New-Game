// window.addEventListener('mousemove', e => {
    
//     let mouseX = e.clientX;
//     let mouseY = e.clientY;

// });

const iventario = document.querySelector('.iventario');
const mochila = document.getElementById('mochila');
const exitIventario = document.getElementById('exitIventario');

function evento_inventario(action, moviment_player = true) {
    
    switch (action) {
        case 'open':
            iventario.classList.remove('hide');
            break;

        case 'exit':
            iventario.classList.add('hide');
        break;

        default:
            break;
    }

    PERMISSION.moviment = moviment_player;
}

mochila.addEventListener('click', () => {
    evento_inventario('open', false);
});

exitIventario.addEventListener('click', () => {
    evento_inventario('exit');

});

