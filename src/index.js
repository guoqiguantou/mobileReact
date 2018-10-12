import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from 'js/Root';
import registerServiceWorker from './registerServiceWorker';
//console.log('ajax',__isDebug);
ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
