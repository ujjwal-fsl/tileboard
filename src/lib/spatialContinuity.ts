export interface SpatialOrigin {
  rect: DOMRect;
}

let origin: SpatialOrigin | null = null;

export function setSpatialOrigin(rect: DOMRect) {
  origin = { rect };
}

export function getSpatialOrigin() {
  return origin;
}

export function clearSpatialOrigin() {
  origin = null;
}
