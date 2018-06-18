import { radiusHelper } from 'helper/radiusHelper';

export function graphSizeHelper(tags, options, zoom, graphLayoutClass) {
  const graphLayout = document.getElementsByClassName(graphLayoutClass)[0];
  const tagsArray = tags ? Object.values(tags) : [];

  if (graphLayout && tagsArray.length > 0) {
    const height = graphLayout.clientHeight - 105;
    const width = graphLayout.clientWidth - 80;
    const impactSize =
      height / 3 < options.minHeigth ? options.minHeigth : height / 3;
    const tagSize =
      width / tagsArray.length < options.minWidth
        ? options.minWidth
        : width / tagsArray.length;
    return { height: impactSize * zoom, width: tagSize * zoom };
  }

  return { height: options.minHeigth, width: options.minWidth };
}

export function graphParamsInitialize(
  tags,
  insights,
  categories,
  zoom,
  graphSize,
  counter
) {
  let graphParams = {
    radiuses: {},
    graphSize,
    counter,
  };

  graphParams.graphSize.height += counter * 20 * zoom;
  graphParams.graphSize.width += counter * 22 * zoom;

  do {
    graphParams.radiuses = insights
      ? radiusHelper(tags, insights, categories, graphParams.graphSize)
      : undefined;

    if (
      graphParams.radiuses['1'] / zoom < 13.7 &&
      graphSize.height / zoom < 460
    ) {
      graphParams.graphSize.height += 20;
      graphParams.graphSize.width += 22;
      graphParams.counter += 1;
    }
  } while (
    graphParams.radiuses['1'] / zoom < 13.7 &&
    graphParams.graphSize.height / zoom < 460
  );

  return graphParams;
}
