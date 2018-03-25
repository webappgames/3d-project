import * as BABYLON from 'babylonjs';
import Player from './index';
import Brick from '../../world/Brick';

export default function setPlayerAction(
    player:Player
){
    const onPointerDown = ()=>{
        new Brick(
            player.world,
            'clay-bricks',
            {mass:5000,restitution:0.5},
            new BABYLON.Vector3(2,2,2),
            player.mesh.position.add(player.direction1),
            BABYLON.Vector3.Zero(),
            player.direction1.scale(100).add(new BABYLON.Vector3(0,30,0)),
            new BABYLON.Vector3(
                (Math.random()-.5)*Math.PI*10,
                (Math.random()-.5)*Math.PI*10,
                (Math.random()-.5)*Math.PI*10
            )
        );
    };

    player.world.canvasElement.addEventListener("mousedown",onPointerDown);
}