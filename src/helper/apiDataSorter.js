export const sortInsightsByCategoryAndOrder = categories => (a, b) => {
  if (
    categories.categories[a.categoryId].abbreviation >
    categories.categories[b.categoryId].abbreviation
  ) {
    return 1;
  }
  if (
    categories.categories[a.categoryId].abbreviation <
    categories.categories[b.categoryId].abbreviation
  ) {
    return -1;
  }
  return a.order - b.order;
};
