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
    IonBackButton,
    IonAlert
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
import { useHistory } from 'react-router-dom';

const EditList = ({
    _id,
    name: initName = '',
    description: initDescription = '',
    listItems: initListItems = [],
    tags: initTags = [],
    ranked: initRanked = false,
    isPrivate: initIsPrivate = false,
    editing = false,
    listType,
    setListType = () => {},
}) => {
    const toast = useToast();
    const history = useHistory();
    const [listName, setListName] = useState(initName);
    const [listDescription, setListDescription] = useState(initDescription);
    const [listItems, setListItems] = useState(initListItems);
    const [tags, setTags] = useState(initTags);
    const [ranked, setRanked] = useState(initRanked);
    const [isPrivate, setIsPrivate] = useState(initIsPrivate);
    const [isOpen, setIsOpen] = useState(false);



    const clearState = () => {
        setListType('select');
        setListName('');
        setListDescription('');
        setListItems([]);
        setTags([]);
        setRanked(false);
        setIsPrivate(false);
    };

    const deleteList = async () => {
        await listApi.deleteList(_id);
        toast.success('List deleted successfully!');
        history.push('/tabs/lists');
        getUserLists.run();
        clearState();
    };

    const submitCustomList = async (e) => {
        e.preventDefault();
        if (editing) {
            await listApi.updateCustomList(_id,{
                name: listName,
                description: listDescription,
                listItems,
                tags,
                ranked,
                isPrivate,
            });
            toast.success('List updated successfully!');
        } else {
            await listApi.createCustomList({
                name: listName,
                description: listDescription,
                listItems,
                tags,
                ranked,
                isPrivate,
            });
            toast.success('List created successfully!');
        }
        history.push('/tabs/lists');
        getUserLists.run();
        clearState();
    };
    const saveDisabled = useMemo(() => {
        return listName.length === 0 || listItems.length === 0;
    }, [listName, listItems]);

    return (
        <>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/lists" />
                    </IonButtons>
                    <IonTitle>{editing ? 'Edit List' : 'Add New List'}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            disabled={saveDisabled}
                            onClick={submitCustomList}
                        >
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                    {listType === 'CUSTOM' && (
                        <div className="flex-1">
                            <ManageListItems
                                listItems={listItems}
                                setListItems={setListItems}
                                ranked={ranked}
                            />
                        </div>
                    )}
                    <AddTags tags={tags} setTags={setTags} />
                    <div className="grid grid-cols-2 pt-2">
                        <button
                            className="flex-col justify-center items-center text-center"
                            onClick={() => setRanked(!ranked)}
                        >
                            <IonLabel position="stacked">{ranked ? 'Ranked' : 'Unranked'}</IonLabel>
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
                    <div>
                    <IonButton onClick={() => setIsOpen(true)} fill="outline" color="danger" expand="block"> Delete List </IonButton>
                    <IonAlert
                        isOpen={isOpen}
                        header="Confirm Delete"
                        subHeader="This action cannot be undone"
                        message={'Are you sure you want to delete this list?'}
                        trigger="present-alert"
                        buttons={[
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                              setIsOpen(false);
                            },
                          },
                          {
                            text: 'OK',
                            role: 'confirm',
                            handler: () => {
                            deleteList();
                            },
                          },
                        ]}
                        onDidDismiss={({ detail }) => {setIsOpen(false)}}
                    ></IonAlert>
                    </div>
                </div>
            </IonContent>
        </>
    );
};

export default EditList;
