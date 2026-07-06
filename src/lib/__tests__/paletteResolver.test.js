// src/lib/__tests__/paletteResolver.test.js
import assert from 'assert';
import { resolvePalette } from '../paletteResolver';

const CANONICAL_PALETTES = [
  "Honey", "Blue", "Rose", "Mint",
  "Terracotta", "Lavender", "Sunflower", "Teal",
  "Peach", "Oat", "Lilac", "Sage"
];

function testDeterministic() {
  const taskId = "task-abc-123";
  const res1 = resolvePalette(taskId);
  const res2 = resolvePalette(taskId);
  assert.strictEqual(res1, res2, "Output must be deterministic");
  console.log("✅ testDeterministic passed");
}

function testCanonicalPalettes() {
  const taskId = "some-random-task-id";
  const palette = resolvePalette(taskId);
  assert.ok(CANONICAL_PALETTES.includes(palette), `Palette must be one of the canonical 12. Got: ${palette}`);
  console.log("✅ testCanonicalPalettes passed");
}

function testDistribution() {
  // Test that we hit multiple palettes with different inputs
  const results = new Set();
  for (let i = 0; i < 50; i++) {
    results.add(resolvePalette(`task-id-${i}`));
  }
  // With 50 different inputs, we should hit most of the 12 palettes
  assert.ok(results.size > 5, `Expected good distribution, got ${results.size} unique palettes`);
  console.log(`✅ testDistribution passed. Unique palettes hit: ${results.size}`);
}

function run() {
  console.log("Starting paletteResolver tests...");
  testDeterministic();
  testCanonicalPalettes();
  testDistribution();
  console.log("🎉 All paletteResolver tests passed successfully!");
}

run();
