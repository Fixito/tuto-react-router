/* eslint-disable react-refresh/only-export-components */
import { Form, useFetcher, useLoaderData } from 'react-router-dom';
import { getContact, updateContact } from '../contact.js';

export const loader = async ({ params }) => {
  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Contact introuvable'
    });
  }

  return { contact };
};

export const action = async ({ request, params }) => {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true'
  });
};

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id='contact'>
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>Pas de nom</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target='_blank'
              href={`https://twitter.com/${contact.twitter}`}
              rel='noreferrer'
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action='edit'>
            <button type='submit'>Éditer</button>
          </Form>
          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (
                !confirm(
                  'Veuillez confirmer que vous souhaitez supprimer cet enregistrement.'
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type='submit'>Supprimer</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Enlever des favoris' : 'Ajouter aux favoris'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
