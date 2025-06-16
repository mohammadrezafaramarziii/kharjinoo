export function accountNumberCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "\u2000");
  }
  