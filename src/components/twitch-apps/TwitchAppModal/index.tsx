import Modal from '@/components/ui/Modal';
import { IModalBaseProps } from '@/components/ui/Modal/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TTwitchAppForm, twitchAppSchema } from './twitch-app.scheme';
import FormInput from '@/components/ui/FormInput';
import { useEffect } from 'react';

import styles from './styles.module.scss';

const TwitchAppModal = (props: IModalBaseProps) => {
  const methods = useForm<TTwitchAppForm>({
    resolver: zodResolver(twitchAppSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  // const loginMutation = useLoginMutation();

  const submitHandler = (data: TTwitchAppForm) => {
    console.log({ data });
    // loginMutation.mutate({
    //   email: data.email,
    //   password: data.password,
    // });
  };

  useEffect(() => {
    if (!props.isOpen) {
      // loginMutation.reset();
      methods.reset();
    }
  }, [props.isOpen]);

  return (
    <Modal
      {...props}
      // isLoading={loginMutation.isPending}
    >
      <Modal.ModalHeader></Modal.ModalHeader>
      <FormProvider {...methods}>
        <Modal.ModalBody onSubmit={methods.handleSubmit(submitHandler)}>
          <FormInput<TTwitchAppForm>
            name={'name'}
            label={'Name'}
            required
            autoComplete={'app-name'}
            placeholder={'e.g. Xelar · Alerts'}
            hint={'Shown across the dashboard. Use a short, descriptive label.'}
            hideErrorMessage
          />
          <FormInput<TTwitchAppForm>
            name={'clientId'}
            label={'Client ID'}
            required
            autoComplete={'app-client-id'}
            placeholder={'Paste from Twitch Dev Console'}
            hint={'From your Twitch app · Manage · Client ID.'}
            hideErrorMessage
          />
          <FormInput<TTwitchAppForm>
            name={'clientSecret'}
            label={'Client Secret'}
            required
            autoComplete={'app-client-secret'}
            placeholder={'Paste client secret'}
            hint={'Stored encrypted at rest. Only visible here once after creation.'}
            hideErrorMessage
          />
          <FormInput<TTwitchAppForm>
            name={'webhookSecret'}
            label={'Webhook Secret'}
            required
            autoComplete={'app-client-secret'}
            placeholder={'Auto-generated if left blank'}
            hint={'Used to verify EventSub callbacks. Leave blank and we`ll generate a strong one.'}
            hideErrorMessage
          />
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <button type="button" className={styles.btnGhost} onClick={props.onClose}>
            Cancel
          </button>
          <button type="button" className={styles.btnPrimary}>
            Add app
          </button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
}

export default TwitchAppModal;
