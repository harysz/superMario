import Compositor from './Compositor.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}

class Vec2{
    constructor (x,y){
        this.x= x;
        this.y= y;
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, backgroundSprites, level]) => {
    console.log('Level loader', level);

    const comp = new Compositor();
    comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));

    const gravity = 0.5;

    const pos = new Vec2(64,180);
    const velocity = new Vec2 (2,-10);
    
    
    comp.layers.push(createSpriteLayer(marioSprite, pos));

    function update() {
        comp.draw(context);
        pos.x += velocity.x;
        pos.y += velocity.y;
        velocity.y += gravity;
        requestAnimationFrame(update);
    }

    update();
});
