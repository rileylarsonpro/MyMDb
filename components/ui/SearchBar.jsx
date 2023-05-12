import React, { useState, useEffect } from 'react';
import { IonItem, IonList, IonSearchbar, IonLabel, IonThumbnail, IonImg, IonIcon } from '@ionic/react';
import { tvOutline, happyOutline, ticketOutline } from 'ionicons/icons';

import { searchMulti } from '../../store/mediaStore'


const SearchBar = ({onSelect, placeholder = "Search", clearOnSelect = true}) => {
  const [finished, result, updating] = searchMulti.useWatch({cacheBreakEnabled: true, ssr: false}); 
  let [results, setResults] = useState([]);
  const handleChange = async (ev) => {
    if(!ev.target.value) {
      setResults([]);
      return;
    }
    const query = ev.target.value;
    let res = await searchMulti.run({query});
    if (res.payload?.length > 0) setResults(res.payload);
  }

  const selectAndClear = (result) => {
    onSelect(result);
    if (clearOnSelect) {
      setResults([]);
    }
  }

  return (
    <>
      <IonSearchbar placeholder={placeholder} debounce={500} onIonChange={(ev) => handleChange(ev)}></IonSearchbar>

      <IonList>
        { results.map((result,index) => (
          <IonItem key={index} button detail={false} onclick={() => selectAndClear(result)}>
            <IonThumbnail className="h-24 w-16 my-1.5 mr-3">
              { result.poster_path ? 
              <IonImg src={`https://image.tmdb.org/t/p/w154${result.poster_path}`} alt=""/> : 
              result.profile_path ?
              <IonImg src={`https://image.tmdb.org/t/p/w154${result.profile_path}`} alt=""/> :
              <IonImg src="/img/no-poster.svg" alt=""/>}
            </IonThumbnail>
            <IonLabel>
              <h3>{ result.title ? result.title : result.name } {result.release_date ? `(${result.release_date.substring(0,4)})` : '' }</h3>
              <p>{ result.overview }</p>
              <p>{ result.known_for && result.known_for.length > 0 && result.known_for.map((item, i) => (
                <span key={i}>
                  <span key={i}>{item.title ? item.title : item.name} {item.release_date ? `(${item.release_date.substring(0,4)})` : '' }</span>
                  <span>{i < result.known_for.length - 1 ? ', ' : ''}</span>
                </span>
              ))}</p>
            </IonLabel>
            { result.media_type === 'movie' && <IonIcon icon={ticketOutline} slot="end" /> }
            { result.media_type === 'tv' && <IonIcon icon={tvOutline} slot="end" /> }
            { result.media_type === 'person' && <IonIcon icon={happyOutline} slot="end" /> }
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
export default SearchBar;