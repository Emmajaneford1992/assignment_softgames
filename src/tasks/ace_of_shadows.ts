import { Application, Texture, Sprite,  Assets } from 'pixi.js';
import { gsap } from 'gsap';

export class AceOfShadows {
    private app: Application;
    private images: { alias: string; src: string }[] = [];
    private cards: Sprite[] = [];
    private stackPositions: number[][] = [];
  
    constructor(app: Application) {
        this.app = app;
        this.images = [];
        for(let i = 1; i < 145; i++){
            this.images.push({ alias: 'image'+i, src: '/assets/images/ace_of_shadows/'+i+'.png' })
        }
    }

    public async init(): Promise<void> {
        this.app.renderer.background.color = '0x4dc9ff'
        await Assets.load(this.images);
        this.createScene()
        this.animateCards();
    }

    private createScene() {
        this.cards = [];
        for(let i = 1; i < this.images.length; i++){
            this.createCard(i);
        }
        this.stackPositions = [];
        for(let i = 0; i < 6; i++){
          this.stackPositions[i] = [(this.app.screen.width/6)*(i+0.5), this.app.screen.height/3];
        }
    }

    private createCard(i: number): Sprite {
        const texture: Texture = Assets.get(`image${i}`);
        const sprite = new Sprite(texture) as Sprite;
        sprite.anchor.set(0.5);
        sprite.zIndex = this.images.length-i;
        sprite.x = (this.app.screen.width*0.8)-(((this.app.screen.width*0.6)/this.images.length)*i);
        sprite.y = this.app.screen.height/1.5;
        sprite.scale.set(0.4);
        this.cards.push(sprite);
        this.app.stage.addChild(sprite); 
        return sprite;
    }

   private animateCards(){
        this.cards.forEach((card, index) => {
            setTimeout(() => {
            card.zIndex = this.cards.length + index;
            gsap.to(card, {
                x: this.stackPositions[index%this.stackPositions.length][0],
                y: this.stackPositions[index%this.stackPositions.length][1],
                rotation: Math.PI *4,
                duration: 2,
                ease: "power1.inOut"
            });

            gsap.to(card.scale, {
                x: 0.5,
                y: 0.5,
                yoyo: true,
                repeat: 1,
                duration: 1,
                ease: "power1.inOut"
            });
            }, index*1000);
        });
    }
}