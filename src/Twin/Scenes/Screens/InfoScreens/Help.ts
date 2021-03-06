import Scene from "../../../../Wolfie2D/Scene/Scene";
import { Screens } from "../../Enums/ScreenEnums";
import InfoScreenCreator from "../../SceneHelpers/InfoScreenCreator";
import { ScreenTexts } from "../../Enums/ScreenTextEnums";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";

export default class Help extends Scene {
  private layer: string;

  loadScene(): void {
    this.load.object("Help", "assets/texts/help.json");
    // Load click sfx
    this.load.audio("menuButton", "assets/sounds/sfx/menuButton.mp3");
  }

  startScene(): void {
    // Create Help layer
    this.layer = Screens.HELP;
    this.addUILayer(this.layer);

    // Create screen objects
    this.createScreen();

    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menuButton"});
  }

  private createScreen(): void {
    let isc = new InfoScreenCreator(
      this,
      this.viewport,
      this.layer,
      this.sceneManager,
    );
    isc.createScreen(ScreenTexts.HELP);
  }

  updateScene(): void {}
}
