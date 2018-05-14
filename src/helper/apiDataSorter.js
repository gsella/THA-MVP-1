export const sortInsightsByCategoryAndOrder = categories => (a, b) => {
  if (
    categories[a.categoryId].abbreviation >
    categories[b.categoryId].abbreviation
  ) {
    return 1;
  }
  if (
    categories[a.categoryId].abbreviation <
    categories[b.categoryId].abbreviation
  ) {
    return -1;
  }
  return a.order - b.order;
};
