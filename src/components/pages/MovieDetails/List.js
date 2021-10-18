import React, { useState } from "react";
import ListItem from "./ListItem";

export default function List({ items }) {
  const [itemsToShow, setItemsToShow] = useState(5);
  return (
    <>
      <ul className="font-medium text-md">
        {items.slice(0, itemsToShow).map((item) => {
          return <ListItem key={item.id} {...item} />;
        })}
      </ul>
      {itemsToShow < items.length && (
        <button
          type="button"
          onClick={() => setItemsToShow(items.length)}
          className="w-full font-bold py-4 text-left text-sm hover:underline hover:text-primary-color-light transition-colors duration-100"
        >
          Show more
        </button>
      )}
    </>
  );
}
