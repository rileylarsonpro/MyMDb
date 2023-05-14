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
import Star from '../ui/Star';

const Poster = ({ 
    src = '/img/no-poster.svg', 
    wrapperClasses = '', 
    imageClasses = '', 
    ranked = false,
    index = 0, 
}) => {
    return (
        <IonThumbnail className={`h-24 w-16 relative my-1.5 mx-2 ${wrapperClasses}`}>
            {ranked && (
                <div className="absolute -top-[6px] -left-[6px] flex items-center justify-center w-5 h-5 bg-primary rounded-full text-background text-sm font-bold border border-background">
                    {index + 1}
                </div>
            )}
            <img
                className={`h-24 w-16 border-[0.5px] border-solid border-primary rounded-md ${imageClasses}`}
                src={src}
                alt=""
            />
        </IonThumbnail>
    );
};
export default Poster;
