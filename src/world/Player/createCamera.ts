import * as BABYLON from 'babylonjs';

export default function createCamera(scene:BABYLON.Scene):BABYLON.FreeCamera{

    if(window.location.pathname==='/novr') {

        const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(), scene);


        //const camera = new BABYLON.VRDeviceOrientationFreeCamera ("Camera",  BABYLON.Vector3.Zero(), scene);
        return camera;


    }else{


        const camera = new BABYLON.WebVRFreeCamera("camera", BABYLON.Vector3.Zero(), scene);
        scene.onPointerDown = function () {
            scene.onPointerDown = undefined;
            camera.attachControl(document.getElementById('scene'), true);
        };
        return camera;

    }





}