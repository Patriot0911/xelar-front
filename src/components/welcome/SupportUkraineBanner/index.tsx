'use client';

import { useEffect, useState } from 'react';
import { LuArrowUpRight, LuX } from 'react-icons/lu';

import styles from './styles.module.scss';

const DISMISS_KEY = 'xelar_support_ukraine_dismissed';
const U24_URL = 'https://u24.gov.ua/';

const SupportUkraineBanner = () => {
  // Hidden until mounted so the server render and the dismissed state agree.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(DISMISS_KEY) !== '1');
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Storage unavailable — the banner simply returns on the next visit.
    }
  };

  if (!visible) return null;

  return (
    <aside className={styles.banner} aria-label="Support Ukraine">
      <div className={styles.inner}>
        <span className={styles.flag} aria-hidden="true" />
        <p className={styles.text}>
          <span className={styles.lead}>Stand with Ukraine.</span>{' '}
          <span className={styles.sub}>Support defenders, medics and rebuilding through UNITED24.</span>
        </p>
        <a
          href={U24_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Donate
          <LuArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={dismiss}
          className={styles.close}
          aria-label="Dismiss banner"
        >
          <LuX size={16} />
        </button>
      </div>
    </aside>
  );
}

export default SupportUkraineBanner;
