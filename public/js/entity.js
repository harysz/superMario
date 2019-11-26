import {Vec2} from './vector.js';
export default class Entity{
    constructor(){
        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
    }
}