'use client';

import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import useUpdateUserBalanceMutation from '@/hooks/mutations/users/useUpdateUserBalanceMutation';
import IconButton from '@/components/ui/buttons/IconButton';
import EditValuesModal from '@/components/common/EditValuesModal';
import { IEditValueField } from '@/components/common/EditValuesModal/EditValuesModal';
import { USER_BALANCE_MAX } from '@/lib/constants/users';
import UserInfoItem from '../UserInfoItem';
import { TUserBalanceForm, TUserBalanceValues, userBalanceSchema } from './user-balance.scheme';
import { IUserBalanceItemProps } from './UserBalanceItem';

import styles from './styles.module.scss';

const BALANCE_FIELDS: IEditValueField<TUserBalanceForm>[] = [
  {
    name: 'balance',
    label: 'Balance',
    type: 'number',
    min: 0,
    max: USER_BALANCE_MAX,
    step: 0.1,
    hint: `From 0 to ${USER_BALANCE_MAX} tokens`,
  },
];

const UserBalanceItem = ({ userId, balance }: IUserBalanceItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useUpdateUserBalanceMutation();
  const formatted = Number(balance).toFixed(1);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = ({ balance: next }: TUserBalanceValues) => {
    mutation.mutate({ userId, payload: { balance: next } }, { onSuccess: handleClose });
  };

  return (
    <>
      <UserInfoItem
        label="Balance"
        action={
          <IconButton
            icon={<LuPencil size={13} />}
            label="Edit balance"
            variant="accent"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <span className={styles.value}>
          {formatted}
          <span className={styles.unit}>tokens</span>
        </span>
      </UserInfoItem>

      <EditValuesModal<TUserBalanceForm, TUserBalanceValues>
        isOpen={isOpen}
        onClose={handleClose}
        category="Users · Balance"
        title="Edit balance"
        description="Set the exact token balance for this user."
        fields={BALANCE_FIELDS}
        schema={userBalanceSchema}
        defaultValues={{ balance: formatted }}
        isLoading={mutation.isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default UserBalanceItem;
