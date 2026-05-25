import Modal from '@/components/ui/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TTwitchAppForm, twitchAppSchema } from './twitch-app.scheme';
import FormInput from '@/components/ui/FormInput';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import { twitchAppStates, TwitchAppStatus } from '@/lib/constants/twitch-app-status';
import useCreateAppMutation from '@/hooks/mutations/twitch-apps/useCreateAppMutation';
import useEditAppMutation from '@/hooks/mutations/twitch-apps/useEditAppMutation';
import Button from '@/components/ui/buttons/Button';
import { ITwitchAppModalProps } from './TwitchAppModal';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const TwitchAppStatusMark = ({ val }: { val: string; }) => {
  const Mark = twitchAppStates[val].icon;
  return <Mark size={14} />;
}

const TwitchAppModal = ({ appId, ...props }: ITwitchAppModalProps) => {
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const methods = useForm<TTwitchAppForm>({
    resolver: zodResolver(twitchAppSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: TwitchAppStatus.Active,
    },
  });
  const createTwitchAppMutation = useCreateAppMutation();
  const editAppMutation = useEditAppMutation();

  const isPending = createTwitchAppMutation.isPending || editAppMutation.isPending;
  const isSuccess = createTwitchAppMutation.isSuccess || editAppMutation.isSuccess;

  const submitHandler = ({ type, ...data}: TTwitchAppForm) => {
    console.log({ data });
    if (appId) {
      return editAppMutation.mutate({
        appId,
        ...data
      });
    }
    createTwitchAppMutation.mutate(data);
  };

  useEffect(() => {
    if (!props.isOpen) {
      createTwitchAppMutation.reset();
      editAppMutation.reset();
      methods.reset();
    }
  }, [props.isOpen]);

  return (
    <Modal
      {...props}
      isLoading={isPending}
    >
      <Modal.ModalHeader></Modal.ModalHeader>
      <FormProvider {...methods}>
        <Modal.ModalBody>
          <FormInput<TTwitchAppForm>
            name={'name'}
            label={'Name'}
            required
            autoComplete={'app-name'}
            placeholder={'e.g. Xelar · Alerts'}
            hint={'Shown across the dashboard. Use a short, descriptive label.'}
            hideErrorMessage
          />
          <FormSelect<TTwitchAppForm, ISelectOption>
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
              {(item) => (
                <div className={styles['type-item']}>
                  <span className={`${styles['type-mark']} ${styles[item.value]}`}>
                    <TwitchAppStatusMark val={item.value} />
                  </span>
                  <div>
                    <span className={styles['name']}>{item.label}</span>
                    <span className={styles['desc']}>{twitchAppStates[item.value].description}</span>
                  </div>
                </div>
              )}
            </FormSelect.Selected>
            <FormSelect.Area>
              <FormSelect.Option>
                {(item) => (
                  <div className={styles['type-item']}>
                    <span className={`${styles['type-mark']} ${styles[item.value]}`}>
                      <TwitchAppStatusMark val={item.value} />
                    </span>
                    <div>
                      <span className={styles['name']}>{item.label}</span>
                      <span className={styles['desc']}>{twitchAppStates[item.value].description}</span>
                    </div>
                  </div>
                )}
              </FormSelect.Option>
            </FormSelect.Area>
          </FormSelect>
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
            type={showClientSecret ? 'text' : 'password'}
            autoComplete={'app-client-secret'}
            placeholder={'Paste client secret'}
            hint={'Stored encrypted at rest. Only visible here once after creation.'}
            icon={showClientSecret ? <LuEyeOff size={13} /> : <LuEye size={13} />}
            onIconClick={() => setShowClientSecret((state) => !state)}
            hideErrorMessage
          />
          <FormInput<TTwitchAppForm>
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
            disabled={!methods.formState.isValid || isSuccess}
            isLoading={isPending}
          >
            {appId ? 'Save Changes' : 'Create'}
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
}

export default TwitchAppModal;
