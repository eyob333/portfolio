import * as THREE from 'three';
import gsap from 'gsap';
import Skeleton from "../World/Skeletons/Skeleton";

export default class Movement{
    constructor(Skeleton, model){
        this.skeleton = Skeleton;
        this.fly()
    }
    fly(){
        this.skeleton.setFloatPose()
        this.skeleton.spine = THREE.MathUtils.degToRad(30);
        console.log("foo spine", this.skeleton.spine)
        console.log("foo spine 2")

    }
}
