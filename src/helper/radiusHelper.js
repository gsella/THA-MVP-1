import IMPACTS from 'constants/impactConstants';
import * as d3 from 'd3';

export function radiusHelper(tags, bubbles, categories) {
  const maxСongestion = {
    items: [],
    size: 0,
  };

  const tagsArray = Object.values(tags);
  const impactsArray = Object.values(IMPACTS);

  const filledBubbles = bubbles.map(bubble => {
    bubble.category = categories[bubble.categoryId];
    bubble.tag = tags[bubble.tagId].name;
    return bubble;
  });

  impactsArray.forEach(impact => {
    tagsArray.forEach(tag => {
      const currentBubbles = filledBubbles.filter(bubble => bubble.tag === tag.name && bubble.popularity === impact);
      const items = currentBubbles.map(bubble => ({
        label: bubble.categoryKey,
        color: bubble.category.color,
        size: bubble.instances,
      }));
      let size = 0;

      items.forEach(item => {
        size += item.size;
      });

      if (maxСongestion.size < size) {
        maxСongestion.items = items;
        maxСongestion.size = size;
      }
    });
  });

  return getRadiuses(maxСongestion);
}

function getRadiuses(maxСongestion) {
  const radiuses = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };

  const auxiliaryBubbles = [
    { label: '', color: '', size: 1 },
    { label: '', color: '', size: 2 },
    { label: '', color: '', size: 3 },
    { label: '', color: '', size: 4 },
    { label: '', color: '', size: 5 },
  ];

  auxiliaryBubbles.forEach(bubble => {
    const items = maxСongestion.items.filter(item => bubble.size === item.size);
    if (items.length === 0) {
      maxСongestion.items.push(bubble);
    }
  });

  const diameter = 200;

  const bubble = d3
    .pack()
    .size([diameter, diameter])
    .padding(5);

  const root = d3
    .hierarchy({ children: maxСongestion.items })
    .sum(d => d.size)
    .sort((a, b) => b.size - a.size);

  bubble(root);
  root.children.forEach(child => {
    radiuses[child.value] = child.r;
  });

  return radiuses;
}
