import { Application, Sprite, Assets,Texture, DisplacementFilter, MeshRope, Point } from 'pixi.js';
import { gsap } from 'gsap';


export class PhoenixFlame {
  private app: Application;
  private particles: Sprite[] = [];
  private images: { alias: string; src: string }[] = [];
  private displacementTexture!: Texture; 
  private displacementSprite!: Sprite; 
  private textureSize : number;

  constructor(app: Application) {
    this.app = app;
    this.images = [
      { alias: 'flame1', src: '/assets/images/pheonix_flame/flame0.png' },
      { alias: 'flame2', src: '/assets/images/pheonix_flame/flame1.png' },
      { alias: 'displacement', src: '/assets/images/pheonix_flame/displacement_map.jpg' } 
    ];
    this.textureSize  = 400
  }

  public async init(): Promise<void> {
    this.app.renderer.background.color = '0x000000'

    await Assets.load(this.images);

    this.displacementTexture = Assets.get('displacement');
    this.displacementSprite = new Sprite(this.displacementTexture);
    this.displacementSprite.x = (this.app.screen.height / 2)+this.textureSize*2,
    this.displacementSprite.y = (this.app.screen.height / 2);
    this.displacementSprite.alpha = 1;
    this.displacementSprite.scale.set(4);
    this.app.stage.addChild(this.displacementSprite);
    const displacementFilter = new DisplacementFilter(this.displacementSprite);

    const texture: Texture = Assets.get(`flame2`);
    const ropeLength = 918 / 20;

    let points: Point[] = [];
    for (let i = 0; i < 10; i++)
    {
        points.push(new Point(i * ropeLength, 0));
    }

    const strip = new MeshRope({ texture, points });
    strip.x = (this.app.screen.width /2)-this.textureSize;
    strip.y = (this.app.screen.height)-(this.textureSize*0.8)
    strip.rotation = -Math.PI/2;
    strip.scale.set(2)
    this.app.stage.addChild(strip);

    const particle = new Sprite(texture);
    particle.x = (this.app.screen.width /2)-this.textureSize;
    particle.y = (this.app.screen.height)-(this.textureSize*1.6)
    particle.alpha = 1;
    particle.scale.set(2);
    this.app.stage.addChild(particle);
    this.particles.push(particle);
    particle.filters = [displacementFilter];

    gsap.to(this.displacementSprite, {
      x: (this.app.screen.width /2)-this.textureSize*2,
      y: (this.app.screen.height)-(this.textureSize*3),
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    
    let count = 0;
    this.app.ticker.add(() =>
    {
      count += 0.1;
      for (let i = 0; i < points.length; i++)
      {
        points[i].x = Math.sin(i * 0.5 + count) *2;
        points[i].y = i * ropeLength + Math.cos(i * 0.3 + count) *2;
      }
    })

  }
}