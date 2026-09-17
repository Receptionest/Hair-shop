export const WHATSAPP_NUMBER = "27823361947";

export function formatRand(value: number) {
  return `R${value.toLocaleString("en-ZA")}`;
}

export function fromPrice(options: { label: string; price: number }[]) {
  return Math.min(...options.map((o) => o.price));
}
