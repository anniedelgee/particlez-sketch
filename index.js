let p;
const particles=[];


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    // p= new Particle(); 
    const particlesLength= Math.floor(window.innerWidth/10); //number of particles generated relative to sixe of window.
    // console.log(particlesLength);
    for(let i=0; i<particlesLength; i++) {
        particles.push(new Particle());
    }

}
function draw(){
    background(0,0,0)
    particles.forEach((p, index)=> {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });

}

class Particle{
    constructor(){
        //position
        this.pos= createVector(random(width), random(height));
        //velocity
        this.vel= createVector(random(-2, 2), random(-2,2));
        //size
        this.size= 10;
    }
    //update movement by adding velocity, defined above.
    update(){
        this.pos.add(this.vel);
        this.edges();
    }
    //draw single particle
    draw(){
        noStroke();
        fill('rgba(0,255,0, 0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }
    //detect edges
    edges(){
        if (this.pos.x <0 || this.pos.x >width){
            this.vel.x*= -1; //bouces off edge
        }
        if (this.pos.y <0 || this.pos.x >height){
            this.vel.y*= -1; //bouces off edge
        }
    }

    //Connect Particles
    checkParticles(particles) {
        particles.forEach(particle =>{
            //distance
            const d= dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            if (d<120){
                stroke('rgba(255,0,0,0.5)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        })
    }
}