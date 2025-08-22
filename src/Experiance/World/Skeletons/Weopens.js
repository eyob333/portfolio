import * as THREE from 'three'
import App from '../../App'

export default class Weopens{
    constructor(debug){
        this.app = new App()
        this.scene = this.app.scene
        this.resorces =  this.app.resources
        this.model = this.resorces.item.Ship.scene
        console.log("foo model", this.model)
        this.skindMesh = this.model.getObjectByProperty('type', 'SkinnedMesh')
        console.log('foo ship skind mesh', this.skindMesh)
        this.skeleton = this.skindMesh.skeleton
        this.dFolder = debug

        this.model.traverse( (child) => {
            if(child.isSkinnedMesh){
                let helper = new THREE.SkeletonHelper( child );
                this.characterSkeleton = child.skeleton;
                this.scene.add( helper );
            }
        });
        // console.log(this.skeleton)
    }
}