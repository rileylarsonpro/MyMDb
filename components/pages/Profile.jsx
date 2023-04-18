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
  IonButton,
  IonImg
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { image, closeOutline } from 'ionicons/icons';
import userApi from '../../api/user.api.js';
import { getUserProfile } from '../../store/authStore.js';
import Loading from '../ui/Loading';




const Profile = ({ history }) => {
  const [started, finished, result, updating] = getUserProfile.useWatch();
  const [currentFile, setCurrentFile] = useState(null);
  const [profile, setProfile] = useState(null);
  function openFileUpload(e) {
    document.getElementById('file-input').click();
  }
  useEffect(() => {
    async function profileInit() {
      let response = await getUserProfile.run();
        if (response.payload) {
          setProfile(response.payload);
        }
    }
    profileInit();
  }, []);
  function onFileInput(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setCurrentFile(file);
    let reader = new FileReader();

    let imgTag = document.getElementById("myimage");
    imgTag.title = file.name;

    reader.onload = function (event) {
      imgTag.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
  function clearCurrentFile() {
    setCurrentFile(null);
    document.getElementById("myimage").src = '';
  }
  async function save() {
    let formData = new FormData();
    formData.append('file', currentFile);
    userApi.uploadProfilePicture(formData);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      { !finished ? <Loading /> : (
      <IonContent>
        <IonItem>
          <IonButton fill="outline" onClick={openFileUpload}>
            <IonIcon lazy="true" slot="start" icon={image}></IonIcon>
            <IonLabel slot="end">Profile pic</IonLabel>
          </IonButton>
          <input class="ion-hide" type="file" onChange={onFileInput} id="file-input"
            accept="image/png, image/jpeg" />
        </IonItem>
        <IonItem>
          {currentFile && <button onClick={clearCurrentFile}> <IonIcon color="primary" size="large" icon={closeOutline} /> </button>}
          <IonImg id="myimage"></IonImg>
        </IonItem>
        <IonButton fill="outline" onClick={save}>Save</IonButton>
        <IonImg src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profile.profilePicture}`} />
      </IonContent>
      )}
    </IonPage>
  );
};

export default Profile;
