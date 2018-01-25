import * as BABYLON from 'babylonjs';

export default function setPlayerMouseLock(canvasElement: HTMLCanvasElement,
                                           camera: BABYLON.FreeCamera) {

    //todo add event listener
    canvasElement.addEventListener("pointerdown",
        (event) => {
            if (document.pointerLockElement !== canvasElement) {
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
        if (document.pointerLockElement === canvasElement) {
            document.addEventListener("mousemove", mouseMoveLocked, false);
        } else {
            document.removeEventListener("mousemove", mouseMoveLocked, false);
        }
    }

    //todo to config
    const cameraRotationAlphaLimitMin = Math.PI * -.5 * .9;
    const cameraRotationAlphaLimitMax = Math.PI * 0.5 * .9;

    function mouseMoveLocked(event: MouseEvent) {
        const x = event.movementX;
        const    y = event.movementY;
        let alpha = y / 1500;
        let  beta = x / 1500;

        if (alpha < cameraRotationAlphaLimitMin) alpha = cameraRotationAlphaLimitMin;
        if (alpha > cameraRotationAlphaLimitMax) alpha = cameraRotationAlphaLimitMax;
        alpha;beta;

        //camera.rotationQuaternion.x += alpha;
        //camera.rotationQuaternion.w += beta;

        camera.cameraRotation.x += alpha;
        camera.cameraRotation.y += beta;


        /*camera.rotationQuaternion = camera.rotationQuaternion
            .add(BABYLON.Quaternion.RotationAxis(
                new BABYLON.Vector3(1,0,0),alpha
            ))
            .add(BABYLON.Quaternion.RotationAxis(
                    new BABYLON.Vector3(0,0,1),beta
                ));*/

    }

}