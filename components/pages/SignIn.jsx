import {
    IonContent,
    IonPage,
    IonText,
    IonInput,
    IonButton,
    IonCheckbox,
    IonItem,
    IonLabel,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
} from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import { useForm, Controller } from 'react-hook-form';
import { createAsyncAction, errorResult, successResult } from 'pullstate';
import Users from '../../api/user.api.js';
import { signInWithEmailAndPassword } from '../../store/authStore';
import { useToast } from '../useToast.tsx';

const SignIn = ({history}) => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        control,
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });
    const fields = [
        {
            label: 'email',
            required: true,
            requiredOptions: {
                maxLength: 100,
            },
            props: {
                name: 'email',
                type: 'email',
                inputmode: 'text',
                placeholder: 'Enter a valid email address',
            },
        },
        {
            label: 'password',
            required: true,
            requiredOptions: {
                minLength: 8,
                maxLength: 100,
            },
            props: {
                name: 'password',
                type: 'password',
                inputmode: 'text',
                placeholder: 'Enter a password',
            },
        },
    ];

    const signUserIn = async (data) => {
        const result = await signInWithEmailAndPassword.run(data);
        if (result.error) {
            toast.error(result.message);
            return;
        }
        history.push('/tabs/feed');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Sign In</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form className="max-w-xl mx-auto my-4" onSubmit={handleSubmit(signUserIn)}>
                    {fields.map((field, index) => {
                        const { label, required, requiredOptions, props } = field;

                        return (
                            <IonItem key={`form_field_${index}`} lines="full">
                                <>
                                    <IonLabel position="stacked">
                                        <div className="flex items-center">
                                            {label}
                                            {errors[props.name] && (
                                                <IonIcon
                                                    className="pl-1"
                                                    icon={alertCircleOutline}
                                                    color="danger"
                                                    slot="end"
                                                />
                                            )}
                                        </div>
                                    </IonLabel>
                                    <IonInput
                                        {...props}
                                        {...register(props.name, {
                                            required: required,
                                            ...requiredOptions,
                                        })}
                                    />
                                    {errors[props.name] && errors[props.name].type === 'required' && (
                                        <IonText color="danger">
                                            <p className="ion-padding-start">
                                                This field is required
                                            </p>
                                        </IonText>
                                    )}
                                    {errors[props.name] && errors[props.name].type === 'maxLength' && (
                                        <IonText color="danger">
                                            <p className="ion-padding-start">
                                                This field is too long
                                            </p>
                                        </IonText>
                                    )}
                                    {errors[props.name] && errors[props.name].type === 'minLength' && (
                                        <IonText color="danger">
                                            <p className="ion-padding-start">
                                                This field must be at least{' '}
                                                {requiredOptions.minLength} characters
                                            </p>
                                        </IonText>
                                    )}
                                    {errors[props.name] && errors[props.name].type === 'pattern' && (
                                        <IonText color="danger">
                                            <p className="ion-padding-start">
                                                This field is invalid
                                            </p>
                                        </IonText>
                                    )}
                                </>
                            </IonItem>
                        );
                    })}
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Sign In
                    </IonButton>
                    <IonItem lines="none" className="ion-margin-top">
                    <IonLabel>
                        <p className="text-center">
                            Don't have an account?{' '}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => history.push('/register')}
                            >
                                Create one.
                            </span>
                        </p>
                    </IonLabel>
                </IonItem>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default SignIn;
