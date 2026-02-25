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
  if (origin && origin.element) {
    origin.element.style.transition = "none";
    origin.element.style.opacity = "1";
  }
  origin = null;
}
