import Main from "./Main";
import *  as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.canvas = this.main.canvas;

        this.createTestCamera();
        this.createMainCamrea();
        this.setOrbitControl();
    }
    setOrbitControl() {
        this.controls = new OrbitControls(this.testCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }
    createTestCamera() {
        this.testCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.testCamera);
        this.testCamera.position.set(26, 16.2, 12);
    }

    createMainCamrea() {
        this.mainCamera = new THREE.OrthographicCamera(
            -(this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -20,
            20
        );
        this.scene.add(this.mainCamera);

        // const size = 20;
        // const divisions = 20;

        // const gridHepler = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHepler);

        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);

        // this.helper = new THREE.CameraHelper(this.mainCamera);
        // this.scene.add(this.helper);
    }

    resize() {
        this.testCamera.aspect = this.sizes.aspect;
        this.testCamera.updateProjectionMatrix();

        this.mainCamera.left = -(this.sizes.aspect * this.sizes.frustrum) / 2;
        this.mainCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.mainCamera.top = this.sizes.frustrum / 2;
        this.mainCamera.bottom = -this.sizes.frustrum / 2;
        this.mainCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate=true;
        // this.helper.update();
        // this.helper.position.copy(this.mainCamera.position);
        // this.helper.rotation.copy(this.mainCamera.rotation);
    }
}