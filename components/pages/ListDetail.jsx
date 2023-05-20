import {
    IonBackButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton
} from '@ionic/react';
import { useParams } from 'react-router-dom';

import AuthStore from '../../store/authStore';
import * as selectors from '../../store/selectors';

import { useState, useEffect, useMemo } from 'react';
import { getList } from '../../store/listStore';
import Loading from '../ui/Loading';
import ListItemEntry from '../ui/ListItemEntry';
import EditList from '../ui/EditList';

import { ListItemTypes } from '../../utils/constants.js';

import ProfilePicture from '../ui/ProfilePicture';

const ListItems = ({ list }) => {
    return (
        <IonList lines="full">
            {(list?.listItems || []).map((item, index) => (
                <ListItemEntry list={list.list} item={item} key={index} index={index} />
            ))}
        </IonList>
    );
};

const ListDetail = ({ match }) => {
    const currentUser = AuthStore.useState(selectors.getUser);
    const params = useParams();
    const { listId } = params;
    const [started, finished, result, updating] = getList.useWatch();
    const [loadedList, setLoadedList] = useState(null);
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        async function listInit() {
            let response = await getList.run(listId);
            if (response.payload) {
                setLoadedList(response.payload);
            }
        }
        listInit();
    }, []);

    let showEditButton = useMemo(() => {
        if (currentUser._id === loadedList?.list?.userId._id && !loadedList?.list?.listType.includes('FAVORITE')) {
            return true;
        }
        return false;
    }, [currentUser, loadedList]);

    if (!loadedList) {
        return <Loading />;
    }
    return (
        <IonPage>
          {!editing ? <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/lists" />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                    {showEditButton && <IonButtons slot="end">
                        <IonButton onClick={() => setEditing(true)}>Edit</IonButton>
                    </IonButtons>}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="px-5 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h2 className="text-lg font-bold">{loadedList.list.name}</h2>
                        </div>
                        <div className="text-primary text-right text-xs w-16">{loadedList.listItems.length} item{loadedList.listItems.length === 1 ? '' : 's'}</div>
                    </div>
                    <div className="text-sm text-primary">
                      by {loadedList.list.userId.displayName}
                    </div>
                    {loadedList?.list?.description && (
                        <div className="ql-snow display-only line-clamp-3 overflow-auto text-xs">
                            <div className="ql-blank" data-gramm="false">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: loadedList.list.description,
                                    }}
                                ></p>
                            </div>
                        </div>
                    )}
                </div>
                <ListItems list={loadedList} />
            </IonContent>
            </>
            :
            <>
              <EditList {...loadedList.list} listItems={loadedList.listItems} editing={true} backLink={`/tabs/lists/details/${loadedList.list._id}`}/>
            </>
          }
        </IonPage>
    );
};

export default ListDetail;
