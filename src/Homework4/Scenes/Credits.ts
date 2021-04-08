import Scene from "../../Wolfie2D/Scene/Scene";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../Wolfie2D/Utils/Color";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenu";

export default class Credits extends Scene {

  loadScene(): void {}

  startScene(): void {
    // TODO - Add real text to display game credits

    // Testing stuff
    this.addUILayer("Credits");
    let creditsLabel = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "Credits",
      {
        position: new Vec2(100, 100),
        text: "Credits",
      }
    );
    creditsLabel.textColor = Color.WHITE;

    // Return to Main Menu button
    let returnButton = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "Credits", {
        position: new Vec2(1000, 730),
        text: "Return",
      })
    );
    returnButton.applyButtonStyle(
      Color.WHITE,
      Color.BLACK,
      new Vec2(250, 50),
      "NoPixel"
    );

    // When the control button is clicked, go to the controls screen
    returnButton.onClick = () => {
      this.sceneManager.changeToScene(MainMenu, {});
    };
  }

  updateScene(): void {}
}