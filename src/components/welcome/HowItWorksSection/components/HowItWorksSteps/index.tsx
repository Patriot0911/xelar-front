import { IHowItWorksStepsProps } from './HowItWorksSteps';

import styles from './styles.module.scss';

const HowItWorksSteps = ({ steps }: IHowItWorksStepsProps) => {
  return (
    <ol className={styles.steps}>
      {steps.map(({ id, title, description }, index) => (
        <li key={id} className={styles.step}>
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </li>
      ))}
    </ol>
  );
}

export default HowItWorksSteps;
