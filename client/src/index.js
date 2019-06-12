import React from 'react';
import ReactDOm from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './components/App';
import reducers from './reducers';

const store=createStore(reducers);

ReactDOm.render(
	<Provider store={store} >
		<App/>
	</Provider>,
	document.querySelector('#root')
);