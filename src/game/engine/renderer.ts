import { canvasHeight, canvasWidth, tileSize } from "./camera";
import type { BattleState } from "../types/battle";
import type { CreatureState, PlayerState, SceneName } from "../types/game";
import type { MapData, NpcData } from "../types/map";

const palette = {
  skyTop: "#dcefd2",
  skyBottom: "#a8c88d",
  lightest: "#d9efbc",
  light: "#8fb56b",
  medium: "#4f7942",
  dark: "#24351d",
  soil: "#8f6d4f",
  soilDark: "#6c4f39",
  water: "#6b9ca1",
  waterLight: "#a7cad0",
  roof: "#7f5c48",
  roofLight: "#a97f5f",
  battleSky: "#dce8cc",
  battleSkyFar: "#bdd4a5",
  battleGround: "#92a86f",
  battleGroundDark: "#738556"
};

function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawTileShadow(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y + tileSize - 2, tileSize, 2, "rgba(36, 53, 29, 0.10)");
}

function drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, radiusX: number, radiusY: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawGroundTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, "#c7dca8");
  drawRect(ctx, x, y + 9, tileSize, 7, "#bdd39b");
  drawRect(ctx, x + 2, y + 4, 2, 2, "#b0c88e");
  drawRect(ctx, x + 11, y + 6, 2, 2, "#aec28d");
  drawRect(ctx, x + 6, y + 11, 1, 1, palette.soil);
  drawTileShadow(ctx, x, y);
}

function drawForestWallTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, palette.dark);
  drawRect(ctx, x + 1, y + 1, tileSize - 2, tileSize - 2, "#35522b");
  drawRect(ctx, x + 2, y + 1, tileSize - 4, 4, "#507440");
  drawRect(ctx, x + 3, y + 6, 3, 8, "#684f3b");
  drawRect(ctx, x + 10, y + 7, 3, 7, "#5d4735");
  drawRect(ctx, x + 6, y + 5, 6, 7, "#48663a");
}

function drawGrassTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, "#89af58");
  drawRect(ctx, x, y + 10, tileSize, 6, "#7fa351");
  drawRect(ctx, x + 2, y + 5, 2, 8, palette.medium);
  drawRect(ctx, x + 5, y + 3, 2, 10, "#36562d");
  drawRect(ctx, x + 8, y + 6, 2, 7, palette.medium);
  drawRect(ctx, x + 11, y + 2, 2, 11, "#436c36");
  drawRect(ctx, x + 13, y + 5, 1, 6, "#d7efb0");
  drawRect(ctx, x + 1, y + 12, 12, 1, "#698645");
  drawTileShadow(ctx, x, y);
}

function drawWaterTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, palette.water);
  drawRect(ctx, x, y, tileSize, 3, "#7baeb2");
  drawRect(ctx, x, y + tileSize - 3, tileSize, 3, "#4d7478");
  drawRect(ctx, x + 2, y + 4, 12, 1, palette.waterLight);
  drawRect(ctx, x + 5, y + 8, 8, 1, palette.waterLight);
  drawRect(ctx, x + 3, y + 12, 9, 1, "#c7e2e5");
}

function drawCabinTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, palette.soilDark);
  drawRect(ctx, x + 1, y + 2, tileSize - 2, 5, palette.roof);
  drawRect(ctx, x + 2, y + 1, tileSize - 4, 2, palette.roofLight);
  drawRect(ctx, x + 3, y + 7, tileSize - 6, 6, "#d3b897");
  drawRect(ctx, x + 4, y + 8, 3, 3, "#9b7b5b");
  drawRect(ctx, x + 9, y + 8, 3, 3, "#9b7b5b");
  drawRect(ctx, x + 6, y + 10, 3, 5, "#5b4739");
  drawRect(ctx, x + 5, y + 9, 5, 1, "#f0e0b8");
}

function drawBlockadeTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x, y, tileSize, tileSize, "#7b654d");
  drawRect(ctx, x + 1, y + 2, 14, 3, "#5d4434");
  drawRect(ctx, x + 0, y + 7, 15, 3, "#8a694f");
  drawRect(ctx, x + 2, y + 11, 12, 2, "#4f392b");
  drawRect(ctx, x + 4, y + 1, 2, 14, "#a27c59");
  drawRect(ctx, x + 10, y + 1, 2, 14, "#a27c59");
  drawRect(ctx, x + 6, y + 4, 4, 1, "#d8d0bd");
  drawRect(ctx, x + 6, y + 9, 4, 1, "#d8d0bd");
  drawRect(ctx, x + 12, y + 3, 1, 6, "#2d241c");
  drawTileShadow(ctx, x, y);
}

function drawSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x + 6, y + 4, 4, 9, "#4b3a2b");
  drawRect(ctx, x + 3, y + 2, 10, 5, "#efd8a7");
  drawRect(ctx, x + 4, y + 3, 8, 1, "#c79662");
  drawRect(ctx, x + 5, y + 5, 6, 1, "#6c4f39");
}

function drawExitMarker(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawRect(ctx, x + 4, y + 4, 8, 8, "rgba(255, 243, 192, 0.40)");
  drawRect(ctx, x + 5, y + 5, 6, 6, "rgba(255, 255, 255, 0.22)");
  drawRect(ctx, x + 7, y + 3, 2, 10, "rgba(255, 255, 255, 0.45)");
}

function drawCharacterShadow(ctx: CanvasRenderingContext2D, baseX: number, baseY: number) {
  drawEllipse(ctx, baseX + 8, baseY + 15, 5, 2, "rgba(36, 53, 29, 0.28)");
}

function drawNpc(ctx: CanvasRenderingContext2D, npc: NpcData) {
  const baseX = npc.position.x * tileSize;
  const baseY = npc.position.y * tileSize;
  drawCharacterShadow(ctx, baseX, baseY);
  drawRect(ctx, baseX + 4, baseY + 1, 8, 3, "#ede5c7");
  drawRect(ctx, baseX + 5, baseY + 4, 6, 3, "#d1b48d");
  drawRect(ctx, baseX + 4, baseY + 7, 8, 4, npc.color);
  drawRect(ctx, baseX + 5, baseY + 7, 6, 1, "#f0f5ff");
  drawRect(ctx, baseX + 4, baseY + 11, 3, 4, "#3b322a");
  drawRect(ctx, baseX + 9, baseY + 11, 3, 4, "#3b322a");
  drawRect(ctx, baseX + 6, baseY + 5, 1, 1, palette.dark);
  drawRect(ctx, baseX + 9, baseY + 5, 1, 1, palette.dark);
}

function drawPlayer(ctx: CanvasRenderingContext2D, player: PlayerState) {
  const baseX = player.position.x * tileSize;
  const baseY = player.position.y * tileSize;
  drawCharacterShadow(ctx, baseX, baseY);
  drawRect(ctx, baseX + 4, baseY + 1, 8, 3, "#b83e3e");
  drawRect(ctx, baseX + 5, baseY + 2, 6, 2, "#f2e7c8");
  drawRect(ctx, baseX + 5, baseY + 4, 6, 3, "#d0b18a");
  drawRect(ctx, baseX + 4, baseY + 7, 8, 4, "#4a638d");
  drawRect(ctx, baseX + 4, baseY + 11, 3, 4, "#2e3344");
  drawRect(ctx, baseX + 9, baseY + 11, 3, 4, "#2e3344");
  drawRect(ctx, baseX + 3, baseY + 8, 2, 3, "#506c98");
  drawRect(ctx, baseX + 11, baseY + 8, 2, 3, "#506c98");
}

function drawFogOverlay(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = "rgba(228, 236, 229, 0.18)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  drawEllipse(ctx, 68, 42, 46, 16, "rgba(242, 246, 241, 0.26)");
  drawEllipse(ctx, 176, 34, 54, 18, "rgba(242, 246, 241, 0.22)");
  drawEllipse(ctx, 118, 82, 60, 20, "rgba(232, 238, 233, 0.20)");
  drawEllipse(ctx, 210, 112, 48, 16, "rgba(241, 245, 243, 0.18)");
  drawEllipse(ctx, 40, 128, 52, 18, "rgba(241, 245, 243, 0.16)");
  ctx.restore();
}

function drawWorld(ctx: CanvasRenderingContext2D, map: MapData, player: PlayerState) {
  const sky = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  sky.addColorStop(0, palette.skyTop);
  sky.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  drawRect(ctx, 0, 0, canvasWidth, 18, "rgba(255,255,255,0.18)");

  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      const tile = map.tiles[y][x];
      const drawX = x * tileSize;
      const drawY = y * tileSize;

      if (tile === "#") {
        drawForestWallTile(ctx, drawX, drawY);
      } else if (tile === "g") {
        drawGrassTile(ctx, drawX, drawY);
      } else if (tile === "~") {
        drawWaterTile(ctx, drawX, drawY);
      } else if (tile === "L") {
        drawCabinTile(ctx, drawX, drawY);
      } else if (tile === "B") {
        drawBlockadeTile(ctx, drawX, drawY);
      } else {
        drawGroundTile(ctx, drawX, drawY);
      }
    }
  }

  if (map.id === "windfall-bridge-trail") {
    drawFogOverlay(ctx);
  }

  map.signs.forEach((sign) => {
    const drawX = sign.position.x * tileSize;
    const drawY = sign.position.y * tileSize;
    drawSign(ctx, drawX, drawY);
  });

  map.exits.forEach((exit) => {
    const drawX = exit.position.x * tileSize;
    const drawY = exit.position.y * tileSize;
    drawExitMarker(ctx, drawX, drawY);
  });

  map.npcs.forEach((npc) => drawNpc(ctx, npc));
  drawPlayer(ctx, player);
}

function drawBattleCreature(
  ctx: CanvasRenderingContext2D,
  creature: CreatureState,
  x: number,
  y: number,
  mirrored = false
) {
  const flip = mirrored ? -1 : 1;
  const bodyWidth = 28;
  const bodyHeight = 16;
  drawEllipse(ctx, x + 20 * flip, y + 28, 18, 5, "rgba(36, 53, 29, 0.25)");
  drawRect(ctx, x + 8 * flip, y + 11, bodyWidth * flip, bodyHeight, creature.body);
  drawRect(ctx, x + 13 * flip, y + 6, 18 * flip, 10, creature.body);
  drawRect(ctx, x + 23 * flip, y + 4, 8 * flip, 5, creature.accent);
  drawRect(ctx, x + 29 * flip, y + 14, 7 * flip, 4, creature.accent);
  drawRect(ctx, x + 7 * flip, y + 21, 7 * flip, 4, palette.dark);
  drawRect(ctx, x + 21 * flip, y + 21, 7 * flip, 4, palette.dark);
  drawRect(ctx, x + 15 * flip, y + 9, 10 * flip, 3, "rgba(255,255,255,0.18)");
  drawRect(ctx, x + 20 * flip, y + 10, 2 * flip, 2, palette.dark);
  drawRect(ctx, x + 30 * flip, y + 18, 8 * flip, 2, palette.soilDark);
}

function drawHpBox(
  ctx: CanvasRenderingContext2D,
  title: string,
  level: number,
  hp: number,
  maxHp: number,
  x: number,
  y: number
) {
  drawRect(ctx, x, y, 88, 30, "#edf6dc");
  drawRect(ctx, x + 1, y + 1, 86, 28, "#dcefb8");
  drawRect(ctx, x + 1, y + 1, 86, 4, "#c4dda3");
  ctx.fillStyle = palette.dark;
  ctx.font = "10px 'Courier New'";
  ctx.fillText(title, x + 6, y + 11);
  ctx.fillText(`Lv${level}`, x + 58, y + 11);
  drawRect(ctx, x + 8, y + 16, 68, 6, "#b3cc87");
  drawRect(ctx, x + 8, y + 16, Math.max(6, Math.floor((hp / maxHp) * 68)), 6, hp / maxHp > 0.4 ? "#487340" : "#8a6233");
  ctx.fillText(`${hp}/${maxHp}`, x + 34, y + 28);
}

function drawBattle(ctx: CanvasRenderingContext2D, partner: CreatureState, battle: BattleState) {
  const sky = ctx.createLinearGradient(0, 0, 0, 112);
  sky.addColorStop(0, palette.battleSky);
  sky.addColorStop(1, palette.battleSkyFar);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  drawRect(ctx, 0, 112, canvasWidth, canvasHeight - 112, palette.battleGround);
  drawRect(ctx, 0, 146, canvasWidth, canvasHeight - 146, palette.battleGroundDark);
  drawEllipse(ctx, 60, 130, 44, 14, "#b6c98f");
  drawEllipse(ctx, 188, 74, 34, 10, "#c8ddaa");
  drawRect(ctx, 12, 108, 36, 20, "#80945d");
  drawRect(ctx, 202, 92, 24, 12, "#88a56a");

  if (battle.enemy) {
    drawBattleCreature(ctx, battle.enemy, 170, 40);
    drawHpBox(ctx, battle.enemy.name, battle.enemy.level, battle.enemy.hp, battle.enemy.maxHp, 18, 18);
  }

  drawBattleCreature(ctx, partner, 96, 116, true);
  drawHpBox(ctx, partner.name, partner.level, partner.hp, partner.maxHp, 146, 116);
}

export function renderScene(
  ctx: CanvasRenderingContext2D,
  scene: SceneName,
  map: MapData,
  player: PlayerState,
  partner: CreatureState,
  battle: BattleState
) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (scene === "battle") {
    drawBattle(ctx, partner, battle);
    return;
  }

  drawWorld(ctx, map, player);
}
