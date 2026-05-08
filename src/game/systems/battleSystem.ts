import type { BattleAction, BattleResolution } from "../types/battle";
import type { CreatureState } from "../types/game";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function resolveBattleTurn(
  partner: CreatureState,
  enemy: CreatureState,
  action: BattleAction,
  wasGuarding: boolean
): BattleResolution {
  const lines: string[] = [];
  let guarding = wasGuarding;

  if (action === "attack") {
    const damage = randomBetween(partner.attackMin, partner.attackMax);
    enemy.hp = clamp(enemy.hp - damage, 0, enemy.maxHp);
    lines.push(`${partner.name} 發動攻擊，造成 ${damage} 點傷害。`);
  } else {
    guarding = true;
    lines.push(`${partner.name} 擺出防禦姿態。`);
  }

  if (enemy.hp <= 0) {
    lines.push(`${enemy.name} 失去戰鬥能力。`);
    return {
      lines,
      enemyFainted: true,
      playerFainted: false
    };
  }

  const rawDamage = randomBetween(enemy.attackMin, enemy.attackMax);
  const damage = guarding ? Math.max(1, Math.floor(rawDamage / 2)) : rawDamage;
  partner.hp = clamp(partner.hp - damage, 0, partner.maxHp);
  lines.push(`${enemy.name} 反擊，造成 ${damage} 點傷害。`);

  if (guarding) {
    lines.push("防禦降低了本回合受到的傷害。");
  }

  if (partner.hp <= 0) {
    lines.push(`${partner.name} 撐不住了。`);
  }

  return {
    lines,
    enemyFainted: false,
    playerFainted: partner.hp <= 0
  };
}
