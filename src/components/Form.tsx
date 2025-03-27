import { getFormProps, getInputProps, useForm, useFormMetadata } from '@conform-to/react';
import styles from './Form.module.css';

const projectTypes = [
  { value: 'frontend-for-webapp', label: 'Frontend for Web App' },
  { value: 'backend-for-webapp', label: 'Backend for Web App' },
  { value: 'npm-package', label: 'npm package' },
] as const;

const typeCheckOptions = [
  { id: 'noUncheckedIndexedAccess', defaultValue: true, label: 'noUncheckedIndexedAccess' },
  { id: 'noImplicitReturns', defaultValue: true, label: 'noImplicitReturns' },
  { id: 'noFallthroughCasesInSwitch', defaultValue: true, label: 'noFallthroughCasesInSwitch' },
  { id: 'allowUnusedLabels', defaultValue: true, label: 'allowUnusedLabels' },
  { id: 'checkJs', defaultValue: true, label: 'checkJs' },
  { id: 'allowUnreachableCode', defaultValue: false, label: 'allowUnreachableCode' },
  { id: 'noUnusedLocals', defaultValue: false, label: 'noUnusedLocals' },
  { id: 'noUnusedParameters', defaultValue: false, label: 'noUnusedParameters' },
  { id: 'exactOptionalPropertyTypes', defaultValue: false, label: 'exactOptionalPropertyTypes' },
] as const;

interface Schema {
  projectType: 'frontend-for-webapp' | 'backend-for-webapp' | 'npm-package';
  noUncheckedIndexedAccess: boolean;
  noImplicitReturns: boolean;
  noFallthroughCasesInSwitch: boolean;
  allowUnusedLabels: boolean;
  checkJs: boolean;
  allowUnreachableCode: boolean;
  noUnusedLocals: boolean;
  noUnusedParameters: boolean;
  exactOptionalPropertyTypes: boolean;
}

export function Form() {
  const [form, fields] = useForm<Schema>({
    defaultValue: {
      noUncheckedIndexedAccess: true,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      allowUnusedLabels: true,
      checkJs: true,
    },
    shouldValidate: 'onInput',
    shouldRevalidate: 'onInput',
    onSubmit: (e, context) => {
      console.log(context);
    },
  });

  console.log(fields);

  return (
    <form action="" {...getFormProps(form)} onSubmit={(e) => e.preventDefault()}>
      <fieldset className={styles.horizontalFieldset}>
        <legend>Type of project structure</legend>
        {projectTypes.map((projectType) => (
          <label key={projectType.value}>
            <input {...getInputProps(fields.projectType, { type: 'radio' })} required />
            {projectType.label}
          </label>
        ))}
      </fieldset>
      <fieldset className={styles.verticalFieldset}>
        <legend>Type check options</legend>
        {typeCheckOptions.map((option) => (
          <label key={option.id}>
            <input {...getInputProps(fields[option.id], { type: 'checkbox' })} />
            {option.label}
          </label>
        ))}
      </fieldset>
    </form>
  );
}
