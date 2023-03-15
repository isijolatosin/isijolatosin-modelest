import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import BundleCard from "../components/BundleCard";
import { useGlobalContext } from "../context/useContextHook";

function IndianDeal() {
  const [bundleDeals, setBundleDeals] = React.useState([]);
  const [bundleDealsPercentage, setBundleDealsPercentage] = React.useState(0);

  const { fetchBundlePercentage } = useGlobalContext();
  React.useEffect(() => {
    setBundleDealsPercentage(fetchBundlePercentage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProducts() {
    try {
      const {
        data: { products },
      } = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
      const filtered = [];
      // eslint-disable-next-line array-callback-return
      products.filter((product) => {
        if (product?.with) {
          filtered.push(product);
        }
      });
      setBundleDeals(filtered);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>Indian-Hair-Bundle-Deals</title>
      </Helmet>
      <Layout sales={bundleDealsPercentage}>
        <div className="tw-pt-[95px] md:tw-pt-[60px] tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10">
          <div className="tw-w-full tw-flex tw-flex-wrap tw-justify-center tw-mx-auto">
            {bundleDeals.map((product) => (
              <BundleCard
                key={product?._id}
                product={product}
                sales={bundleDealsPercentage}
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default IndianDeal;
