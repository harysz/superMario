import Compositor from './Compositor.js';
import Timer from './timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './mario.js';
import {loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer,createBackgroundLayer} from './layers.js';

import Keyboard from './KeyboardState.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.scale(1.5,1.3);

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 2000;
    mario.pos.set(64,180);

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);


    comp.layers.push(createSpriteLayer(mario));

    const timer = new Timer(1/60);

   
   timer.update = function update(deltaTime) {
      
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity * deltaTime;
    };

    timer.start();
});
