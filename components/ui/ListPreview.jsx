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

const ListPreview = ({ list, ...props }) => {
    let remaining = list.listCount - list.listItems.length;
    return (
        <IonItem lines="full" detail="false" routerLink={`/tabs/lists/details/${list._id}`}>
            <div className="h-full w-full py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-sm line-clamp-2 font-bold">{list.name}</div>
                        {list.isPrivate && (
                            <div className="ml-2 mt-1">
                                <IonIcon icon={lockClosed} />
                            </div>
                        )}
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
