import * as THREE from 'three'
import App from '../../App'

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
        // this.Skeleton = this.model.getObjectByProperty('type', 'SkinnedMesh')
        //     .skeleton
        console.log("foo skeleton", this.skeleton)
    }

    getBones(){
        this.bones = this.skeleton.bones;
        console.log("foo bones", this.bones)
    }

    setFloatPose(){
        let characterSkeleton;
        let spine;
        let spine1;
        let hips;
        let leftArm;
        let rightArm;

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
        rightArm = characterSkeleton.bones.find( bone => bone.name =='CC_Base_R_Forearm_064')
        
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
                this.armSpread.add(armSpread, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("arm-spread-v").onChange( e => {
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
                this.spine1 = this.debugF.addFolder("spine")
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

        }
    }

    setPose(){

    }
}