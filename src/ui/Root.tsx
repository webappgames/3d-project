import * as React from 'react';
import {observer} from 'mobx-react';
import DataModel from '../ui-data-model';
import Stat from './Stat';
import './style/Root+index.css';

export default observer(({dataModel}:{dataModel:DataModel})=>{
    return(
        <div>
            <Stat dataModel={dataModel}/>
        </div>
    );
});