import type { DirectionName } from "../types/game";

export type InputCallbacks = {
  onMove: (direction: DirectionName) => void;
  onConfirm: () => void;
};

export function createKeyHandler(callbacks: InputCallbacks) {
  return (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const directionMap: Partial<Record<string, DirectionName>> = {
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right"
    };

    const direction = directionMap[key];
    if (direction) {
      event.preventDefault();
      callbacks.onMove(direction);
      return;
    }

    if (key === "enter" || key === " " || key === "e") {
      event.preventDefault();
      callbacks.onConfirm();
    }
  };
}
