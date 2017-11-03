import World from './world/World';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import Root from './components/Root';
import UIDataModel from './ui-data-model';

const canvasElement = document.getElementById("scene") as any;
//const uiElement = document.getElementById("ui") as any;

const uiDataModel = new UIDataModel();
new World(canvasElement, uiDataModel);

/*ReactDOM.render(
    <Root dataModel={uiDataModel}/>,
    uiElement
);*/

