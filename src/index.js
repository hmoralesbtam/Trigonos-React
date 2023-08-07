// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import { createRoot } from 'react-dom/client';

import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import AppAsync from './app/AppAsync';
import { createContext } from 'react';

import { Provider } from 'react-redux';
import store from './app/store';

const container = document.getElementById('root');
const root = createRoot(container);
// root.render(<WithAppProviders />);
export const AppRoutesCont = createContext();


root.render( 
    <Provider store = {store}>
        <AppAsync />
    </Provider>


);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
