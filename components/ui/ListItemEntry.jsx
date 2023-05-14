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

const DefaultItem = ({ list, item, index, type, showStars = true, iconToUse }) => {
    return (
        <>
            <div>
                <Poster
                    src={`https://image.tmdb.org/t/p/w154${item.poster}`}
                    ranked={list.ranked}
                    index={index}
                />
            </div>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mr-2 mt-1">
                        <div className="text-primary flex items-center">
                            <div className="pr-1 mt-1">
                                {' '}
                                <IonIcon icon={iconToUse} />{' '}
                            </div>
                            <div> {type}</div>
                        </div>
                    </div>
                    <div className="text-sm line-clamp-2">{item.name}</div>
                </div>
                {/*TODO: rating out of 10*/}
                {showStars && (
                    <div className="flex items-center text-primary">
                        <Star filled="true" classes="h-5 w-5 mr-1" /> 5
                    </div>
                )}
            </div>
        </>
    );
};

const MovieItem = ({ list, item, index }) => {
    return (
        <DefaultItem list={list} item={item} type="Movie" index={index} iconToUse={ticketOutline} />
    );
};

const TvItem = ({ list, item, index }) => {
    return (
        <DefaultItem list={list} item={item} type="TV Show" index={index} iconToUse={tvOutline} />
    );
};

const PersonItem = ({ list, item, index }) => {
    return (
        <DefaultItem list={list} item={item} type="Person" index={index} iconToUse={happyOutline} showStars={false} />
    );
};

const ListItemEntry = (props) => {
    let { list, item, index, editing = false } = props;
    switch (item.type) {
        case ListItemTypes.MOVIE:
            return (
                <>
                    {!editing ? (
                        <IonItem
                            lines="full"
                            routerLink={`/tabs/lists/media/details/movie/${item.movie.tmdbMovieId}`}
                        >
                            <MovieItem list={list} item={item.movie} index={index} />
                        </IonItem>
                    ) : (
                        <MovieItem list={list} item={item.movie} index={index} />
                    )}
                </>
            );
        case ListItemTypes.TV_SHOW:
            return (
                <>
                    {!editing ? (
                        <IonItem
                            lines="full"
                            routerLink={`/tabs/lists/media/details/tv/${item.tvShow.tmdbShowId}`}
                        >
                            <TvItem list={list} item={item.tvShow} index={index} />
                        </IonItem>
                    ) : (
                        <TvItem list={list} item={item.tvShow} index={index} />
                    )}
                </>
            );
        case ListItemTypes.PERSON:
            return (
                <>
                    {!editing ? (
                        <IonItem
                            lines="full"
                            routerLink={`/tabs/lists/media/details/person/${item.person.tmdbPersonId}`}
                        >
                            <PersonItem list={list} item={item.person} index={index} />
                        </IonItem>
                    ) : (
                        <PersonItem list={list} item={item.person} index={index} />
                    )}
                </>
            );
        default:
            return <div>Unknown</div>;
    }
};
export default ListItemEntry;
