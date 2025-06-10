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
            this.debugFolder = this.dFolder.addFolder('skeletons')
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

    getBonesByName(){
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
        const armSpread = THREE.MathUtils.degToRad(37); // 74° total = 37° per arm

        if (leftArm) leftArm.rotation.z = armSpread;
        if (rightArm) rightArm.rotation.z = -armSpread;


    }

    setPose(){

    }
}