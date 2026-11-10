import { DefaultValues, FieldValues, Path } from 'react-hook-form';
import { ZodType } from 'zod';
import { IModalBaseProps } from '@/components/ui/Modal/Modal';

export type EditValueFieldType = 'text' | 'number';

export interface IEditValueField<TForm extends FieldValues> {
  name: Path<TForm>;
  label: string;
  type?: EditValueFieldType;
  hint?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
};

/**
 * TForm   — raw values held by the inputs (what the user types).
 * TResult — values after the schema has parsed/transformed them; passed to `onSubmit`.
 */
export interface IEditValuesFormProps<TForm extends FieldValues, TResult = TForm> {
  fields: IEditValueField<TForm>[];
  schema: ZodType<TResult, TForm>;
  defaultValues: DefaultValues<TForm>;
  submitLabel?: string;
  isLoading?: boolean;
  onSubmit: (values: TResult) => void;
  onCancel: () => void;
};

export interface IEditValuesModalProps<TForm extends FieldValues, TResult = TForm>
  extends IModalBaseProps, Omit<IEditValuesFormProps<TForm, TResult>, 'onCancel'> {
  category: string;
  title: string;
  description?: string;
};
