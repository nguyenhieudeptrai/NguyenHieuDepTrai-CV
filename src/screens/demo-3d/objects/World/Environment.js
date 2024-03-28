import Main from "../Main";
import * as THREE from 'three';
import GSAP from 'gsap';

export default class Environment {
    constructor() {
        this.main = new Main();
        this.scene = this.main.scene;
        this.resources = this.main.resources;

        this.lerp = {
            LIGHT:1, //0xf5f0d9,
            DARK: 0,//0x222222,
            ease: 0.05,
            current: 0,
        }
        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight(0xf5f0d9);
        this.sunLight.intensity = 2;
        this.sunLight.castShadow = false;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.5;
        this.sunLight.position.set(0.5, 1.2, 2);
        this.scene.add(this.sunLight);

        // this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, null, "#f5f043");
        // this.scene.add(this.lightHelper);


        this.ambientLight = new THREE.AmbientLight(0xf5f0d9);
        this.ambientLight.intensity = 2;
        this.scene.add(this.ambientLight);
    }

    update() {

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current ,
            this.main.lightMode ? this.lerp.LIGHT : this.lerp.DARK,
            this.lerp.ease
        );

        this.sunLight.intensity = this.lerp.current;
        this.ambientLight.intensity = this.lerp.current;
        // this.
        
    }
}