import { useState, useMemo } from 'react';
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
    IonBackButton,
} from '@ionic/react';

import EditList from '../ui/EditList';

const Lists = () => {
    const [listType, setListType] = useState('select');
    return (
        <IonPage>
            <IonContent>
                {listType === 'select' ? (
                    <>
                        <IonHeader>
                            <IonToolbar mode="ios">
                                <IonButtons slot="start">
                                    <IonBackButton defaultHref="/tabs/lists" />
                                </IonButtons>
                                <IonTitle>Select List Type</IonTitle>
                            </IonToolbar>
                        </IonHeader>
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
                    </>
                ) : (
                    <EditList listType={listType} />
                )}
            </IonContent>
        </IonPage>
    );
};

export default Lists;
