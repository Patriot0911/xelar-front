import { FieldValues, Path } from 'react-hook-form';
import { IInputProps } from '@/components/ui/Input/Input';

export interface IFormInputProps<T extends FieldValues>
  extends Omit<IInputProps, 'name' | 'error' | 'touched'> {
  name: Path<T>;
}
