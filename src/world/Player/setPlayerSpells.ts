import Player from './index';

export default function setPlayerSpells(
    player:Player
){
    const onPointerDown = ()=>{
        player.world.pick().pickedMesh.dispose();
    };

    player.world.canvasElement.addEventListener("pointerdown",onPointerDown);
}