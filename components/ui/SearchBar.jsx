import React, { useState, useEffect } from 'react';
import { IonItem, IonList, IonSearchbar } from '@ionic/react';

import { searchMulti } from '../../store/mediaStore'


const SearchBar = ({}) => {
  const [finished, result, updating] = searchMulti.useWatch({cacheBreakEnabled: true, ssr: false}); 
  const data = [];
  let [results, setResults] = useState([...data]);

  const handleChange = async (ev) => {
    const query = ev.target.value;
    let res = await searchMulti.run({query});
    setResults(res.payload);
  }
  

  return (
    <>
      <IonSearchbar onIonChange={(ev) => handleChange(ev)}></IonSearchbar>

      <IonList>
        { results.map(result => (
          <IonItem key={result.id}>
            { result.title ? result.title : result.name } {result.release_date ? `(${result.release_date.substring(0,4)})` : '' }
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
export default SearchBar;