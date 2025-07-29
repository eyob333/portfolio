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

        this.characterSkeleton;
        this.model.traverse( (child) => {
            if(child.isSkinnedMesh){
                let helper = new THREE.SkeletonHelper( child );
                this.characterSkeleton = child.skeleton;
                this.scene.add( helper );
            }
        });     
        
        this.bones = {}
        this.angles = {}
        this.instanceBone()
        this.instanceAngle()
        this.app.nomad.bones = this.bones
        this.app.nomad.angles = this.angles

        if (this.dFolder){
            this.debugFolder = this.dFolder.addFolder('skeleton control')
            this.instanceBoneDebug()
        }

    }

    logSkeleton(){
        console.log("foo skeleton", this.skeleton)
    }

    logBones(){
        console.log("foo bones", this.skeleton.bones)
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
        this.bones.leftCalf = findBone('CC_Base_L_Calf_05'); // CC_Base_L_Calf_05
        this.bones.rightCalf = findBone('CC_Base_R_Calf_020');
        this.bones.rightBrest = findBone('CC_Base_R_RibsTwist_060');
    }

    instanceAngle(){
        this.angles.foot= {}
        this.angles.foot.value = 0
        this.angles.leg = {}
        this.angles.leg.value = 0
        this.angles.foreArm = {}
        this.angles.foreArm.value = 0
        this.angles.hand = {}
        this.angles.hand.value = 0
    }

    instanceBoneDebug(){
                let head =  this.debugFolder.addFolder("head")
                head.add( this.bones.head.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-y")
                head.add( this.bones.head.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-z")
                head.add( this.bones.head.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-x")

                let neck = this.debugFolder.addFolder("neck")
                neck.add( this.bones.neck.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-y")
                neck.add( this.bones.neck.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-z")
                neck.add( this.bones.neck.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-x")

                let spine = this.debugFolder.addFolder("spine")
                spine.add(this.bones.spine.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-y")
                spine.add(this.bones.spine.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-z")
                spine.add(this.bones.spine.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine-x")

                let spine1 = this.debugFolder.addFolder("spine1")
                spine1.add(this.bones.spine1.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-y")
                spine1.add(this.bones.spine1.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-z")
                spine1.add(this.bones.spine1.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("spine1-x")

                let hipD = this.debugFolder.addFolder("hips")
                hipD.add( this.bones.hips.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-y")
                hipD.add( this.bones.hips.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-z")
                hipD.add( this.bones.hips.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(180)).min(THREE.MathUtils.degToRad(0)).name("hips-x")

                let angleArm =  this.debugFolder.addFolder("foreArmAngle")
                angleArm.add(this.angles.foreArm, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-Degres-v").onChange( e => {
                    this.bones.leftForeArm.rotation.z = this.angles.foreArm.value
                    this.bones.rightForeArm.rotation.z = -this.angles.foreArm.value
                })


                let leftFor = this.debugFolder.addFolder("left-fore-arm")
                leftFor.add( this.bones.leftForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-x")

                let rightFor= this.debugFolder.addFolder("right-fore-arm")
                rightFor.add( this.bones.rightForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-x")

                let rightArm = this.debugFolder.addFolder('ritghtArm')
                rightArm.add( this.bones.rightArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-y")
                rightArm.add( this.bones.rightArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-z")
                rightArm.add( this.bones.rightArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-x")

                let leftArm = this.debugFolder.addFolder('leftArm')
                leftArm.add( this.bones.leftArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-y")
                leftArm.add( this.bones.leftArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-z")
                leftArm.add( this.bones.leftArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-x")

                let handAngleD = this.debugFolder.addFolder('handAngle')
                handAngleD.add( this.angles.hand, "value").step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("handAngle")
                    .onChange(() =>{
                        this.bones.rightArm.rotation.z = -this.angles.hand.value
                        this.bones.leftArm.rotation.z = this.angles.hand.value
                    })

                let angleLeg =  this.debugFolder.addFolder("legAngle")
                angleLeg.add(this.angles.leg, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(-90)).min(THREE.MathUtils.degToRad(-180)).name("leg-Degres-v").onChange( ()=> {
                    this.bones.rightLeg.rotation.z = -this.angles.leg.value
                    this.bones.leftLeg.rotation.z = this.angles.leg.value
                })

                let rightLeg = this.debugFolder.addFolder('ritghtLeg')
                rightLeg.add( this.bones.rightLeg.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("ritghtLeg-y")
                rightLeg.add( this.bones.rightLeg.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(190)).min(THREE.MathUtils.degToRad(90)).name("ritghtLeg-z")
                rightLeg.add( this.bones.rightLeg.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("ritghtLeg-x")

                let leftLeg = this.debugFolder.addFolder('leftLeg')
                leftLeg.add( this.bones.leftLeg.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftLeg-y")
                leftLeg.add( this.bones.leftLeg.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(-90)).min(THREE.MathUtils.degToRad(-190)).name("leftLeg-z")
                leftLeg.add( this.bones.leftLeg.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftLeg-x")

                let rightCalf = this.debugFolder.addFolder('ritghtCalf')
                rightCalf.add( this.bones.rightCalf.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightCalf-y")
                rightCalf.add( this.bones.rightCalf.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightCalf-z")
                rightCalf.add( this.bones.rightCalf.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightCalf-x")
            

                let leftCalf = this.debugFolder.addFolder('leftCalf')
                leftCalf.add( this.bones.leftCalf.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftCalf-y")
                leftCalf.add( this.bones.leftCalf.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftCalf-z")
                leftCalf.add( this.bones.leftCalf.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftCalf-x")

                let angleFoot =  this.debugFolder.addFolder("footAngle")
                    angleFoot.add(this.angles.foot, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-10)).name("foot-Degres-v").onChange( ()=> {
                    this.bones.rightFoot.rotation.x = this.angles.foot.value
                    this.bones.leftFoot.rotation.x = this.angles.foot.value
                })

    }

    setFloatPose(){
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
    }

    setFlyingPose(){
       
        if (this.bones.hips) {
            this.bones.hips.rotation.x = THREE.MathUtils.degToRad(125); // lay flat, face down
        }
        
        this.angles.foot.value = THREE.MathUtils.degToRad(30);
        if (this.bones.leftFoot) this.bones.leftFoot.rotation.x = this.angles.foot.value;
        if (this.bones.rightFoot) this.bones.rightFoot.rotation.x = this.angles.foot.value;
        
        this.angles.leg.value = THREE.MathUtils.degToRad(-170);
        if (this.bones.leftLeg) this.bones.leftLeg.rotation.z = this.angles.leg.value;
        if (this.bones.rightLeg) this.bones.rightLeg.rotation.z = -this.angles.leg.value;

        this.angles.foreArm.value = THREE.MathUtils.degToRad(-60); 
        if (this.bones.leftForeArm) this.bones.leftForeArm.rotation.x = this.angles.foreArm.value;
        if (this.bones.rightForeArm) this.bones.rightForeArm.rotation.x = -this.angles.foreArm.value;

        if (this.bones.leftForeArm) this.bones.leftForeArm.rotation.x = 0;
        if (this.bones.rightForeArm) this.bones.rightForeArm.rotation.x = 0;
    }

}