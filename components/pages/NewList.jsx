import Store from '../../store';
import { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
} from '@ionic/react';
import RichTextEditor from '../ui/RichTextEditor';

const Lists = () => {
    const [listType, setListType] = useState('select');
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonButtons slot="start">
                        <IonButton routerLink="/tabs/lists">Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Add New List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink="/tabs/lists">Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {listType === 'select' && (
                    <div className="p-4">
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => setListType('regular')}
                        >
                            Regular List
                        </IonButton>
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => setListType('oscar')}
                        >
                            Oscar List
                        </IonButton>
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => setListType('tier')}
                        >
                            Tier List
                        </IonButton>
                    </div>
                )}
                {listType === 'regular' && (
                    <form className="p-4">
                        <IonLabel htmlFor="list-name" position="stacked">List Name</IonLabel>
                        <IonInput id="list-name" placeholder="Display Name" color="primary" value={listName} onIonChange={(e) => setListName(e.target.value)}/>
                        <IonLabel htmlFor="list-description" position="stacked">List Description</IonLabel>
                        <RichTextEditor id="list-description" html={listDescription} setHtml={setListDescription} />
                    </form>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Lists;
