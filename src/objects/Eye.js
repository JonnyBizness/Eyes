import { circle } from "../utility/shapes.js";
import { randomBetween, randomProperty } from "../utility/gamemath.js";
import { tasman } from "../utility/colors.js";


export class Eye {

    constructor(game){
        this.parent = game;

        this.x = Math.floor(Math.random()*canvas.width);;
        this.y = Math.floor(Math.random()*canvas.height);;
        this.size = randomBetween(10,20);
        //random between one property and a random property.
        this.color = randomProperty([tasman.c5 , randomProperty([tasman.c5, tasman.c10, tasman.c20, tasman.c30,tasman.c50])]);

        this.existance = 0;
        this.transparancy = 1;
        this.velocityX = Math.random()*2-1;
        this.velocityY = Math.random()*2-1;


        this.lastX = this.x;
        this.lastY = this.y;
    }


    update = (delta) => {
        this.lastX = this.x;
        this.lastY = this.y;
        
        //update y position according to the game velocity?

        this.existance += 0.001;

        //console.log(this.transparancy);

        if(this.existance > 10){
            this.destory();
        }
    };

    draw = (interpolationPercentage) => {
        // Interpolate with the last position to reduce stuttering.
        let x = this.lastX + (this.x - this.lastX) * interpolationPercentage;
        let y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
        
        
        
        
        circle(x, y, this.size, this.color);
        canvas.getContext('2d').globalAlpha = 1;
    };

    destory = () => {
        this.parent.eyes = this.parent.eyes.filter(item => item !== this)
    }
}