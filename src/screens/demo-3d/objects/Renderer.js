import Main from "./Main";
import *  as THREE from 'three';

export default class Camera {
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.canvas = this.main.canvas;
        this.camera = this.main.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.useLegacyLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 0.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.mainCamera);

        // second screen for test
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(0, 0, this.sizes.width / 3, this.sizes.height / 3);
        // this.renderer.setScissor(0, 0, this.sizes.width / 3, this.sizes.height / 3);
      
        //  this.renderer.render(this.scene, this.camera.testCamera);
        // this.renderer.setScissorTest(false); 
    }
}