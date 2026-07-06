// src/lib/__tests__/appearanceResolver.test.js

const assert = require('assert');
const { resolveTaskIdentity, resolveTaskAppearance } = require('../appearanceResolver');

// Mock task
const task = {
  id: 'task123',
  priority: 'medium',
  status: 'active',
  isCarriedForward: false,
};

function testDeterministic() {
  const identity1 = resolveTaskIdentity(task);
  const appearance1 = resolveTaskAppearance(identity1, 'pastel', 'light');

  const identity2 = resolveTaskIdentity(task);
  const appearance2 = resolveTaskAppearance(identity2, 'pastel', 'light');

  assert.deepStrictEqual(appearance1, appearance2, 'Appearance should be deterministic');
  console.log('✅ Deterministic test passed');
}

function testVisualStyleEffect() {
  const identity = resolveTaskIdentity(task);
  const pastel = resolveTaskAppearance(identity, 'pastel', 'light');
  const pop = resolveTaskAppearance(identity, 'pop', 'light');
  // Currently implementation ignores visualStyle, so they should be equal
  assert.deepStrictEqual(pastel, pop, 'Visual style currently has no effect');
  console.log('✅ Visual style test passed');
}

function testModeEffect() {
  const identity = resolveTaskIdentity(task);
  const light = resolveTaskAppearance(identity, 'pastel', 'light');
  const dark = resolveTaskAppearance(identity, 'pastel', 'dark');
  // Currently no effect, should be equal
  assert.deepStrictEqual(light, dark, 'Mode currently has no effect');
  console.log('✅ Mode test passed');
}

function run() {
  testDeterministic();
  testVisualStyleEffect();
  testModeEffect();
  console.log('All appearanceResolver tests passed');
}

run();
