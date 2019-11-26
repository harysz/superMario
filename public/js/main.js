import Compositor from './Compositor.js';
import {loadLevel} from './loaders.js';
import {createMario} from './mario.js';
import {loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer,createBackgroundLayer} from './layers.js';
import Entity from './entity.js';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.scale(3,2);


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
    console.log('Level loader', level);

    const comp = new Compositor();
    comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));

    const gravity = 0.5;

    comp.layers.push(createSpriteLayer(mario));

    function update(time) {
        console.log(time);
        comp.draw(context);
        mario.update();
        mario.vel.y += gravity;
        requestAnimationFrame(update);
    }

    update();
});
