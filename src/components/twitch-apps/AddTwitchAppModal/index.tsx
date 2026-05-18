'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/shadcn/dialog';
import styles from './styles.module.scss';

export function AddTwitchAppModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <LuPlus size={14} />
        Add App
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Twitch App</DialogTitle>
            <DialogDescription>
              Register a Twitch application. You will need your Client ID and Client Secret from the
              Twitch Developer Console.
            </DialogDescription>
          </DialogHeader>

          <div className={styles.body}>
            <p className={styles.placeholder}>Form coming soon.</p>
          </div>

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" disabled>
              Add App
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
