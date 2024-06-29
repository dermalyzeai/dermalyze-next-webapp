const spaceO = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessTokenO = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

// contentful.js

import { createClient } from 'contentful';

const client = createClient({
  space: spaceO,
  accessToken: accessTokenO,
});

export default client;
