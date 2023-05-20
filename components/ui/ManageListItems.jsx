import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonThumbnail,
    IonReorder,
    IonReorderGroup,
    useIonModal,
} from '@ionic/react';
import { closeCircleOutline, ticketOutline, tvOutline, happyOutline } from 'ionicons/icons';

import SearchBar from '../ui/SearchBar.jsx';
import ListItemEntry from '../ui/ListItemEntry.jsx';

import { ListItemTypes } from '../../utils/constants.js';
import Star from '../ui/Star.jsx';
import Poster from '../ui/Poster.jsx';


const ManageListItemsModal = ({
    listItems,
    setListItems,
    modalTitle,
    ranked,
    maxItems,
    itemType,
    onDismiss = () => {},
}) => {
    function addItem(details) {
        let newItem = {};
        let image = '/img/no-poster.svg';
        switch (details.media_type) {
            case 'movie':
                image = details.poster_path ?? '/img/no-poster.svg';
                newItem.type = ListItemTypes.MOVIE;
                newItem.movie = {
                    name: `${details.title} (${details.release_date.slice(0, 4)})`,
                    poster: image,
                    tmdbMovieId: details.id,
                };
                break;
            case 'tv':
                image = details.poster_path ?? '/img/no-poster.svg';
                newItem.type = ListItemTypes.TV_SHOW;
                newItem.tvShow = {
                    name: `${details.name} (${details.first_air_date.slice(0, 4)})`,
                    poster: image,
                    tmdbShowId: details.id,
                };
                break;
            case 'person':
                image = details.profile_path ?? '/img/no-poster.svg';
                newItem.type = ListItemTypes.PERSON;
                newItem.person = {
                    name: `${details.name}`,
                    poster: image,
                    tmdbPersonId: details.id,
                };
                break;
            default:
                break;
        }
        setListItems((listItems) => [...listItems, newItem]);
    }
    function removeItem(index) {
        let newItems = [...listItems];
        newItems.splice(index, 1);
        setListItems(newItems);
    }
    function itemMoved(event) {
        event.detail.complete(false);
        let newItems = [...listItems];
        newItems.splice(event.detail.from, 1);
        newItems.splice(event.detail.to, 0, listItems[event.detail.from]);
        setListItems(newItems);
    }
    return (
        <IonContent fullscreen={true}>
        <IonHeader>
            <IonToolbar mode="ios">
                <IonTitle>{modalTitle}</IonTitle>
                <IonButtons slot="end">
                    <IonButton
                        onClick={(e) => {
                            onDismiss();
                        }}
                    >
                        Done
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
                       
            {maxItems && listItems.length >= maxItems ? (
                <div className="flex justify-center p-3 text-center">
                    A maximum of {maxItems} entries can be added to this list.
                </div>
                ) : (
                <SearchBar
                    onSelect={addItem}
                    clearOnSelect={true}
                    placeholder="Add entry..."
                    itemType={itemType}
                />
            )}
            <IonList lines="full">
                <IonReorderGroup disabled={false} onIonItemReorder={itemMoved}>
                    {listItems.map((item, index) => (
                        <IonItem key={index}>
                            <div className="flex items-center">
                                <IonButton
                                    onClick={() => removeItem(index)}
                                    fill="clear"
                                    color="danger"
                                    slot="start"
                                >
                                    <IonIcon icon={closeCircleOutline} />
                                </IonButton>
                            </div>
                            <ListItemEntry list={{ranked: ranked}} item={item} index={index} editing={true}/>
                            <IonReorder slot="end" />
                        </IonItem>
                    ))}
                </IonReorderGroup>
            </IonList>
    </IonContent>
    )
};



const ManageListItems = ({
    listItems,
    setListItems,
    modalTitle = 'Editing Entries',
    ranked = false,
    maxItems = null,
    itemType = 'multi',
}) => {
    const [present, dismiss] = useIonModal(ManageListItemsModal, {
        listItems,
        setListItems,
        modalTitle,
        ranked,
        maxItems,
        itemType,
        onDismiss: () => dismiss(),
    });
    let openModal = () => {
        present();
    };
    return (
        <>
                {/*display*/}
                <div className="overflow-hidden">
                    <IonButton
                        fill="outline"
                        expand="block"
                        onClick={(e) => {
                            openModal();
                        }}
                    >
                        {' '}
                        {listItems.length > 0
                            ? `Edit ${listItems.length} ${
                                  listItems.length === 1 ? 'Entry' : 'Entries'
                              }`
                            : 'Add Entries'}
                    </IonButton>
                    <IonList lines="full">
                        {listItems.map((item, index) => (
                            <IonItem key={index}>
                                 <ListItemEntry list={{ranked: ranked}} item={item} index={index} editing={true}/>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
        </>
    );
};

export default ManageListItems;
