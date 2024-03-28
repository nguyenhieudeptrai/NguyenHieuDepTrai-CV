import Main from "../Main";
import EventEmitter from "../Utils/EventEmitter";

export default class Theme extends EventEmitter {
    constructor() {
        super();
        this.isLight = true;
        this.main = new Main();

    }


    changeTheme(isLight = true) {
        this.theme = isLight;
    }

}