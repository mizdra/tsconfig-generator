import clsx from 'clsx';
import { createContext, useContext, useRef, useState } from 'react';
import styles from './Toast.module.css';

interface ToastContextType {
  type: 'info' | 'error';
  setType: (type: 'info' | 'error') => void;
  tooltipText: string;
  setTooltipText: (text: string) => void;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [type, setType] = useState<'info' | 'error'>('info');
  const [tooltipText, setTooltipText] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const value = {
    type,
    setType,
    tooltipText,
    setTooltipText,
    tooltipRef,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        ref={tooltipRef}
        role={type === 'info' ? 'status' : 'alert'}
        popover="auto"
        className={clsx(styles.toast, type === 'info' ? styles.info : styles.error)}>
        {tooltipText}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { setType, setTooltipText, tooltipRef } = context;

  const showInfo = (message: string) => {
    setType('info');
    setTooltipText(message);
    tooltipRef.current?.showPopover();
  };

  const showError = (message: string) => {
    setType('error');
    setTooltipText(message);
    tooltipRef.current?.showPopover();
  };

  return { showInfo, showError };
}
