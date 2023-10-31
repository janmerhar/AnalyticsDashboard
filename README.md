# Events7

## Running in production

### Configuration

Before you can compile the project, you need to create configuration files.

#### Frontend

Types of configuration files:

- `.env.production` - production configuration
- `.env.development` - development configuration
- `.env.testing` - testing configuration

Configuration files should be placed in `src/client` directory.

The structure is the following:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

#### Backend

Types of configuration files:

- `.env` - production configuration
- `.env.development` - development configuration
- `.env.testing` - testing configuration

Configuration files should be placed in `src/server` directory.

The structure is the following:

```bash
PORT=4000
MONGODB_URI=full connection URI
```

### Compiling

#### Frontend

1. Navigate to `src/client` directory
2. Run `npm install`
3. Run `npm run build`

#### Backend

After frontend is compiled, you can compile backend.

1. Navigate to `src/server` directory
2. Run `npm install`
3. Run `npm run build`
   OR
4. Start the server with `npm run start`

Now the server is running on port defined within `.env` file. Make sure that Frontend is running on the same port.

### Frontend

1. Navigate to `src/client` directory
2. Run `npm install`
3. Run `npm run dev`

### Backend

1. Navigate to `src/server` directory
2. Run `npm install`
3. Run `npm run start:dev`

## Addiontinal features

### Search bar

Allows to search for events by the following attributes:

- id
- name
- sort by attribut
- sort order

### Pagination

Allows to navigate through pages of events. The navigation buttons are visible directly under the search bar.

## Running in production

Make sure that you have correct .env files located in the root directories.
