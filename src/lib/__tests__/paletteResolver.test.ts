import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolvePalette,
  resolveTaskIdentity,
  PALETTES,
  PALETTE_NAMES,
  PaletteId,
} from "../paletteResolver";

describe("Palette Resolver & Task Identity", () => {
  it("Requirement 1: Different task IDs can resolve to different palette identities", () => {
    // Generate task IDs and ensure we resolve across the 12-palette spectrum
    const resolvedPalettes = new Set<PaletteId>();
    
    // Sample a series of diverse task IDs
    const testIds = [
      "task-honey-001",
      "task-sunflower-002",
      "task-peach-003",
      "task-terracotta-004",
      "task-rose-005",
      "task-sage-006",
      "task-mint-007",
      "task-teal-008",
      "task-powder-blue-009",
      "task-lavender-010",
      "task-lilac-011",
      "task-oat-012",
      "firebase-doc-abc-123",
      "firebase-doc-xyz-789",
      "client-uuid-11223344",
    ];

    for (const id of testIds) {
      const palette = resolvePalette(id);
      assert.ok(PALETTES.includes(palette), `Resolved palette ${palette} must be one of the 12 palettes`);
      resolvedPalettes.add(palette);
    }

    // Must resolve to multiple distinct palettes (not all mapping to the same palette)
    assert.ok(
      resolvedPalettes.size >= 8,
      `Expected at least 8 distinct palettes from diverse IDs, got ${resolvedPalettes.size}`
    );
  });

  it("Requirement 2: Palette assignment is deterministic across repeated calls", () => {
    const sampleIds = [
      "task-alpha-99",
      "task-beta-100",
      "task-gamma-101",
      "fixed-task-id-12345",
      "user-task-abc-def",
    ];

    for (const id of sampleIds) {
      const expected = resolvePalette(id);
      // Repeated evaluations must be 100% deterministic
      for (let i = 0; i < 50; i++) {
        assert.equal(
          resolvePalette(id),
          expected,
          `Palette for ID "${id}" must be identical across repeated calls`
        );
      }
    }
  });

  it("Requirement 3: Changing priority preserves the task's palette identity", () => {
    const taskId = "task-priority-change-test";
    const initialPalette = resolvePalette(taskId);

    const smallTask = resolveTaskIdentity({
      id: taskId,
      priority: "small",
      status: "active",
    });
    const mediumTask = resolveTaskIdentity({
      id: taskId,
      priority: "medium",
      status: "active",
    });
    const bigTask = resolveTaskIdentity({
      id: taskId,
      priority: "big",
      status: "active",
    });

    assert.equal(smallTask.palette, initialPalette);
    assert.equal(mediumTask.palette, initialPalette);
    assert.equal(bigTask.palette, initialPalette);

    assert.equal(
      smallTask.palette,
      mediumTask.palette,
      "Small and Medium priorities must preserve the exact same palette identity"
    );
    assert.equal(
      mediumTask.palette,
      bigTask.palette,
      "Medium and Big priorities must preserve the exact same palette identity"
    );
  });

  it("Requirement 8: Completing and reopening a task preserves its palette identity", () => {
    const taskId = "task-completion-lifecycle-test";
    const basePalette = resolvePalette(taskId);

    const activeTask = resolveTaskIdentity({
      id: taskId,
      priority: "medium",
      status: "active",
    });
    const completedTask = resolveTaskIdentity({
      id: taskId,
      priority: "medium",
      status: "completed",
    });
    const reopenedTask = resolveTaskIdentity({
      id: taskId,
      priority: "medium",
      status: "active",
    });

    assert.equal(activeTask.palette, basePalette);
    assert.equal(completedTask.palette, basePalette);
    assert.equal(reopenedTask.palette, basePalette);

    assert.equal(
      completedTask.palette,
      activeTask.palette,
      "Completed task must retain its original palette identity"
    );
  });

  it("Validates all 12 palettes are defined and named", () => {
    assert.equal(PALETTES.length, 12, "Must contain exactly 12 palettes");
    for (const p of PALETTES) {
      assert.ok(PALETTE_NAMES[p], `Palette "${p}" must have a display name`);
    }
  });
});
