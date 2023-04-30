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
    useIonModal,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { cogOutline } from 'ionicons/icons';
import { getUserProfile } from '../../store/authStore.js';
import Loading from '../ui/Loading';
import Settings from './Settings';
import ProfilePicture from '../ui/ProfilePicture';
import userApi from '../../api/user.api.js';
import { useToast } from '../useToast.tsx';

const Profile = ({ history }) => {
    const toast = useToast();
    const [started, finished, result, updating] = getUserProfile.useWatch();
    const [profile, setProfile] = useState(null);
    const [present, dismiss] = useIonModal(Settings, {
        onDismiss: (data, role) => dismiss(data, role),
        profile,
        history,
        toast,
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
    }, [finished]);
    function openSettings() {
        present({
            onWillDismiss: async (ev) => {
                if (ev.detail.role === 'save') {
                    try {
                      await userApi.updateProfile(ev.detail.data);
                      getUserProfile.run();
                    } catch (error) {
                      toast.error(error.response.data.message);
                    }
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
            {!finished ? (
                <Loading />
            ) : (
                <IonContent>
                    <div className="flex justify-center items-center text-center mt-4">
                        {profile && (
                            <ProfilePicture
                                profilePicture={profile.profilePicture}
                                sizeClasses="h-32 w-32"
                            />
                        )}
                    </div>
                    <IonLabel className="flex justify-center text-center mt-4">
                        {profile?.displayName}
                    </IonLabel>
                </IonContent>
            )}
        </IonPage>
    );
};

export default Profile;
