import React, { useState, useEffect, useRef } from 'react';
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
    IonPopover,
    IonDatetime,
    IonInput,
    IonChip
} from '@ionic/react';
import { closeOutline, heart, heartOutline, lockClosed, lockOpen, addCircleOutline, alertCircleOutline, eye, eyeOff, } from 'ionicons/icons';
import ReactQuill from 'react-quill';
import StarInput from '../ui/StarInput.jsx';

import { searchMulti } from '../../store/mediaStore';

const LogForm = ({
    episode,
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
    const [reviewExpanded, setReviewExpanded] = useState(false);
    const [noteText, setNoteText] = useState(initNoteText);
    const [noteExpanded, setNoteExpanded] = useState(false);
    const [tags, setTags] = useState(initTags);
    const [isPrivate, setIsPrivate] = useState(initIsPrivate);
    const [containsSpoilers, setContainsSpoilers] = useState(initContainsSpoilers);
    const [isRewatch, setIsRewatch] = useState(initIsRewatch);
    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
    const reviewModules = {
        toolbar: { container: `#toolbar-${episode}-review` },
    };
    const notesModules = {
        toolbar: { container: `#toolbar-${episode}-notes` },
    };
    const popover = useRef(null);
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
            dateWatched: dateWatched,
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
    }, [dateWatched, rating, liked, reviewText, noteText, isPrivate, containsSpoilers, isRewatch, tags]);

    function addTag (e) {
        e.stopPropagation();
        let tagName = e.target.value;
        setTags(prevTags => [...prevTags, {name: tagName}]);
        e.target.value = '';
    }
    function removeTag (index) {
        let newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    }

    return (
        <>
            <div className="mx-5 my-1">
                <div className="flex justify-between">
                    <div>
                        <div>
                        <IonLabel position="stacked">Date Watched</IonLabel>
                        </div>
                        <div className="flex items-center">
                            <button id={`${episode}-date`}><IonChip color="primary"><span className="w-56"> {dateWatched ? dateWatched.toDateString(): 'Add date'}</span></IonChip></button>
                            { dateWatched !== null && <button onClick={(e) => {e.stopPropagation(); setDateWatched(null);}} className="flex justify-center"> <IonIcon color="primary" size="large" icon={closeOutline} /></button>}
                        </div>
                        <IonPopover trigger={`${episode}-date`} triggerAction="click" size="cover">
                            <IonContent>
                                <IonDatetime value={dateWatched && dateWatched.toISOString()} onIonChange={(e) => setDateWatched(new Date(e.detail.value))} presentation="date"/>
                            </IonContent>
                        </IonPopover>
                    </div>

                    <div className="flex-col justify-center items-center">
                        <IonLabel position="stacked">Like</IonLabel>
                        <div className="pt-1"><IonIcon color="primary" size="large" role="button" icon={liked ? heart : heartOutline} onClick={() => setLiked(!liked)} /></div>
                    </div>
                </div>
                <StarInput episode={episode} onChange={setRating}/>
                <IonLabel position="stacked">Review</IonLabel>
                <ReactQuill
                    id={`review-${episode}`}
                    theme="snow"
                    value={reviewText}
                    onChange={setReviewText}
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
                <div className="pt-2">
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
                <div className="pt-2">
                    <IonLabel position="stacked">Add Tags</IonLabel>
                    <IonInput className="outline-input" placeholder="Write your tag and press enter" onKeyPress={ (e) => {e.key === 'Enter' && addTag(e)}}/>
                    <div className="flex flex-wrap pt-1">
                        {tags.map((tag, index) => (
                            <button onClick={() => removeTag(index)}>
                                <IonChip key={index} color="primary">
                                    <IonLabel>{tag.name}</IonLabel>
                                    <IonIcon color="primary" size="small" icon={closeOutline} />
                                </IonChip>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 pt-2">
                    <button className="flex-col justify-center items-center text-center" onClick={() => setIsPrivate(!isPrivate)} >
                        <IonLabel position="stacked">{isPrivate ? "Private" : "Public"}</IonLabel>
                        <div className="pt-1"><IonIcon color="primary" size="large" role="button" icon={isPrivate ? lockClosed : lockOpen} /></div>
                    </button>
                    <button className="flex-col justify-center items-center text-center" onClick={() => setContainsSpoilers(!containsSpoilers)}>
                        <IonLabel position="stacked">{containsSpoilers ? "Spoilers" : "No Spoilers"}</IonLabel>
                        <div className="pt-1"><IonIcon color="primary" size="large" role="button" icon={containsSpoilers ? alertCircleOutline : addCircleOutline}  /></div>
                    </button>
                    <button className="flex-col justify-center items-center text-center" onClick={() => setIsRewatch(!isRewatch)}>
                        <IonLabel position="stacked">{isRewatch ? "Rewatch" : "1st Watch"}</IonLabel>
                        <div className="pt-1"><IonIcon color="primary" size="large" role="button" icon={isRewatch ? eye : eyeOff}  /></div>
                    </button>
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
                dateWatched: new Date(),
                rating: 0,
                liked: false,
                reviewText: '',
                noteText: '',
                isPrivate: false,
                containsSpoilers: false,
                isRewatch: false,
                tags: [],
            });
        });
        return map;
    });
    console.log("logs", logs)
    function handleChange(log) {
        setLogs(new Map(logs.set(log.episode, log)));
    }
    function accordionChanged(episode) {
        // scroll to top of accordion
        setTimeout(() => {
            let accordion = document.getElementById('accordion-'+episode);
            let header = accordion.querySelector(`#header-${episode}`);
            header.scrollIntoView({behavior: 'smooth'}); 
        }, 310);
    }
    return (
        <IonContent>
            {selectedType === 'episodes' && selected.length > 0 && (
                <IonAccordionGroup multiple={true} className="pb-80">
                    {selected.map((episode, index) => (
                        <IonAccordion key={index} id={'accordion-'+ getEpisodeString(episode)}>
                            <IonItem slot="header" onClick={() => accordionChanged(getEpisodeString(episode))} id={`header-${getEpisodeString(episode)}`}>
                                <IonLabel >
                                    {getEpisodeString(episode)} {episode.name}
                                </IonLabel>
                            </IonItem>
                            <IonList slot="content" className="mb-10">
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
