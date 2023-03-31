import React, { useState, useEffect } from 'react';
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
    IonTextarea
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import { searchMulti } from '../../store/mediaStore';

const LogForm = ({ rating, liked, reviewText, noteText, isPrivate, containsSpoilers, tags }) => {
    return(
    <Card className="my-4 mx-auto">
      <div className="h-32 w-full relative">
        <img className="rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full" src={image} alt="" />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{text}</p>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 relative">
            <img src={authorAvatar} className="rounded-full object-cover min-w-full min-h-full max-w-full max-h-full" alt="" />
          </div>
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
        </div>
      </div>
    </Card>)
};



const Log = ({ selectedType, selected }) => {
    return (
        <IonContent>
            {selectedType === 'episodes' && selected.length > 0 && (
                    <IonAccordionGroup multiple={true}>
                        {selected.map((episode, index) => (
                            <IonAccordion key={index}>
                            <IonItem slot="header">
                                <IonLabel>S{episode.season_number}E{episode.episode_number} {episode.name}</IonLabel>
                            </IonItem>
                            <IonList slot="content">
                                content
                            </IonList>
                        </IonAccordion>
                            
                        ))}
                    </IonAccordionGroup>
                )}
        </IonContent>
    );
};
export default Log;
