import Main from "../Main";
import *  as THREE from 'three';
import GSAP from 'gsap';


export default class WorkingPlace {
    static mouseMoveEvent;
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.resources = this.main.resources;
        this.workingPlace = this.resources.items.workingPlace;
        this.workingPlace_scene = this.workingPlace.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }
        this.rotation = 0;
        WorkingPlace.mouseMoveEvent = (e) => this.onMouseMove(e);
        window.addEventListener("mousemove", WorkingPlace.mouseMoveEvent);
        this.setModel();
    }

    setModel() {
        this.workingPlace_scene.receiveShadow = true;
        this.workingPlace_scene.castShadow = true;
        this.workingPlace_scene.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group) {
                child.children.forEach(v => {
                    v.castShadow = true;
                    v.receiveShadow = true;
                });
            }
            if (child.name == "lamp_wall") {
        console.log(child)
                
            }
        });

        this.scene.add(this.workingPlace_scene);
        this.workingPlace_scene.scale.set(0.11, 0.11, 0.11);
    }

    onMouseMove(e) {
        this.rotation = (e.clientX - window.innerWidth / 2) * 2 / window.innerWidth;
        this.lerp.target = this.rotation * 0.1;
    }

    resize() {
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.workingPlace_scene.rotation.y = this.lerp.target + d(-10);
    }

    umount() {
        window.removeEventListener("mousemove", WorkingPlace.mouseMoveEvent ?? (() => { }));
    }
}