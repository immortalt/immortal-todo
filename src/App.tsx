import {Redirect, Route, Switch} from 'react-router-dom';
import {createAnimation, IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Search from './pages/Search';
import TodoList from "./pages/TodoList";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CreateAnimation, Animation} from '@ionic/react';

setupIonicReact();
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        divider: "#3D3D3D",
        background: {
            default: "#080808",
            paper: "#080808",
        },
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
const App: React.FC = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = prefersDark.matches;
    return (<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet animated={false}>
                        <Route exact path="/todo/:id/:theme" component={TodoList}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </ThemeProvider>
    )
};

export default App;
