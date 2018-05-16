export const sortInsightsByCategoryAndOrder = categories => (a, b) => {
  if ('isEmpty' in a ? a.isEmpty : false) {
    return 1;
  }
  if ('isEmpty' in b ? b.isEmpty : false) {
    return -1;
  }
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
