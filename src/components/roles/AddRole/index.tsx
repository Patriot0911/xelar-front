'use client';

import Button from '@/components/ui/buttons/Button';
import { LuPlus } from 'react-icons/lu';
import { useState } from 'react';
import CreateRoleModal from '../CreateRoleModal';

const AddRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button variant="neon" leftIcon={<LuPlus size={15} />} onClick={() => setIsModalOpen(true)}>
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
