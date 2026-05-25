import Modal from '@/components/ui/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TEditTwitchAppForm, editTwitchAppSchema } from './edit-twitch-app.scheme';
import FormInput from '@/components/ui/FormInput';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import { TwitchAppStatus } from '@/lib/constants/twitch-app-status';
import useEditAppMutation from '@/hooks/mutations/twitch-apps/useEditAppMutation';
import useGetTwitchAppQuery from '@/hooks/queries/twitch/useGetTwitchAppQuery';
import Button from '@/components/ui/buttons/Button';
import { IEditTwitchAppModalProps } from './EditTwitchAppModal';
import TwitchAppTypeOption from '../TwitchAppTypeOption';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const EditTwitchAppModal = ({ appId, ...props }: IEditTwitchAppModalProps) => {
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const editTwitchAppMutation = useEditAppMutation();
  const { data: selectedApp, isLoading, } = useGetTwitchAppQuery(appId ?? '', !!appId && props.isOpen);
  const methods = useForm<TEditTwitchAppForm>({
    resolver: zodResolver(editTwitchAppSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: TwitchAppStatus.Active,
    },
  });

  const submitHandler = ({ type, ...data}: TEditTwitchAppForm) => {
    if (!appId) {
      return;
    }
    editTwitchAppMutation.mutate({
      appId,
      ...data,
    });
  };

  useEffect(() => {
    if (!props.isOpen) {
      editTwitchAppMutation.reset();
      methods.reset();
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (selectedApp) {
      methods.reset({
        name: selectedApp.name,
        // type: selectedApp.type,
      });
    }
  }, [selectedApp]);

  return (
    <Modal
      {...props}
      isLoading={editTwitchAppMutation.isPending || isLoading}
    >
      <Modal.ModalHeader
        category={'Integration · Twitch'}
        title={'Edit Twitch App'}
        description={'Change credentials based on your Twitch Developer Console.'}
      />
      <FormProvider {...methods}>
        <Modal.ModalBody>
          <FormInput<TEditTwitchAppForm>
            name={'name'}
            label={'Name'}
            required
            autoComplete={'app-name'}
            placeholder={'e.g. Xelar · Alerts'}
            hint={'Shown across the dashboard. Use a short, descriptive label.'}
            hideErrorMessage
          />
          <FormSelect<TEditTwitchAppForm, ISelectOption>
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
          <FormInput<TEditTwitchAppForm>
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
          <FormInput<TEditTwitchAppForm>
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
            disabled={!methods.formState.isValid || editTwitchAppMutation.isSuccess}
            isLoading={editTwitchAppMutation.isPending}
          >
            Save Changes
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
}

export default EditTwitchAppModal;
