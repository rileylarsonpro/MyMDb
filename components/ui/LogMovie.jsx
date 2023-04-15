import React, { useEffect, useRef } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import Log from './Log';

const LogMovie = ({ details, location }) => {
    const modal = useRef(null);
    //cleanup
    useEffect( () => () => {
        dismiss();
    }, [location.pathname])

    function dismiss(finished = false) {
        modal.current?.dismiss();
    }

    return (
        <>
            <IonButton id="open-select-modal" expand="block">
                Review or Log
            </IonButton>
            <IonModal id="select-modal" ref={modal} trigger="open-select-modal" fullscreen={true}>
                <IonHeader>
                    <IonToolbar mode="ios">
                        <IonTitle>{details?.title}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => dismiss()}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Log selectedType="movie" selected={details} dismissModal={dismiss}/>
                </IonContent>
            </IonModal>
        </>
    );
};
export default LogMovie;
