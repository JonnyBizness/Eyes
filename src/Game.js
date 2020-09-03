import { Eye } from "./objects/Eye.js"

export class Game {

    constructor(){
        
        this.eyeCount = 4
        this.eyes = [];
       
        //how many snow we need?
        for (let i = 0; i < this.eyeCount; i ++){
            this.addEye();
        }

    }


    update = (delta) => {
        
        this.eyes.forEach(eye => {
            eye.update(delta);
        });

        for(let i = this.eyes.length; i < this.eyeCount; i++){
            this.addEye();
        }
    };

    draw = (interpolationPercentage) => {
        //clear all
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        
        this.eyes.forEach(eye => {
            eye.draw(interpolationPercentage);
        });
    };

    addEye = () => {
        let eye = new Eye(this);
        this.eyes.push(eye);
    }
}