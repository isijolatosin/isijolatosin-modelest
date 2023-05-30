import React, { useCallback, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import { getDatabase, ref, set } from "firebase/database";
import Heading from "../components/Heading";
import Inventory from "../components/Inventory";
import Layout from "../components/shared/Layout";
import Shipment from "../components/Shipment";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import AllInventories from "../components/AllInventories";
import { UserContext } from "../context/user-context";
import {
  MdAdd,
  MdOutlineInventory,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { CATEGORY, PRODUCT } from "../constant";
import useFetchHook from "../utils/useFetchHook";

const Management = React.memo(() => {
  const database = getDatabase();
  const [categories, setCategories] = React.useState([]);
  const [fetchAllData, setFetchAllData] = React.useState([]);
  const [section, setSection] = React.useState("all-inventory");
  const { user } = useContext(UserContext);
  let percentSale;
  let selectType;
  const inputRef = useRef(percentSale);
  const selectRef = useRef(selectType);
  const salesType = [
    { name: "Select sales type", id: 0 },
    { name: "amb", id: 1 },
    { name: "sales", id: 2 },
    { name: "bundle", id: 3 },
  ];

  const url = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
  const url2 = `${process.env.REACT_APP_BASE_ROUTE}/${CATEGORY}`;
  const type = PRODUCT;
  const type2 = CATEGORY;
  const fetchProductsRes = useFetchHook(url, type);
  const fetchCategoriesRes = useFetchHook(url2, type2);

  const fetchProducts = useCallback(async () => {
    setFetchAllData(fetchProductsRes);
  }, [fetchProductsRes]);
  const fetchCategories = useCallback(async () => {
    setCategories(fetchCategoriesRes);
  }, [fetchCategoriesRes]);

  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const toggleSection = (e) => {
    setSection(e.target.id);
  };

  const SectionComp = () => {
    switch (section) {
      case "all-inventory":
        return <AllInventories fetchAllData={fetchAllData} />;
      case "inventory":
        return <Inventory categories={categories} />;
      case "shipping":
        return <Shipment />;

      default:
        break;
    }
  };

  function handleSalesSubmit() {
    switch (selectType) {
      case "sales":
        return (
          percentSale &&
          set(ref(database, "sales"), {
            no: +percentSale,
          })
        );
      case "amb":
        return (
          percentSale &&
          set(ref(database, "ambassador"), {
            no: +percentSale,
          })
        );
      case "bundle":
        return (
          percentSale &&
          set(ref(database, "bundle deals"), {
            no: +percentSale,
          })
        );
      default:
        break;
    }
  }

  function handleSelect() {
    selectType = selectRef.current.value;
  }
  function handlePercentSale() {
    percentSale = inputRef.current.value;
  }

  return (
    <>
      <Helmet>
        <title>Admin Portal</title>
      </Helmet>
      <Layout>
        <div className="tw-bg-neutral-200 tw-px-5">
          <div className="tw-pt-[120px] tw-flex tw-flex-col tw-w-[100%] tw-items-center tw-max-w-max-content-width tw-mx-auto">
            <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-w-full md:tw-w-[80%]">
              <div className="tw-mb-2 md:tw-mb-0 tw-ml-2 md:tw-ml-0">
                <Heading
                  children="Management portal"
                  isBold={true}
                  size3={true}
                />
              </div>
              <div className="tw-flex tw-flex-col md:tw-flex-row">
                <div className="tw-mr-5 tw-mb-2 tw-flex tw-items-center tw-justify-end tw-w-[75%] md:tw-w-[50%] tw-rounded-full tw-px-3 tw-text-sm tw-bg-neutral-100">
                  <select
                    ref={selectRef}
                    className="tw-w-[90%] tw-text-gray-400 tw-text-sm tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-none focus:tw-ring-0 focus:tw-ring-none disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 tw-bg-transparent"
                    onChange={handleSelect}
                    id="sales type"
                    value={salesType?.name}
                    name="sales type">
                    {salesType.map((item, idx) => (
                      <option key={idx}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="tw-mb-2 tw-py-[2px] tw-flex tw-items-center tw-justify-end tw-w-[75%] md:tw-w-[50%] tw-rounded-full tw-px-3 tw-text-sm tw-bg-neutral-100">
                  <input
                    ref={inputRef}
                    type="number"
                    step="any"
                    name="Percentage"
                    id="number"
                    value={percentSale}
                    onChange={handlePercentSale}
                    placeholder="sales %"
                    className="tw-w-[90%] tw-h-[30px] tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 tw-bg-transparent"
                  />
                  <RiSendPlaneLine
                    onClick={handleSalesSubmit}
                    size={20}
                    className="tw-text-violet-700 hover:tw-text-violet-300 tw-ease-in tw-duration-300 tw-w-[10%] tw-mr-2"
                  />
                </div>
              </div>
            </div>
            <div className="tw-my-5 tw-w-full tw-text-violet-700">
              <ul className="tw-flex tw-text-[10px] md:tw-text-xs tw-flex-row tw-items-center tw-justify-between tw-w-[95%] lg:tw-w-[50%] tw-mx-auto">
                <li
                  id="all-inventory"
                  className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
                  onClick={toggleSection}>
                  <MdOutlineInventory className="tw-mr-1" /> Inventories
                </li>
                <li
                  id="inventory"
                  className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
                  onClick={toggleSection}>
                  <MdAdd className="tw-mr-1" /> Inventory
                </li>
                <li
                  id="shipping"
                  className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
                  onClick={toggleSection}>
                  <MdOutlineLocalShipping className="tw-mr-1" />
                  Shipment
                </li>
              </ul>
            </div>
            {user && (
              <div className="tw-w-[100%]">
                <SectionComp />
              </div>
            )}
            {!section && (
              <div className="tw-flex tw-flex-col tw-items-center tw-my-20 ">
                <div className="tw-text-2xl tw-text-stone-600">
                  <BsFillArrowUpSquareFill />
                </div>
                <span className="tw-text-stone-600 tw-my-5 tw-capitalize tw-font-light">
                  Action Required!
                </span>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
});

export default Management;
