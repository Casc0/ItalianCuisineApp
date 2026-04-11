const fs   = require('fs');
const path = require('path');

// ─── Region assignments ──────────────────────────────────────────────────────

const REGION_MAP = {
  // Lazio (9)
  carbonara: 'Lazio', cacio_e_pepe: 'Lazio', amatriciana: 'Lazio',
  gricia: 'Lazio', coda_vaccinara: 'Lazio', saltimbocca: 'Lazio',
  bruschetta: 'Lazio', fettuccine_alfredo: 'Lazio', castagnole: 'Lazio',

  // Campania (9)
  pizza_margherita: 'Campania', caprese: 'Campania', vongole: 'Campania',
  calzone: 'Campania', sfogliatella: 'Campania', torta_caprese: 'Campania',
  zeppole: 'Campania', pasta_limone: 'Campania', pasta_aglio: 'Campania',

  // Toscana (9)
  bistecca: 'Toscana', ribollita: 'Toscana', pappa_al_pomodoro: 'Toscana',
  cantucci: 'Toscana', schiacciata: 'Toscana', lampredotto: 'Toscana',
  torta_nonna: 'Toscana', crostata: 'Toscana', zuppa_inglese: 'Toscana',

  // Emilia-Romagna (7)
  lasagna: 'Emilia-Romagna', prosciutto_melone: 'Emilia-Romagna',
  pisarei_faso: 'Emilia-Romagna', piadina: 'Emilia-Romagna',
  tortellini_brodo: 'Emilia-Romagna', cappelletti: 'Emilia-Romagna',
  ciambella: 'Emilia-Romagna',

  // Sicilia (8)
  arancini: 'Sicilia', cannoli: 'Sicilia', pasta_norma: 'Sicilia',
  pistachio_pesto: 'Sicilia', caponata: 'Sicilia', melanzane: 'Sicilia',
  parmigiana_zucchini: 'Sicilia', tiramisu_pistacho: 'Sicilia',

  // Piemonte (6)
  pannacotta: 'Piemonte', zabaglione: 'Piemonte', agnolotti: 'Piemonte',
  vitello_tonnato: 'Piemonte', bagna_cauda: 'Piemonte', affogato: 'Piemonte',

  // Lombardia (6)
  risotto: 'Lombardia', ossobuco: 'Lombardia', cotoletta: 'Lombardia',
  polenta_ragu: 'Lombardia', risotto_milano: 'Lombardia', panettone: 'Lombardia',

  // Liguria (6)
  pesto: 'Liguria', minestrone: 'Liguria', focaccia: 'Liguria',
  farinata: 'Liguria', zuppa_di_pesce: 'Liguria', schiacciata_salata: 'Liguria',

  // Veneto (4)
  tiramisu: 'Veneto', gnocchi: 'Veneto',
  baccala_vicentina: 'Veneto', fritto_misto: 'Veneto',

  // Puglia (3)
  panzerotti: 'Puglia', acqua_sale: 'Puglia', frittata: 'Puglia',

  // Abruzzo (2)
  parrozzo: 'Abruzzo', brodetto: 'Abruzzo',

  // Calabria (1)
  pasta_salsiccia: 'Calabria',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extracts the primary cook time in minutes from messy strings.
 * "30 minutos"                              → 30
 * "24 horas (incluye levado)"               → 1440
 * "180 minutos (caldo) / 30 minutos (pasta)"→ 180  (takes first value)
 * "20 minutos + 6h refrigeración"           → 20   (takes active cook time)
 */
function parseTiempo(str) {
  // Check for hours first
  const hoursMatch = str.match(/(\d+)\s*h(?:oras?)?(?!\w)/i);
  if (hoursMatch && !str.toLowerCase().includes('minutos')) {
    return parseInt(hoursMatch[1]) * 60;
  }
  // Extract first number followed by "minutos"
  const minutesMatch = str.match(/(\d+)\s*minutos?/i);
  if (minutesMatch) return parseInt(minutesMatch[1]);
  // Fallback: grab first number
  const numMatch = str.match(/(\d+)/);
  return numMatch ? parseInt(numMatch[1]) : null;
}

/**
 * Extracts the primary serving count from messy strings.
 * "4 personas"     → 4
 * "10-12 unidades" → 10  (lower bound of range)
 * "20 galletas"    → 20
 */
function parsePorciones(str) {
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

/**
 * Normalizes 9 dificultad variants down to 3 canonical values.
 * "Muy Fácil"                    → "Fácil"
 * "Media", "Media (por técnica)" → "Medio"
 * "Muy Difícil"                  → "Difícil"
 */
function normalizeDificultad(str) {
  const s = str.toLowerCase();
  if (s.includes('fácil') || s.includes('facil')) return 'Fácil';
  if (s.includes('difícil') || s.includes('dificil')) return 'Difícil';
  return 'Medio';
}

/**
 * Parses an ingredient string into a structured object.
 * Most ingredients in this dataset are plain names without quantities,
 * so cantidad/unidad will be null for the majority.
 *
 * "Albahaca fresca"    → { nombre: "Albahaca fresca", cantidad: null, unidad: null }
 * "6 huevos grandes"   → { nombre: "huevos grandes", cantidad: 6, unidad: null }
 * "200g de harina"     → { nombre: "harina", cantidad: 200, unidad: "g" }
 */
function parseIngrediente(str) {
  const UNITS = ['g', 'gr', 'kg', 'ml', 'l', 'lt', 'taza', 'tazas', 'cda', 'cdas', 'cdta', 'cdtas'];

  // Match: [number] [optional unit] [rest as name]
  const match = str.match(/^(\d+(?:[.,]\d+)?)\s*([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+\.?)?\s+(.+)$/);

  if (match) {
    const cantidad  = parseFloat(match[1].replace(',', '.'));
    const maybeUnit = match[2]?.toLowerCase().replace('.', '');
    const rest      = match[3]?.trim();

    if (maybeUnit && UNITS.includes(maybeUnit)) {
      // "200g de harina" — recognized unit
      const nombre = rest.replace(/^de\s+/i, ''); // strip leading "de"
      return { nombre, cantidad, unidad: maybeUnit };
    }

    // "6 huevos grandes" — number is a count, no unit
    const nombre = (match[2] ? `${match[2]} ${rest}` : rest).trim();
    return { nombre, cantidad, unidad: null };
  }

  // Plain name, no quantity
  return { nombre: str, cantidad: null, unidad: null };
}

// ─── Migration ───────────────────────────────────────────────────────────────

const inputPath  = path.join(__dirname, '../app/bd/recipes.json');
const outputPath = path.join(__dirname, '../app/bd/recipes.migrated.json');

const recipes  = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const createdAt = new Date().toISOString();

const migrated = recipes.map(recipe => ({
  slug:          recipe.id,
  nombre:        recipe.nombre,
  imagenPrincipal: recipe['imagen-principal'],
  descripcion:   recipe.descripcion,

  categorias: {
    tiempoMinutos: parseTiempo(recipe.categorias.tiempo),
    tiempoNota:    recipe.categorias.tiempo,        // original string, for display
    dificultad:    normalizeDificultad(recipe.categorias.dificultad),
    porciones:     parsePorciones(recipe.categorias.porciones),
    porcionesNota: recipe.categorias.porciones,     // original string, for display
    region:        REGION_MAP[recipe.id] ?? null,
  },

  ingredientes: recipe.ingredientes.map(parseIngrediente),

  pasos: recipe.resumen.map((descripcion, index) => ({
    orden: index + 1,
    descripcion,
  })),

  consejo: recipe.detallado,

  identificadores: recipe.identificadores,

  valoracion: {
    promedio: recipe.valoracion ?? 0,
    total:    1,
  },

  creadaPor:  null,
  createdAt,
}));

fs.writeFileSync(outputPath, JSON.stringify(migrated, null, 2), 'utf8');
console.log(`\nMigrated ${migrated.length} recipes → recipes.migrated.json`);

// ─── Validation report ───────────────────────────────────────────────────────

const missingRegion = migrated.filter(r => !r.categorias.region);
const missingTiempo = migrated.filter(r => r.categorias.tiempoMinutos === null);

console.log('\n── Validation ──────────────────────────────');
console.log(`Recipes with region:       ${migrated.length - missingRegion.length}/${migrated.length}`);
console.log(`Recipes with tiempoMinutos:${migrated.length - missingTiempo.length}/${migrated.length}`);

if (missingRegion.length) console.warn('Missing region:', missingRegion.map(r => r.slug));
if (missingTiempo.length) console.warn('Missing tiempo:', missingTiempo.map(r => r.slug));

// Sample output
console.log('\n── Sample (pesto) ──────────────────────────');
console.log(JSON.stringify(migrated.find(r => r.slug === 'pesto'), null, 2));
