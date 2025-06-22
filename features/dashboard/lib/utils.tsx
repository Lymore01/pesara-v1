export const formatMoney = (value: number | string) =>
  new Intl.NumberFormat("en-KE").format(Number(value));
