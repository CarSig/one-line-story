# Install

frontend/ npm i
backend/ npm i

# run

frontend: npm run dev
backend: node server.js

# User Story 1: As a player, I want to create a new story

- created custom hook UseCreateStory
- this hook combines standard handleChange and handleSubmit functions
- simple form validation is added to creation of story
- upon creation story is added to database
- form is opened in modal window, so state for toggling modal is added
- upon creation story is stored in database(mongoDB)

CreateStoryForm is imported to Home page

# User Story 2: As a player, I want to see all ongoing and completed stories

- stories are rendered in StoryList component, single story is in StoryItem
- stories are fetched form database when page is loaded
- upon joining story event is emitted to server (sockets are used)
- added option to filter stories based on status
- added button to delete stories
- clicking on the StoryItem triggers link that leads to page of that story

# User Story 3: As a player, I want to add a sentence to the story

- all logic is in useWriteSentenceHook
- state textInput takes care of text Input
- simple form validation added
- create event emitters using sockets
- story in the database is updated
- hook also keeps count of sentences, stores text value of entire story and checks if the story is completed

# User Story 4: As a player, I want to view the story after it is completed

- useWriteSentenceHook keeps state of that.
- conditional rendering of text - if story is not finished only last sentence is displayed, if it is finished then complete story is displayed

# User Story 5: As a player, I want to join other stories.

- players can join stories. all is handled by sockets.
- when sentence is submitted - it is automatically displayed to other players without page refresh

# Additional features

- database connection
- usage of sockets
- routing and private routes
- Added Error Boundary for story page

- keeping track of logged users - logged user is stored in the Context
- When user has logged - this user icon is not available to other clients (updates with socket)

# dependencies

Frontend : {
"axios": "^1.7.2",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.23.1",
"sass": "^1.77.4",
"socket.io-client": "^4.7.5"
"dotenv": "^16.4.5",
},

Backend: {
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"mongoose": "^8.4.1",
"socket.io": "^4.7.5"
},
