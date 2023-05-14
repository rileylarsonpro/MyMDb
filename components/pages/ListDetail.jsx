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
} from '@ionic/react';
import { useParams } from 'react-router-dom';

// import Store from '../../store';
// import * as actions from '../../store/actions';
// import * as selectors from '../../store/selectors';

import { useState, useEffect } from 'react';
import { getList } from '../../store/listStore';
import Loading from '../ui/Loading';
import ListItemEntry from '../ui/ListItemEntry';

import { ListItemTypes } from '../../utils/constants.js';

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
    // const lists = Store.useState(selectors.getLists);
    const params = useParams();
    // const loadedList = lists.find(l => l.id === listId);
    const { listId } = params;
    const [started, finished, result, updating] = getList.useWatch();
    const [loadedList, setLoadedList] = useState(null);
    useEffect(() => {
        async function listInit() {
            let response = await getList.run(listId);
            if (response.payload) {
                setLoadedList(response.payload);
            }
        }
        listInit();
    }, []);

    if (!loadedList) {
        return <Loading />;
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/lists" />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
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
        </IonPage>
    );
};

export default ListDetail;
