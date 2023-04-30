import {
    IonImg,
    IonAvatar,
} from '@ionic/react';

const ProfilePicture = ({ sizeClasses, profilePicture, slot, imageKey }) => {
    return (
        <IonAvatar slot={slot} className={`${sizeClasses} border border-solid border-primary`}>
            {profilePicture === '' ? (
                <IonImg src="/img/no-poster.svg" alt="" />
            ) : (
                <IonImg
                    key={imageKey}
                    src={`${process.env.NEXT_PUBLIC_API_ORIGIN_NATIVE}/api/v1/user/file${profilePicture}`}
                    alt=""
                />
            )}
        </IonAvatar>
    );
};

export default ProfilePicture;
