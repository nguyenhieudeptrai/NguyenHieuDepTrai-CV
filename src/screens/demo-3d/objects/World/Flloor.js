import Main from "../Main";
import *  as THREE from 'three';

export default class Floor {
    constructor() {
        this.main = new Main();
        this.scene = this.main.scene;
        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.matertial = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            side: THREE.DoubleSide
        });
        this.plane = new THREE.Mesh(this.geometry, this.matertial);
        this.scene.add(this.plane);
        this.plane.rotation.x = d(-90);
        this.plane.position.y = -0.2;
        this.plane.receiveShadow = true;

    }

    resize() {
    }

    update() {
    }
}