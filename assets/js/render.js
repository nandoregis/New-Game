function render () {
    
    window.requestAnimationFrame(render);
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);

    condicao_movimentos();
    render_sprites_map();
    
}

render();