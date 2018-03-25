import * as BABYLON from 'babylonjs';
import * as GridBuilding from 'gridbuilding';
import World from '../world/World';
import Brick from '../world/Brick';

export default class WorldGenerator {
    constructor(private world: World) {
    }

    generateWorld() {


        //----------------------------------Mengere


        const itt = 2;
        const size = new BABYLON.Vector3(
            100,
            100,
            100
        );
        const center = new BABYLON.Vector3(
            100,
            0,
            100
        );
        const brick_size = size.scale(1 / Math.pow(3, itt));


        function isSolid(itt:number,x:number,y:number,z:number): boolean{
            if(
                (x%3==1&&y%3==1)||
                (y%3==1&&z%3==1)||
                (x%3==1&&z%3==1)

            ){
                return false;
            }
            if(itt>0){
                return(
                    isSolid(
                        itt-1,
                        Math.floor(x/3),
                        Math.floor(y/3),
                        Math.floor(z/3),
                    )
                )
            }
            return true;
        }


        for (let x = 0; x < Math.pow(3, itt); x++) {
            for (let y = 0; y < Math.pow(3, itt); y++) {
                for (let z = 0; z < Math.pow(3, itt); z++) {

                    if(isSolid(itt,x,y,z)) {
                        new Brick(
                            this.world,
                            'stone-plain',
                            {mass: 0, restitution: 0.4},
                            brick_size,
                            new BABYLON.Vector3(
                                x * brick_size.x,
                                y * brick_size.y,
                                z * brick_size.z,
                            ).add(center)
                        );
                    }


                }
            }
        }
        //----------------------------------

        //----------------------------------GridBuilding
        GridBuilding;
        /*const center = new BABYLON.Vector3(
            0,
            0,
            50
        ).add(new BABYLON.Vector3(
            20,
            0,
            20
        ));

        const FLOOR1 = `       
+:::+:::+
:::::::::
+:::+:::+
:::::::::
+:::+:::+
`;

        const FLOOR2 = `       
---------
|:::|:::|
|-------|
|:::|:::|
-:::-----
`;

        const building = GridBuilding.Building.fromFloorStrings([
            FLOOR1,
            FLOOR1,
            FLOOR2,
            FLOOR2,
            FLOOR2,
        ]);

        //this._randomColor;
        building.getBricks().forEach((brick) => {

            new Brick(
                this.world,
                /!*this._randomColor()*!/'clay-bricks',
                {mass:200, restitution: 0.001},
                new BABYLON.Vector3(brick.size.x, brick.size.z, brick.size.y),
                new BABYLON.Vector3(brick.center.x, brick.center.z, brick.center.y).add(center)
            );
        });*/
        //----------------------------------


        //----------------------------------Domino
        /*
        for (let i = 0; i < 7; i++) {

            new Brick(
                this.world,
                'stone-plain',
                {mass:500,restitution:0.4},
                new BABYLON.Vector3(2,40,10),
                new BABYLON.Vector3(i*25+50, 15, 100)
            );
        }*/
        //----------------------------------


        //----------------------------------Building
        /*
        const floors = 8;
        const size = new BABYLON.Vector3(50,10,50);
        const pillsInFloor = 5;
        const pillsThick = 0.25;


        const center = new BABYLON.Vector3(
            0,
            -10,
            70
        );

        for (let floor = 1; floor < floors; floor++) {

            new Brick(
                this.world,
                'stone-plain',
                {mass:100, restitution: 0.01},
                new BABYLON.Vector3(size.x, 1, size.z),
                center.add(new BABYLON.Vector3(0, floor * 10 + 9.5, 0))
            );

            for (let pillX = 0; pillX < pillsInFloor; pillX++) {
                for (let pillY = 0; pillY < pillsInFloor; pillY++) {

                    new Brick(
                        this.world,
                        'stone-plain',
                        {mass:200, restitution: 0.01},
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
        }/**/
        //----------------------------------

    }
}