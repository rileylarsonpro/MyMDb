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

import Poster from '../ui/Poster';
import { ListItemTypes } from '../../utils/constants.js';

const MoviePreview = ({ movie, ...props }) => (
    <div>
        <Poster src={`https://image.tmdb.org/t/p/w154${movie.poster}`} wrapperClasses="mx-1" />
    </div>
);

const ListPreview = ({ list, ...props }) => {
    let remaining = list.listCount - list.listItems.length;
    console.log('REMAINING', remaining);
    return (
        <IonItem lines="full" detail="false" routerLink={`/tabs/lists/details/${list._id}`}>
            <div className="h-full w-full py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-sm line-clamp-2">{list.name}</div>
                    </div>
                    <div className="text-primary text-right text-xs w-14 mr-2">{list.listCount} item{list.itemCount === 1 ? '' : 's'}</div>
                </div>
                <div className="flex">
                    {list.listItems.map((item, index) => {
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
                    {remaining > 0 && (
                        <div className="flex flex-col justify-center items-center my-1.5 mx-1 h-24 w-16 border-[0.5px] border-solid border-primary rounded-md text-sm">
                            <div>+ {remaining}</div>
                            <div>more</div>
                        </div>
                    )}
                </div>
                {list.description && (
                    <div className="ql-snow display-only line-clamp-3 overflow-auto text-xs">
                        <div className="ql-blank" data-gramm="false">
                            <p dangerouslySetInnerHTML={{ __html: list.description }}></p>
                        </div>
                    </div>
                )}
            </div>
        </IonItem>
    );
};

export default ListPreview;
