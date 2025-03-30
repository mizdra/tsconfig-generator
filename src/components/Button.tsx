import clsx from 'clsx';
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'danger';
}

export function Button({ className, type = 'button', color = 'primary', ...props }: Props) {
  return (
    <button
      className={clsx(styles.button, color === 'primary' ? styles.primary : styles.danger, className)}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    />
  );
}
