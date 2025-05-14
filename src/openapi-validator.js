const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

const { loadSchemas, SCHEMA_DIR } = require('./load-schemas');

module.exports = (app) => {
  loadSchemas().forEach((apiSpec) => {
    console.log(`Load schema [${apiSpec}]`);
    const fileContent = fs.readFileSync(apiSpec, 'utf8');
    const validator = OpenApiValidator.middleware({
      apiSpec: yaml.load(fileContent),
      validateRequests: true,
      validateResponses: false,
      operationHandlers: path.join(__dirname, '.'),
    });
    console.log(`Registering OpenAPI validator for [${apiSpec}]`);
    app.use(validator);
    // Make the schema itself available with its original name.
    const schemaPath = path.relative(SCHEMA_DIR, apiSpec);
    app.use(`/schemas/${schemaPath}`, express.static(apiSpec));
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
            message: err.message,
        });
    });
  });
};
