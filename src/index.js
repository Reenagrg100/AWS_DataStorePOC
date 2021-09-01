import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import Counter from './components/counter';
// import Counters from './components/counters';

import Second from './components/Second';
//counter component will be render 
// ReactDOM.render(<Counter/>, document.getElementById('root'));
// ReactDOM.render(<Second/>,document.getElementById("root"));
// ReactDOM.render(<Counters/>,document.getElementById("root"));
ReactDOM.render(<App/>,document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
