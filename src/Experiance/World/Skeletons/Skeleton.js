import * as THREE from 'three'
import App from '../../App'

export default class Skeleton {
    constructor(debug) {
        this.app = new App()
        this.scene = this.app.scene
        this.model = this.app.nomad.scene
        this.skindMesh = this.model.getObjectByProperty('type', 'SkinnedMesh')
        this.skeleton = this.skindMesh.skeleton
        this.dFolder = debug

        this.characterSkeleton;
        this.model.traverse((child) => {
            if (child.isSkinnedMesh) {
                let helper = new THREE.SkeletonHelper(child);
                this.characterSkeleton = child.skeleton;
                this.scene.add(helper);
            }
        });

        this.bones = {}
        this.angles = {}
        this.instanceBone()
        this.instanceAngle()
        this.app.nomad.bones = this.bones
        this.app.nomad.angles = this.angles
        this.logBones();
        if (this.dFolder){
            this.debugFolder = this.dFolder.addFolder('skeleton control')
                .close()
            this.instanceBoneDebug()
        }

    }

    logSkeleton() {
        console.log("foo skeleton", this.skeleton)
    }

    logBones() {
        console.log("foo bones", this.skeleton.bones)
    }

    instanceBone() {
        const findBone = (name) => this.characterSkeleton.bones.find(bone => bone.name === name);
        this.bones.spine = findBone('spine001');
        this.bones.spine1 = findBone('spine002');
        // this.bones.hips = findBone('hip') 
        this.bones.pelvis = findBone('hip');
        this.bones.neck =  findBone('neck004'); 
        this.bones.leftForeArm = findBone('handL015'); 
        this.bones.rightForeArm = findBone('handR015'); 
        this.bones.head = findBone('head006');
        this.bones.rightArm = findBone('armR009'); 
        this.bones.leftArm = findBone('armL009'); 

    }

    instanceAngle() {
        this.angles.foreArm = {}
        this.angles.foreArm.value = 0
        this.angles.hand = {}
        this.angles.hand.value = 0
    }

    instanceBoneDebug() {
        let head = this.debugFolder.addFolder("head")
        head.add(this.bones.head.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-y")
        head.add(this.bones.head.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-z")
        head.add(this.bones.head.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(45)).min(THREE.MathUtils.degToRad(-45)).name("head-x")

        let neck = this.debugFolder.addFolder("neck")
        neck.add(this.bones.neck.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-y")
        neck.add(this.bones.neck.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-z")
        neck.add(this.bones.neck.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("hips-x")

        let spine = this.debugFolder.addFolder("spine")
        spine.add(this.bones.spine.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine-y") // min(0)  max(180)
        spine.add(this.bones.spine.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine-z") 
        spine.add(this.bones.spine.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine-x")
        
        let spine1 = this.debugFolder.addFolder("spine1")
        spine1.add(this.bones.spine1.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine1-x")
        spine1.add(this.bones.spine1.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine1-y")
        spine1.add(this.bones.spine1.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("spine1-z")


         let pelvis = this.debugFolder.addFolder("pelvis")
        pelvis.add(this.bones.pelvis.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-270)).name("pelvis-x")
        pelvis.add(this.bones.pelvis.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-270)).name("pelvis-y")
        pelvis.add(this.bones.pelvis.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-270)).name("pelvis-z")
       

        let angleArm = this.debugFolder.addFolder("foreArmAngle")
        angleArm.add(this.angles.foreArm, 'value').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("arm-Degres-v").onChange(e => {
            this.bones.leftForeArm.rotation.z = -this.angles.foreArm.value
            this.bones.rightForeArm.rotation.z = this.angles.foreArm.value
        })


        let leftFor = this.debugFolder.addFolder("left-fore-arm")
        leftFor.add(this.bones.leftForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-x")
        leftFor.add(this.bones.leftForeArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-y")
        leftFor.add(this.bones.leftForeArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("left-fore-arm-z")

        let rightFor = this.debugFolder.addFolder("right-fore-arm")
        rightFor.add(this.bones.rightForeArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-x")
        rightFor.add(this.bones.rightForeArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-y")
        rightFor.add(this.bones.rightForeArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("right-fore-arm-z")

        let rightArm = this.debugFolder.addFolder('ritghtArm')
        rightArm.add(this.bones.rightArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightArm-x")
        rightArm.add(this.bones.rightArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightArm-y")
        rightArm.add(this.bones.rightArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("rightArm-z")
        

        let leftArm = this.debugFolder.addFolder('leftArm')
        leftArm.add(this.bones.leftArm.rotation, 'x').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftArm-x")
        leftArm.add(this.bones.leftArm.rotation, 'y').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftArm-y")
        leftArm.add(this.bones.leftArm.rotation, 'z').step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("leftArm-z")
        

        let handAngleD = this.debugFolder.addFolder('handAngle')
        handAngleD.add(this.angles.hand, "value").step(THREE.MathUtils.degToRad(.0001)).max(THREE.MathUtils.degToRad(90)).min(THREE.MathUtils.degToRad(-90)).name("handAngle")
            .onChange(() => {
                this.bones.rightArm.rotation.z = this.angles.hand.value
                this.bones.leftArm.rotation.z = -this.angles.hand.value
            })

    }

}