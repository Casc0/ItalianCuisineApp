
// Actualiza el campo "ingredientes" de las 70 recetas en Mongo,
// usando recipes.json como fuente. Matchea por "slug".

// Uso: node scripts/import-recetas.js
//
// Antes de correrlo:
//  1. Revisar ubicación de recipes.
//  2. Revisá los imports de connection.js y Recipe.js.

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const fs = require('fs');
const mongoose = require('mongoose');

let connect;
try {
  connect = require('../db/connection');
} catch (e) {
  connect = null;
}

const Recipe = require('../db/Recipe');

const RUTA_JSON = path.join(__dirname,'recipes.json');

async function main() {
  if (connect) {
    await connect();
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  console.log('Conectado a MongoDB Atlas.');

  const recetas = JSON.parse(fs.readFileSync(RUTA_JSON, 'utf-8'));
  console.log(`Leídas ${recetas.length} recetas de ${RUTA_JSON}`);

  const operaciones = recetas.map((r) => ({
    updateOne: {
      filter: { slug: r.slug },
      update: { $set: { ingredientes: r.ingredientes } },
    },
  }));

  const resultado = await Recipe.bulkWrite(operaciones);

  console.log(` CORRECTO - Matched: ${resultado.matchedCount}, Modified: ${resultado.modifiedCount}`);
  if (resultado.matchedCount < recetas.length) {
    console.log(` ATENCIÓN - Ojo: ${recetas.length - resultado.matchedCount} recetas no matchearon ningún slug en la base.`);
  }

  await mongoose.disconnect();
  console.log('Desconectado.');
  process.exit(0);
}

main().catch((err) => {
  console.error(' ERROR al importar:', err);
  process.exit(1);
});