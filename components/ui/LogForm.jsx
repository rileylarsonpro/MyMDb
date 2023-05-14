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

import RichTextEditor from '../ui/RichTextEditor';
import StarInput from '../ui/StarInput.jsx';
import AddTags from '../ui/AddTags.jsx';

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
}) => {
    const [dateWatched, setDateWatched] = useState(initDateWatched);
    const [rating, setRating] = useState(initRating);
    const [liked, setLiked] = useState(initLiked);
    const [reviewText, setReviewText] = useState(initReviewText);
    const [noteText, setNoteText] = useState(initNoteText);
    const [tags, setTags] = useState(initTags);
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
                    <AddTags tags={tags} setTags={setTags} />


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
                                {modalSlot === 'reviewText' && (
                                    <RichTextEditor id={`review-${id}`} html={reviewText} setHtml={setReviewText} />
                                )}
                                {modalSlot === 'noteText' && (
                                    <RichTextEditor id={`note-${id}`} html={noteText} setHtml={setNoteText} />
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
