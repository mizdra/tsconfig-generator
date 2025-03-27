import React from 'react';
import styles from './App.module.css';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';

interface Schema {
  email: string;
}

const App: React.FC = () => {
  const [form, fields] = useForm<Schema>({});

  return (
    <div className={styles.container}>
      <div>
        <form {...getFormProps(form)}>
          <label htmlFor={fields.email.id}>Email</label>
          <input {...getInputProps(fields.email, { type: 'email' })} />
        </form>
      </div>
    </div>
  );
};

export default App;
