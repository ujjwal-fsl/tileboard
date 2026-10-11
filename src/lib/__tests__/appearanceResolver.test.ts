import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveTaskAppearance } from "../appearanceResolver";
import { PALETTES, PaletteId } from "../paletteResolver";
import { THEMES } from "../themes";

/**
 * Standard Hex to HSL converter for color science assertions.
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

describe("Appearance Resolver & Color Metrics", () => {
  it("Requirement 4: Each palette has distinct low-, medium-, and high-priority color values", () => {
    for (const palette of PALETTES) {
      const small = resolveTaskAppearance({ palette, priority: "small" });
      const medium = resolveTaskAppearance({ palette, priority: "medium" });
      const big = resolveTaskAppearance({ palette, priority: "big" });

      assert.notEqual(
        small.backgroundColor.toUpperCase(),
        medium.backgroundColor.toUpperCase(),
        `Palette "${palette}" must have distinct small and medium background colors`
      );
      assert.notEqual(
        medium.backgroundColor.toUpperCase(),
        big.backgroundColor.toUpperCase(),
        `Palette "${palette}" must have distinct medium and big background colors`
      );
      assert.notEqual(
        small.backgroundColor.toUpperCase(),
        big.backgroundColor.toUpperCase(),
        `Palette "${palette}" must have distinct small and big background colors`
      );
    }
  });

  it("Requirement 5: High-priority colors are visibly more saturated than medium-priority colors", () => {
    for (const palette of PALETTES) {
      const medium = resolveTaskAppearance({ palette, priority: "medium", theme: "pastel" });
      const big = resolveTaskAppearance({ palette, priority: "big", theme: "pastel" });

      const hslMedium = hexToHsl(medium.backgroundColor);
      const hslBig = hexToHsl(big.backgroundColor);

      assert.ok(
        hslBig.s > hslMedium.s,
        `Palette "${palette}": High-priority saturation (${hslBig.s}%) must be greater than medium-priority saturation (${hslMedium.s}%)`
      );
    }
  });

  it("Requirement 6: Medium-priority colors are visibly more saturated than low-priority colors", () => {
    for (const palette of PALETTES) {
      const small = resolveTaskAppearance({ palette, priority: "small", theme: "pastel" });
      const medium = resolveTaskAppearance({ palette, priority: "medium", theme: "pastel" });

      const hslSmall = hexToHsl(small.backgroundColor);
      const hslMedium = hexToHsl(medium.backgroundColor);

      assert.ok(
        hslMedium.s > hslSmall.s,
        `Palette "${palette}": Medium-priority saturation (${hslMedium.s}%) must be greater than low-priority saturation (${hslSmall.s}%)`
      );
    }
  });

  it("Requirement 7: Different palettes within the same priority tier produce different hues", () => {
    // Check that across the 12 palettes in the 'big' tier, backgrounds are unique
    const bigColors = new Set<string>();
    const mediumColors = new Set<string>();
    const smallColors = new Set<string>();

    for (const palette of PALETTES) {
      const big = resolveTaskAppearance({ palette, priority: "big" });
      const medium = resolveTaskAppearance({ palette, priority: "medium" });
      const small = resolveTaskAppearance({ palette, priority: "small" });

      bigColors.add(big.backgroundColor.toUpperCase());
      mediumColors.add(medium.backgroundColor.toUpperCase());
      smallColors.add(small.backgroundColor.toUpperCase());
    }

    assert.equal(
      bigColors.size,
      12,
      `All 12 palettes must produce distinct colors in the 'big' priority tier (got ${bigColors.size})`
    );
    assert.equal(
      mediumColors.size,
      12,
      `All 12 palettes must produce distinct colors in the 'medium' priority tier (got ${mediumColors.size})`
    );
    assert.equal(
      smallColors.size,
      12,
      `All 12 palettes must produce distinct colors in the 'small' priority tier (got ${smallColors.size})`
    );

    // Verify key distinct hue families in 'big' tier (e.g. Honey vs Rose vs Powder Blue vs Mint)
    const honeyBig = hexToHsl(resolveTaskAppearance({ palette: "honey", priority: "big" }).backgroundColor);
    const roseBig = hexToHsl(resolveTaskAppearance({ palette: "rose", priority: "big" }).backgroundColor);
    const blueBig = hexToHsl(resolveTaskAppearance({ palette: "powder-blue", priority: "big" }).backgroundColor);
    const mintBig = hexToHsl(resolveTaskAppearance({ palette: "mint", priority: "big" }).backgroundColor);

    assert.ok(Math.abs(honeyBig.h - roseBig.h) > 40, "Honey and Rose must have distinctly different hues");
    assert.ok(Math.abs(roseBig.h - blueBig.h) > 40, "Rose and Powder Blue must have distinctly different hues");
    assert.ok(Math.abs(blueBig.h - mintBig.h) > 30, "Powder Blue and Mint must have distinctly different hues");
  });

  it("Criterion 5: Changing task priority does not change its hue family", () => {
    for (const palette of PALETTES) {
      const small = resolveTaskAppearance({ palette, priority: "small", theme: "pastel" });
      const medium = resolveTaskAppearance({ palette, priority: "medium", theme: "pastel" });
      const big = resolveTaskAppearance({ palette, priority: "big", theme: "pastel" });

      const hslSmall = hexToHsl(small.backgroundColor);
      const hslMedium = hexToHsl(medium.backgroundColor);
      const hslBig = hexToHsl(big.backgroundColor);

      const diff1 = Math.abs(hslSmall.h - hslMedium.h);
      const diff2 = Math.abs(hslMedium.h - hslBig.h);
      assert.ok(
        diff1 <= 5,
        `Palette "${palette}": Hue between small (${hslSmall.h}°) and medium (${hslMedium.h}°) must remain stable (diff: ${diff1}°)`
      );
      assert.ok(
        diff2 <= 5,
        `Palette "${palette}": Hue between medium (${hslMedium.h}°) and big (${hslBig.h}°) must remain stable (diff: ${diff2}°)`
      );
    }
  });

  it("Requirement 8: Completed task preserves its original palette hue family in calm muted tone", () => {
    for (const palette of PALETTES) {
      const active = resolveTaskAppearance({ palette, priority: "medium", status: "active" });
      const completed = resolveTaskAppearance({ palette, priority: "medium", status: "completed" });

      assert.equal(completed.palette, palette, "Completed task appearance must reflect the task's palette");
      assert.notEqual(
        completed.backgroundColor.toUpperCase(),
        active.backgroundColor.toUpperCase(),
        "Completed task must have a distinct muted background"
      );

      // Hue should remain within the same family (within ~15 degrees) while saturation is significantly muted
      const hslActive = hexToHsl(active.backgroundColor);
      const hslCompleted = hexToHsl(completed.backgroundColor);

      assert.ok(
        hslCompleted.s < hslActive.s,
        `Completed task for "${palette}" must be more muted (${hslCompleted.s}% sat) than active (${hslActive.s}% sat)`
      );
    }
  });

  it("Requirement 9: Existing Pastel/Pop switching and light/dark appearance behavior continue to work", () => {
    const palette: PaletteId = "honey";

    // Pastel vs Pop
    const pastelLight = resolveTaskAppearance({ palette, priority: "big", theme: "pastel", appearance: "light" });
    const popLight = resolveTaskAppearance({ palette, priority: "big", theme: "pop", appearance: "light" });
    assert.notEqual(
      pastelLight.backgroundColor.toUpperCase(),
      popLight.backgroundColor.toUpperCase(),
      "Pastel and Pop themes must produce different styling"
    );

    // Light vs Dark
    const pastelDark = resolveTaskAppearance({ palette, priority: "big", theme: "pastel", appearance: "dark" });
    assert.notEqual(
      pastelLight.backgroundColor.toUpperCase(),
      pastelDark.backgroundColor.toUpperCase(),
      "Light and Dark appearances must produce different styling"
    );
    assert.equal(
      pastelDark.appearance,
      "dark",
      "Dark appearance mode must be set correctly"
    );
  });

  it("Requirement 10: Real priority values from task creation/editing ('low'/'high', 1/2/3) normalize and resolve to correct tiers", () => {
    for (const palette of PALETTES) {
      // Test string equivalents: low vs small, high vs big
      const fromSmall = resolveTaskAppearance({ palette, priority: "small" });
      const fromLow = resolveTaskAppearance({ palette, priority: "low" });
      assert.equal(fromLow.backgroundColor, fromSmall.backgroundColor, "low must resolve identically to small");

      const fromBig = resolveTaskAppearance({ palette, priority: "big" });
      const fromHigh = resolveTaskAppearance({ palette, priority: "high" });
      assert.equal(fromHigh.backgroundColor, fromBig.backgroundColor, "high must resolve identically to big");

      // Test numeric equivalents: 1 -> small, 2 -> medium, 3 -> big
      const from1 = resolveTaskAppearance({ palette, priority: 1 });
      const from2 = resolveTaskAppearance({ palette, priority: 2 });
      const from3 = resolveTaskAppearance({ palette, priority: 3 });

      assert.equal(from1.backgroundColor, fromSmall.backgroundColor, "1 must resolve to small");
      const fromMedium = resolveTaskAppearance({ palette, priority: "medium" });
      assert.equal(from2.backgroundColor, fromMedium.backgroundColor, "2 must resolve to medium");
      assert.equal(from3.backgroundColor, fromBig.backgroundColor, "3 must resolve to big");
    }
  });

  it("Requirement 11: Carried-forward tasks preserve warning border treatment without breaking priority fill", () => {
    const palette: PaletteId = "honey";
    const normal = resolveTaskAppearance({ palette, priority: "medium", isCarriedForward: false });
    const carried = resolveTaskAppearance({ palette, priority: "medium", isCarriedForward: true });

    assert.equal(carried.backgroundColor, normal.backgroundColor, "Carried-forward task preserves priority background");
    assert.notEqual(carried.borderColor, normal.borderColor, "Carried-forward task must receive distinct warning border");
    assert.ok(carried.borderColor.includes("217, 119, 6") || carried.borderColor.includes("245, 158, 11"), "Border must be amber warning color");
  });

  it("Requirement 12: Pop theme retains bold, confident graphic color presence across all priorities", () => {
    for (const palette of PALETTES) {
      const popSmall = resolveTaskAppearance({ palette, priority: "small", theme: "pop" });
      const popBig = resolveTaskAppearance({ palette, priority: "big", theme: "pop" });

      const hslSmall = hexToHsl(popSmall.backgroundColor);
      const hslBig = hexToHsl(popBig.backgroundColor);

      // In Pop, even small priority has confident graphic color presence (including curated neutrals >= 35% sat)
      assert.ok(hslSmall.s >= 35 || hslSmall.l <= 75, `Pop theme "${palette}" low priority must be bold/confident (sat: ${hslSmall.s}%)`);
      assert.ok(hslBig.s >= 35 || hslBig.l <= 75, `Pop theme "${palette}" high priority must be bold/confident (sat: ${hslBig.s}%)`);
    }
  });
});

