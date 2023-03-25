import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonChip,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getDetails } from '../../store/mediaStore';
import { CreateAnimation, Animation } from '@ionic/react';

const Details = (props) => {
    const [details, setDetails] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { id, mediaType } = props.match.params;

    useEffect(() => {
        getDetails.run({ mediaType, id }).then((res) => {
            console.log(res.payload);
            setDetails(res.payload);
            setWindowWidth(window.innerWidth);
        });
    }, [id]);

    function getImageSize() {
        if (windowWidth > 768) {
            return 'original';
        } else if (windowWidth > 576) {
            return 'w1280';
        } else {
            return 'w780';
        }
    }
    function convertMinToReadableTime(min) {
        if (min < 60) return `${min}m`;
        let hours = Math.floor(min / 60);
        let minutes = min % 60;
        return `${hours}h ${minutes}m`;
    }

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                {details?.backdrop_path && (
                    <div className="relative h-[35vh]">
                        <div className="absolute bg-gradient-to-t from-background h-[35vh] w-full"></div>
                        <IonImg
                            className="absolute top-0 left-0  h-[35vh] -z-10 w-full object-cover object-top"
                            src={`https://image.tmdb.org/t/p/${getImageSize()}${details?.backdrop_path}`}
                            alt=""
                        />
                    </div>
                )}
                <h1 className="w-100 text-center mx-6 mt-6">{details?.title || details?.name}</h1>
                <IonGrid className="text-center">
                    <IonRow>
                        {details?.release_date && (
                            <IonCol>
                                <IonChip color="primary">
                                    {details?.release_date.substring(0, 4)}
                                </IonChip>
                            </IonCol>
                        )}
                        {details?.first_air_date && (
                            <IonCol>
                                <IonChip color="primary">
                                    {details?.first_air_date.substring(0, 4)}
                                </IonChip>
                            </IonCol>
                        )}
                        {details?.runtime && (
                            <IonCol>
                                <IonChip color="primary">
                                    {convertMinToReadableTime(details?.runtime)}
                                </IonChip>
                            </IonCol>
                        )}
                        {details?.number_of_seasons && (
                            <IonCol>
                                <IonChip color="primary">
                                    {details?.number_of_seasons} Seasons
                                </IonChip>
                            </IonCol>
                        )}
                        {details?.content_rating && (
                            <IonCol>
                                <IonChip color="primary">{details?.content_rating}</IonChip>
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Details;
