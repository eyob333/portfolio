import * as THREE from 'three'
import App from '../../App'

export default class Skeleton{
    constructor(debug){
        this.app = new App()
        this.scene = this.app.scene
        this.model = this.app.nomad.scene
        this.skindMesh = this.model.getObjectByProperty('type', 'SkinnedMesh')
        this.skeleton = this.skindMesh.skeleton
        this.dFolder = debug

        if (this.dFolder){
            this.debugFolder = this.dFolder.addFolder('skeleton pose control')
        }
        this.characterSkeleton;
        this.model.traverse( (child) => {
            if(child.isSkinnedMesh){
                let helper = new THREE.SkeletonHelper( child );
                this.characterSkeleton = child.skeleton;
                this.scene.add( helper );
            }
        });     
        
        this.bones = {}
        this.instanceBone()
        this.app.nomad.bones = this.bones
    }

    instanceBone(){
        const findBone = (name) => this.characterSkeleton.bones.find(bone => bone.name === name);
        this.bones.spine = findBone('CC_Base_Spine01_035');
        this.bones.spine1 = findBone('CC_Base_Spine02_036');
        this.bones.hips = findBone('CC_Base_Hip_02');
        this.bones.neck = findBone('CC_Base_NeckTwist01_037');
        this.bones.leftFoot = findBone('CC_Base_L_Foot_06');
        this.bones.rightFoot = findBone('CC_Base_R_Foot_022');
        this.bones.leftForeArm = findBone('CC_Base_L_Forearm_051');
        this.bones.rightForeArm = findBone('CC_Base_R_Forearm_064');
        this.bones.head = findBone('CC_Base_Head_039');
        this.bones.rightLeg = findBone('CC_Base_R_Thigh_019');
        this.bones.leftLeg = findBone('CC_Base_L_Thigh_04');
        this.bones.rightArm = findBone('CC_Base_R_Upperarm_063');//CC_Base_R_Upperarm_063
        this.bones.leftArm = findBone('CC_Base_L_Upperarm_050')//CC_Base_L_Upperarm_050
        this.bones.waist = findBone('CC_Base_Waist_034'); 
        // this.bones.LeftBiceps; //CC_Base_L_UpperarmTwist02_057
        // this.bones.rightBiceps; //CC_Base_R_UpperarmTwist02_070       
        // this.bones.leftCalf; // CC_Base_L_Calf_05
        // this.bones.rightCalf; //
    }

    instanceBoneDebugBones(){

    }

    getSkeleton(){
        console.log("foo skeleton", this.skeleton)
    }

    getBones(){
        console.log("foo bones", this.skeleton.bones)
    }

    setFloatPose(){
        // ✅ Lean: 20° forward (spine pitch)
        this.bones.spine.rotation.x = THREE.MathUtils.degToRad(-20);
        console.log("foo spine 1")
        this.bones.spine1.rotation.x = THREE.MathUtils.degToRad(-10); // subtle continuation

        // ✅ Posture: 90° = upright, no twist or tilt
        if (this.bones.hips) {
            this.bones.hips.rotation.y = 0;
            this.bones.hips.rotation.z = 0;
        }

        // ✅ Armspace: 74° outward spread (i.e., arms angled slightly away from torso)
        let armSpread = {}
        armSpread.value = THREE.MathUtils.degToRad(37); // 74° total = 37° per arm

        if (this.bones.leftForeArm) this.bones.leftForeArm.rotation.z = armSpread.value;
        if (this.bones.rightForeArm) this.bones.rightForeArm.rotation.z = -armSpread.value;

        if(this.debugFolder && this.dFolder){
            this.debugF = this.debugFolder.addFolder('floating_pose').bones

            if(armSpread && this.rightForeArm && this.bones.leftForeArm){
                let spreadArm =  this.debugF.addFolder("ArmSpred")
                spreadArm.add(armSpread, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-spread-v").onChange( e => {
                    this.bones.leftForeArm.rotation.z = armSpread.value
                    this.bones.rightForeArm.rotation.z = -armSpread.value
                })
            }

            if(this.bones.spine){
                let spine = this.debugF.addFolder("spine")
                spine.add(this.bones.spine.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-y")
                spine.add(this.bones.spine.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-z")
                spine.add(this.bones.spine.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-x")
            }

            if(this.bones.spine1){
                let spine1 = this.debugF.addFolder("spine1")
                spine1.add(this.bones.spine1.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-y")
                spine1.add(this.bones.spine1.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-z")
                spine1.add(this.bones.spine1.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-x")
            }

            if(this.bones.hips){
                let hipD = this.debugF.addFolder("hips")
                hipD.add( this.bones.hips.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                hipD.add( this.bones.hips.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                hipD.add( this.bones.hips.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")
            }
            
            if(this.bones.neck){
                console.log("hel")
                let toe = this.debugF.addFolder("toe")
                toe.add( this.bones.neck.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-y")
                toe.add( this.bones.neck.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-z")
                toe.add( this.bones.neck.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-x")
            }
        }
    }

    setFlyingPose(){
       
        if (this.bones.hips) {
            this.bones.hips.rotation.x = THREE.MathUtils.degToRad(125); // lay flat, face down
        }
        
        let footAngle = {}
        footAngle.value = THREE.MathUtils.degToRad(30);
        if (this.bones.leftFoot) this.bones.leftFoot.rotation.x = footAngle.value;
        if (this.bones.rightFoot) this.bones.rightFoot.rotation.x = footAngle.value;

        let legAngle = {}
        legAngle.value = THREE.MathUtils.degToRad(-170);
        if (this.bones.leftLeg) this.bones.leftLeg.rotation.z = legAngle.value;
        if (this.bones.rightLeg) this.bones.rightLeg.rotation.z = -legAngle.value;

        let armAngle = {}
        armAngle.value = THREE.MathUtils.degToRad(-60); 
        if (this.bones.leftForeArm) this.bones.leftForeArm.rotation.x = armAngle.value;
        if (this.bones.rightForeArm) this.bones.rightForeArm.rotation.x = -armAngle.value;

        if (this.bones.leftForeArm) this.bones.leftForeArm.rotation.x = 0;
        if (this.bones.rightForeArm) this.bones.rightForeArm.rotation.x = 0;

        if(this.debugFolder && this.dFolder){
            this.debugFl = this.debugFolder.addFolder('flying_pose')
            if(this.bones.head){
                let head =  this.debugFl.addFolder("head")
                head.add( this.bones.head.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-y")
                head.add( this.bones.head.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-z")
                head.add( this.bones.head.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-x")
            }

            if(armAngle && this.bones.rightForeArm && this.bones.leftForeArm){
                let angleArm =  this.debugFl.addFolder("foreArmAngle")
                angleArm.add(armAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-Degres-v").onChange( e => {
                    this.bones.leftForeArm.rotation.z = armAngle.value
                    this.bones.rightForeArm.rotation.z = -armAngle.value
                })
            }

            if(footAngle && this.bones.rightFoot && this.bones.leftFoot){
                let angleFoot =  this.debugFl.addFolder("footAngle")
                angleFoot.add(footAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-10)).name("foot-Degres-v").onChange( ()=> {
                    this.bones.rightFoot.rotation.x = footAngle.value
                    this.bones.leftFoot.rotation.x = footAngle.value
                })
            }

            if(legAngle && this.bones.rightLeg && this.bones.leftLeg){
                let angleLeg =  this.debugFl.addFolder("legAngle")
                angleLeg.add(legAngle, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(-90)).min(THREE.MathUtils.degToRad(-180)).name("leg-Degres-v").onChange( ()=> {
                    this.bones.rightLeg.rotation.z = -legAngle.value
                    this.bones.leftLeg.rotation.z = legAngle.value
                })
            }
            if(this.bones.hips){
                let hipD = this.debugFl.addFolder("hips")
                hipD.add( this.bones.hips.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                hipD.add( this.bones.hips.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                hipD.add( this.bones.hips.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")
            }

            if(this.bones.leftForeArm){
                let leftFor = this.debugFl.addFolder("left-fore-arm")
                leftFor.add( this.bones.leftForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-x")
            }

            if (this.bones.rightForeArm){
                let rightFor= this.debugFl.addFolder("right-fore-arm")
                rightFor.add( this.bones.rightForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-x")
            }
            
        }

    }

}
