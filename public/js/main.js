import Compositor from './Compositor.js';
import Timer from './timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './mario.js';
import {loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer,createBackgroundLayer} from './layers.js';
import Entity from './entity.js';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.scale(1.5,1.3);


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
    console.log('Level loader', level);

    const comp = new Compositor();
    comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));

    const gravity = 30;
    mario.pos.set(64,180);
    mario.vel.set(200,-600);


    comp.layers.push(createSpriteLayer(mario));

    const timer = new Time(1/60);

   
   timer.update = function update(time) {
        accumulatedTime += (time - lastTime)/1000;
        while(accumulatedTime > deltaTime){
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;

        accumulatedTime -= deltaTime;
        }
        requestAnimationFrame(update);
        lastTime = time;
    }

    update(0);
});
