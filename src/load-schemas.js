const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');

const SCHEMA_DIR = path.resolve('api');

const loadSchemas = () => {
  if (!fs.existsSync(SCHEMA_DIR)) throw new Error(`Missing schemas directory at [${SCHEMA_DIR}]`);
  const schemas = fg.sync(path.join(SCHEMA_DIR, '**', '*.{json,yaml,yml}').replace(/\\/g, '/'));
  if (schemas.length === 0) throw new Error(`No OpenAPI schemas found in [${SCHEMA_DIR}]`);
  return schemas;
};

module.exports = {
  loadSchemas,
  SCHEMA_DIR,
};
