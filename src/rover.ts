export {};

const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;
const headings = ["North", "East", "South", "West"];
let x = 2;
let y = 2;
let tableIndex = 0;

const directionTable = [
  {
    name: "Down",
    offset: { x: 0, y: -1 },
  },
  {
    name: "Right",
    offset: { x: 1, y: 0 },
  },
  {
    name: "Up",
    offset: { x: 0, y: 1 },
  },
  {
    name: "Left",
    offset: { x: -1, y: 0 },
  },
];

interface Command {
  moveTo: string;
  execute(): void;
}

function runCmd(cmd: Command) {
  cmd.execute();
}

const forwardCmd: Command = {
  moveTo: "Forward",
  execute() {
    x = Math.min(4, Math.max(0, x + directionTable[tableIndex].offset.x));
    y = Math.min(4, Math.max(0, y + directionTable[tableIndex].offset.y));
    drawRover();
  },
};

const rightCmd: Command = {
  moveTo: "Right",
  execute() {
    tableIndex = (tableIndex + 1) % 4;
    drawRover();
  },
};

function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + x * 56, 38 + y * 56);
  ctx.rotate(tableIndex * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${x}, ${y}) · Facing: ${
    headings[tableIndex]
  }`;
}

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  runCmd(forwardCmd);
};
document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  runCmd(rightCmd);
};
document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  x = 2;
  y = 2;
  tableIndex = 0;
  drawRover();
};
drawRover();
