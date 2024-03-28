import Main from "../Main";
import *  as THREE from 'three';

export default class Girl {
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.resources = this.main.resources;
        this.girl = this.resources.items.girl;
        this.girl_scene = this.girl.scene;
        this.setModel();
    }

    setModel() {
        const child = this.girl_scene.children[0];
        child.castShadow = true;
        child.receiveShadow = true;
        child.children.forEach(v => {
            if (v instanceof THREE.SkinnedMesh) {
                v.castShadow = true;
                v.receiveShadow = true;
            }
        });

        this.scene.add(this.girl_scene);
        this.girl_scene.scale.set(0.11, 0.11, 0.11);
    }

    resize() {
    }

    update() {
    }
}