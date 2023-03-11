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
import { registerWithEmailAndPassword } from '../../store/authStore';
import { useToast } from '../useToast.tsx';

const Register = ({history}) => {
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

    const registerUser = async (data) => {
        const result = await registerWithEmailAndPassword.run(data);
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
                    <IonItem>
                        <>
                            <IonLabel
                                position={errors['acceptTerms'] ? 'stacked' : ''}
                                class="ion-text-wrap"
                            >
                                <div className="flex items-center">
                                    I agree to the terms and conditions and the privacy policy
                                    {errors['acceptTerms'] && (
                                        <IonIcon
                                            className="pl-1"
                                            icon={alertCircleOutline}
                                            color="danger"
                                            slot="end"
                                        />
                                    )}
                                </div>
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
                                    <p className="ion-padding-start">You must agree to the terms</p>
                                </IonText>
                            )}
                        </>
                    </IonItem>
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Register
                    </IonButton>
                    <IonItem lines="none" className="ion-margin-top">
                        <IonLabel>
                            <p className="text-center">
                                Already have an account?{' '}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => history.push('/sign-in')}
                                >
                                    Sign in.
                                </span>
                            </p>
                        </IonLabel>
                    </IonItem>
                </form>
                
            </IonContent>
        </IonPage>
    );
};

export default Register;
