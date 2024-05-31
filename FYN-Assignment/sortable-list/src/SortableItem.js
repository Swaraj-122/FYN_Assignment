import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  ITEM: 'item',
};

const SortableItem = ({ id, text, index, moveItem }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover(item) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`sortable-item ${isDragging ? 'dragging' : ''}`}
    >
      {text}
    </div>
  );
};

export default SortableItem;
