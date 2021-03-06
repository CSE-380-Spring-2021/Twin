import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import InAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Run from "./PlayerStates/Run";
import Walk from "./PlayerStates/Walk";

export enum PlayerType {
  PLATFORMER = "platformer",
  TOPDOWN = "topdown",
}

export enum PlayerStates {
  IDLE = "idle",
  WALK = "walk",
  RUN = "run",
  JUMP = "jump",
  FALL = "fall",
  PREVIOUS = "previous",
}

export default class PlayerController extends StateMachineAI {
  protected owner: GameNode;
  velocity: Vec2 = Vec2.ZERO;
  speed: number = 200;
  MIN_SPEED: number = 200;
  MAX_SPEED: number = 250;
  SAVED_MIN_SPEED: number = 200;
  SAVED_MAX_SPEED: number = 250;
  JUMP_HEIGHT: number;
  SAVED_JUMP_HEIGHT: number;
  tilemap: OrthogonalTilemap;
  coin: Sprite;
  characterType: string; // body, soul
  fallFactor: number;

  initializeAI(owner: GameNode, options: Record<string, any>) {
    this.owner = owner;
    this.characterType = options.characterType;
    this.JUMP_HEIGHT = options.JUMP_HEIGHT;
    this.SAVED_JUMP_HEIGHT = this.JUMP_HEIGHT;
    this.fallFactor = options.fallFactor;

    this.initializePlatformer();

    this.tilemap = this.owner
      .getScene()
      .getTilemap(options.tilemap) as OrthogonalTilemap;
    this.coin = this.owner.getScene().add.sprite("coin", "coinLayer");
    this.coin.scale.set(2, 2);
  }

  initializePlatformer(): void {
    this.speed = 400;

    let idle = new Idle(this, this.owner);
    this.addState(PlayerStates.IDLE, idle);
    let walk = new Walk(this, this.owner);
    this.addState(PlayerStates.WALK, walk);
    let run = new Run(this, this.owner);
    this.addState(PlayerStates.RUN, run);
    let jump = new Jump(this, this.owner);
    this.addState(PlayerStates.JUMP, jump);
    let fall = new Fall(this, this.owner);
    this.addState(PlayerStates.FALL, fall);

    this.initialize(PlayerStates.IDLE);
  }

  changeState(stateName: string): void {
    // If we jump or fall, push the state so we can go back to our current state later
    // unless we're going from jump to fall or something
    if (
      (stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) &&
      !(this.stack.peek() instanceof InAir)
    ) {
      this.stack.push(this.stateMap.get(stateName));
    }

    super.changeState(stateName);
  }

  update(deltaT: number): void {
    super.update(deltaT);

    if (this.currentState instanceof Jump) {
      Debug.log("playerstate", "Player State: Jump");
    } else if (this.currentState instanceof Walk) {
      Debug.log("playerstate", "Player State: Walk");
    } else if (this.currentState instanceof Run) {
      Debug.log("playerstate", "Player State: Run");
    } else if (this.currentState instanceof Idle) {
      Debug.log("playerstate", "Player State: Idle");
    } else if (this.currentState instanceof Fall) {
      Debug.log("playerstate", "Player State: Fall");
    }
  }
}
