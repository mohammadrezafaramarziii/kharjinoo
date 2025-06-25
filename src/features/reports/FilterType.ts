export type Filters = {
  type: "all" | "0" | "1";
  category: number | null;
  card: number | null;
  fromDate: Date | null;
  toDate: Date | null;
};
