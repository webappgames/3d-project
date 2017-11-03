import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../ui-data-model';
import './style/Stat.css';

export default observer(({dataModel}:{dataModel:DataModel})=>{
    return (
        <div id="stat">
            <table>
                <tbody>
                    <tr>
                        <th>FPS</th>
                        <td>{dataModel.stat.fps.toFixed(0)}</td>
                    </tr>
                    <tr>
                        <th>Meshes</th>
                        <td>{dataModel.stat.meshes.toString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});