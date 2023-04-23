import {
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonImg,
  } from '@ionic/react';
  import { useState } from 'react';
  import { image, closeOutline } from 'ionicons/icons';
  import userApi from '../../api/user.api.js';
  
  
  
  
  const EditProfilePicture = ({ profile }) => {
    const [currentFile, setCurrentFile] = useState(null);
    function openFileUpload(e) {
      document.getElementById('file-input').click();
    }
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
        <>
          <IonItem>
            <IonButton fill="outline" onClick={openFileUpload}>
              <IonIcon lazy="true" slot="start" icon={image}></IonIcon>
              <IonLabel slot="end">Profile pic</IonLabel>
            </IonButton>
            <input className="ion-hide" type="file" onChange={onFileInput} id="file-input"
              accept="image/png, image/jpeg" />
          </IonItem>
          <IonItem>
            {currentFile && <button onClick={clearCurrentFile}> <IonIcon color="primary" size="large" icon={closeOutline} /> </button>}
            <IonImg id="myimage"></IonImg>
          </IonItem>
          <IonButton fill="outline" onClick={save}>Save</IonButton>
          {profile?.profilePicture && <IonImg src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profile.profilePicture}`} />}
        </>
    );
  };
  
  export default EditProfilePicture;
  