# AWS Notes

AWS Notes is a React full-stack CRUD web application designed to showcase familiarity in AWS services and related technologies. 

The application leverages AWS Amplify to manage user authentication, DataStore for handling notes, and S3 for storing images. It incorporates a custom drag-and-drop file input component and a custom colour picker. By utilizing AWS services this app demonstrates the ability to build, configure, and deploy scalable and secure applications on the AWS platform.

Hosted on AWS Amplify: [AWS Notes](https://main.d29fwzvscz6ula.amplifyapp.com/)

## Features

- User authentication and authorization with AWS Amplify and Cognito
- Create, read, update, and delete (CRUD) operations for notes
- Real-time data synchronization Amplify DataStore
- Image upload and storage using Amazon S3
- Drag-and-drop image input with a custom React component
- Responsive design

## Technologies

- React (Frontend)
- AWS Amplify (Backend)
- AWS Cognito (User authentication and authorization)
- AWS DataStore (Client-side data management)
- Amazon S3 (Image storage)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/aws-notes.git
```

2. Install dependencies:

```bash
cd aws-notes
npm install
```

3. Configure AWS Amplify:

Follow the [official Amplify documentation](https://docs.amplify.aws/start/q/integration/react) to set up and configure the Amplify project with your AWS account.

4. Run the application:

```bash
npm start
```

The application will now run on `http://localhost:3000`.

## Usage

1. Sign up or log in with your credentials.
2. Create a new note by clicking the "Add Note" button.
3. Add a title, content, and an optional image to the note.
4. Save the note by clicking the "Save" button.
5. View, edit, or delete your notes from the main dashboard.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
