# Glitns Javascript SDK

This SDK aims to help the development of integrations with Glints that use JavaScript, providing an easy interface to communicate with Glints REST API and request the information required. For that purpose, many ESnext generation were used.

**Note** : This library and documentation is under development

## Installation

### Browser

- Copy the minimal (.min.js) version of this glints-js-sdk
- Include it to your script : `<script src="path/to/glints-js-sdk.js"></script>`

### NodeJS

- `npm install glints-js-sdk`
- `import Glints from 'glints-js-sdk'`;

## Usage

```javascript
const glints = new Glints({
    baseURL: 'https://your-api.com/';
    // Optional if you need oAuth request Authorization
    consumer: {
        public: "<public_consumer_key>",
        secret: "<secret_consumer_key>"
    },
    accessToken: {
        public: "<public_access_key>",
        secret: "<secret_access_key>"
    },
})
```

### Method available

#### Authentication

- Register

```javascript
const yourData = {...};

glints
  .register(yourData)
  .then((response) => {
    // TODO
  })
  .catch((error) => {
    // TODO
  });
```
