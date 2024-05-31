// src/SortableList.js
import React, { useState, useCallback } from 'react';
import SortableItem from './SortableItem';

const SortableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setItems(newItems);
  }, [items]);

  return (
    <div>
      {items.map((item, index) => (
        <SortableItem
          key={item.id}
          id={item.id}
          text={item.text}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

export default SortableList;
