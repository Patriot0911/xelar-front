import Modal from '@/components/ui/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TCreateTwitchAppForm, createTwitchAppSchema } from './create-twitch-app.scheme';
import FormInput from '@/components/ui/FormInput';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import { TwitchAppStatus } from '@/lib/constants/twitch-app-status';
import useCreateAppMutation from '@/hooks/mutations/twitch-apps/useCreateAppMutation';
import Button from '@/components/ui/buttons/Button';
import { ICreateTwitchAppModalProps } from './TwitchAppModal';
import TwitchAppTypeOption from '../TwitchAppTypeOption';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const CreateTwitchAppModal = (props: ICreateTwitchAppModalProps) => {
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const createTwitchAppMutation = useCreateAppMutation();
  const methods = useForm<TCreateTwitchAppForm>({
    resolver: zodResolver(createTwitchAppSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: TwitchAppStatus.Active,
    },
  });

  const submitHandler = ({ type, ...data}: TCreateTwitchAppForm) => {
    createTwitchAppMutation.mutate(data);
  };

  useEffect(() => {
    if (!props.isOpen) {
      createTwitchAppMutation.reset();
      methods.reset();
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (createTwitchAppMutation.isSuccess) {
      props.onClose();
    }
  }, [createTwitchAppMutation.isSuccess])

  return (
    <Modal
      {...props}
      isLoading={createTwitchAppMutation.isPending}
    >
      <Modal.ModalHeader
        category={'Integration · Twitch'}
        title={'Add Twitch App'}
        description={'Paste credentials from your Twitch Developer Console. Xelar uses them to route. EventSub webhooks into your bridges.'}
      />
      <FormProvider {...methods}>
        <Modal.ModalBody>
          <FormInput<TCreateTwitchAppForm>
            name={'name'}
            label={'Name'}
            required
            autoComplete={'app-name'}
            placeholder={'e.g. Xelar · Alerts'}
            hint={'Shown across the dashboard. Use a short, descriptive label.'}
            hideErrorMessage
          />
          <FormSelect<TCreateTwitchAppForm, ISelectOption>
            name={'type'}
            label={'Type'}
            hideErrorMessage
            required
            hint={'Determines the client`s accessibility to various formats of use in the system'}
            options={
              Object.entries(TwitchAppStatus).map(
                ([k, val]) => ({
                  value: val,
                  label: k,
                })
              )
            }
          >
            <FormSelect.Selected>
              {(item) => <TwitchAppTypeOption item={item} />}
            </FormSelect.Selected>
            <FormSelect.Area>
              <FormSelect.Option>
                {(item) => <TwitchAppTypeOption item={item} />}
              </FormSelect.Option>
            </FormSelect.Area>
          </FormSelect>
          <FormInput<TCreateTwitchAppForm>
            name={'clientId'}
            label={'Client ID'}
            required
            autoComplete={'app-client-id'}
            placeholder={'Paste from Twitch Dev Console'}
            hint={'From your Twitch app · Manage · Client ID.'}
            hideErrorMessage
          />
          <FormInput<TCreateTwitchAppForm>
            name={'clientSecret'}
            label={'Client Secret'}
            required
            type={showClientSecret ? 'text' : 'password'}
            autoComplete={'app-client-secret'}
            placeholder={'Paste client secret'}
            hint={'Stored encrypted at rest. Only visible here once after creation.'}
            icon={showClientSecret ? <LuEyeOff size={13} /> : <LuEye size={13} />}
            onIconClick={() => setShowClientSecret((state) => !state)}
            hideErrorMessage
          />
          <FormInput<TCreateTwitchAppForm>
            name={'webhookSecret'}
            label={'Webhook Secret'}
            type={showWebhookSecret ? 'text' : 'password'}
            autoComplete={'app-client-secret'}
            placeholder={'Auto-generated if left blank'}
            hint={'Used to verify EventSub callbacks. Leave blank and we`ll generate a strong one.'}
            icon={showWebhookSecret ? <LuEyeOff size={13} /> : <LuEye size={13} />}
            onIconClick={() => setShowWebhookSecret((state) => !state)}
            hideErrorMessage
          />
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button type='submit' variant='secondary' className={styles.btnPrimary} onClick={methods.handleSubmit(submitHandler)}>
            Cancel
          </Button>
          <Button
            type='submit'
            className={styles.btnPrimary}
            onClick={methods.handleSubmit(submitHandler)}
            disabled={!methods.formState.isValid || createTwitchAppMutation.isSuccess}
            isLoading={createTwitchAppMutation.isPending}
          >
            Create
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
}

export default CreateTwitchAppModal;
