import { Application, Texture, Sprite,  Assets, Text } from 'pixi.js';
import { gsap } from 'gsap';

export class MagicWords {
  private app: Application;
  private sprites: Sprite[] = [];
  private textPool: string[] = [];
  private fontPool: string[] = [];
  private text!: Text;
  private assignedImgNums : number[] = [];
  private images: { alias: string; src: string }[] = [];
  private numOfSprites: number

  constructor(app: Application) {
    this.app = app;
    this.textPool = ['Pumpkin', 'Cozy', 'Acorn', 'Autumn', 'Leaves'];
    this.fontPool = ['Impact', 'Arial', 'Comic Sans MS', 'Georgia', 'Helvetica'];
    this.sprites = [];
    this.assignedImgNums = [];
    this.images = [];
    for(let i = 0; i < 8; i++){
      this.images.push({ alias: 'image'+i, src: './assets/images/magic_words/image'+i+'.png' })
    }
    this.numOfSprites = 6
  }

  public async init(): Promise<void> {
    this.app.renderer.background.color = '0xe3a378'
    await Assets.load(this.images);
    this.createScene()
    this.randomiseScene()
  }

  private createScene(){
    let randomAngle = Math.random()*(Math.PI * 2) 
    for(let i = 0; i < this.numOfSprites; i++){
      this.assignedImgNums.push(i);
      this.createImage(i, randomAngle);
    }
    this.text = new Text( {text: 'Autumn', style:{ fontSize: 24, fill: "white",  align: 'center'}});
    this.text.anchor.set(0.5, 0.5);
    this.text.x = this.app.screen.width/2;
    this.text.y = this.app.screen.height/2;
    this.app.stage.addChild(this.text);
  }

  private createImage(i : number, randomAngle : number): Sprite {
  
    const texture: Texture = Assets.get(`image${i}`);
      const sprite = new Sprite(texture) as Sprite;

      sprite.anchor.set(0.5);
      sprite.zIndex = 1;

      const radius = this.app.screen.height > this.app.screen.width ? this.app.screen.width/3 : this.app.screen.height/3;
      console.log(randomAngle)
      const angle = ((i * 2 * Math.PI) / this.numOfSprites) + randomAngle;
      sprite.x = this.app.screen.width/2 + radius * Math.cos(angle);;
      sprite.y = this.app.screen.height/2+ radius * Math.sin(angle);
     
      sprite.scale.set(Math.random() + 0.5);

      this.sprites.push(sprite);

      sprite.rotation = - Math.PI/16,
      gsap.to(sprite, {
          rotation: Math.PI/16,
          duration: 1,
          delay: Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
      });

      this.app.stage.addChild(sprite); 
      return sprite;
  }

  private randomiseScene() {
    this.shuffle(this.assignedImgNums)
    this.sprites.forEach((sprite, index) => {
      sprite.texture = Assets.get(`image${this.assignedImgNums[index]}`);
      sprite.scale.set((Math.random()/2) + 0.5);
    });
    this.text.text = this.textPool[Math.floor(Math.random() * this.textPool.length)]
    this.text.style.fontFamily = this.fontPool[Math.floor(Math.random() * this.fontPool.length)]
    this.text.style.fontWeight = Math.floor(Math.random()*2) == 0 ? 'bold' : 'normal';
    this.text.style.fontSize = 30 + (Math.random() *50)
    setTimeout(() => this.randomiseScene(), 2000);
  }

  private shuffle(array : Array<Number>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}