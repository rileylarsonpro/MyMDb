import React, { useState, useEffect, useRef } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox,
} from '@ionic/react';
import { closeOutline, arrowBackOutline } from 'ionicons/icons';
import Log from './Log';
import { searchMulti, getDetails } from '../../store/mediaStore';

const LogTv = ({ details, location }) => {
    const [started, finished, result, updating] = getDetails.useWatch();
    const [loggingMode, setLoggingMode] = useState('episodes');
    const [showLoggingScreen, setShowLoggingScreen] = useState(false);
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [rerenderKey, setRerenderKey] = useState(0);
    const modal = useRef(null);
    const logModal = useRef(null);
    useEffect(() => {
        console.log("clearing selected episodes")
        setSelectedEpisodes([]);
    }, [updating]);

    useEffect(() => {
        console.log("clearing selected episodes")
        setSelectedEpisodes([]);
    }, [updating, ]);

    //cleanup
    useEffect( () => () => {
        dismiss();
        setSelectedEpisodes([]);
        setShowLoggingScreen(false);
    }, [location.pathname])

    function dismiss() {
        modal.current?.dismiss();
    }
    function logModalDismiss() {
        logModal.current?.dismiss();
    }
    function loggingModeChanged(e) {
        setLoggingMode(e.detail.value);
    }
    function getSeasonDetails(details, season) {
        return details[`season/${season.season_number}`].episodes;
    }
    function checkboxToggled(e, episode) {
        if (e.detail.checked) {
            setSelectedEpisodes((prevState) => [...prevState, episode]);
            setRerenderKey((prevState) => prevState + 1);
        } else {
            setSelectedEpisodes((prevState) => prevState.filter((ep) => ep.id !== episode.id));
            setRerenderKey((prevState) => prevState + 1);
        }
    }
    function checkIfSelected(episode) {
        return selectedEpisodes.some((ep) => ep.id === episode.id);
    }
    function openLogScreen() {
        setShowLoggingScreen(true);
    }
    return (
        <>
            <IonButton id="open-select-modal" expand="block">
                Review or Log
            </IonButton>
            <IonModal id="select-modal" ref={modal} trigger="open-select-modal" fullscreen={true}>
                <IonHeader>
                    <IonToolbar mode="ios">
                        {showLoggingScreen && (
                            <IonButton slot="start" size="small" onClick={() => setShowLoggingScreen(false)} fill="clear" className="">
                                        <IonIcon icon={arrowBackOutline} />
                                        Back
                            </IonButton>
                        )}
                        <IonTitle>{details?.name}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => dismiss()}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {!showLoggingScreen ? 
                    <>
                        <IonSegment value={loggingMode} onIonChange={loggingModeChanged}>
                            <IonSegmentButton value="episodes">
                                <IonLabel>Episodes</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="season">
                                <IonLabel>Season</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="show">
                                <IonLabel>Show</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                        {loggingMode === 'episodes' && (
                            <div className="relative mb-24">
                                <IonAccordionGroup multiple={true}>
                                    {details?.seasons?.map((season, index) => (
                                        <IonAccordion key={index}>
                                            <IonItem slot="header">
                                                <IonLabel>
                                                    <h3>{season.name}</h3>
                                                    <p>{season.overview}</p>
                                                </IonLabel>
                                            </IonItem>
                                            <IonList slot="content">
                                                {getSeasonDetails(details, season).map((episode, index) => (
                                                    <IonItem key={index}>
                                                        <IonCheckbox
                                                            slot="start"
                                                            checked={checkIfSelected(episode)}
                                                            onIonChange={(e) => checkboxToggled(e, episode)}
                                                            aria-label={episode.name}
                                                        ></IonCheckbox>
                                                        <IonLabel>
                                                            <h3>{episode.name}</h3>
                                                            <p>{episode.overview}</p>
                                                        </IonLabel>
                                                    </IonItem>
                                                ))}
                                            </IonList>
                                        </IonAccordion>
                                    ))}
                                </IonAccordionGroup>
                                { selectedEpisodes.length > 0 && (
                                    <IonButton onClick={openLogScreen} className="fixed bottom-0 right-0 left-0 h-20">Log {selectedEpisodes.length} episode{selectedEpisodes.length !== 1 && 's' }</IonButton>
                                )}
                            </div>
                        )}
                    </>
                    : 
                    <>  
                        <Log key={rerenderKey} selectedType={loggingMode} selected={selectedEpisodes}/>
                    </>
                     }
                </IonContent>
            </IonModal>
        </>
    );
};
export default LogTv;
