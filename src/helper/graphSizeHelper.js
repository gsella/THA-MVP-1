export function graphSizeHelper(tags, options, zoom) {
  const graphLayout = document.getElementsByClassName('graph-layout-wrapper')[0];
  const tagsArray = tags ? Object.values(tags) : [];

  if (graphLayout && tagsArray.length > 0) {
    const height = graphLayout.clientHeight - 90;
    const width = graphLayout.clientWidth - 80;
    const impactSize = height / 3 < options.minHeigth ? options.minHeigth : height / 3;
    const tagSize = width / tagsArray.length < options.minWidth ? options.minWidth : width / tagsArray.length;
    return { height: impactSize * zoom, width: tagSize * zoom };
  }

  return { height: options.minHeigth, width: options.minWidth };
}
