
function movimentacao() {
    // movimentar personagem
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
    
    // parar personagem
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


movimentacao();