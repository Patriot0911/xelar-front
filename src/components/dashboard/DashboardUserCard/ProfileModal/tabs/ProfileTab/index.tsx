'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/buttons/Button';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import useUpdateProfileMutation from '@/hooks/mutations/auth/useUpdateProfileMutation';
import { IUpdateProfilePayload } from '@/lib/models/auth';
import { profileTabSchema, TProfileTabForm } from './profile-tab.scheme';
import styles from './styles.module.scss';

const ProfileTab = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { data: meData } = useMeQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const methods = useForm<TProfileTabForm>({
    resolver: zodResolver(profileTabSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      displayName: meData?.displayName ?? '',
      oldPassword: '',
      newPassword: '',
    },
  });

  const submitHandler = (data: TProfileTabForm) => {
    const payload: IUpdateProfilePayload = {};
    if (data.displayName) payload.displayName = data.displayName;
    if (data.newPassword) {
      payload.newPassword = data.newPassword;
      payload.oldPassword = data.oldPassword;
    }
    updateProfileMutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.body}>
        <FormInput<TProfileTabForm>
          name="displayName"
          label="Display Name"
          placeholder={meData?.displayName ?? 'Your display name'}
          hint="Shown across the dashboard and to other users."
          hideErrorMessage
        />
        <FormInput<TProfileTabForm>
          name="oldPassword"
          label="Current Password"
          type={showOldPassword ? 'text' : 'password'}
          placeholder="Enter current password"
          icon={showOldPassword ? <LuEyeOff size={13} /> : <LuEye size={13} />}
          onIconClick={() => setShowOldPassword((s) => !s)}
          hint="Required only when changing your password."
          hideErrorMessage
        />
        <FormInput<TProfileTabForm>
          name="newPassword"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          icon={showNewPassword ? <LuEyeOff size={13} /> : <LuEye size={13} />}
          onIconClick={() => setShowNewPassword((s) => !s)}
          hint="Minimum 8 characters."
          hideErrorMessage
        />
      </div>
      <footer className={styles.footer}>
        <Button
          onClick={methods.handleSubmit(submitHandler)}
          isLoading={updateProfileMutation.isPending}
          disabled={updateProfileMutation.isPending || updateProfileMutation.isSuccess}
        >
          Save Changes
        </Button>
      </footer>
    </FormProvider>
  );
};

export default ProfileTab;
