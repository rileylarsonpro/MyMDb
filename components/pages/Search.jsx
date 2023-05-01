import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

import SearchBar from '../ui/SearchBar.jsx';

const Search = (props) => {
  const onSelect = (result) => {
    props.history.push(`/tabs/search/details/${result.media_type}/${result.id}`);
  };
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SearchBar onSelect={onSelect}/>
      </IonContent>
    </IonPage>
  );
};

export default Search;
