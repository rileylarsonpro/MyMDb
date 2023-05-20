import React, { useState, useEffect, useMemo } from 'react';
import { IonItem, IonList, IonSearchbar, IonLabel, IonThumbnail, IonImg, IonIcon } from '@ionic/react';
import { tvOutline, happyOutline, ticketOutline } from 'ionicons/icons';

import { searchMulti } from '../../store/mediaStore'
import Poster from '../ui/Poster';

const SearchBar = ({onSelect, placeholder = "Search", clearOnSelect = true, itemType = 'multi'}) => {
  const [finished, result, updating] = searchMulti.useWatch({cacheBreakEnabled: true, ssr: false}); 
  let [results, setResults] = useState([]);
  let [searching, setSearching] = useState(false);
  const handleChange = async (ev) => {
    if(!ev.target.value) {
      setResults([]);
      return;
    }
    const query = ev.target.value;
    setSearching(true);
    let res = await searchMulti.run({query, itemType});
    if (res.payload?.length > 0) setResults(res.payload);
  }

  const selectAndClear = (result) => {
    if(!result.media_type) {
      result.media_type = itemType;
    }
    onSelect(result);
    setSearching(false);
    if (clearOnSelect) {
      setResults([]);
    }
  }
  // function that checks if there is anything in the search bar 
  let searchBarIsEmpty = useMemo(() => {
    let searchBar = document.getElementById("search-bar");
    if (searchBar && searchBar.value === "") {
      return true;
    }
    return false;
  }, [results]);

  return (
    <>
      <IonSearchbar id="search-bar" placeholder={placeholder} debounce={500} onIonChange={(ev) => handleChange(ev)}></IonSearchbar>

      <IonList>
        {searching && results.length === 0 && !searchBarIsEmpty && (
          <div className="text-center p-3">
            No results found
          </div>
        )}
        { results.map((result,index) => (
          <IonItem key={index} button detail={false} onclick={() => selectAndClear(result)}>
            <Poster src={result.poster_path ? `https://image.tmdb.org/t/p/w154${result.poster_path}` :  result.profile_path ? `https://image.tmdb.org/t/p/w154${result.profile_path}` : '/img/no-poster.svg'} />
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