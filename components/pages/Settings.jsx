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
  IonAvatar,
  IonButtons,
  IonButton,
  IonImg,
  IonIcon
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useState } from 'react';
import { signOutOfFirebase } from '../../store/authStore';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import EditProfilePicture from '../ui/EditProfilePicture';



const Settings = ({ history, profile, onDismiss }) => {
  const settings = Store.useState(selectors.getSettings);
  const [settingsPage, setSettingsPage] = useState('Settings');
  async function signOut() {
    onDismiss(null, "cancel");
    await signOutOfFirebase.run();
    history.push('/sign-in');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            {settingsPage !== 'Settings' ?
              <IonButton onClick={() => setSettingsPage('Settings')}>
                <IonIcon icon={arrowBackOutline} />
                Settings
              </IonButton>
              :
              <IonButton onClick={() => onDismiss(null, "cancel")}>
                Cancel
              </IonButton>
            }
          </IonButtons>
          <IonTitle>{settingsPage}</IonTitle>
          {settingsPage === 'Settings' && <IonButtons slot="end">
            <IonButton onClick={() => onDismiss({ name: "update dude" }, "save")}>
              Save
            </IonButton>
          </IonButtons>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {settingsPage === 'Settings' &&
          <IonList lines="full">
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
            <IonItem button>
              <IonLabel color="primary" onclick={signOut}>Sign out</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSettingsPage('Edit Profile Picture')}>
              {profile?.profilePicture && <IonAvatar slot="start">
                <IonImg src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profile.profilePicture}`} />
              </IonAvatar>}
              Profile Picture
            </IonItem>
          </IonList>
        }
        {
          settingsPage === 'Edit Profile Picture' && <EditProfilePicture profile={profile} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Settings;
