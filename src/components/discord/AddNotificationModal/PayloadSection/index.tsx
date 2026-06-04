'use client';

import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { Path } from 'react-hook-form';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import RoleMentionPicker from '../RoleMentionPicker';
import type { TAddNotificationForm } from '../add-notification.scheme';
import styles from './styles.module.scss';

const ColorField = () => {
  const { control, register } = useFormContext<TAddNotificationForm>();
  const { field: colorField }   = useController({ control, name: 'embedColor' });
  const { field: enabledField } = useController({ control, name: 'embedColorEnabled' });

  return (
    <div className={styles.colorField}>
      <div className={styles.colorLabelRow}>
        <span className={styles.colorLabelText}>Color</span>
        <label className={styles.colorToggle}>
          <input
            type="checkbox"
            checked={!!enabledField.value}
            onChange={(e) => enabledField.onChange(e.target.checked)}
          />
          <span>Enable</span>
        </label>
      </div>
      {enabledField.value ? (
        <div className={styles.colorPickerWrapper}>
          <input
            type="color"
            className={styles.colorInput}
            value={colorField.value || '#5865F2'}
            onChange={(e) => colorField.onChange(e.target.value)}
          />
          <span className={styles.colorHex}>{colorField.value || '#5865F2'}</span>
        </div>
      ) : (
        <div className={styles.colorDisabled}>—</div>
      )}
    </div>
  );
};

interface IPayloadSectionProps {
  notificationType?: 'bot' | 'webhook';
  guildId?: string;
}

const PayloadSection = ({ notificationType, guildId }: IPayloadSectionProps = {}) => {
  const { control, register, watch } = useFormContext<TAddNotificationForm>();
  const embedEnabled = watch('embedEnabled');
  const formType     = watch('type' as any) as 'bot' | 'webhook' | undefined;
  const activeType   = notificationType ?? formType ?? 'bot';

  const { fields, append, remove } = useFieldArray<TAddNotificationForm, 'embedFields'>({
    control,
    name: 'embedFields',
  });

  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>Payload</span>

      {guildId && <RoleMentionPicker guildId={guildId} />}

      <FormTextarea<TAddNotificationForm>
        name="content"
        label="Content"
        placeholder="Message text…"
        hint="Plain text message, max 2000 characters."
        rows={3}
        maxLength={2000}
        hideErrorMessage
      />

      {activeType === 'webhook' && (
        <div className={styles.row}>
          <FormInput<TAddNotificationForm>
            name="username"
            label="Username Override"
            placeholder="Custom username"
            hint="Overrides the default webhook name."
            hideErrorMessage
          />
          <FormInput<TAddNotificationForm>
            name="avatarUrl"
            label="Avatar URL"
            type="url"
            placeholder="https://…"
            hint="Overrides the default webhook avatar."
            hideErrorMessage
          />
        </div>
      )}

      <div className={styles.embedToggleRow}>
        <label className={styles.embedToggleLabel}>
          <input type="checkbox" {...register('embedEnabled')} />
          <span>Include Embed</span>
        </label>
      </div>

      {embedEnabled && (
        <div className={styles.embedForm}>
          <div className={styles.row}>
            <FormInput<TAddNotificationForm>
              name="embedTitle"
              label="Title"
              placeholder="Embed title"
              maxLength={256}
              hideErrorMessage
            />
            <ColorField />
          </div>

          <FormTextarea<TAddNotificationForm>
            name="embedDescription"
            label="Description"
            placeholder="Embed description"
            rows={3}
            maxLength={4096}
            hideErrorMessage
          />

          <FormInput<TAddNotificationForm>
            name="embedUrl"
            label="URL"
            type="url"
            placeholder="https://…"
            hint="Makes the embed title a clickable link."
            hideErrorMessage
          />

          <div className={styles.row}>
            <FormInput<TAddNotificationForm>
              name="embedThumbnailUrl"
              label="Thumbnail URL"
              type="url"
              placeholder="https://…"
              hint="Small image in the top-right corner."
              hideErrorMessage
            />
            <FormInput<TAddNotificationForm>
              name="embedImageUrl"
              label="Image URL"
              type="url"
              placeholder="https://…"
              hint="Large image at the bottom of the embed."
              hideErrorMessage
            />
          </div>

          <FormInput<TAddNotificationForm>
            name="embedFooterText"
            label="Footer"
            placeholder="Footer text"
            maxLength={2048}
            hideErrorMessage
          />

          <div className={styles.fieldsSection}>
            <div className={styles.fieldsSectionHeader}>
              <span className={styles.fieldsSectionTitle}>Fields</span>
              {fields.length < 25 && (
                <button
                  type="button"
                  className={styles.addFieldButton}
                  onClick={() => append({ name: '', value: '', inline: false })}
                >
                  <LuPlus size={12} />
                  Add Field
                </button>
              )}
            </div>

            {fields.map((field, idx) => (
              <div key={field.id} className={styles.fieldRow}>
                <div className={styles.fieldRowInputs}>
                  <FormInput<TAddNotificationForm>
                    name={`embedFields.${idx}.name` as Path<TAddNotificationForm>}
                    label="Name"
                    placeholder="Field name"
                    maxLength={256}
                    hideErrorMessage
                  />
                  <FormInput<TAddNotificationForm>
                    name={`embedFields.${idx}.value` as Path<TAddNotificationForm>}
                    label="Value"
                    placeholder="Field value"
                    maxLength={1024}
                    hideErrorMessage
                  />
                </div>
                <div className={styles.fieldActions}>
                  <label className={styles.inlineLabel}>
                    <input
                      type="checkbox"
                      {...register(`embedFields.${idx}.inline` as Path<TAddNotificationForm>)}
                    />
                    <span>Inline</span>
                  </label>
                  <button
                    type="button"
                    className={styles.removeFieldButton}
                    onClick={() => remove(idx)}
                    aria-label="Remove field"
                  >
                    <LuTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PayloadSection;
