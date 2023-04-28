// VARIAVEIS E CONSTANTES GLOBAIS DE PERMISSÃO OU PROIBIÇÃO.

const PERMISSION = {
    moviment : true,
}

const keys = {
    a : { pressed : false },
    d : { pressed: false },
    w : { pressed: false },
    s : { pressed: false }
}

function check_moviment_permission() {
    
    if(!PERMISSION.moviment) {
        for(const obj in keys) {
            keys[obj].pressed = false;
        }
    }

}

function master() {
    check_moviment_permission();

    condicao_movimentos();
    render_sprites_map();
}