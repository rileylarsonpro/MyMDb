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
  IonIcon,
  IonInput
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useState } from 'react';
import { signOutOfFirebase } from '../../store/authStore';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import EditProfilePicture from '../ui/EditProfilePicture';
import ProfilePicture from '../ui/ProfilePicture';
import RichTextEditor from '../ui/RichTextEditor';
import EditBackgroundPhoto from '../ui/EditBackgroundPhoto';
import EditProfileLists from '../ui/EditProfileLists';



const Settings = ({ history, profile, onDismiss, toast }) => {
  const settings = Store.useState(selectors.getSettings);
  const [settingsPage, setSettingsPage] = useState('Settings');
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
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
            <IonButton onClick={() => onDismiss({ displayName, bio }, "save")}>
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
              {profile &&  <ProfilePicture
                                slot="start"
                                profilePicture={profile.profilePicture}
                                sizeClasses=""
                            />}
              Profile Picture
            </IonItem>
            {/* edit display name */}
            <IonItem button>
              <IonLabel slot="start" >Display Name</IonLabel>
              <IonInput placeholder="Display Name" color="primary" value={displayName} onIonChange={(e) => setDisplayName(e.target.value)}/>
            </IonItem>
            {/* edit bio */}
            <IonItem button onClick={() => setSettingsPage('Edit Bio')}>
              <IonLabel slot="start" >Bio</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSettingsPage('Edit Background')}>
              <IonLabel slot="start">Background Photo</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSettingsPage('Edit Profile Lists')}>
              <IonLabel slot="start">Profile Lists</IonLabel>
            </IonItem>


          </IonList>
        }
        {
          settingsPage === 'Edit Profile Picture' && <EditProfilePicture profile={profile} toast={toast} />
        }
        {
          settingsPage === 'Edit Bio' && <RichTextEditor html={bio} setHtml={setBio} toast={toast} id="bio" />
        }
        {
          settingsPage === 'Edit Background' && <EditBackgroundPhoto profile={profile} toast={toast} />
        }
        {
          settingsPage === 'Edit Profile Lists' && <EditProfileLists profile={profile} toast={toast} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Settings;
