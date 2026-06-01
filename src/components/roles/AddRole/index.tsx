'use client';

import Button from '@/components/ui/buttons/Button';
import { LuPlus } from 'react-icons/lu';

const AddRole = () => {
  return (
    <Button>
      <LuPlus size={16} />
      New Role
    </Button>
  );
};

export default AddRole;
