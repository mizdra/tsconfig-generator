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

export interface TSConfigPreference {
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

interface Props {
  onEdit: (preference: TSConfigPreference) => void;
}

export function Form({ onEdit }: Props) {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const formData = new FormData(e.currentTarget.form!);
    const preference: TSConfigPreference = {
      projectType: formData.get('projectType') as TSConfigPreference['projectType'],
      noUncheckedIndexedAccess: formData.has('noUncheckedIndexedAccess'),
      noImplicitReturns: formData.has('noImplicitReturns'),
      noFallthroughCasesInSwitch: formData.has('noFallthroughCasesInSwitch'),
      allowUnusedLabels: formData.has('allowUnusedLabels'),
      checkJs: formData.has('checkJs'),
      allowUnreachableCode: formData.has('allowUnreachableCode'),
      noUnusedLocals: formData.has('noUnusedLocals'),
      noUnusedParameters: formData.has('noUnusedParameters'),
      exactOptionalPropertyTypes: formData.has('exactOptionalPropertyTypes'),
    };
    onEdit(preference);
  };

  return (
    <form>
      <fieldset className={styles.horizontalFieldset}>
        <legend>Type of project structure</legend>
        {projectTypes.map((projectType, i) => (
          <label key={projectType.value}>
            <input
              type="radio"
              name="projectType"
              value={projectType.value}
              defaultChecked={i === 0}
              required
              onInput={handleInput}
            />
            {projectType.label}
          </label>
        ))}
      </fieldset>
      <fieldset className={styles.verticalFieldset}>
        <legend>Type check options</legend>
        {typeCheckOptions.map((option) => (
          <label key={option.id}>
            <input type="checkbox" name={option.id} onInput={handleInput} />
            {option.label}
          </label>
        ))}
      </fieldset>
    </form>
  );
}
