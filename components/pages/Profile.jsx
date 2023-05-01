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
import {formatTimestamp} from '../../utils/functions.js';
import Backdrop from '../ui/Backdrop.jsx';

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
                    {profile?.backgroundImage && (
                        <Backdrop src = {profile.backgroundImage} />
                    )}
                    <div className='grid grid-flow-col auto-cols-auto gap-4 px-[25%] py-4 max-lg:px-4 thin-bottom-border'>
                        <div>
                            <h1 className="text-lg line-clamp-1"><strong>{profile?.displayName}</strong></h1>
                            <div className="text-xs mb-2 line-clamp-1">{profile?.username}</div>
                            <div className="ql-snow display-only h-12 overflow-auto text-xs">
                                <div className="ql-blank" data-gramm="false">
                                    <p dangerouslySetInnerHTML={{ __html: profile?.bio }}></p>
                                </div>
                            </div>
                            <div className='pt-2'> 
                                <IonButton fill="outline" size="small">Follow</IonButton>
                            </div>
                        </div>
                        <div className='flex-col justify-end'>
                            <div className='flex justify-center'>
                            <ProfilePicture
                                profilePicture={profile?.profilePicture}
                                sizeClasses="h-32 w-32 max-lg:h-24 max-lg:w-24"
                            />
                            </div>
                            
                            <div className='text-xs text-center mt-3'>Member Since</div>
                            <div className='text-xs text-center'>{formatTimestamp(profile?.createdAt)}</div>
                        </div>
                    </div>
                </IonContent>
            )}
        </IonPage>
    );
};

export default Profile;
