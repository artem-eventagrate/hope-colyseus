import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

    onCreate (options: any) {
        this.setState(new MyRoomState());

        // Send update every 50ms (20 fps) default
        this.setPatchRate(50);

        this.onMessage("updatePosition", (client, data) => {
            const player = this.state.players.get(client.sessionId);

            player.positionX = data.position.x;
            player.positionY = data.position.y + 0.9;
            player.positionZ = data.position.z;

            player.rotationX = data.rotation.x;
            player.rotationY = data.rotation.y;
            player.rotationZ = data.rotation.z;
            player.rotationW = data.rotation.w;

            player.currentScene = data.currentScene;
            player.avatarModelUrl = data.avatarModelUrl;
        });
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        const FLOOR_SIZE = 4;

        const player = new Player();

        player.positionX = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);
        player.positionY = 1;
        player.positionZ = -(FLOOR_SIZE/2) + (Math.random() * FLOOR_SIZE);
        player.rotationX = 0;
        player.rotationY = 0;
        player.rotationZ = 0;
        player.rotationW = 0;

        player.currentScene = undefined;
        player.avatarModelUrl = undefined;

        this.state.players.set(client.sessionId, player);

    }

    onLeave (client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
