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

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
            label: 'username',
            required: true,
            requiredOptions: {
                maxLength: 32,
            },
            props: {
                name: 'username',
                type: 'text',
                inputmode: 'text',
                placeholder: 'Enter a username',
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

    const registerUser = (data) => {
        console.log('creating a new user account with: ', data);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form className="max-w-xl mx-auto my-4" onSubmit={handleSubmit(registerUser)}>
                    {fields.map((field, index) => {
                        const { label, required, requiredOptions, props } = field;

                        return (
                            <IonItem key={`form_field_${index}`} lines="full">
                                <>
                                    <IonLabel position="stacked">{label}</IonLabel>
                                    <IonInput
                                        {...props}
                                        {...register(props.name, {
                                            required,
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
                                                This field must be at least {requiredOptions.minLength} characters
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
                                    {errors[props.name] && (
                                        <IonIcon icon={alertCircleOutline} color="danger" slot="end" />
                                    )}
                                </>
                            </IonItem>
                        );
                    })}
                    <IonItem lines="full">
                        <>
                            <IonLabel class="ion-text-wrap">
                                I agree to the terms and conditions and the privacy policy
                            </IonLabel>
                            <IonCheckbox
                                name="acceptTerms"
                                type="checkbox"
                                checked="false"
                                {...register('acceptTerms', { required: true })}
                                id="acceptTerms"
                                slot="end"
                            />
                            {errors['acceptTerms'] && (
                                    <IonText color="danger">
                                        <p className="ion-padding-start">
                                            This field is required
                                        </p>
                                    </IonText>
                                )}
                            {errors['acceptTerms'] && (
                                <IonIcon icon={alertCircleOutline} color="danger" slot="end" />
                            )}
                        </>
                    </IonItem>
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Register
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Register;
