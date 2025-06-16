import * as THREE from 'three'
import App from '../../App'


let characterSkeleton;
let spine;
let spine1;
let hips;
let leftArm;
let rightArm;
let toe;
let leftFoot;
let rightFoot;
let leftForeArm;
let rightForeArm;
let head;
let rightLeg;
let leftLeg;
let neck;

export default class Skeleton{
    constructor(model, debug){
        this.app = new App()
        this.debug = this.app.debug
        this.model = model
        this.skindMesh = this.model.getObjectByProperty('type', 'SkinnedMesh')
        this.skeleton = this.skindMesh.skeleton

        this.dFolder = debug

        if (this.debug && this.dFolder){
            this.debugFolder = this.dFolder.addFolder('skeleton pose control')
        }
    }

    getSkeleton(){
        console.log("foo skeleton", this.skeleton)
    }

    getBones(){
        this.bones = this.skeleton.bones;
        console.log("foo bones", this.bones)
    }

    setFloatPose(){
        this.model.traverse( (child) => {
            if(child.isSkinnedMesh){
                characterSkeleton = child.skeleton;
            }
        });

        //const spine = characterSkeleton.getObjectByName('CC_Base_Spine01_035');
        spine = characterSkeleton.bones.find( bone => bone.name =='CC_Base_Spine01_035');

        //const spine1 = characterSkeleton.getObjectByName('CC_Base_Spine02_036');
        spine1 = characterSkeleton.bones.find( bone => bone.name =='CC_Base_Spine02_036');

        //const hips = characterSkeleton.getObjectByName('CC_Base_Hip_02');
        hips = characterSkeleton.bones.find( bone => bone.name =='CC_Base_Hip_02')

        //const leftArm = characterSkeleton.getObjectByName('CC_Base_L_Forearm_051');
        leftArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_L_Forearm_051');

        //const rightArm = characterSkeleton.getObjectByName('CC_Base_R_Forearm_064');
        rightArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Forearm_064');

        toe = characterSkeleton.bones.find( bone =>bone.name == 'CC_Base_L_Upperarm_050' )
        
        // ✅ Lean: 20° forward (spine pitch)
        if (spine) spine.rotation.x = THREE.MathUtils.degToRad(-20);
        if (spine1) spine1.rotation.x = THREE.MathUtils.degToRad(-10); // subtle continuation

        // ✅ Posture: 90° = upright, no twist or tilt
        if (hips) {
            hips.rotation.y = 0;
            hips.rotation.z = 0;
        }

        // ✅ Armspace: 74° outward spread (i.e., arms angled slightly away from torso)
        let armSpread = {}
        armSpread.value = THREE.MathUtils.degToRad(37); // 74° total = 37° per arm

        if (leftArm) leftArm.rotation.z = armSpread.value;
        if (rightArm) rightArm.rotation.z = -armSpread.value;

        if(this.debugFolder && this.dFolder){
            this.debugF = this.debugFolder.addFolder('floating_pose')

            if(armSpread && rightArm && leftArm){
                this.armSpread =  this.debugF.addFolder("ArmSpred")
                this.armSpread.add(armSpread, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-spread-v").onChange( e => {
                    leftArm.rotation.z = armSpread.value
                    rightArm.rotation.z = -armSpread.value
                })
            }

            if(spine){
                this.spine = this.debugF.addFolder("spine")
                this.spine.add(spine.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-y")
                this.spine.add(spine.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-z")
                this.spine.add(spine.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-x")
            }

            if(spine1){
                this.spine1 = this.debugF.addFolder("spine1")
                this.spine1.add(spine1.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-y")
                this.spine1.add(spine1.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-z")
                this.spine1.add(spine1.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-x")
            }

            if(hips){
                this.hipD = this.debugF.addFolder("hips")
                this.hipD.add( hips.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                this.hipD.add( hips.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                this.hipD.add( hips.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")
            }
            
            if(toe){
                console.log("hel")
                this.toe = this.debugF.addFolder("toe")
                this.toe.add( toe.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                this.toe.add( toe.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                this.toe.add( toe.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")
            }

        }
    }

    setFlyingPose(){
        this.model.traverse( (child) => {
            if(child.isSkinnedMesh){
                characterSkeleton = child.skeleton;
            }
        });

        head = characterSkeleton.bones.find( bone => bone.name == 'CC_Base_Head_039')
        leftArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_L_Forearm_051');
        rightArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Forearm_064');

        leftFoot = characterSkeleton.bones.find( bone => bone.name =='CC_Base_L_Foot_06');
        rightFoot = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Foot_022');

        hips = characterSkeleton.bones.find( bone => bone.name =='CC_Base_Hip_02')

        leftLeg = characterSkeleton.bones.find( bone => bone.name =='CC_Base_L_Thigh_04');
        rightLeg = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Thigh_019');

        leftForeArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_L_Forearm_051');
        rightForeArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Forearm_064');
       
        if (hips) {
            hips.rotation.x = THREE.MathUtils.degToRad(90); // lay flat, face down
        }
        
        let footAngle = {}
        footAngle.value = THREE.MathUtils.degToRad(20);
        if (leftFoot) leftFoot.rotation.x = footAngle.value;
        if (rightFoot) rightFoot.rotation.x = footAngle.value;

        let legAngle = {}
        legAngle.value = THREE.MathUtils.degToRad(-170);
        if (leftLeg) leftLeg.rotation.z = legAngle.value;
        if (rightLeg) rightLeg.rotation.z = -legAngle.value;

        let armAngle = {}
        armAngle.value = THREE.MathUtils.degToRad(-60); 
        if (leftArm) leftArm.rotation.x = armAngle.value;
        if (rightArm) rightArm.rotation.x = -armAngle.value;

        if (leftForeArm) leftForeArm.rotation.x = 0;
        if (rightForeArm) rightForeArm.rotation.x = 0;

        if(this.debugFolder && this.dFolder){
            this.debugFl = this.debugFolder.addFolder('flying_pose')

            if(head){
                this.head =  this.debugFl.addFolder("head")
                this.head.add( head.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-y")
                this.head.add( head.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-z")
                this.head.add( head.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-x")
            }

            if(armAngle && rightArm && leftArm){
                this.armAngle =  this.debugFl.addFolder("ArmAngle")
                this.armAngle.add(armAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-Degres-v").onChange( e => {
                    leftArm.rotation.z = armAngle.value
                    rightArm.rotation.z = -armAngle.value
                })
            }

            if(footAngle && rightFoot && leftFoot){
                this.footAngle =  this.debugFl.addFolder("footAngle")
                this.footAngle.add(footAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-10)).name("foot-Degres-v").onChange( ()=> {
                    rightFoot.rotation.x = footAngle.value
                    leftFoot.rotation.x = footAngle.value
                })
            }

            if(legAngle && rightLeg && leftLeg){
                this.legAngle =  this.debugFl.addFolder("legAngle")
                this.legAngle.add(legAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(-90)).min(THREE.MathUtils.degToRad(-180)).name("leg-Degres-v").onChange( ()=> {
                    rightLeg.rotation.z = -legAngle.value
                    leftLeg.rotation.z = legAngle.value
                })
            }


            if(hips){
                this.hipD = this.debugFl.addFolder("hips")
                this.hipD.add( hips.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                this.hipD.add( hips.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                this.hipD.add( hips.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")
            }

            if(leftForeArm){
                this.leftFor = this.debugFl.addFolder("left-fore-arm")
                this.leftFor.add( leftForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-x")
            }

            if (rightForeArm){
                this.rightFor= this.debugFl.addFolder("right-fore-arm")
                this.rightFor.add( rightForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-x")
            }
            
        }

    }

}