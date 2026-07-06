// src/lib/__tests__/appearanceResolver.test.js
import assert from 'assert';
import { resolveTaskIdentity, resolveTaskAppearance } from '../appearanceResolver';

// Mock task
const task = {
  id: 'task-123-honey',
  priority: 'medium',
  status: 'active',
  isCarriedForward: false,
};

function testDeterministic() {
  const identity1 = resolveTaskIdentity(task);
  const appearance1 = resolveTaskAppearance(identity1, 'pastel', 'light');

  const identity2 = resolveTaskIdentity(task);
  const appearance2 = resolveTaskAppearance(identity2, 'pastel', 'light');

  assert.deepStrictEqual(appearance1, appearance2, 'Appearance must be deterministic');
  console.log('✅ Deterministic test passed');
}

function testTaskIdentity() {
  const identity = resolveTaskIdentity(task);
  assert.strictEqual(identity.priority, 'medium');
  assert.strictEqual(identity.isCompleted, false);
  assert.strictEqual(identity.isCarriedForward, false);
  assert.ok(typeof identity.palette === 'string', 'Palette must be a string');
  console.log('✅ Task identity format test passed');
}

function testTaskAppearanceFormat() {
  const identity = resolveTaskIdentity(task);
  const appearance = resolveTaskAppearance(identity, 'pastel', 'light');
  
  assert.ok(appearance.background.startsWith('bg-'), 'Background class must start with bg-');
  assert.ok(appearance.border.startsWith('border'), 'Border class must start with border');
  assert.ok(appearance.text.startsWith('text-'), 'Text class must start with text-');
  assert.ok(appearance.category.includes('absolute'), 'Category class must contain layouts');
  assert.ok(appearance.checkmark.startsWith('text-'), 'Checkmark class must start with text-');
  console.log('✅ Task appearance format test passed');
}

function run() {
  console.log('Starting appearanceResolver tests...');
  testDeterministic();
  testTaskIdentity();
  testTaskAppearanceFormat();
  console.log('🎉 All appearanceResolver tests passed successfully!');
}

run();
