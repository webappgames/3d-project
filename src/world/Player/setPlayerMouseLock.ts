import DataModel from '../../ui-data-model';
import * as BABYLON from 'babylonjs';

export default function setPlayerMouseLock(
    canvasElement:HTMLCanvasElement,
    camera:BABYLON.FreeCamera,
    //onClick:(event:PointerEvent)=>void,
    dataModel:DataModel
){

    //todo add event listener
    canvasElement.addEventListener("pointerdown",
        (event)=>{
            if(document.pointerLockElement !== canvasElement) {
                canvasElement.requestPointerLock();
            }
        }
        , false);



    //todo prevent spell creating when locking cursor
    if ("onpointerlockchange" in document) {
        document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
        document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }

    function lockChangeAlert() {
        if(document.pointerLockElement === canvasElement) {
            //The pointer lock status is now locked
            dataModel.locked=true;
            document.addEventListener("mousemove", mouseMoveLocked, false);
            //document.removeEventListener("mousemove", mouseMoveUnlocked, false);
        } else {
            //The pointer lock status is now unlocked
            dataModel.locked=false;
            //document.addEventListener("mousemove", mouseMoveUnlocked, false);
            document.removeEventListener("mousemove", mouseMoveLocked, false);
        }
    }

    //todo to config
    const cameraRotationXLimitMin = Math.PI * -.5*.9,
        cameraRotationXLimitMax = Math.PI * 0.5*.9;

    function mouseMoveLocked(event:MouseEvent) {
            const x = event.movementX,
                  y = event.movementY;
            const alpha = y/500,
                  beta = x/500;

            camera.rotation.x += alpha;
            camera.rotation.y += beta;
            if(camera.rotation.x<cameraRotationXLimitMin)camera.rotation.x=cameraRotationXLimitMin;
            if(camera.rotation.x>cameraRotationXLimitMax)camera.rotation.x=cameraRotationXLimitMax;

    }

}