import { redirect } from 'react-router-dom';
import { deleteContact } from '../contact.js';

export const action = async ({ params }) => {
  await deleteContact(params.contactId);
  return redirect('/');
};
