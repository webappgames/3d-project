import * as BABYLON from 'babylonjs';
import World from '../world/classes/World';
import Box from '../world/classes/bricks/Box';

export default class WorldGenerator{
    constructor(
        private world:World
    ){}

    generateWorld(){

        this.world.player.mesh.position.x += 5;
        this.world.player.mesh.position.z += -10;

        //----------------------------------Domino
        for (let i = 0; i < 7; i++) {

            new Box(
                this.world,
                'stone-plain',
                new BABYLON.Vector3(2,40,10),
                new BABYLON.Vector3(i*25+50, 15, 100)
            );
        }
        //----------------------------------

    }
}