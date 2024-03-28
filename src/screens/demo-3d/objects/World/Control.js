import Main from "../Main";
import *  as THREE from 'three';
import GSAP from 'gsap';
import GUI from 'lil-gui';

export default class Control {
    static wheelEvent;
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.camera = this.main.camera;

        this.dummyVector = new THREE.Vector3(0, 0, 0);
        this.progress = 0;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }
        this.position = new THREE.Vector3(0, 0, 0);
        this.lockAtPostion = new THREE.Vector3(0, 0, 0);
        this.setPath();
        Control.wheelEvent = e => this.onWheel(e);
        window.addEventListener("wheel", Control.wheelEvent);

        this.gui = new GUI();
        this.obj = {
            colorObj:{r:0, g:0, b:0},
            intensity:3,
        }
    }
    setGUI() {
this.gui.addColor(this.obj,"colorObj");
   }
    setPath() {
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(1, 2.5, 4),
            new THREE.Vector3(2.3, 1.6, 2.5),
            new THREE.Vector3(0.5, 1.4, 1),
            new THREE.Vector3(2.2, 1.8, 4.6),
            new THREE.Vector3(2.7, 1.1, 0.3),
        ], true);


        // const points = this.curve.getPoints(50);
        // const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // // Create the final object to add to the scene
        // const curveObject = new THREE.Line(geometry, material);
        // this.scene.add(curveObject)
    }
    onWheel(e) {
        if (e.deltaY > 0) {
            this.lerp.target += 0.01;
        } else {
            this.lerp.target -= 0.01;
        }
    }

    resize() {
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        this.curve.getPointAt(this.lerp.current, this.position);
        // this.progress += 0.01;
        this.camera.mainCamera.position.copy(this.position);
        this.camera.mainCamera.lookAt(new THREE.Vector3(0, 0.5, 0));
    }

    umount() {
        window.removeEventListener("wheel", Control.wheelEvent);
    }
}