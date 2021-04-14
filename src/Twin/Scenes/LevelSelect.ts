import Scene from "../../Wolfie2D/Scene/Scene";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";
import MainMenu from "./MainMenu";
import LevelTracker from "./SceneHelpers/LevelTracker";
import SceneItemCreator from "./SceneHelpers/SceneItemCreator";
import Input from "../../Wolfie2D/Input/Input";
import SceneOptions from "./SceneHelpers/SceneOptions";

export default class LevelSelect extends Scene {
  // String to Level Map
  private stringToLevelMap: { [level: string]: object };

  loadScene(): void {}

  startScene(): void {
    let layer = "LevelSelect";
    this.addUILayer(layer);

    // Create return button
    SceneItemCreator.createButton(
      this,
      layer,
      1000,
      730,
      "Return"
    ).onClick = () => {
      this.sceneManager.changeToScene(MainMenu, {});
    };

    // Create map for levels
    this.createStringToLevelMap();

    // Buttons for each level
    this.createLevelButtons(layer);
  }

  createStringToLevelMap(): void {
    // Twin TODO (Code) - Correct level map (as levels are created)
    this.stringToLevelMap = {
      "Level 1": Level1,
      "Level 2": Level2,
      "Level 3": Level2,
      "Level 4": Level2,
      "Level 5": Level2,
      "Level 6": Level2,
      "Final Level": Level2,
    };
  }

  createLevelButtons(layer: string): void {
    let levelMap = LevelTracker.getLevels();
    console.log(levelMap["Level 1"]);

    let half = this.viewport.getHalfSize();
    let x = half.x / 2;
    let y = half.y / 2;
    let xSpace = half.x / 2;
    let ySpace = half.y / 4;

    // Level Options
    /*
        Init the next scene with physics collisions:

                ground  player  enemy   coin
        ground    No      --      --     --
        player   Yes      No      --     --
        enemy    Yes      No      No     --
        coin      No     Yes      No     No

        Each layer becomes a number. In this case, 4 bits matter for each

        ground: self - 0001, collisions - 0110
        player: self - 0010, collisions - 1001
        enemy:  self - 0100, collisions - 0001
        coin:   self - 1000, collisions - 0010
    */
    let sceneOptions = SceneOptions.getSceneOptions();

    let levelCounter = 0;
    let rows = 2;
    let cols = 3;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        levelCounter++;
        let level = "Level " + levelCounter;

        this.createLevelButton(
          layer,
          x,
          y,
          xSpace,
          ySpace,
          level,
          levelMap,
          sceneOptions,
          j,
          i
        );
      }
    }

    // Final level
    this.createLevelButton(
      layer,
      x,
      y,
      xSpace,
      ySpace,
      "Final Level",
      levelMap,
      sceneOptions,
      1,
      3
    );
  }

  createLevelButton(
    layer: string,
    x: number,
    y: number,
    xSpace: number,
    ySpace: number,
    level: string,
    levelMap: { [level: string]: boolean },
    sceneOptions: object,
    xOffset: number,
    yOffset: number
  ): void {
    let button = SceneItemCreator.createLevelButton(
      this,
      layer,
      x + xSpace * xOffset,
      y + ySpace * yOffset,
      level,
      levelMap[level]
    );

    // Allow onClick for unlocked levels
    if (levelMap[level]) {
      button.onClick = () => {
        this.sceneManager.changeToScene(
          <any>this.stringToLevelMap[level],
          {},
          sceneOptions
        );
      };
    }
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);

    if (Input.isPressed("unlock")) {
      if (LevelTracker.unlockAllLevels()) {
        this.sceneManager.changeToScene(LevelSelect, {});
      }
    }
  }
}
