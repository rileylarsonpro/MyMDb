import {
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
    IonIcon,
    IonButton,
    IonButtons,
} from '@ionic/react';

import { ListItemTypes } from '../../utils/constants.js';
import { ticketOutline, tvOutline, happyOutline } from 'ionicons/icons';
import Star from '../ui/Star';
import Poster from '../ui/Poster';

const MovieItem = ({ list, item, index }) => {
    return (
        <IonItem
            lines="full"
            routerLink={`/tabs/lists/media/details/movie/${item.movie.tmdbMovieId}`}
        >
            <Poster
                src={`https://image.tmdb.org/t/p/w154${item.movie.poster}`}
                ranked={list.ranked}
                index={index}
            />
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mr-2 mt-1">
                        <div className="text-primary flex items-center">
                            <div className="pr-1 mt-1">
                                {' '}
                                <IonIcon icon={ticketOutline} />{' '}
                            </div>
                            <div> Movie</div>
                        </div>
                    </div>
                    <div className="text-sm line-clamp-2">{item.movie.name}</div>
                </div>
                {/*TODO: rating out of 10*/}
                <div className="flex items-center text-primary">
                    <Star filled="true" classes="h-5 w-5 mr-1" /> 5
                </div>
            </div>
        </IonItem>
    );
};

const TvItem = ({ list, item, index }) => {
    return (
        <IonItem lines="full" routerLink={`/tabs/lists/media/details/tv/${item.tvShow.tmdbShowId}`}>
            <Poster
                src={`https://image.tmdb.org/t/p/w154${item.tvShow.poster}`}
                ranked={list.ranked}
                index={index}
            />
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mr-2 mt-1">
                        <div className="text-primary flex items-center">
                            <div className="pr-1 mt-1">
                                {' '}
                                <IonIcon icon={tvOutline} />{' '}
                            </div>
                            <div> TV Show</div>
                        </div>
                    </div>
                    <div className="text-sm line-clamp-2">{item.tvShow.name}</div>
                </div>
                {/*TODO: rating out of 10*/}
                <div className="flex items-center text-primary">
                    <Star filled="true" classes="h-5 w-5 mr-1" /> 5
                </div>
            </div>
        </IonItem>
    );
};
const PersonItem = ({ list, item, index }) => {
    return (
        <IonItem
            lines="full"
            routerLink={`/tabs/lists/media/details/person/${item.person.tmdbPersonId}`}
        >
            <Poster
                src={`https://image.tmdb.org/t/p/w154${item.person.poster}`}
                ranked={list.ranked}
                index={index}
            />
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mr-2 mt-1">
                        <div className="text-primary flex items-center">
                            <div className="pr-1 mt-1">
                                {' '}
                                <IonIcon icon={happyOutline} />{' '}
                            </div>
                            <div> Person</div>
                        </div>
                    </div>
                    <div className="text-sm line-clamp-2">{item.person.name}</div>
                </div>
            </div>
        </IonItem>
    );
};

const ListItemEntry = (props) => {
    let { list, item, index } = props;
    switch (item.type) {
        case ListItemTypes.MOVIE:
            return <MovieItem {...props} />;
        case ListItemTypes.TV_SHOW:
            return <TvItem {...props} />;
        case ListItemTypes.PERSON:
            return <PersonItem {...props} />;
        default:
            return <div>Unknown</div>;
    }
};
export default ListItemEntry;
