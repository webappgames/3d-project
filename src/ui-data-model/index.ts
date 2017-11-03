import {observable} from "mobx";

export default class{
    @observable health = 1;

    @observable stat = {
        fps: 0,
        meshes: 0,
    };
}