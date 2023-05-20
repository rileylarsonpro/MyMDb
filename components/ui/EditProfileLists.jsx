import { IonItem, IonLabel, IonIcon, IonButton, IonImg, IonAvatar, IonPage, IonContent } from '@ionic/react';
import { useState, useMemo, useEffect } from 'react';
import ManageListItems from './ManageListItems';
import listApi from '../../api/list.api';
import { getUserProfile } from '../../store/authStore.js';
import { set } from 'react-hook-form';

const EditProfileLists = ({ profile, toast }) => {
    const [listType, setListType] = useState('select');
    const [listItems, setListItems] = useState([]);
    const itemType = useMemo(() => {
        if (listType === 'FAVORITE_MOVIES') return 'movie';
        if (listType === 'FAVORITE_TV_SHOWS') return 'tv';
        if (listType === 'FAVORITE_PEOPLE') return 'person';
        else return 'multi';
    }, [listType]);
    const save = async () => {
        try {
            await listApi.updateFavoritesList(
                listType,
                listItems,
            );
            toast.success('List saved successfully!');
            getUserProfile.run();
        } catch (error) {
            toast.error(error.message);
        }
    };
    function checkForList(toListType){
        if(profile && profile.favoriteLists){
            let previousList = profile.favoriteLists.find(list => list.list.listType === toListType);
            console.log("prev", previousList);
            if(previousList){
                setListItems(previousList.listItems);
            } 
        }
        setListType(toListType);
    }

    return (
        <>
              {listType === 'select' ? (
                    <div className="p-4">
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => checkForList('FAVORITE_MOVIES')}
                        >
                            Favorite Movies
                        </IonButton>
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => checkForList('FAVORITE_TV_SHOWS')}
                        >
                            Favorite TV Shows
                        </IonButton>
                        <IonButton
                            className="mb-4"
                            fill="outline"
                            expand="block"
                            onClick={() => checkForList('FAVORITE_PEOPLE')}
                        >
                            Favorite People
                        </IonButton>
                    </div>
                ) : (
                    <>                        
                        <IonButton fill="outline" expand="block" onClick={save}>
                            Save
                        </IonButton>
                        <ManageListItems listItems={listItems} setListItems={setListItems} maxItems={4} itemType={itemType}/>
                    </>
                )}
                
        </>
    );
};

export default EditProfileLists;
