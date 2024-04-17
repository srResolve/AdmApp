export const totalPriceCalc = (items: { name: string; value: number; quantity: number }[]) => {
  if (!items || items.length === 0) return;
  return items
    .map((t) => t.value * t.quantity)
    .reduce((a, b) => a + b)
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};
