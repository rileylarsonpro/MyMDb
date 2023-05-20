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

import {lockClosed} from 'ionicons/icons';

import { ListItemTypes } from '../../utils/constants.js';

import MoviePreview from '../ui/MoviePreview.jsx';

const FavoritesPreview = ({ list, listItems}) => {
    // turn to only first letters of words capitilzed and remove underscores
    function formatTitle(name) {
        return name
            .split('_')
            .join(' ');
    }
    return (
        <IonItem lines="full" detail="false" routerLink={`/tabs/lists/details/${list._id}`}>
            <div className="h-full w-full py-2">
                <div className="flex justify-center">
                    <div className="text-sm line-clamp-2 font-bold">{formatTitle(list.name)}</div>
                </div>
                <div className="flex justify-center">
                    {listItems.map((item, index) => {
                        switch (item.type) {
                            case ListItemTypes.MOVIE:
                                return <MoviePreview movie={item.movie} key={index} />;
                            case ListItemTypes.TV_SHOW:
                                return <MoviePreview movie={item.tvShow} key={index} />;
                            case ListItemTypes.PERSON:
                                return <MoviePreview movie={item.person} key={index} />;
                            default:
                                return <div>Unknown</div>;
                        }
                    })}
                </div>
            </div>
        </IonItem>
    );
};

export default FavoritesPreview;
