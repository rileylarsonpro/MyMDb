import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonImg,
  IonAvatar
} from '@ionic/react';
import { useState } from 'react';
import { image, closeOutline } from 'ionicons/icons';
import userApi from '../../api/user.api.js';
import { getUserProfile } from '../../store/authStore.js';
import Loading from './Loading';




const EditProfilePicture = ({ profile }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileURL, setCurrentFileURL] = useState('');
  const [imageKey, setImageKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  function openFileUpload(e) {
    document.getElementById('file-input').click();
  }
  function onFileInput(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setCurrentFile(file);
    let imageURL = URL.createObjectURL(file);
    setCurrentFileURL(imageURL);
  }
  function clearCurrentFile() {
    setCurrentFile(null);
    setCurrentFileURL('');
    let input = document.getElementById('file-input');
    if(input) input.value = '';
  }
  async function save() {
    let formData = new FormData();
    formData.append('file', currentFile);
    setUploading(true);
    await userApi.uploadProfilePicture(formData);
    getUserProfile.run();
    clearCurrentFile();
    setUploading(false);
  }
  async function removeProfilePicture() {
    await userApi.deleteFile(profile.profilePicture);
    getUserProfile.run();
    clearCurrentFile();
  }
  async function replaceProfilePicture() {
    setUploading(true);
    await userApi.deleteFile(profile.profilePicture);
    let formData = new FormData();
    formData.append('file', currentFile);
    await userApi.uploadProfilePicture(formData);
    getUserProfile.run();
    clearCurrentFile();
    setImageKey(prevKey => prevKey + 1);
    setUploading(false);
  }
  return (
    <>
      <div className="flex justify-center items-center text-center mt-4 pb-3">
        {profile?.profilePicture && <IonAvatar className="w-32 h-32">
          <IonImg key={imageKey} src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profile.profilePicture}`} alt="" />
        </IonAvatar>}
      </div>
      {uploading ? 
        <>
        <div className="flex-col justify-center items-center text-center mt-4">
          <p>
            Updating Profile Image...
          </p>
          <p>
            This may take a few seconds.
          </p>
        </div>
        <Loading />
        </> :
        <>
          <div className="flex justify-center">
            <IonButton fill="outline" onClick={openFileUpload}>
              <IonIcon lazy="true" slot="start" icon={image}></IonIcon>
              <IonLabel slot="end">{(profile?.profilePicture === '') ? "Upload Profile Picture" : 'Replace Profile Picture'}</IonLabel>
            </IonButton>
            {profile?.profilePicture !== '' && <IonButton fill="outline" onClick={removeProfilePicture}>Remove</IonButton>}
            <input className="ion-hide" type="file" onInput={onFileInput} id="file-input"
              accept="image/png, image/jpeg" />
          </div>
          {currentFileURL !== '' &&
              <div className="flex-col justify-center items-center m-6 p-4  border-2 border-solid border-current border-primary">
                  <div className='flex justify-center pb-3'><IonLabel className="text-center" color="primary">Profile Picture Preview</IonLabel></div>
                  <div className="flex justify-center items-center pb=3">
                    <IonAvatar className="w-32 h-32">
                      <IonImg id="myimage" src={currentFileURL} />
                    </IonAvatar>
                  </div>
                  <div className='flex justify-between'>
                  <IonButton fill="outline" onClick={clearCurrentFile}>Cancel</IonButton>
                  {profile?.profilePicture !== '' ?
                      <IonButton fill="outline" onClick={replaceProfilePicture}>Confirm Replacement</IonButton>
                      :
                      <IonButton fill="outline" onClick={save}>Save</IonButton>}
                  </div>
            </div>
          }
        </>
      }
    </>
  );
};

export default EditProfilePicture;
