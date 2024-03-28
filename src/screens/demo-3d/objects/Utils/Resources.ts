import Main from "../Main";
import EventEmitter from "./EventEmitter";
import Renderer from "../Renderer";
import assets from "./assets";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type AssetType = { name: string; type: string; path: string; }
type ItemType = { [key: string]: GLTF }

export default class Resources extends EventEmitter {
    main: Main;
    renderer: Renderer | undefined;
    assets: AssetType[];
    items: ItemType;
    loaded: number;
    queue: number;
    loader: { gftl: GLTFLoader; draco: DRACOLoader; } | undefined;
    constructor() {
        super();

        this.main = new Main();
        this.renderer = this.main.renderer;
        this.assets = assets;
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoader();


    }

    setLoaders() {
        this.loader = {
            gftl: new GLTFLoader(),
            draco: new DRACOLoader()
        };
        this.loader.draco.setDecoderPath(process.env.PUBLIC_URL + "/draco/");
        this.loader.gftl.setDRACOLoader(this.loader.draco);
    }

    startLoader() {
        this.assets.forEach((v) => {
            if (v.type == "gltfModel") {
                let asset = {
                    ...v,
                    path: process.env.PUBLIC_URL + v.path
                };
                this.loader?.gftl.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                })
            }
        })
    }


    singleAssetLoaded(asset: AssetType, file: GLTF) {
        this.items[asset.name] = file;
        this.loaded++;
        if (this.loaded == this.queue) {
            this.emit("ready");
        }
    }
}