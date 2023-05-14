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
    console.log(listItems);
    const modal = useRef(null);
    function addItem(details) {
        let newItem = {};
        let image = '/img/no-poster.svg';
        switch (details.media_type) {
            case 'movie':
                image = details.poster_path
                    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                    : '/img/no-poster.svg';
                newItem = {
                    name: `${details.title} (${details.release_date.slice(0, 4)})`,
                    image: image,
                    tmdbMovieId: details.id,
                    type: ListItemTypes.MOVIE,
                };
                break;
            case 'tv':
                image = details.poster_path
                    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                    : '/img/no-poster.svg';
                newItem = {
                    name: `${details.name} (${details.first_air_date.slice(0, 4)})`,
                    image: image,
                    tmdbShowId: details.id,
                    type: ListItemTypes.TV_SHOW,
                };
                break;
            case 'person':
                image = details.profile_path
                    ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                    : '/img/no-poster.svg';
                newItem = {
                    name: `${details.name}`,
                    image: image,
                    tmdbPersonId: details.id,
                    type: ListItemTypes.PERSON,
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
                                {ranked && <div className="flex items-center" slot="start">
                                    {index + 1}.
                                </div>}
                                <IonLabel><div className="text-sm">{item.name}</div></IonLabel>
                                <div slot="end" className="text-primary">
                                    {item.type === ListItemTypes.MOVIE && (
                                        <IonIcon icon={ticketOutline} size="large"/>
                                    )}
                                    {item.type === ListItemTypes.TV_SHOW && (
                                        <IonIcon icon={tvOutline} size="large"/>
                                    )}
                                    {item.type === ListItemTypes.PERSON && (
                                        <IonIcon icon={happyOutline} size="large"/>
                                    )}
                                </div>
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
                                                <Poster src={item.image} ranked={ranked} index={index} wrapperClasses="ml-0"/>
                                            </div>
                                            <div className="flex flex-col justify-between h-full">
                                                <div>
                                                    <div className="mr-2 mt-1">
                                                        {item.type === ListItemTypes.MOVIE && (
                                                            <div className="text-primary flex items-center">
                                                                <div className="pr-1 mt-1">
                                                                    {' '}
                                                                    <IonIcon
                                                                        icon={ticketOutline}
                                                                    />{' '}
                                                                </div>
                                                                <div> Movie</div>
                                                            </div>
                                                        )}
                                                        {item.type === ListItemTypes.TV_SHOW && (
                                                            <div className="text-primary flex items-center">
                                                                <div className="pr-1 mt-1">
                                                                    {' '}
                                                                    <IonIcon
                                                                        icon={tvOutline}
                                                                    />{' '}
                                                                </div>
                                                                <div> TV Show</div>
                                                            </div>
                                                        )}
                                                        {item.type === ListItemTypes.PERSON && (
                                                            <div className="text-primary flex items-center">
                                                                <div className="pr-1 mt-1">
                                                                    {' '}
                                                                    <IonIcon
                                                                        icon={happyOutline}
                                                                    />{' '}
                                                                </div>
                                                                <div> Person</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm line-clamp-2">
                                                        {item.name}
                                                    </div>
                                                </div>
                                                {/*TODO: rating out of 10*/}
                                                <div className="flex items-center text-primary">
                                                    <Star filled="true" classes="h-5 w-5 mr-1" />{' '}
                                                    {randomNumber1to10()}
                                                </div>
                                            </div>
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
