'use client';

import { FieldValues } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import EditValuesForm from './components/EditValuesForm';
import { IEditValuesModalProps } from './EditValuesModal';

/**
 * Generic "edit a few values" dialog. The caller describes the fields, the zod schema
 * and the initial values; the parsed values come back through `onSubmit`.
 * The form is remounted on every open, so it always starts from `defaultValues`.
 */
const EditValuesModal = <TForm extends FieldValues, TResult = TForm>({
  isOpen,
  onClose,
  category,
  title,
  description,
  isLoading,
  ...formProps
}: IEditValuesModalProps<TForm, TResult>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
      <Modal.ModalHeader category={category} title={title} description={description} />
      <EditValuesForm<TForm, TResult> {...formProps} isLoading={isLoading} onCancel={onClose} />
    </Modal>
  );
};

export default EditValuesModal;
