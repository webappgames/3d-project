import * as BABYLON from 'babylonjs';
import World from '../world/World';
import Brick from '../world/Brick';

export default class WorldGenerator{
    constructor(
        private world:World
    ){}

    generateWorld(){

        //----------------------------------Domino
        for (let i = 0; i < 7; i++) {

            new Brick(
                this.world,
                'stone-plain',
                new BABYLON.Vector3(2,40,10),
                new BABYLON.Vector3(i*25+50, 15, 100)
            );
        }
        //----------------------------------


        //----------------------------------Building
        const floors = 6;
        const size = new BABYLON.Vector3(50,10,50);
        const pillsInFloor = 5;
        const pillsThick = 0.2;


        const center = new BABYLON.Vector3(
            0,
            -10,
            70
        );

        for (let floor = 1; floor < floors; floor++) {

            new Brick(
                this.world,
                'stone-plain',
                new BABYLON.Vector3(size.x, 1, size.z),
                center.add(new BABYLON.Vector3(0, floor * 10 + 9.5, 0))
            );

            for (let pillX = 0; pillX < pillsInFloor; pillX++) {
                for (let pillY = 0; pillY < pillsInFloor; pillY++) {

                    new Brick(
                        this.world,
                        'stone-plain',
                        new BABYLON.Vector3(
                            size.x / pillsInFloor * pillsThick,
                            9,
                            size.z / pillsInFloor * pillsThick
                        ),
                        center.add(new BABYLON.Vector3(
                            (pillX / (pillsInFloor - 1) - .5) * size.x * (1 - 1 / pillsInFloor * pillsThick),
                            floor * 10 + 4.5,
                            (pillY / (pillsInFloor - 1) - .5) * size.z * (1 - 1 / pillsInFloor * pillsThick)
                        ))
                    );
                }
            }
        }
        //----------------------------------

    }
}