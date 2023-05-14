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
} from '@ionic/react';
import { closeCircleOutline, ticketOutline, tvOutline, happyOutline } from 'ionicons/icons';

import SearchBar from '../ui/SearchBar.jsx';
import ListItemEntry from '../ui/ListItemEntry.jsx';

import { ListItemTypes } from '../../utils/constants.js';
import Star from '../ui/Star.jsx';
import Poster from '../ui/Poster.jsx';




const ManageListItems = ({
    listItems,
    setListItems,
    modalTitle = 'Editing Entries',
    ranked = false,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const modal = useRef(null);
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
    // TODO - remove this function
    function randomNumber1to10() {
        return Math.floor(Math.random() * 10) + 1;
    }
    return (
        <>
                {/*display*/}
                <div className="overflow-hidden">
                    <IonButton
                        fill="outline"
                        expand="block"
                        onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(true);
                            modal.current?.present();
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
                <IonModal ref={modal} isOpen={modalOpen}>
                    <IonContent fullscreen={true}>
                        <IonHeader>
                            <IonToolbar mode="ios">
                                <IonTitle>{modalTitle}</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setModalOpen(false);
                                            modal.current?.dismiss();
                                        }}
                                    >
                                        Done
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                            <SearchBar
                                onSelect={addItem}
                                clearOnSelect={true}
                                placeholder="Add entry..."
                            />
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
                </IonModal>
        </>
    );
};

export default ManageListItems;
