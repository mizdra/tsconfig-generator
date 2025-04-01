import type { TSConfigPreference } from '../preference.js';
import { Button } from './Button.js';
import { useToast } from './Toast.js';
import styles from './TSConfigEditor.module.css';

const projectTypes = [
  { value: 'frontend-for-webapp', label: 'Frontend for Web App' },
  { value: 'backend-for-webapp', label: 'Backend for Web App' },
  { value: 'npm-package', label: 'npm package' },
] as const;

const typeCheckOptions = [
  { id: 'allowUnreachableCode', defaultValue: false, label: 'allowUnreachableCode' },
  { id: 'allowUnusedLabels', defaultValue: true, label: 'allowUnusedLabels' },
  { id: 'checkJs', defaultValue: true, label: 'checkJs' },
  { id: 'exactOptionalPropertyTypes', defaultValue: false, label: 'exactOptionalPropertyTypes' },
  { id: 'noFallthroughCasesInSwitch', defaultValue: true, label: 'noFallthroughCasesInSwitch' },
  { id: 'noImplicitReturns', defaultValue: true, label: 'noImplicitReturns' },
  { id: 'noUncheckedIndexedAccess', defaultValue: true, label: 'noUncheckedIndexedAccess' },
  { id: 'noUnusedLocals', defaultValue: false, label: 'noUnusedLocals' },
  { id: 'noUnusedParameters', defaultValue: false, label: 'noUnusedParameters' },
] as const;

function getPreferenceFromFormData(formData: FormData): TSConfigPreference {
  return {
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
}

interface Props {
  preference: TSConfigPreference;
  onEdit: (preference: TSConfigPreference) => void;
  onShare: () => void;
}

export function TSConfigEditor({ preference, onEdit, onShare }: Props) {
  const { showInfo } = useToast();
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const formData = new FormData(e.currentTarget.form!);
    onEdit(getPreferenceFromFormData(formData));
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    showInfo('Reset to default');
    const form = e.currentTarget;
    requestAnimationFrame(() => {
      const formData = new FormData(form);
      onEdit(getPreferenceFromFormData(formData));
    });
  };

  return (
    <form onReset={handleReset}>
      <fieldset className={styles.fieldset}>
        <legend>Type of project structure</legend>
        {projectTypes.map((projectType) => (
          <label key={projectType.value}>
            <input
              type="radio"
              name="projectType"
              value={projectType.value}
              checked={preference.projectType === projectType.value}
              required
              onChange={handleInput}
            />
            {projectType.label}
          </label>
        ))}
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Type check options</legend>
        {typeCheckOptions.map((option) => (
          <label key={option.id}>
            <input type="checkbox" name={option.id} checked={preference[option.id]} onChange={handleInput} />
            <code>{option.label}</code>
          </label>
        ))}
      </fieldset>
      <div className={styles.buttonContainer}>
        <Button onClick={onShare}>Share URL</Button>
        {/* TODO: Show modal for reset confirmation */}
        <Button type="reset" color="danger">
          Reset
        </Button>
      </div>
    </form>
  );
}
