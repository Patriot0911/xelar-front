'use client';

import Button from '@/components/ui/buttons/Button';
import { LuPlus } from 'react-icons/lu';
import { useState } from 'react';
import CreateRoleModal from '../CreateRoleModal';

const AddRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus size={16} />
        New Role
      </Button>
      <CreateRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddRole;
