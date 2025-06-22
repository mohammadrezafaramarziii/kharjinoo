export type CategoryType = {
  name: string;
  description?: string;
};

export type CategoryEditType = CategoryType & { id: number };
