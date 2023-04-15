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
    heart,
    heartOutline,
    lockClosed,
    lockOpen,
    addCircleOutline,
    alertCircleOutline,
    eye,
    eyeOff,
} from 'ionicons/icons';

import ReactQuill from 'react-quill';
import StarInput from '../ui/StarInput.jsx';

const LogForm = ({
    id,
    dateWatched: initDateWatched,
    rating: initRating,
    liked: initLiked,
    reviewText: initReviewText,
    noteText: initNoteText,
    tags: initTags,
    isPrivate: initIsPrivate,
    containsSpoilers: initContainsSpoilers,
    isRewatch: initIsRewatch,
    handleChange,
    tagOptions,
}) => {
    const [dateWatched, setDateWatched] = useState(initDateWatched);
    const [rating, setRating] = useState(initRating);
    const [liked, setLiked] = useState(initLiked);
    const [reviewText, setReviewText] = useState(initReviewText);
    const [noteText, setNoteText] = useState(initNoteText);
    const [tags, setTags] = useState(initTags);
    const [tagSearch, setTagSearch] = useState('');
    const [isPrivate, setIsPrivate] = useState(initIsPrivate);
    const [modalOpen, setModalOpen] = useState(false);
    const [containsSpoilers, setContainsSpoilers] = useState(initContainsSpoilers);
    const [isRewatch, setIsRewatch] = useState(initIsRewatch);
    const [modalTitle, setModalTitle] = useState('Log Episode');
    const [modalSlot, setModalSlot] = useState('reviewText');
    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
    const reviewModules = {
        toolbar: { container: `#toolbar-${id}-review` },
    };
    const notesModules = {
        toolbar: { container: `#toolbar-${id}-notes` },
    };
    const popover = useRef(null);
    const modal = useRef(null);
    useEffect(() => {
        const log = {
            dateWatched: dateWatched,
            id: id,
            rating: rating,
            liked: liked,
            reviewText: reviewText,
            noteText: noteText,
            isPrivate: isPrivate,
            containsSpoilers: containsSpoilers,
            tags: tags,
        };
        handleChange(log);
    }, [
        dateWatched,
        rating,
        liked,
        reviewText,
        noteText,
        isPrivate,
        containsSpoilers,
        isRewatch,
        tags,
    ]);
    function addTagsButtonClicked(e) {
        e.preventDefault();
        setModalTitle('Add Tags');
        setModalSlot('tags');
        setModalOpen(true);

        // wait for modal to open
        setTimeout(() => {
            let searchElement = document.getElementById(`tag-search-${id}`);
            searchElement.querySelector('input').focus();
        }, 500);
    }
    function addReviewText(e) {
        e.preventDefault();
        setModalTitle('Add Review');
        setModalSlot('reviewText');
        setModalOpen(true);
        // wait for modal to open
        setTimeout(() => {
            let input = document.getElementById(`review-${id}`);
            input.querySelector('.ql-editor').focus();
        }, 500);
    }
    function addNoteText(e) {
        e.preventDefault();
        setModalTitle('Add Notes');
        setModalSlot('noteText');
        setModalOpen(true);
        // wait for modal to open
        setTimeout(() => {
            let input = document.getElementById(`note-${id}`);
            input.querySelector('.ql-editor').focus();
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
            <div className="mx-5 my-1" data-tap-disabled="true">
                <div className="flex justify-between">
                    <div>
                        <div>
                            <IonLabel position="stacked">Date Watched</IonLabel>
                        </div>
                        <div className="flex items-center">
                            <button id={`${id}-date`}>
                                <IonChip color="primary">
                                    <span className="w-56">
                                        {' '}
                                        {dateWatched ? dateWatched.toDateString() : 'Add date'}
                                    </span>
                                </IonChip>
                            </button>
                            {dateWatched !== null && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDateWatched(null);
                                    }}
                                    className="flex justify-center"
                                >
                                    {' '}
                                    <IonIcon color="primary" size="large" icon={closeOutline} />
                                </button>
                            )}
                        </div>
                        <IonPopover trigger={`${id}-date`} triggerAction="click" size="cover">
                            <IonContent>
                                <IonDatetime
                                    value={dateWatched && dateWatched.toISOString()}
                                    onIonChange={(e) => setDateWatched(new Date(e.detail.value))}
                                    presentation="date"
                                />
                            </IonContent>
                        </IonPopover>
                    </div>

                    <div className="flex-col justify-center items-center">
                        <IonLabel position="stacked">Like</IonLabel>
                        <div className="pt-1">
                            <IonIcon
                                color="primary"
                                size="large"
                                role="button"
                                icon={liked ? heart : heartOutline}
                                onClick={() => setLiked(!liked)}
                            />
                        </div>
                    </div>
                </div>
                <StarInput id={id} onChange={setRating} />
                <IonLabel position="stacked">Review</IonLabel>
                <div onClick={addReviewText} role="button" className="quill h-32 cursor-pointer">
                    <div className="ql-container ql-snow display-only">
                        <div className="ql-editor ql-blank" data-gramm="false">
                            <p dangerouslySetInnerHTML={{ __html: reviewText }}></p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <IonLabel position="stacked">Notes (Private)</IonLabel>
                    <div onClick={addNoteText} role="button" className="quill h-32 cursor-pointer">
                        <div className="ql-container ql-snow display-only">
                            <div className="ql-editor ql-blank" data-gramm="false">
                                <p dangerouslySetInnerHTML={{ __html: noteText }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 pt-2">
                    <IonButton onClick={addTagsButtonClicked} size="small" fill="outline"> Add Tags</IonButton>
                    <div className="flex overflow-x-auto py-1 h-14">
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
                                {modalSlot === 'tags' && (
                                    <>
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
                                            className="outline-input"
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
                                    </>
                                )}
                                {modalSlot === 'reviewText' && (
                                    <>
                                        <ReactQuill
                                            id={`review-${id}`}
                                            theme="snow"
                                            value={reviewText}
                                            onChange={setReviewText}
                                            formats={formats}
                                            modules={reviewModules}
                                            className="h-72"
                                        />
                                        <div id={`toolbar-${id}-review`}>
                                            <button className="ql-bold">b</button>
                                            <button className="ql-italic">i</button>
                                            <button className="ql-underline">u</button>
                                            <button className="ql-list" value="ordered"></button>
                                            <button className="ql-list" value="bullet"></button>
                                            <button className="ql-link">link</button>
                                        </div>
                                    </>
                                )}
                                {modalSlot === 'noteText' && (
                                    <>
                                        <ReactQuill
                                            id={`note-${id}`}
                                            theme="snow"
                                            value={noteText}
                                            onChange={setNoteText}
                                            formats={formats}
                                            modules={notesModules}
                                            className="h-72"
                                        />
                                        <div id={`toolbar-${id}-notes`}>
                                            <button className="ql-bold">b</button>
                                            <button className="ql-italic">i</button>
                                            <button className="ql-underline">u</button>
                                            <button className="ql-list" value="ordered"></button>
                                            <button className="ql-list" value="bullet"></button>
                                            <button className="ql-link">link</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </IonContent>
                    </IonModal>
                </div>
                <div className="grid grid-cols-3 pt-2">
                    <button
                        className="flex-col justify-center items-center text-center"
                        onClick={() => setIsPrivate(!isPrivate)}
                    >
                        <IonLabel position="stacked">{isPrivate ? 'Private' : 'Public'}</IonLabel>
                        <div className="pt-1">
                            <IonIcon
                                color="primary"
                                size="large"
                                role="button"
                                icon={isPrivate ? lockClosed : lockOpen}
                            />
                        </div>
                    </button>
                    <button
                        className="flex-col justify-center items-center text-center"
                        onClick={() => setContainsSpoilers(!containsSpoilers)}
                    >
                        <IonLabel position="stacked">
                            {containsSpoilers ? 'Spoilers' : 'No Spoilers'}
                        </IonLabel>
                        <div className="pt-1">
                            <IonIcon
                                color="primary"
                                size="large"
                                role="button"
                                icon={containsSpoilers ? alertCircleOutline : addCircleOutline}
                            />
                        </div>
                    </button>
                    <button
                        className="flex-col justify-center items-center text-center"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsRewatch(!isRewatch);
                        }}
                    >
                        <IonLabel position="stacked">
                            {isRewatch ? 'Rewatch' : '1st Watch'}
                        </IonLabel>
                        <div className="pt-1">
                            <IonIcon
                                color="primary"
                                size="large"
                                role="button"
                                icon={isRewatch ? eye : eyeOff}
                            />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LogForm
