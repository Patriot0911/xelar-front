import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants/site';
import { WELCOME_STEPS } from '@/lib/constants/welcome';

const buildStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Web',
      publisher: { '@id': `${SITE_URL}/#organization` },
      featureList: [
        'Twitch EventSub integration',
        'Discord bot notifications',
        'Discord webhook notifications',
        'Game filters and message templates',
        'Delivery logs',
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}/#how-it-works`,
      name: 'How Xelar delivers Twitch notifications to Discord',
      step: WELCOME_STEPS.map(({ title, description }, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: title,
        text: description,
      })),
    },
  ],
});

const WelcomeJsonLd = () => {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildStructuredData()).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export default WelcomeJsonLd;
