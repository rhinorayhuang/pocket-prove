import type { CreatureState, CreatureTemplate } from "../types/game";

export const starterTemplate: CreatureTemplate = {
  id: "lumetail",
  name: "光尾",
  level: 5,
  maxHp: 26,
  attackMin: 4,
  attackMax: 7,
  body: "#4d7f39",
  accent: "#d7f0a7"
};

export const wildEncounterTable: CreatureTemplate[] = [
  {
    id: "budbub",
    name: "芽泡",
    level: 3,
    maxHp: 14,
    attackMin: 2,
    attackMax: 4,
    body: "#5c8b3f",
    accent: "#c8ef8f"
  },
  {
    id: "misttail",
    name: "霧尾",
    level: 4,
    maxHp: 16,
    attackMin: 2,
    attackMax: 5,
    body: "#678f70",
    accent: "#f0f8df"
  },
  {
    id: "emberuff",
    name: "炭絨",
    level: 4,
    maxHp: 15,
    attackMin: 3,
    attackMax: 5,
    body: "#98623d",
    accent: "#ffd67c"
  }
];

export function cloneCreature(template: CreatureTemplate): CreatureState {
  return {
    ...template,
    hp: template.maxHp
  };
}
