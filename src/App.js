import React, { useState, useEffect } from 'react';

// Imports for DataStore to fetch and manage notes
import { DataStore } from '@aws-amplify/datastore';
import { Note } from './models';

// Imports for Amplify Storage to fetch and manage images from S3
import { Storage } from '@aws-amplify/storage';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { NoteCreateForm, NoteUpdateForm } from './ui-components';

import { Button, Heading, withAuthenticator, Card, Collection, Image, Icon, View, Divider, Flex, Grid } from '@aws-amplify/ui-react';

import './App.css';

//styling for the Amplify UI components 
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);


function App({ signOut, user }) {

  // State hooks
  const [notesState, setNotesState] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  // Fetch notes and their image URLs on component mount
  useEffect(() => {
    fetchNotesAndImageUrls();
  }, []);

  // Function to fetch notes and their image URLs
  const fetchNotesAndImageUrls = async () => {
    const notesArray = await DataStore.query(Note);
    console.log("Fetched notes:", notesArray);
    setNotesState(notesArray);
    const urls = {};
    for (const note of notesArray) {
      if (note.image) {
        urls[note.image] = await Storage.get(note.image);
      }
    }
    setImageUrls(urls);
  };

  // Function to delete a note and its associated image
  const deleteNote = async (noteId) => {
    const modelToDelete = await DataStore.query(Note, noteId);

    // If the note has an image, remove it from the storage
    if (modelToDelete.image) {
      try {
        await Storage.remove(modelToDelete.image);
        console.log('Successfully deleted image from storage. Image name: ' + modelToDelete.image);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }

    await DataStore.delete(modelToDelete);
    fetchNotesAndImageUrls(); // Refetch the notes after deletion
  };

  // Function to open the update form and feed it the data of the note to update
  const initializeUpdateForm = async (noteId) => {
    const noteToUpdate = await DataStore.query(Note, noteId);
    const idProp = noteToUpdate;
    setShowUpdateForm(true);
    setUpdateFormData(idProp);
  };

  // Custom delete icon component
  const IconDelete = () => {
    return (
      <Icon
        ariaLabel=""
        pathData="M12 0c-4.992 0-10 1.242-10 3.144 0 .406 3.556 18.488 3.633 18.887 1.135 1.313 3.735 1.969 6.334 1.969 2.601 0 5.199-.656 6.335-1.969.081-.404 3.698-18.468 3.698-18.882 0-2.473-7.338-3.149-10-3.149zm0 1.86c4.211 0 7.625.746 7.625 1.667 0 .92-3.414 1.667-7.625 1.667s-7.625-.746-7.625-1.667 3.414-1.667 7.625-1.667zm4.469 19.139c-.777.532-2.418 1.001-4.502 1.001-2.081 0-3.721-.467-4.498-.998l-.004-.021c-1.552-7.913-2.414-12.369-2.894-14.882 3.55 1.456 11.304 1.455 14.849-.002-.868 4.471-2.434 12.322-2.951 14.902zm-7.872-7.418l-.492-.323 1.824-.008.78 1.667-.506-.32c-.723 1.146-1.027 1.764-.796 2.481-1.823-1.798-1.622-2.182-.81-3.497zm.622-1.304l.781-1.418c.195-.38 1.251-.075 1.688.899l-.797 1.445-1.672-.926zm2.673 5.175h-1.729c-.427.013-.672-1.061-.031-1.915h1.761v1.915zm.058-4.886l.524-.289c-.652-1.188-1.044-1.753-1.781-1.898 2.451-.729 2.593-.41 3.445.981l.521-.275-.79 1.654-1.919-.173zm3.059.005l.911 1.474c.236.355-.546 1.129-1.607 1.035l-.928-1.501 1.624-1.008zm-1.549 4.846l-.004.583-1.028-1.616 1.054-1.47-.006.6c1.354.011 2.037-.055 2.524-.63-.565 2.5-.942 2.533-2.54 2.533z"
      />
    );
  };

  return (

    <View className={`App ${showCreateForm || showUpdateForm ? 'modal-open' : ''}`}>

      <Flex
        as="nav"
        padding="medium"
        justifyContent={'space-between'}
        alignItems={'center'}
        wrap="wrap"
        marginBottom="2rem"
        backgroundColor="midnightblue">

        <Heading level={1} color={'white'} fontSize={'xl'}>AWS Notes</Heading>
        <Heading level={2} color={'white'} fontSize={'medium'}>Hello {user.attributes.email}</Heading>
        <Button className='logOutButton' color={'white'} onClick={signOut}>Sign out</Button>
      </Flex>

      <View textAlign="left" padding="0 1rem" maxWidth="900px" margin="auto">
        <p>AWS Notes is a React full-stack CRUD web application designed to showcase familiarity in AWS services and related technologies. The application leverages <b>AWS Amplify</b> to manage user authentication, DataStore for handling notes, and S3 for storing images. The app incorporates a custom drag-and-drop file input component and a custom colour picker. By utilizing AWS services this app demonstrates the ability to build, configure, and deploy scalable and secure applications on the AWS platform.</p>
      </View>

      <Button variation="primary" marginBottom="2rem" marginTop="1rem" onClick={() => setShowCreateForm(true)}
      >Add Note</Button>

      {showCreateForm && (
        <View
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            zIndex: '2',
          }}
        >
          <NoteCreateForm
            onSuccess={() => {
              fetchNotesAndImageUrls();
              setShowCreateForm(false);
            }}
            onCancel={() => setShowCreateForm(false)}
            onError={() => setShowCreateForm(true)}

            overrides={{
              title: {
                style: { backgroundColor: 'white' },
                textAlign: 'left'
              },
              description: {
                style: { backgroundColor: 'white' },
                textAlign: 'left'
              }
            }}
          />
        </View>
      )}

      {showUpdateForm && (
        <View
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            zIndex: '2',
          }}
        >
          {showUpdateForm && (
            <NoteUpdateForm
              onSuccess={() => {
                fetchNotesAndImageUrls();
                setShowUpdateForm(false);
              }}
              onCancel={() => setShowUpdateForm(false)}
              onError={() => setShowUpdateForm(true)}

              // Pass the note data to the form
              note={updateFormData}

              overrides={{
                title: {
                  style: { backgroundColor: 'white' },
                  textAlign: 'left'
                },
                description: {
                  style: { backgroundColor: 'white' },
                  textAlign: 'left'
                }
              }}
            />
          )}
        </View>
      )}

      <Collection
        items={notesState}
        type="list"
        direction="row"
        alignItems="flex-start"
        gap="20px"
        wrap="wrap"
        padding="0 1rem"
        isPaginated={true}
        maxWidth="1200px"
        margin="auto"
      >
        {(item, index) => (
          <Card
            key={index}
            borderRadius="medium"
            maxWidth="20rem"
            variation="outlined"
            backgroundColor={item.color}
          >
            <Image
              src={imageUrls[item.image]}
              alt=""
              maxHeight="200px"

            />
            <View padding="xs">
              <Heading padding="medium">{item.title}</Heading>
              <p>
                {item.description}
              </p>
              <Divider padding="xs" marginBottom="1rem" />

              <Flex
                justifyContent="center"
              >
                <Button variation="primary" onClick={() => initializeUpdateForm(item.id)} >
                  Edit
                </Button>
                <Button
                  variation="warning"
                  onClick={() => deleteNote(item.id)}>
                  <IconDelete
                  />
                  Delete
                </Button>
              </Flex>

            </View>
          </Card>
        )}
      </Collection>

    </View >
  );
}

export default withAuthenticator(App);


