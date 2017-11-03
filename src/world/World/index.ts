import * as BABYLON from 'babylonjs';
import * as _ from "lodash";
import UIDataModel from '../../ui-data-model';
import MaterialFactory from "../MaterialFactory";
import WorldGenerator from "../../generator";
import Player from '../Player';
import Brick from '../Brick';
import createScene from './createScene';
import createLights from './createLights';
import createGroundMesh from './createGround';
import createSkyboxMesh from './createSkyboxMesh';

export default class World{
    public engine:BABYLON.Engine;
    public scene:BABYLON.Scene;
    public materialFactory:MaterialFactory;
    public worldGenerator:WorldGenerator;
    public lights:BABYLON.Light[];
    public player:Player;
    public bricks:Brick[];
    public groundMesh:BABYLON.AbstractMesh;
    public skyboxMesh:BABYLON.AbstractMesh;

    constructor(
        public canvasElement: HTMLCanvasElement,
        public uiDataModel:UIDataModel
    ){

        this.bricks=[];
        this.engine = new BABYLON.Engine(this.canvasElement, true);

        const updateUIStat = _.throttle(()=>{
            this.uiDataModel.stat.fps = this.engine.getFps();
            this.uiDataModel.stat.meshes = this.scene.meshes.length;
        },200);
        this.engine.runRenderLoop(()=>{
            this.scene.render();
            updateUIStat();
        });

        window.addEventListener("resize", ()=>{
            this.engine.resize();
        });

        this.scene = createScene(this.engine);
        this.lights = createLights(this.scene);
        this.materialFactory = new MaterialFactory(this.scene);
        this.player = new Player(this);
        this.skyboxMesh = createSkyboxMesh(this.scene);
        this.groundMesh = createGroundMesh(this.scene);

        this.worldGenerator = new WorldGenerator(this);
        this.worldGenerator.generateWorld();
    }

    pick(left:number=.5,top:number=.5):BABYLON.PickingInfo {
        return this.scene.pick(this.canvasElement.width * left, this.canvasElement.height * top, (mesh) => {
            return mesh !== this.player.mesh && 'physicsImpostor' in mesh;
        });
    }
}

