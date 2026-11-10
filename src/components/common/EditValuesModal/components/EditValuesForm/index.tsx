'use client';

import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/buttons/Button';
import { IEditValuesFormProps } from '../../EditValuesModal';

const EditValuesForm = <TForm extends FieldValues, TResult = TForm>({
  fields,
  schema,
  defaultValues,
  submitLabel = 'Save',
  isLoading,
  onSubmit,
  onCancel,
}: IEditValuesFormProps<TForm, TResult>) => {
  const methods = useForm<TForm, unknown, TResult>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, formState } = methods;
  const submit = handleSubmit((values) => onSubmit(values));

  return (
    <FormProvider {...methods}>
      <Modal.ModalBody onSubmit={submit} noValidate>
        {fields.map(({ name, label, type = 'text', hint, placeholder, min, max, step }, index) => (
          <FormInput<TForm>
            key={name}
            name={name}
            label={label}
            type={type}
            inputMode={type === 'number' ? 'decimal' : undefined}
            hint={hint}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            autoFocus={index === 0}
            required
          />
        ))}
        {/* Lets Enter submit the form; the visible submit button lives in the footer. */}
        <button type="submit" hidden aria-hidden tabIndex={-1} />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button
          onClick={submit}
          isLoading={isLoading}
          disabled={!formState.isValid || !formState.isDirty}
        >
          {submitLabel}
        </Button>
      </Modal.ModalFooter>
    </FormProvider>
  );
};

export default EditValuesForm;
