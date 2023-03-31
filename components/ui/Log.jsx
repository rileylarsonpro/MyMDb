import React, { useState, useEffect } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox,
    IonTextarea,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import ReactQuill from 'react-quill';

import { searchMulti } from '../../store/mediaStore';

const LogForm = ({
    episode,
    rating: initRating,
    liked: initLiked,
    reviewText: initReviewText,
    noteText: initNoteText,
    isPrivate: initIsPrivate,
    containsSpoilers: initContainsSpoilers,
    tags: initTags,
    handleChange,
}) => {
    const [rating, setRating] = useState(initRating);
    const [liked, setLiked] = useState(initLiked);
    const [reviewText, setReviewText] = useState(initReviewText);
    const [reviewExpanded, setReviewExpanded] = useState(false);
    const [noteText, setNoteText] = useState(initNoteText);
    const [noteExpanded, setNoteExpanded] = useState(false);
    const [isPrivate, setIsPrivate] = useState(initIsPrivate);
    const [containsSpoilers, setContainsSpoilers] = useState(initContainsSpoilers);
    const [tags, setTags] = useState(initTags);
    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
    const reviewModules = {
        toolbar: { container: `#toolbar-${episode}-review` },
    };
    const notesModules = {
        toolbar: { container: `#toolbar-${episode}-notes` },
    };
    useEffect(() => {
        if (reviewExpanded) {
            setNoteExpanded(false);
        }
    }, [reviewExpanded])

    useEffect(() => {
        if (noteExpanded) {
            setReviewExpanded(false);
        }
    }, [noteExpanded])

    useEffect(() => {
        const log = {
            episode: episode,
            rating: rating,
            liked: liked,
            reviewText: reviewText,
            noteText: noteText,
            isPrivate: isPrivate,
            containsSpoilers: containsSpoilers,
            tags: tags,
        };
        handleChange(log);
    }, [rating, liked, reviewText, noteText, isPrivate, containsSpoilers, tags]);
    return (
        <>
            <div className="mx-5 my-1">
                <IonLabel position="stacked">Review</IonLabel>
                <ReactQuill
                    id={`review-${episode}`}
                    theme="snow"
                    value={rating}
                    onChange={setRating}
                    formats={formats}
                    modules={reviewModules}
                    onFocus={() => setReviewExpanded(true)}
                    className={reviewExpanded && 'h-40'}
                />
                <div id={`toolbar-${episode}-review`}>
                    <button className="ql-bold">b</button>
                    <button className="ql-italic">i</button>
                    <button className="ql-underline">u</button>
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-link">link</button>
                </div>
                <IonLabel position="stacked">Notes (Private)</IonLabel>
                <ReactQuill
                    id={`notes-${episode}`}
                    theme="snow"
                    value={noteText}
                    onChange={setNoteText}
                    formats={formats}
                    modules={notesModules}
                    onFocus={() => setNoteExpanded(true)}
                    className={noteExpanded && 'h-40'}
                />
                <div id={`toolbar-${episode}-notes`}>
                    <button className="ql-bold">b</button>
                    <button className="ql-italic">i</button>
                    <button className="ql-underline">u</button>
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-link">link</button>
                </div>
            </div>
        </>
    );
};

function getEpisodeString(episode) {
    return `S${episode.season_number}E${episode.episode_number}`;
}

const Log = ({ selectedType, selected }) => {
    const [logs, setLogs] = useState(() => {
        let map = new Map();
        selected.forEach((episode) => {
            map.set(getEpisodeString(episode), {
                episode: getEpisodeString(episode),
                rating: 0,
                liked: false,
                reviewText: '',
                noteText: '',
                isPrivate: true,
                containsSpoilers: false,
                tags: [],
            });
        });
        return map;
    });
    console.log("logs", logs)
    function handleChange(log) {
        setLogs(new Map(logs.set(log.episode, log)));
    }
    return (
        <IonContent>
            {selectedType === 'episodes' && selected.length > 0 && (
                <IonAccordionGroup multiple={true}>
                    {selected.map((episode, index) => (
                        <IonAccordion key={index}>
                            <IonItem slot="header">
                                <IonLabel>
                                    {getEpisodeString(episode)} {episode.name}
                                </IonLabel>
                            </IonItem>
                            <IonList slot="content">
                                <LogForm {...logs.get(getEpisodeString(episode))} handleChange={handleChange}/>
                            </IonList>
                        </IonAccordion>
                    ))}
                </IonAccordionGroup>
            )}
        </IonContent>
    );
};
export default Log;
