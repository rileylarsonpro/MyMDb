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
  IonIcon,
  IonButtons,
  IonButton,
  IonImg,
  IonAvatar,
  useIonModal
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { cogOutline } from 'ionicons/icons';
import { getUserProfile } from '../../store/authStore.js';
import Loading from '../ui/Loading';
import Settings from './Settings';




const Profile = ({ history }) => {
  const [started, finished, result, updating] = getUserProfile.useWatch();
  const [profile, setProfile] = useState(null);
  const [present, dismiss] = useIonModal(Settings, {
    onDismiss: (data, role) => dismiss(data, role),
    profile,
    history,
  });
  useEffect(() => {
    async function profileInit() {
      let response = await getUserProfile.run();
      if (response.payload) {
        setProfile(response.payload);
      }
    }
    profileInit();
  }, []);
  useEffect(() => {
    if (finished && result.payload) {
      setProfile(result.payload);
    }
  },[finished])
  function openSettings() {
    present({
      onWillDismiss: (ev) => {
        if (ev.detail.role === 'save') {
          //update profile
          console.log('save', ev.detail.data);
        }
      },
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton onClick={() => openSettings()}>
              <IonIcon icon={cogOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      { !finished ? <Loading /> : (
        <IonContent>
          <div className="flex justify-center items-center text-center mt-4">
            {profile?.profilePicture && <IonAvatar className="w-32 h-32">
              <IonImg  src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profile.profilePicture}`} alt=""/>
            </IonAvatar>}
          </div>
          <IonLabel className="flex justify-center text-center mt-4">{profile?.displayName}</IonLabel>
          
        </IonContent>
      )}
    </IonPage>
  );
};

export default Profile;
