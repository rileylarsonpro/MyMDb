import Store from '../../store';
import * as selectors from '../../store/selectors';

import { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';

import Loading from '../ui/Loading';
import ListPreview from '../ui/ListPreview';
import { add } from 'ionicons/icons';

import {getUserLists} from '../../store/listStore';

const AllLists = ({ onSelect }) => {
  //const lists = Store.useState(selectors.getLists); // how to get lists from store?
  const [started, finished, result, updating] = getUserLists.useWatch();
  const [lists, setLists] = useState([]);
  useEffect(() => {
      async function profileInit() {
          let response = await getUserLists.run();
          if (response.payload) {
              setLists(response.payload);
          }
      }
      profileInit();
  }, []);

  useEffect(() => {
    if (finished && result.payload) {
        setLists(result.payload);
    }
  }, [finished]);

  if (!finished) {
    return <Loading />;
  }

  return (
    <>
      {lists.map((list, i) => (
        <ListPreview list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/tabs/lists/new">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AllLists />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
