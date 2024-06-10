import React from "react";
import Button from "./shared/Button";
import axios from "axios";

const SingleProductEditForm = ({ singleProduct, setSingleProduct }) => {
  const [postError, setPostError] = React.useState("");
  const [name, setName] = React.useState(singleProduct?.name);
  const [brand, setBrand] = React.useState(singleProduct?.brand);
  const [density, setDensity] = React.useState(singleProduct?.density);
  const [texture, setTexture] = React.useState(singleProduct?.texture);
  const [capsize, setCapsize] = React.useState(singleProduct?.capsize);
  const [type, setType] = React.useState(singleProduct?.type);
  const [color, setColor] = React.useState(singleProduct?.color);
  const [availablecolor, setAvailablecolor] = React.useState(
    singleProduct?.availablecolor
  );
  const [price, setPrice] = React.useState(singleProduct?.price);
  const [video, setVideo] = React.useState(singleProduct?.video);
  const [length, setLength] = React.useState(singleProduct?.length);
  const [availablelength, setAvailablelength] = React.useState(
    singleProduct?.availablelength
  );
  const [dealLength, setDealLength] = React.useState(singleProduct?.dealLength);
  const [description, setDescription] = React.useState(
    singleProduct?.description
  );
  const [instock, setInstock] = React.useState(singleProduct?.instock);
  const [salespercent, setSalespercent] = React.useState(
    singleProduct?.salespercent
  );

  async function updateSingleProduct(e) {
    e.preventDefault();
    const id = singleProduct?.id;
    try {
      const product = {
        id: id,
        name: name,
        brand: brand,
        density: density,
        texture: texture,
        capsize: capsize,
        type: type,
        color: color,
        availablecolor: availablecolor,
        price: { ...singleProduct?.priceObj, [length]: price.toString() },
        video: video,
        length: length,
        availablelength: availablelength,
        dealLength: dealLength,
        description: description,
        instock: instock,
        salespercent: salespercent,
      };

      if (
        [
          product.name,
          product.brand,
          product.type,
          product.color,
          product.length,
          product.description,
        ].includes("" || null)
      ) {
        return setPostError("Missing Credentials");
      }
      await axios.patch(
        `${process.env.REACT_APP_BASE_ROUTE}/products/${id}`,
        product
      );
      setPostError("");
    } catch (error) {
      setPostError(error.message ? "Please check your input fields" : "");
      console.log(error);
    }
    setSingleProduct(null);
    window.location.reload();
  }

  return (
    <div className="tw-w-[100%]">
      <span className=" tw-text-xl tw-text-neutral-800 tw-flex tw-flex-col tw-items-center tw-mt-10">
        Edit Product
      </span>
      <span className="tw-text-neutral-500 tw-text-xs tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2">{`ProductID: ${singleProduct.id}`}</span>
      <span className="tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2 tw-capitalize tw-text-xs tw-text-violet-700">
        Please ensure to edit all field for better performance
      </span>
      <form onSubmit={updateSingleProduct}>
        <div className="tw-flex tw-flex-col tw-items-center">
          <div className="lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-2">
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Title
              </legend>
              <input
                type="text"
                name="name"
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Brand
              </legend>
              <input
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Product brand"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Density
              </legend>
              <input
                type="text"
                name="density"
                id="density"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                placeholder="Product density"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Texture
              </legend>

              <input
                type="text"
                name="texture"
                id="texture"
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
                placeholder="Product texture"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Cap size
              </legend>
              <input
                type="text"
                name="capsize"
                id="capsize"
                value={capsize}
                onChange={(e) => setCapsize(e.target.value)}
                placeholder="Product capsize"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Type
              </legend>
              <input
                type="text"
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Product type"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Color
              </legend>
              <input
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Product color"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Available Color
              </legend>
              <input
                type="text"
                name="availablecolor"
                id="availablecolor"
                value={availablecolor}
                onChange={(e) => setAvailablecolor(e.target.value)}
                placeholder="Product availablecolor"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Length
              </legend>
              <input
                type="text"
                name="length"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Product length"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Available length
              </legend>
              <input
                type="text"
                name="availablelength"
                id="availablelength"
                value={availablelength}
                onChange={(e) => setAvailablelength(e.target.value)}
                placeholder="Product availablelength"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Deal length
              </legend>
              <input
                type="text"
                name="dealLength"
                id="dealLength"
                value={dealLength}
                onChange={(e) => setDealLength(e.target.value)}
                placeholder="Product dealLength"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Video
              </legend>
              <input
                type="text"
                name="video"
                id="video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="Product video"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
            <fieldset className="tw-relative">
              <legend className="tw-absolute tw-right-0 tw-text-xs tw-bg-violet-300 tw-text-white tw-px-1 tw-rounded-sm">
                Price
              </legend>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product price"
                className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
              />
            </fieldset>
          </div>

          <textarea
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={50}
            placeholder="Description..."
            className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
          />
          <div className="tw-flex tw-items-center tw-justify-between lg:tw-w-[40%] tw-mx-auto tw-w-[90%]">
            <div className="tw-rounded tw-flex tw-justify-center tw-items-center tw-flex-row tw-shadow-xl tw-pl-2 tw-bg-white tw-w-[300px]">
              <label className="tw-w-[60%] tw-text-xs tw-text-neutral-400 tw-font-thin">
                Sales Percent
              </label>
              <input
                id="salespercent"
                name="salespercent"
                type="number"
                onChange={(e) => {
                  if (+e.target.value > 0) setSalespercent(+e.target.value);
                  if (+e.target.value <= 0) setSalespercent(0);
                }}
                placeholder="%"
                value={(+salespercent > 0 && salespercent) || ""}
                className="tw-w-[40%] tw-text-xs tw-text-neutral-400 tw-h-full tw-bg-neutral-200 tw-border-none focus:tw-ring-0 tw-border-0 placeholder:tw-text-neutral-400 placeholder:tw-text-xs placeholder:tw-font-light"
              />
            </div>
            <div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-shadow-xl tw-p-2">
              <label className="tw-mr-3 tw-text-xs tw-text-neutral-400 tw-font-thin">
                Instock
              </label>
              <input
                type="checkbox"
                name="instock"
                checked={instock}
                className={
                  singleProduct.instock
                    ? "tw-ml-2 tw-rounded-full tw-bg-violet-400"
                    : "tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200"
                }
                onChange={(e) => {
                  if (e.target.value === "on") {
                    setInstock(true);
                  } else {
                    setInstock(false);
                  }
                }}
              />
            </div>
          </div>
          {postError && (
            <span className="tw-text-xs tw-text-red-700">{`Error: ${postError}`}</span>
          )}
          <div className="tw-my-10">
            <Button type="submit">Update Inventory</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleProductEditForm;
