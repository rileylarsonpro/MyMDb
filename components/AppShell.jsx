import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon  } from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { getFirebaseUser, authStore } from '../store/authStore.js';
import { useEffect, useState } from 'react';

import { ToastProvider } from '../components/useToast.tsx';



import Feed from './pages/Feed';
import Lists from './pages/Lists';
import ListDetail from './pages/ListDetail';
import Settings from './pages/Settings';
import Tabs from './pages/Tabs';
import Register from './pages/Register';
import SignIn from './pages/SignIn';


setupIonicReact({});

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell = () => {
  const [finished, result, updating] = getFirebaseUser.useBeckon({cacheBreakEnabled: true, ssr: false}); 

  if(!finished) return <IonApp>
    <IonLabel>Updating...</IonLabel>
  </IonApp>;

  if(!result.payload) return <IonApp>
    <ToastProvider value={{ color: 'danger', duration: 2000}}>
      <IonReactRouter>
        <IonRouterOutlet id="main">
            <Route path="/register" render={(props) => <Register {...props}/>} exact={true}/>
            <Route path="/sign-in" render={(props) => <SignIn {...props}/>} exact={true}/>
            <Route render={() => <Redirect to="/sign-in" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </ToastProvider>
  </IonApp>;
  
          
  return (
    <IonApp>
      <ToastProvider value={{ color: 'danger', duration: 2000}}>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <Tabs />} />
            <Route path="/" render={() => <Redirect to="/tabs/feed" />} exact={true}/>
            <Route render={() => <Redirect to="/tabs/feed" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </ToastProvider>
    </IonApp>
  );
};

export default AppShell;
