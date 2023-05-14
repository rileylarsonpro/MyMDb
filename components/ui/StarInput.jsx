import { useState, useEffect } from 'react';
import { IonBadge, IonItem, IonIcon, IonButton, IonLabel, createGesture, Gesture } from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
import Star from '../ui/Star.jsx';
const StartInput = ({id, onChange}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    useEffect(() => {
        let thing = document.getElementById(`star-${id}`);
        let gesture = createGesture({
            el: thing,
            gestureName: `star-${id}`,
            onStart: (e) => document.elementFromPoint(e.currentX, e.currentY).dispatchEvent(new MouseEvent('mouseover', {bubbles: true})),
            onMove: (e) => {
                let el = document.elementFromPoint(e.currentX, e.currentY);
                el.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}))
                el.dispatchEvent(new MouseEvent('click', {bubbles: true}))
            },
            onEnd: (e) => document.elementFromPoint(e.currentX, e.currentY).dispatchEvent(new MouseEvent('click', {bubbles: true}))
        });
        gesture.enable();

        return () => {
            gesture.destroy();
        }
    }, []);

    useEffect(() => {
        onChange(rating);
    }, [rating])
    return (
        <div id={`star-${id}`}>
            <IonLabel position="stacked"><span>{rating === 0 ? 'Not rated' : rating + ' / 10'}</span></IonLabel>
            <div className="flex items-center">
            {[...Array(10)].map((star, index) => {
                index += 1;
                let icon = index <= (hover || rating) ? 'on' : 'off';
                return (
                    <button
                        type="button"
                        key={index}
                        id={`${id}-${index}`}
                        className={`star-button ${icon}`}
                        onClick={() => {setRating(index)}}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                       
                    >
                        <Star filled={icon === 'on'} />
                    </button>
                );
            })}
                { rating !== 0 && <button onClick={(e) => {e.stopPropagation(); setRating(0); setHover(0)}} className="flex justify-center"> <IonIcon color="primary" size="large" icon={closeOutline} /></button>}
            </div>
        </div>
    );
};

export default StartInput;
