import Modal from '@/components/ui/Modal';
import { IConfirmModalProps } from './ConfirmModal';
import Button from '@/components/ui/buttons/Button';

const ConfirmModal = ({
  title,
  description,
  onCancel,
  onConfirm,
  ...props
}: IConfirmModalProps) => {
  return (
    <Modal
      {...props}
    >
      <Modal.ModalHeader
        category={'Confirmation'}
        title={title}
        description={description}
      />
      <Modal.ModalFooter>
        <Button type='submit' variant='secondary' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type='submit'
          onClick={onConfirm}
          isLoading={props.isLoading}
        >
          Confirm
        </Button>
      </Modal.ModalFooter>
    </Modal>
  )
}

export default ConfirmModal;
