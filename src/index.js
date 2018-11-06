import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from 'js/Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();


//在此 div(#root) 中的所有内容都将由 React DOM 来管理，所以我们将其称之为 "根" DOM 节点。
// 我们用 React 开发应用时一般只会定义一个根节点。但如果你是在一个已有的项目当中引入 React 的话，你可能会需要在不同的部分单独定义 React 根节点。
// 要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上：