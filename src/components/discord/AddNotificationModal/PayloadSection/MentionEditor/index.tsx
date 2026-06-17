'use client';

import { useEffect, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { Path } from 'react-hook-form';
import useDiscordGuildRolesQuery from '@/hooks/queries/discord/useDiscordGuildRolesQuery';
import useDiscordGuildChannelsQuery from '@/hooks/queries/discord/useDiscordGuildChannelsQuery';
import { cn } from '@/lib/utils';
import type { TAddNotificationForm } from '../../add-notification.scheme';
import { buildContent, serialize, getCaretOffset, setCaretOffset, hasBlockNodes } from './mention-dom';
import styles from './styles.module.scss';

interface IMentionEditorProps {
  name: Path<TAddNotificationForm>;
  label: string;
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  rows?: number;
  guildId?: string;
  hideErrorMessage?: boolean;
}

const MentionEditor = ({
  name,
  label,
  placeholder,
  hint,
  maxLength,
  rows = 3,
  guildId,
  hideErrorMessage,
}: IMentionEditorProps) => {
  const { control, formState: { isSubmitted } } = useFormContext<TAddNotificationForm>();
  const {
    field,
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });

  const { data: roles = [] }    = useDiscordGuildRolesQuery(guildId);
  const { data: channels = [] } = useDiscordGuildChannelsQuery(guildId);

  const editorRef       = useRef<HTMLDivElement>(null);
  const lastValueRef    = useRef<string>('');
  const lastRolesLenRef = useRef(-1);
  const lastChansLenRef = useRef(-1);

  const value = (field.value as string | undefined) ?? '';

  useEffect(() => {
    const root = editorRef.current;
    if (!root) return;

    const rolesChanged = roles.length    !== lastRolesLenRef.current;
    const chansChanged = channels.length !== lastChansLenRef.current;
    if (value === lastValueRef.current && !rolesChanged && !chansChanged) return;

    lastRolesLenRef.current = roles.length;
    lastChansLenRef.current = channels.length;

    const caret = root === document.activeElement ? getCaretOffset(root) : null;
    buildContent(root, value, roles, channels);
    lastValueRef.current = value;
    if (caret !== null) setCaretOffset(root, Math.min(caret, value.length));
  }, [value, roles, channels]);

  const commit = (root: HTMLDivElement) => {
    let caret = getCaretOffset(root);

    if (hasBlockNodes(root)) {
      const flattened = serialize(root);
      buildContent(root, flattened, roles, channels);
      setCaretOffset(root, Math.min(caret, flattened.length));
    }

    let raw = serialize(root);
    if (maxLength && raw.length > maxLength) {
      raw = raw.slice(0, maxLength);
      caret = Math.min(caret, maxLength);
    }

    lastValueRef.current = raw;
    field.onChange(raw);

    buildContent(root, raw, roles, channels);
    setCaretOffset(root, Math.min(caret, raw.length));
  };

  const handleInput = () => {
    const root = editorRef.current;
    if (!root) return;
    commit(root);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertText', false, '\n');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const hasValue = Boolean(value);
  const showTouched = (isDirty || isTouched) && !error && hasValue;
  const showError = error && (isSubmitted || isDirty || hasValue);

  return (
    <div className={styles.controller}>
      <div className={styles['label-wrapper']}>
        <label htmlFor={name}>{label}</label>
        <span className={styles['flag-optional']}>Optional</span>
      </div>
      <div
        className={cn(
          styles['controller-input'],
          showTouched && styles['controller-input__touched'],
          showError && styles['controller-input__error'],
        )}
      >
        <div
          ref={editorRef}
          id={name}
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          data-placeholder={placeholder}
          style={{ minHeight: `${rows * 1.5}em` }}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={field.onBlur}
        />
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
      {!hideErrorMessage && (
        <span className={styles['controller-error']} id={`${name}-error`}>
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default MentionEditor;
