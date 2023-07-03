/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateContact } from '../contact.js';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

const EditContact = () => {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method='post' id='contact-form'>
      <p>
        <span>Nom</span>
        <input
          placeholder='Prénom'
          aria-label='Prénome'
          type='text'
          name='first'
          defaultValue={contact.first}
        />
        <input
          placeholder='Nom'
          aria-label='Nom'
          type='text'
          name='last'
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type='text'
          name='twitter'
          placeholder='@john'
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>URL de l&apos;Avatar</span>
        <input
          placeholder='https://example.com/avatar.jpg'
          aria-label="URL de l'Avatar"
          type='text'
          name='avatar'
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name='notes' defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type='submit'>Sauvegarder</button>
        <button type='button' onClick={() => navigate(-1)}>
          Annuler
        </button>
      </p>
    </Form>
  );
};

export default EditContact;
