import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import EnemyState from "./EnemyState";

export default class Fly extends EnemyState {
	
	onEnter(): void {
        if(this.parent.direction.isZero()){
			this.parent.direction = new Vec2(-1, 0);
			(<AnimatedSprite>this.owner).invertX = true;
		}
		(<AnimatedSprite>this.owner).animation.play("FLY", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);

		this.parent.velocity.x = this.parent.direction.x * this.parent.speed;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}