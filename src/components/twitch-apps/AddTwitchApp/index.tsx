'use client';

import Button from '@/components/ui/buttons/Button';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreateTwitchAppModal from '../CreateTwitchAppModal';

const AddTwitchApp = () => {
  const [isOpenAppModal, setIsOpenAppModal] = useState(false);
  return (
    <>
      <CreateTwitchAppModal
        isOpen={isOpenAppModal}
        onClose={() => setIsOpenAppModal(false)}
      />
      <Button onClick={() => setIsOpenAppModal(true)}>
        <LuPlus size={16} />
        Add App
      </Button>
    </>
  );
}

export default AddTwitchApp;
