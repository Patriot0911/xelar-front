'use client';

import { LuPencil, LuTrash2 } from 'react-icons/lu';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/shadcn/table';
import { Button } from '@/components/ui/button';
import { ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import styles from './styles.module.scss';

interface TwitchAppsTableProps {
  apps: ITwitchAppShortModel[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <TableRow>
      {[1, 2, 3, 4].map((i) => (
        <TableCell key={i}>
          <div className={styles.skeleton} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function TwitchAppsTable({ apps, isLoading }: TwitchAppsTableProps) {
  return (
    <div className={styles.wrapper}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[96px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : (
            apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className={styles.nameCell}>{app.name}</TableCell>
                <TableCell>
                  <code className={styles.clientId}>{app.clientId}</code>
                </TableCell>
                <TableCell className={styles.date}>
                  {new Date(app.createdAt).toLocaleDateString('uk-UA')}
                </TableCell>
                <TableCell>
                  <div className={styles.actions}>
                    <Button variant="ghost" size="sm" aria-label="Edit">
                      <LuPencil size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Delete" className={styles.deleteBtn}>
                      <LuTrash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
