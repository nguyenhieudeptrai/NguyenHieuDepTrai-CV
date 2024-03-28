import Main from "../Main";

import Girl from "./Girl";
import Environment from "./Environment";
import WorkingPlace from "./WorkingPlace";
import Control from "./Control";
import Floor from "./Flloor";

export default class World {
    constructor() {
        this.main = new Main();
        this.sizes = this.main.size;
        this.scene = this.main.scene;
        this.canvas = this.main.canvas;
        this.camera = this.main.camera;
        this.resources = this.main.resources;
        this.resources.on("ready", () => {
            this.environment = new Environment();
            // this.girl = new Girl();
            this.workingPlace = new WorkingPlace();
            this.control = new Control();
            this.floor = new Floor();
        });

    }


    resize() {
    }

    update() {
        this.environment?.update();
        this.workingPlace?.update();
        this.control?.update();
    }
}