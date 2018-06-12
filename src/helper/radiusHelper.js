import { IMPACTS } from 'constants/impactConstants';
import * as d3 from 'd3';

export function radiusHelper(tags, bubbles, categories, size) {
  const tagsArray = Object.values(tags);
  const impactsArray = Object.values(IMPACTS);

  const filledBubbles = bubbles.map(bubble => {
    bubble.category = categories[bubble.categoryId];
    bubble.tag = tags[bubble.tagId].name;
    return bubble;
  });

  const maxСongestion = getMaxСongestion(
    tagsArray,
    impactsArray,
    filledBubbles
  );

  return getRadiuses(maxСongestion, size);
}

function getMaxСongestion(tags, impacts, bubbles) {
  const maxСongestion = {
    items: [],
    size: 0,
  };

  impacts.forEach(impact => {
    tags.forEach(tag => {
      const currentBubbles = bubbles.filter(
        bubble => bubble.tag === tag.name && bubble.impact === impact
      );
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

  return maxСongestion;
}

function getRadiuses(maxСongestion, size) {
  const radiuses = {};
  for (let key in SIZES) {
    radiuses[SIZES[key]] = 0;
  }

  maxСongestion.items = mapSizes(maxСongestion.items);

  let auxiliaryBubbles = [];
  for (let i = 0; i < 5; i++) {
    auxiliaryBubbles.push({ label: '', color: '', size: i + 1 });
  }
  auxiliaryBubbles = mapSizes(auxiliaryBubbles);

  auxiliaryBubbles.forEach(bubble => {
    const items = maxСongestion.items.filter(item => bubble.size === item.size);
    if (items.length === 0) {
      maxСongestion.items.push(bubble);
    }
  });

  const bubble = d3
    .pack()
    .size([size.width, size.height])
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

export function mapSizes(items) {
  // mapping sizes from 1, 2, 3, 4, 5 to 1, 3, 5, 8, 14
  const newItems = items.map(item => ({
    ...item,
    size:
      item.size < 4
        ? 2 * item.size - 1
        : Math.pow(2, item.size - 1) - 2 * (item.size % 2),
  }));

  return newItems;
}

const SIZES = {
  SIZE_1: '1',
  SIZE_2: '3',
  SIZE_3: '5',
  SIZE_4: '8',
  SIZE_5: '14',
};
