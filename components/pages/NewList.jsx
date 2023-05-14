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
} from '@ionic/react';

import {
    lockClosed,
    lockOpen,
    medalOutline,
    listOutline,
} from 'ionicons/icons';

import RichTextEditor from '../ui/RichTextEditor';
import AddTags from '../ui/AddTags';
import ManageListItems from '../ui/ManageListItems';

import listApi from '../../api/list.api';
import { getUserLists } from '../../store/listStore';

import { useToast } from '../useToast.tsx';
import {useHistory} from 'react-router-dom';

const Lists = () => {
    const toast = useToast();
    const history = useHistory();
    const [listType, setListType] = useState('select');
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [listItems, setListItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [ranked, setRanked] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const clearState = () => {
        setListType('select');
        setListName('');
        setListDescription('');
        setListItems([]);
        setTags([]);
        setRanked(false);
        setIsPrivate(false);
    };

    const submitCustomList = async (e) => {
        e.preventDefault();
        await listApi.createCustomList({
            name: listName,
            description: listDescription,
            listItems,
            tags,
            ranked,
            isPrivate,
        });
        toast.success('List created successfully!');
        history.push('/tabs/lists');
        getUserLists.run();
        clearState();
    };
    const saveDisabled = useMemo(() => {
        return listName.length === 0 || listItems.length === 0;
    }, [listName, listItems]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonButtons slot="start">
                        <IonButton routerLink="/tabs/lists">Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Add New List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton disabled={saveDisabled} onClick={submitCustomList} routerLink="/tabs/lists">Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {listType === 'select' ? (
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
                ) : (

                    <div className="p-4 flex flex-col h-full">
                        <IonLabel htmlFor="list-name" position="stacked">
                            List Name
                        </IonLabel>
                        <div>
                        <IonInput
                            required
                            id="list-name"
                            placeholder="Display Name"
                            color="primary"
                            value={listName}
                            className="flex-none"
                            onIonChange={(e) => setListName(e.target.value)}
                        />
                        </div>
                        <IonLabel htmlFor="list-description" position="stacked">
                            List Description
                        </IonLabel>
                        <RichTextEditor
                            id="list-description"
                            html={listDescription}
                            setHtml={setListDescription}
                            style="h-12"
                        />
                        {listType === 'regular' && (
                            <div className="flex-1">
                                <ManageListItems listItems={listItems} setListItems={setListItems} ranked={ranked}/>
                            </div>
                        )}
                        <AddTags tags={tags} setTags={setTags} />
                        <div className="grid grid-cols-2 pt-2">
                            <button
                                className="flex-col justify-center items-center text-center"
                                onClick={() => setRanked(!ranked)}
                            >
                                <IonLabel position="stacked">
                                    {ranked ? 'Ranked' : 'Unranked'}
                                </IonLabel>
                                <div className="pt-1">
                                    <IonIcon
                                        color="primary"
                                        size="large"
                                        role="button"
                                        icon={ranked ? medalOutline : listOutline}
                                    />
                                </div>
                            </button>
                            <button
                                className="flex-col justify-center items-center text-center"
                                onClick={() => setIsPrivate(!isPrivate)}
                            >
                                <IonLabel position="stacked">
                                    {isPrivate ? 'Private' : 'Public'}
                                </IonLabel>
                                <div className="pt-1">
                                    <IonIcon
                                        color="primary"
                                        size="large"
                                        role="button"
                                        icon={isPrivate ? lockClosed : lockOpen}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Lists;
