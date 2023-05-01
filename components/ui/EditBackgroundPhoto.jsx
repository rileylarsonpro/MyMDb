import { IonItem, IonLabel, IonIcon, IonButton, IonImg, IonAvatar } from '@ionic/react';
import { useState } from 'react';
import { image, closeOutline } from 'ionicons/icons';
import userApi from '../../api/user.api.js';
import { getUserProfile } from '../../store/authStore.js';
import Loading from './Loading';
import ProfilePicture from './ProfilePicture.jsx';
import SearchBar from './SearchBar.jsx';

const EditBackgroundPhoto = ({ profile, toast }) => {
    const [currentFile, setCurrentFile] = useState(null);
    function clearCurrentFile() {
        setCurrentFile(null);
    }
    async function save() {
        await userApi.updateProfile({ backgroundImage: currentFile });
        getUserProfile.run();
        setCurrentFile(null);
    }
    function onSelect(result) {
        if (result.backdrop_path) {
            setCurrentFile(`https://image.tmdb.org/t/p/w1280${result.backdrop_path}`);
            return;
        }
        toast.error('Sorry, no backdrop image found for this media');
    }
    function removeImage() {
        userApi.updateProfile({ backgroundImage: '' });
        getUserProfile.run();
    }
    return (
        <>
            {profile?.backgroundImage && (
                <div className="relative h-[30vh]">
                    <div className="absolute bg-gradient-to-t from-background h-[30vh] w-full"></div>
                    <IonImg
                        className="absolute top-0 left-0  h-[30vh] -z-10 w-full object-cover object-top"
                        src={profile.backgroundImage}
                        alt=""
                    />
                </div>
            )}
            {profile?.backgroundImage && (
                <div className="flex justify-center">
                    <IonButton fill="outline" size="small" onClick={() => removeImage()}>
                        Remove
                    </IonButton>
                </div>
            )}
            <SearchBar onSelect={onSelect} placeholder="What media defines you?" />
            {currentFile && (
                <div className="flex-col justify-center items-center m-6 p-4  border-2 border-solid border-current border-primary">
                    <div className="flex justify-center pb-3">
                        <IonLabel className="text-center" color="primary">
                            Background Picture Preview
                        </IonLabel>
                    </div>
                    <div className="flex justify-center items-center pb-3">
                        <IonImg id="myimage" src={currentFile} />
                    </div>
                    <div className="flex justify-between">
                        <IonButton fill="outline" onClick={clearCurrentFile}>
                            Cancel
                        </IonButton>
                        {profile?.backgroundImage !== '' ? (
                            <IonButton fill="outline" onClick={save}>
                                Replace
                            </IonButton>
                        ) : (
                            <IonButton fill="outline" onClick={save}>
                                Save
                            </IonButton>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBackgroundPhoto;
