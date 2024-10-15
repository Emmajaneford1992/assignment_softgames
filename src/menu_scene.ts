import { Application, Graphics, Text, TextStyle } from 'pixi.js';

export class MenuScene {
  private app: Application;
  private onTaskSelect: (task: string) => void;

  constructor(app: Application, onTaskSelect: (task: string) => void) {
    this.app = app;
    this.onTaskSelect = onTaskSelect;
  }

  public init(): void {
    const menuTextStyle = new TextStyle({
      fontSize: 36,
      fill: 'white',
      align: 'center',
    });

    const title = new Text('Game Menu', menuTextStyle);
    title.anchor.set(0.5);
    title.x = this.app.screen.width / 2;
    title.y = 100;
    this.app.stage.addChild(title);

    const aceButton = this.createMenuButton('Ace of Shadows', 200, () => this.onTaskSelect('ace'));
    const magicButton = this.createMenuButton('Magic Words', 300, () => this.onTaskSelect('magic'));
    const phoenixButton = this.createMenuButton('Phoenix Flame', 400, () => this.onTaskSelect('phoenix'));

    this.app.stage.addChild(aceButton);
    this.app.stage.addChild(magicButton);
    this.app.stage.addChild(phoenixButton);
  }

  private createMenuButton(textStr: string, y: number, onClick: () => void): Graphics {
    const button = new Graphics()
      .beginFill(0xffffff)
      .drawRoundedRect(0, 0, 400, 80, 15) 
      .endFill(); 

    button.x = this.app.screen.width / 2 - button.width / 2;
    button.y = y;

    const buttonText = new Text(textStr, new TextStyle({
      fontSize: 28,
      fill: '#c0c0c0', 
      align: 'center',
    }));

    buttonText.x = button.width / 2 - buttonText.width / 2;
    buttonText.y = button.height / 2 - buttonText.height / 2;

  
    button.addChild(buttonText);
    button.interactive = true;
    button.on('pointerdown', onClick);

    return button; 
  }

  public destroy(): void {
    this.app.stage.removeChildren();
  }
}