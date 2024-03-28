import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';

import World from './World/World';
import Resources from './Utils/Resources';

export default class Main {
    static instance;
    constructor(canvas) {
        if (Main.instance) {
            return Main.instance;
        }
        Main.instance = this;
        this.canvas = canvas;
        this.lightMode = true;
        this.size = new Sizes();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.time = new Time();
        this.resources = new Resources();


        this.world = new World();

        this.time.on("update", () => {
            this.update();
        });
        this.size.on("resize", () => {
            this.resize();
        });
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    changMode(lightMode = true) {
        this.lightMode = lightMode;
    }

    unmount() {
        this.time.unmount();
        this.world?.workingPlace?.umount();
        this.world?.control?.umount();
    }
}