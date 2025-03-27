import { getFormProps, getInputProps, useForm } from '@conform-to/react';

interface Schema {
  email: string;
}

export function Form() {
  const [form, fields] = useForm<Schema>({});

  return (
    <form {...getFormProps(form)}>
      <label htmlFor={fields.email.id}>Email</label>
      <input {...getInputProps(fields.email, { type: 'email' })} />
    </form>
  );
}
