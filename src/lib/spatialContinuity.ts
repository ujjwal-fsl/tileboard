export interface SpatialOrigin {
  rect: DOMRect;
  element: HTMLElement;
}

let origin: SpatialOrigin | null = null;

export function setSpatialOrigin(rect: DOMRect, element: HTMLElement) {
  origin = { rect, element };
}

export function getSpatialOrigin() {
  return origin;
}

export function clearSpatialOrigin() {
  origin = null;
}
