import React, { useState, useEffect } from 'react';
import {
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
} from '@ionic/react';

import LogForm from './LogForm.jsx';

import { logEpisode, logSeason, logShow, logMovie } from '../../store/logStore.js';
import { useToast } from '../useToast.tsx';

function getEpisodeString(episode) {
    return `S${episode.season_number}E${episode.episode_number}`;
}

const Log = ({ selectedType, selected, dismissModal }) => {
    const toast = useToast();
    const [logs, setLogs] = useState(() => {
        let map = new Map();
        if (selectedType !== 'episodes') return map;
        selected.forEach((episode) => {
            map.set(getEpisodeString(episode), {
                episode: episode.episode_number,
                season: episode.season_number,
                tmdbShowId: episode.show_id,
                id: getEpisodeString(episode),
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
    const [log, setLog] = useState(() => {
        let log = {
            dateWatched: new Date(),
            rating: 0,
            liked: false,
            reviewText: '',
            noteText: '',
            isPrivate: false,
            containsSpoilers: false,
            isRewatch: false,
            tags: [],
        };
        if (selectedType === 'episodes') return null;
        if (selectedType === 'season') {
            log.season = selected.season_number;
            log.tmdbShowId = selected.show_id;
            log.id = `S${selected.season_number}`;
        }
        if (selectedType === 'show') {
            log.tmdbShowId = selected.id;
            log.id = selected.id;
        }
        if (selectedType === 'movie') {
            log.tmdbMovieId = selected.id;
            log.id = selected.id;
        }
        return log;
    });

    async function submit() {
        if (selectedType === 'episodes') {
            let logArray = [];
            for (const [key, value] of logs.entries()) {
                value.episode = logArray.push(logEpisode.run(value));
            }
            await Promise.all(logArray);
            toast.success(`${logArray.length} episode${logArray.length !== 1 && 's'} logged successfully`);
        }
        if (selectedType === 'season') {
            await logSeason.run(log);
            toast.success(`Season ${log.season} logged successfully`);
        }
        if (selectedType === 'show') {
            await logShow.run(log);
            toast.success(`Show logged successfully`);
        }
        if (selectedType === 'movie') {
            await logMovie.run(log);
            toast.success(`Movie logged successfully`);
        }
        dismissModal(true);
    }
    function handleChange(log) {
        if (selectedType === 'episodes') {
            let prevLog = logs.get(log.id);
            log = { ...prevLog, ...log };
            setLogs(new Map(logs.set(log.id, log)));
            return
        }
        setLog(prevLog => ({ ...prevLog, ...log }));
    }
    function accordionChanged(episode) {
        // scroll to top of accordion
        setTimeout(() => {
            let accordion = document.getElementById('accordion-' + episode);
            let header = accordion.querySelector(`#header-${episode}`);
            header.scrollIntoView({ behavior: 'smooth' });
        }, 310);
    }
    return (
        <div>
            {selectedType === 'episodes' && selected.length > 0 && (
                <div className="pb-80">
                    <IonAccordionGroup multiple={true}>
                        {selected.map((episode, index) => {
                            let episodeString = getEpisodeString(episode);
                            return (
                                <IonAccordion key={index} id={'accordion-' + episodeString}>
                                    <IonItem
                                        slot="header"
                                        onClick={() => accordionChanged(episodeString)}
                                        id={`header-${episodeString}`}
                                    >
                                        <IonLabel>
                                            {episodeString} {episode.name}
                                        </IonLabel>
                                    </IonItem>
                                    <IonList slot="content" className="mb-4">
                                        <LogForm
                                            {...logs.get(episodeString)}
                                            handleChange={handleChange}
                                        />
                                    </IonList>
                                </IonAccordion>
                            );
                        })}
                    </IonAccordionGroup>
                    <IonButton expand="block" className="mt-4" onClick={() => submit()}>
                        Save {selected.length} episode{selected.length !== 1 && 's'}
                    </IonButton>
                </div>
            )}
            {selectedType === 'season' && (
                <div className="pb-80">
                    <IonItem>
                        <IonLabel className="text-center">
                            Logging {selected.name}
                        </IonLabel>
                    </IonItem>
                    <LogForm
                        {...log}
                        handleChange={handleChange}
                    />
                    <IonButton expand="block" className="mt-4" onClick={() => submit()}>
                        Save
                    </IonButton>
                </div>
            )}
            { (selectedType === 'show' || selectedType === 'movie') && (
                <div className="pb-80">
                    <LogForm
                        {...log}
                        handleChange={handleChange}
                    />
                    <IonButton expand="block" className="mt-4" onClick={() => submit()}>
                        Save
                    </IonButton>
                </div>
            )}

        </div>
    );
};
export default Log;
