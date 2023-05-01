import {
    IonImg,
} from '@ionic/react';

const Backdrop = ({ src }) => {
    return (
        <div className="relative h-[50vh] max-lg:h-[35vh]">
        <div className="absolute bg-gradient-to-t from-background h-[50vh] max-lg:h-[35vh] w-full"></div>
            <IonImg
                className="absolute top-0 left-0 h-[50vh] max-lg:h-[35vh] -z-10 w-full object-cover object-top"
                src={src}
                alt=""
            />
        </div>
    );
};

export default Backdrop;
