import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { NoteCreateForm } from './ui-components';

import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';

import './App.css';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App({ signOut, user }) {  

  return (

    <div className="App">

      <Heading level={1}>Hello {user.attributes.email}</Heading>
      <Button onClick={signOut}>Sign out</Button>

      <NoteCreateForm />

    </div>
  );
}

export default withAuthenticator(App);


