import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { personOutline, flashOutline, list, search } from 'ionicons/icons';

import Home from './Feed';
import Lists from './Lists';
import NewList from './NewList';
import ListDetail from './ListDetail';
import Details from './Details';
import Profile from './Profile';
import Search from './Search';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" render={() => <Home />} exact={true} />
        <Route path="/tabs/lists" render={() => <Lists />} exact={true} />
        <Route path="/tabs/lists/new" render={() => <NewList />} exact={true} />
        <Route path="/tabs/lists/media/details/:mediaType/:id" render={(props) => <Details {...props}/>} exact={true} />
        <Route path="/tabs/lists/details/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/profile" render={(props) => <Profile {...props}/>} exact={true} />
        <Route path="/tabs/search" render={(props) => <Search {...props} />} exact={true} />
        <Route path="/tabs/search/details/:mediaType/:id" render={(props) => <Details {...props} />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/feed">
          <IonIcon icon={flashOutline} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/search">
          <IonIcon icon={search} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/lists">
          <IonIcon icon={list} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
