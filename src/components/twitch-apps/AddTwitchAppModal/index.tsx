'use client';

import { useState, useRef, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  LuPlus,
  LuTv,
  LuX,
  LuCopy,
  LuEye,
  LuEyeOff,
  LuRefreshCw,
  LuShield,
  LuChevronDown,
  LuZap,
  LuLock,
  LuCheck,
} from 'react-icons/lu';
import styles from './styles.module.scss';

type AppType = 'active' | 'internal' | 'locked';

const TYPE_OPTS: { key: AppType; title: string; desc: string; Icon: React.ElementType }[] = [
  { key: 'active',   title: 'Active',   desc: 'In the least-loaded pool', Icon: LuZap },
  { key: 'internal', title: 'Internal', desc: 'System use only',           Icon: LuShield },
  { key: 'locked',   title: 'Locked',   desc: 'Excluded from rotation',    Icon: LuLock },
];

interface TypeSelectProps {
  value: AppType;
  onChange: (v: AppType) => void;
}

function TypeSelect({ value, onChange }: TypeSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = TYPE_OPTS.find((o) => o.key === value)!;
  const CurI = current.Icon;

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  return (
    <div className={styles.typeSelectWrap} ref={wrapRef}>
      <div
        className={`${styles.typeSelect} ${open ? styles.open : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
        <span className={`${styles.typeIcMark} ${styles[current.key]}`}>
          <CurI size={14} />
        </span>
        <div className={styles.typeSelectText}>
          <span className={styles.typeSelectName}>{current.title}</span>
          <span className={styles.typeSelectDesc}>{current.desc}</span>
        </div>
        <LuChevronDown size={15} className={`${styles.typeChev} ${open ? styles.flipped : ''}`} />
      </div>

      {open && (
        <div className={styles.typeMenu} onMouseDown={(e) => e.stopPropagation()}>
          {TYPE_OPTS.map((o) => {
            const I = o.Icon;
            return (
              <button
                key={o.key}
                type="button"
                className={`${styles.typeMenuItem} ${o.key === value ? styles.selected : ''}`}
                onClick={() => { onChange(o.key); setOpen(false); }}
              >
                <span className={`${styles.typeMenuIc} ${styles[o.key]}`}><I /></span>
                <span>
                  <span className={styles.typeMenuItemName}>{o.title}</span>
                  <span className={styles.typeMenuItemDesc}>{o.desc}</span>
                </span>
                <span className={`${styles.typeMenuCheck} ${o.key === value ? styles.visible : ''}`}>
                  <LuCheck size={13} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AddTwitchAppModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AppType>('active');
  const [showSecret, setShowSecret] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button type="button" className={styles.btnPrimary}>
          <LuPlus size={14} />
          Add App
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.veil} />
        <DialogPrimitive.Content
          className={styles.modal}
          aria-describedby={undefined}
        >
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerMark}><LuTv size={20} /></div>
            <div className={styles.headerMeta}>
              <div className={styles.headerEyebrow}>Integration · Twitch</div>
              <DialogPrimitive.Title className={styles.headerTitle}>
                Add Twitch App
              </DialogPrimitive.Title>
              <p className={styles.headerSub}>
                Paste credentials from your Twitch Developer Console. Xelar uses them to route
                EventSub webhooks into your bridges.
              </p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <LuX size={16} />
            </button>
          </header>

          {/* Body */}
          <div className={styles.body}>
            {/* Name */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Name</div>
              <div className={styles.fieldInput}>
                <input placeholder="e.g. Xelar · Alerts" />
              </div>
              <span className={styles.fieldHint}>
                Shown across the dashboard. Use a short, descriptive label.
              </span>
            </div>

            {/* Type */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Type</div>
              <TypeSelect value={type} onChange={setType} />
              <span className={styles.fieldHint}>
                {type === 'active'   && <><strong>Active</strong> — Xelar can assign new channels to this app when it has the least load.</>}
                {type === 'internal' && <><strong>Internal</strong> — reserved for Xelar's own integrations and never offered to the pool.</>}
                {type === 'locked'   && <><strong>Locked</strong> — kept registered but excluded from rotation. Useful while migrating.</>}
              </span>
            </div>

            {/* Client ID */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Client ID</div>
              <div className={styles.fieldInput}>
                <input placeholder="Paste from Twitch Dev Console" />
                <button type="button" className={styles.fieldIcoBtn} aria-label="Copy">
                  <LuCopy size={13} />
                </button>
              </div>
              <span className={styles.fieldHint}>
                From your Twitch app · <code>Manage</code> · <code>Client ID</code>
              </span>
            </div>

            {/* Client Secret */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Client Secret</div>
              <div className={styles.fieldInput}>
                <input
                  type={showSecret ? 'text' : 'password'}
                  placeholder="Paste client secret"
                />
                <button
                  type="button"
                  className={styles.fieldIcoBtn}
                  aria-label={showSecret ? 'Hide' : 'Show'}
                  onClick={() => setShowSecret((v) => !v)}
                >
                  {showSecret ? <LuEyeOff size={13} /> : <LuEye size={13} />}
                </button>
              </div>
              <span className={styles.fieldHint}>
                Stored encrypted at rest. Only visible here once after creation.
              </span>
            </div>

            {/* Webhook Secret */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                Webhook secret
                <span className={styles.fieldOpt}>Optional</span>
              </div>
              <div className={styles.fieldInput}>
                <span className={styles.fieldPre}>whsec_</span>
                <input placeholder="auto-generated if left blank" />
                <button type="button" className={styles.fieldIcoBtn} aria-label="Regenerate">
                  <LuRefreshCw size={13} />
                </button>
              </div>
              <span className={styles.fieldHint}>
                Used to verify EventSub callbacks. Leave blank and we'll generate a strong one.
              </span>
            </div>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span className={styles.secureNote}>
              <LuShield size={12} /> End-to-end encrypted · scoped to org/main
            </span>
            <button type="button" className={styles.btnGhost} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className={styles.btnPrimary}>
              Add app →
            </button>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
