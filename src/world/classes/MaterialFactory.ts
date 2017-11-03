import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import * as _ from 'lodash';


export default class MaterialFactory{


    private _materialsCache:BABYLON.StandardMaterial[];


    constructor(
        private _scene:BABYLON.Scene
    ){
        this._materialsCache = [];
    }


    getMaterial(
        materialName:string
    ){



        const cashedMaterial = this._materialsCache.find((material)=>material.name === materialName)||null;

        if(cashedMaterial){
            return cashedMaterial;
        }else {
            log.send(`Creating material "${materialName}".`);


            let textureScale=1;
            if(materialName==='grass'){
                textureScale=100;
            }

            const material = new BABYLON.StandardMaterial(materialName, this._scene);
            material.backFaceCulling = false;
            const texture = new BABYLON.Texture(process.env.PUBLIC_URL +`/assets/textures/${materialName}.jpg`, this._scene);
            texture.uScale = textureScale;
            texture.vScale = textureScale;
            material.diffuseTexture = texture;

            material.specularColor = BABYLON.Color3.FromHexString('#ffeacb');
            //material.emissiveColor = BABYLON.Color3.FromHexString('#00ff00');
            material.emissiveTexture = texture;

            this._materialsCache.push(material);
            return material;
        }


    }


    applyMaterial(mesh:BABYLON.AbstractMesh,materialName='stone-plain',impostor=BABYLON.PhysicsImpostor.BoxImpostor){
        mesh.material = this.getMaterial(materialName);
        if('physicsImpostor' in mesh) {
            if (!mesh.physicsImpostor.isDisposed) {
                mesh.physicsImpostor.dispose();
            }
        }

        if(materialName==='stone-plain-ghost')return;

        const materialPhysicOptions = {
            mass: 100,
            restitution:0.002,
            friction:1
        };


        if(materialName==='stone-plain-freezed'){
            materialPhysicOptions.mass = 0;
        }

        if(materialName==='meteorite'){
            materialPhysicOptions.mass = 200;
        }

        if(materialName==='itnetwork_summer_2017'){
            materialPhysicOptions.mass = 1;
        }


        if(materialName==='wood-fence'){
            materialPhysicOptions.mass = 10;
            //materialPhysicOptions.restitution = 0;
            //materialPhysicOptions.friction = 100;
        }



        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, impostor/*BABYLON.PhysicsImpostor.BoxImpostor*/, materialPhysicOptions, this._scene);


        const stepSound = this._soundFactory.getMeshSound('step-stairs',mesh);

        _;stepSound;
        /*!todo const playSound = _.throttle((volume:number,playbackRate:number)=>{

            stepSound.setVolume(volume);
            stepSound.setPlaybackRate(playbackRate);

            console.log(`${volume} ${playbackRate}`);
            stepSound.play()

        },100);


        let lastEnergy = 0;
        mesh.physicsImpostor.registerAfterPhysicsStep(()=>{

            const currentEnergy = countEnergy(mesh);
            const energyDelta = currentEnergy - lastEnergy;
            lastEnergy = currentEnergy;

            if(energyDelta<-100){

                playSound(
                    countVolume(mesh)*-energyDelta/10000,
                    1//Math.sqrt(100/countVolume(mesh))
                );
            }


        })/**/





        /*sphereImpostor.registerOnPhysicsCollide(undefined, function(main, collided) {
            console.log('boom');
            stepSound.play();
        });*/



        /*mesh.physicsImpostor.registerBeforePhysicsStep(()=>{
            //const angularVelocity = mesh.physicsImpostor.getAngularVelocity();
            //mesh.physicsImpostor.setAngularVelocity(angularVelocity.add(new BABYLON.Vector3(.1,0,0)));
            mesh.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
        });*/




        /*mesh.physicsImpostor.registerBeforePhysicsStep(()=>{

            const linearVelocity = mesh.physicsImpostor.getLinearVelocity();
            const angularVelocity = mesh.physicsImpostor.getAngularVelocity();


            //mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(.5));
            //mesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(.5));


            if(angularVelocity.length()<1){
                //mesh.physicsImpostor.setAngularVelocity(angularVelocity.scale(-1));
            }


            if(linearVelocity.length()<2){
                //mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(-1));
                mesh.physicsImpostor.setLinearVelocity(linearVelocity.scale(0));
            }

        });*/



    }







}


