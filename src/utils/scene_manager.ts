import { Application, Text } from 'pixi.js';

export class SceneManager {
  private app: Application;
  private currentScene: any;
  private fpsText : Text;

  constructor(app: Application, fpsText: Text) {
    this.app = app;
    this.fpsText = fpsText;
  }

  public changeScene(newScene: any): void {
    if (this.currentScene) {
      this.app.stage.children.forEach((child) => {
        if (!(child instanceof Text && child === this.fpsText)) {
          this.app.stage.removeChild(child);
        }
      });

      if (this.currentScene.destroy) {
        this.currentScene.destroy();
      }
    }
    this.currentScene = newScene;
    this.currentScene.init();
  }
}