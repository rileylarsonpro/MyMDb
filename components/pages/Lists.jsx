// import Store from '../../store';
// import * as selectors from '../../store/selectors';

import { useState, useEffect, useMemo } from 'react';
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
  IonSegment,
  IonSegmentButton
} from '@ionic/react';

import Loading from '../ui/Loading';
import ListPreview from '../ui/ListPreview';
import { add } from 'ionicons/icons';

import {getUserLists} from '../../store/listStore';

const AllLists = ({ listType }) => {
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

  const filteredLists = useMemo(() => {
    if (listType === 'all') {
      return lists;
    }
    if (listType === 'public') {
      return lists.filter((list) => !list.isPrivate);
    }
    if (listType === 'private') {
      return lists.filter((list) => list.isPrivate);
    }
  }, [listType, lists]);


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
      {filteredLists.map((list, i) => (
        <ListPreview list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
  const [listType, setListType] = useState('all');
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
        <IonSegment value={listType} onIonChange={(e) => setListType(e.detail.value)}>
            <IonSegmentButton value="all">
                <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="public">
                <IonLabel>Public</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="private">
                <IonLabel>Private</IonLabel>
            </IonSegmentButton>
        </IonSegment>
        <IonList>
          <AllLists listType={listType}/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
