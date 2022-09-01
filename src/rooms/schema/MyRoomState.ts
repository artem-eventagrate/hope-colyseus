import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("number") positionX: number;
    @type("number") positionY: number;
    @type("number") positionZ: number;
    @type("number") rotationX: number;
    @type("number") rotationY: number;
    @type("number") rotationZ: number;
    @type("number") rotationW: number;
    @type("string") currentScene: string;
    @type("string") avatarModelUrl: string;
}

export class MyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}
