

function colision_map() {

    if(player.position.x + 12 < 0 ) {
        player.position.x = - 11 ;
    } else if (player.position.x > CANVAS.width) {
        player.position.x = -11;
    }

    if(player.position.y + 12 < 0 ) {
        player.position.y = -11;
    } else if (player.position.y > CANVAS.height) {
        player.position.y = -11;
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
                posMaisWidthX - 8 < (el.positionX + pixel) &&
                posMaisHeightY + 4 < (el.positionY + pixel) &&
                player.position.x + 16 > el.positionX
            
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