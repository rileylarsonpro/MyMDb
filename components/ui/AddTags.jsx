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
    IonPopover,
    IonDatetime,
    IonChip,
    IonSearchbar,
} from '@ionic/react';
import {
    closeOutline,
} from 'ionicons/icons';

import RichTextEditor from '../ui/RichTextEditor';
import StarInput from '../ui/StarInput.jsx';
import { getUserTags } from '../../store/tagStore.js';

const AddTags = ({
    tags,
    setTags,
    id = 'tag-id'
}) => {
    const [modalTitle, setModalTitle] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [tagSearch, setTagSearch] = useState('');
    const [tagOptions, setTagOptions] = useState([]);


    useEffect(() => {
        async function tagOptionsInit() {
            // TODO: This could be more efficient by caching response to use across all instances of this component
            let response = await getUserTags.run();
            if (response.payload && response.payload.length > 0) {
                setTagOptions(response.payload);
            }
        }
        tagOptionsInit();
    }, []);

    const modal = useRef(null);
    function addTagsButtonClicked(e) {
        e.preventDefault();
        setModalTitle('Add Tags');
        setModalOpen(true);

        // wait for modal to open
        setTimeout(() => {
            let searchElement = document.getElementById(`tag-search-${id}`);
            searchElement.querySelector('input').focus();
        }, 500);
    }
    function addTag(tagName) {
        let searchElement = document.getElementById(`tag-search-${id}`);
        if (tagName === '') return;
        if (tags.includes(tagName)) {
            searchElement.value = '';
            return;
        }
        setTags((prevTags) => [...prevTags, tagName]);
        searchElement.value = '';
    }
    function removeTag(index) {
        let newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    }
    const filteredTagOptions = useMemo(() => {
        return tagOptions.filter((tag) => tag.name.toLowerCase().includes(tagSearch.toLowerCase()));
    }, [tagSearch, tagOptions]);

    return (
        <>
                <div>
                    <div className="flex items-center overflow-x-auto py-1">
                        <IonButton onClick={addTagsButtonClicked} size="small" fill="outline"> Add Tags</IonButton>
                        {tags.map((tag, index) => (
                            <button onClick={() => removeTag(index)} key={index}>
                                <IonChip color="primary">
                                    <IonLabel className="whitespace-nowrap">{tag}</IonLabel>
                                    <IonIcon color="primary" size="small" icon={closeOutline} />
                                </IonChip>
                            </button>
                        ))}
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
                            <div className="p-3">
                                        <div className="flex overflow-x-auto pt-1 h-12">
                                            {tags.map((tag, index) => (
                                                <button onClick={() => removeTag(index)} key={index}>
                                                    <IonChip color="primary">
                                                        <IonLabel className="whitespace-nowrap">
                                                            {tag}
                                                        </IonLabel>
                                                        <IonIcon
                                                            color="primary"
                                                            size="small"
                                                            icon={closeOutline}
                                                        />
                                                    </IonChip>
                                                </button>
                                            ))}
                                        </div>
                                        <IonSearchbar
                                            id={`tag-search-${id}`}
                                            placeholder="Find or create a tag"
                                            onKeyPress={(e) => {
                                                e.key === 'Enter' &&
                                                    addTag(e.target.value.toLowerCase().trim());
                                            }}
                                            onIonChange={(e) =>
                                                setTagSearch(e.target.value.toLowerCase().trim())
                                            }
                                        ></IonSearchbar>
                                        <IonList>
                                            {filteredTagOptions.map((tag, index) => (
                                                <IonItem
                                                    key={index}
                                                    button
                                                    onClick={() => addTag(tag.name)}>
                                                    <IonLabel>{tag.name}</IonLabel>
                                                </IonItem>
                                            ))}
                                        </IonList>
                            </div>
                        </IonContent>
                    </IonModal>
                </div>
        </>
    );
};

export default AddTags
