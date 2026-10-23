export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let currProducers = 2;

function update() {
  const productRate = currProducers * 3;
  const crewSize = 6;
  const netGain = productRate - crewSize;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < currProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < currProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${currProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${productRate}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, productRate * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${crewSize}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, crewSize * 14, 20);
  readout.textContent =
    `Assigned: ${currProducers}/6 · Production: ${productRate} · Consumption: ${crewSize} · Balance: ${
      netGain > 0 ? "+" : ""
    }${netGain}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  currProducers = Math.max(0, currProducers - 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  currProducers = Math.min(6, currProducers + 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    currProducers = 2;
    update();
  };
update();
