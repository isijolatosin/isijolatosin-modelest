import React from "react";

const ListComponent = React.memo(({ item }) => {
  return (
    <div
      key={item?.id}
      className="tw-flex tw-flex-col lg:tw-grid lg:tw-grid-cols-2 tw-w-[70%] tw-p-3 tw-mt-5">
      <span>
        <strong>Length: </strong>
        {item?.length}
      </span>
      <span>
        <strong>Quantity: </strong>
        {item?.quantity}
      </span>
      <span>
        <strong>Price: $</strong>
        {item?.price * item?.quantity}
      </span>
      <span>
        <strong>Color: </strong>
        {item?.color}
      </span>
      <span>
        <strong>Name: </strong>
        {item?.title}
      </span>
      <span>
        <strong>No: </strong>
        {item?.orderNo}
      </span>
      <span>
        <strong>Date: </strong>
        {item?.timestamp}
      </span>
    </div>
  );
});

export default ListComponent;
