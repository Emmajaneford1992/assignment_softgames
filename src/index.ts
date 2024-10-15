import {Application, Text} from 'pixi.js';
import { SceneManager } from './utils/scene_manager';
import { MenuScene } from './menu_scene';
import { PhoenixFlame } from './tasks/pheonix_flame';
import { AceOfShadows } from './tasks/ace_of_shadows';
import { MagicWords} from './tasks/magic_words';

const app = new Application();

async function setup() {
    await app.init({ 
      background: '#e0e0e0', 
      resizeTo: window,
      
    });
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.canvas);
}

(async () => {
    await setup();
    await new MainApp(app);

})();

class MainApp {
  private app: Application;
  private sceneManager: SceneManager;
  private fpsText: Text;

  constructor(app: Application) {
    this.app = app;
  
    this.fpsText = new Text({text: 'FPS: 0', style:{ fontSize: 18, fill: 0x000000 }});
    this.fpsText.x = 10;
    this.fpsText.y = 10;
    this.app.stage.addChild(this.fpsText);
    this.app.ticker.add(() => this.update(this.app));
  

    this.sceneManager = new SceneManager(this.app, this.fpsText);

    const menuScene = new MenuScene(this.app, this.handleTaskSelect.bind(this));
    this.sceneManager.changeScene(menuScene);
  }

  private update(app: Application): void {
    const fps = app.ticker.FPS.toFixed(2);
    this.fpsText.text = `FPS: ${fps}`;
  }
 

  private handleTaskSelect(task: string): void {
    switch (task) {
      case 'ace':
        this.sceneManager.changeScene(new AceOfShadows(this.app));
        break;
      case 'magic':
        this.sceneManager.changeScene(new MagicWords(this.app));
        break;
      case 'phoenix':
        this.sceneManager.changeScene(new PhoenixFlame(this.app));
        break;
    }
  }
};