import styles from './App.module.css';
import { Form, TSConfigPreference } from './components/Form.js';

export function App() {
  const handleEdit = (preference: TSConfigPreference) => {
    console.log(preference);
  };
  return (
    <div className={styles.container}>
      <h1>tsconfig.json generator for mizdra</h1>
      <div>
        <Form onEdit={handleEdit} />
      </div>
    </div>
  );
}
