import { useState, useEffect } from 'react';
import { IonBadge, IonItem, IonIcon, IonButton, IonLabel, createGesture, Gesture } from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
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
                        {icon === 'on' ? (
                        <svg
                            aria-hidden="true"
                            className="w-8 h-9"
                            fill="currentColor"
                            stroke="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        ) : (
                        <svg
                            aria-hidden="true"
                            className="w-8 h-9"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        )}
                    </button>
                );
            })}
                { rating !== 0 && <button onClick={(e) => {e.stopPropagation(); setRating(0); setHover(0)}} className="flex justify-center"> <IonIcon color="primary" size="large" icon={closeOutline} /></button>}
            </div>
        </div>
    );
};

export default StartInput;
