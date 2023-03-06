import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
  IonLabel,
} from '@ionic/react';

import { signOutOfFirebase } from '../../store/authStore';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';



const Settings = ({history}) => {
  const settings = Store.useState(selectors.getSettings);
  async function signOut() {
    console.log('signing out');
    await signOutOfFirebase.run();
    history.push('/sign-in');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={e => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            />
          </IonItem>
          <ion-item button> 
            <IonLabel color="primary" onclick={signOut}>Sign out</IonLabel>
          </ion-item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
