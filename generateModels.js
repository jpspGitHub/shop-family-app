const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('./generateConfig.json'));

const SCHEMA_PATH = path.join(__dirname, config.schemaPath);
const NODE_OUTPUT_PATH = path.join(__dirname, config.nodeOutputPath);
const KOTLIN_OUTPUT_PATH = path.join(__dirname, config.kotlinOutputPath);

const TYPES_MONGOOSE = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  date: 'Date',
  object: 'mongoose.Schema.Types.ObjectId',
  array: 'Array',
  id:'mongoose.Types.ObjectId'
};

const TYPES_KOTLIN = {
  string: 'String',
  number: 'Int',
  boolean: 'Boolean',
  date: 'String',
  object: 'String',
  array: 'List',
  id: 'String'
};

const parseNodeField = (key, config) => {
  if (config.type === 'array') {
    if (config.ref) {
      return `  ${key}: [{ type: mongoose.Schema.Types.ObjectId, ref: '${config.ref}' }]`;
    } else if (config.items) {
      const subSchema = generateNodeSubdocument(key, config.items);
      return subSchema;
    }
  }

  const type = TYPES_MONGOOSE[config.type.toLowerCase()];
  const attributes = [];

  if (config.ref) {
    attributes.push(`ref: '${config.ref}'`);
  }
  if (config.required) attributes.push('required: true');
  if (config.unique) attributes.push('unique: true');
  if (config.default) attributes.push(`default: ${config.default}`);

  return `  ${key}: { type: ${type}, ${attributes.join(', ')} }`;
};

const generateNodeSubdocument = (key, config) => {
  const fields = Object.entries(config.properties)
    .map(([subKey, subConfig]) => parseNodeField(subKey, subConfig))
    .join(',\n');

  return `  ${key}: [new mongoose.Schema({\n${fields}\n  })]`;
};

const generateNodeModel = (name, schema) => {
  const fields = Object.entries(schema)
    .map(([key, config]) => parseNodeField(key, config))
    .join(',\n');

  return `const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
${fields}
}, { timestamps: true });

module.exports = mongoose.model('${name}', ${name}Schema);`;
};

const generateKotlinModel = (name, schema) => {
  const imports = [];
  const fields = Object.entries(schema).map(([key, config]) => {
    if (config.type.toLowerCase() === 'array') {
      if (config.ref) {
        imports.push(`import com.thaya.shop_family.models.${config.ref}`);
        return `    val ${key}: List<${config.ref}>`;
      } else if (config.items) {
        const subClass = generateKotlinSubdocument(key, config.items);
        return `    val ${key}: List<${subClass}>`;
      }
    }
    if (config.type.toLowerCase() === 'object' && config.ref) {
      imports.push(`import com.thaya.shop_family.models.${config.ref}`);
      return `    val ${key}: ${config.ref}`;
    }
    return `    val ${key}: ${TYPES_KOTLIN[config.type.toLowerCase()]}`;
  });

  const importSection = imports.length ? `${imports.join('\n')}\n\n` : '';

  return `package com.thaya.shop_family.models

${importSection}data class ${name}(
${fields.join(',\n')}
)
`;
};

const generateKotlinSubdocument = (name, schema) => {
  const fields = Object.entries(schema.properties)
    .map(([key, config]) => `    val ${key}: ${TYPES_KOTLIN[config.type.toLowerCase()]}`)
    .join(',\n');

  return `${name.capitalize()}Subdocument`
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// 🔄 Leer todos los JSON en /schemas y generar modelos
fs.readdirSync(SCHEMA_PATH).forEach(file => {
  const schemaName = path.basename(file, '.json');
  const schema = JSON.parse(fs.readFileSync(path.join(SCHEMA_PATH, file)));

  // Generar modelos
  const nodeModel = generateNodeModel(schemaName, schema);
  const kotlinModel = generateKotlinModel(schemaName, schema);

  // Guardar en las rutas correspondientes
  fs.writeFileSync(path.join(NODE_OUTPUT_PATH, `${schemaName}.js`), nodeModel);
  fs.writeFileSync(path.join(KOTLIN_OUTPUT_PATH, `${schemaName}.kt`), kotlinModel);

  console.log(`✅ Modelos generados para ${schemaName}: Node.js y Kotlin`);
});
