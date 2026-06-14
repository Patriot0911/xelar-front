import type { IDiscordRoleModel, IDiscordChannelModel } from '@/lib/models/discord';
import styles from './styles.module.scss';

const MENTION_REGEX = /<(@&\d+|#\d+|@!?\d+|@everyone|@here)>/g;

const DEFAULT_COLOR_HEX = '#5865F2';

const toRoleColorHex = (color: number): string | null => {
  if (!color) return null;
  return `#${color.toString(16).padStart(6, '0')}`;
};

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface IPillInfo {
  label: string;
  colorHex: string;
  kindClass: string;
}

const resolvePillInfo = (
  token: string,
  roles: IDiscordRoleModel[],
  channels: IDiscordChannelModel[],
): IPillInfo => {
  const inner = token.slice(1, -1);

  if (inner.startsWith('@&')) {
    const roleId = inner.slice(2);
    const role = roles.find((r) => r.id === roleId);
    return {
      label: role ? `@${role.name}` : '@unknown-role',
      colorHex: (role && toRoleColorHex(role.color)) || DEFAULT_COLOR_HEX,
      kindClass: styles.pillRole,
    };
  }

  if (inner.startsWith('#')) {
    const channelId = inner.slice(1);
    const channel = channels.find((c) => c.id === channelId);
    return {
      label: channel ? `#${channel.name}` : '#unknown-channel',
      colorHex: DEFAULT_COLOR_HEX,
      kindClass: styles.pillChannel,
    };
  }

  if (inner === '@everyone' || inner === '@here') {
    return {
      label: inner,
      colorHex: DEFAULT_COLOR_HEX,
      kindClass: styles.pillEveryone,
    };
  }

  return {
    label: '@user',
    colorHex: DEFAULT_COLOR_HEX,
    kindClass: styles.pillUser,
  };
};

const createPill = (
  token: string,
  roles: IDiscordRoleModel[],
  channels: IDiscordChannelModel[],
): HTMLSpanElement => {
  const { label, colorHex, kindClass } = resolvePillInfo(token, roles, channels);

  const span = document.createElement('span');
  span.contentEditable = 'false';
  span.dataset.mention = token;
  span.className = `${styles.pill} ${kindClass}`;
  span.textContent = label;
  span.title = token;
  span.style.setProperty('--pill-color', colorHex);
  span.style.setProperty('--pill-bg', hexToRgba(colorHex, 0.16));
  span.style.setProperty('--pill-border', hexToRgba(colorHex, 0.35));

  return span;
};

const isMentionPill = (el: HTMLElement): boolean => !!el.dataset.mention;

/** Rebuilds the editor's DOM from a raw string, replacing mention syntax with styled pills. */
export const buildContent = (
  root: HTMLElement,
  raw: string,
  roles: IDiscordRoleModel[],
  channels: IDiscordChannelModel[],
): void => {
  root.innerHTML = '';

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MENTION_REGEX.lastIndex = 0;
  while ((match = MENTION_REGEX.exec(raw))) {
    if (match.index > lastIndex) {
      root.appendChild(document.createTextNode(raw.slice(lastIndex, match.index)));
    }
    root.appendChild(createPill(match[0], roles, channels));
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    root.appendChild(document.createTextNode(raw.slice(lastIndex)));
  }
};

const serializeInline = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const el = node as HTMLElement;
  if (isMentionPill(el)) return el.dataset.mention ?? '';
  if (el.tagName === 'BR') return '\n';

  let result = '';
  el.childNodes.forEach((child) => { result += serializeInline(child); });
  return result;
};

/** Reads the editor's DOM back into the raw mention-syntax string. */
export const serialize = (root: HTMLElement): string => {
  let result = '';
  let firstBlock = true;

  root.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName === 'DIV') {
      if (!firstBlock) result += '\n';
      firstBlock = false;
      result += serializeInline(child);
    } else {
      result += serializeInline(child);
    }
  });

  return result;
};

/** True when the editor contains browser-inserted block nodes (e.g. <div>/<br> from Enter). */
export const hasBlockNodes = (root: HTMLElement): boolean => {
  for (const child of Array.from(root.childNodes)) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const tag = (child as HTMLElement).tagName;
      if (tag === 'DIV' || tag === 'BR') return true;
    }
  }
  return false;
};

const nodeLogicalLength = (node: Node): number => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent?.length ?? 0;
  if (node.nodeType !== Node.ELEMENT_NODE) return 0;

  const el = node as HTMLElement;
  if (isMentionPill(el)) return (el.dataset.mention ?? '').length;
  if (el.tagName === 'BR') return 1;

  let total = 0;
  el.childNodes.forEach((child) => { total += nodeLogicalLength(child); });
  return total;
};

/** Maps the current caret position to a character offset within the raw string. */
export const getCaretOffset = (root: HTMLElement): number => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;

  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer)) return 0;

  let offset = 0;
  let found = false;

  const recurse = (node: Node) => {
    if (found) return;

    if (node === range.startContainer) {
      if (node.nodeType === Node.TEXT_NODE) {
        offset += range.startOffset;
      } else {
        const children = Array.from(node.childNodes);
        for (let i = 0; i < range.startOffset && i < children.length; i += 1) {
          offset += nodeLogicalLength(children[i]);
        }
      }
      found = true;
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      offset += node.textContent?.length ?? 0;
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;

    if (isMentionPill(el)) {
      offset += (el.dataset.mention ?? '').length;
      return;
    }
    if (el.tagName === 'BR') {
      offset += 1;
      return;
    }

    for (const child of Array.from(el.childNodes)) {
      recurse(child);
      if (found) return;
    }
  };

  recurse(root);
  return offset;
};

/** Places the caret at the given character offset within the raw string. */
export const setCaretOffset = (root: HTMLElement, offset: number): void => {
  let remaining = offset;
  let target: { node: Node; offset: number } | null = null;

  const recurse = (node: Node) => {
    if (target) return;

    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0;
      if (remaining <= len) {
        target = { node, offset: remaining };
        return;
      }
      remaining -= len;
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;

    if (isMentionPill(el) || el.tagName === 'BR') {
      const len = isMentionPill(el) ? (el.dataset.mention ?? '').length : 1;
      if (remaining <= len) {
        const parent = el.parentNode as Node;
        const idx = Array.prototype.indexOf.call(parent.childNodes, el);
        target = { node: parent, offset: idx + 1 };
        remaining = 0;
        return;
      }
      remaining -= len;
      return;
    }

    for (const child of Array.from(el.childNodes)) {
      recurse(child);
      if (target) return;
    }
  };

  recurse(root);

  if (!target) {
    target = { node: root, offset: root.childNodes.length };
  }

  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.setStart(target.node, target.offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};
