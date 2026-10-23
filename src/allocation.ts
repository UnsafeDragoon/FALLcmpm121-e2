export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let currProducers = 2;

function update() {
  const values = calculate();
  resetHUD(values);
}

function calculate() {
  const productRate: number = currProducers * 3;
  const crewSize: number = 6;
  const netGain: number = productRate - crewSize;

  return { productRate, crewSize, netGain };
}

function resetHUD(
  values: { productRate: number; crewSize: number; netGain: number },
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createVisual(values.productRate, values.crewSize);
  updateText(values.productRate, values.crewSize, values.netGain);
}

function createVisual(productRate: number, crewSize: number) {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < currProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < currProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${currProducers} / 6`, 18, 76);

  const rows = [
    {
      label: "Production:",
      data: productRate,
      color: "#27766b",
    },
    {
      label: "Consumption:",
      data: crewSize,
      color: "#a44d23",
    },
  ];

  rows.forEach((row, index) => {
    createRow(row, index);
  });
}

function createRow(
  rowData: { label: string; data: number; color: string },
  index: number,
) {
  ctx.fillStyle = "#233e43";
  ctx.fillText(`${rowData.label} ${rowData.data}`, 18, 102 + (52 * index));
  ctx.fillStyle = rowData.color;
  ctx.fillRect(18, 110 + (52 * index), rowData.data * 14, 20);
}

function updateText(productRate: number, crewSize: number, netGain: number) {
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
