import React, { useContext, useCallback } from "react";
import { Helmet } from "react-helmet";
import Heading from "../components/Heading";
import Layout from "../components/shared/Layout";
import { UserContext } from "../context/user-context";
import { db } from "../firebase";
import ProfileCard from "../components/shared/ProfileCard";
import ListComponent from "../components/shared/ListComponent";
import useFetchDBHook from "../utils/useFetchDBHook";

function Account() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartHist, setCartHist] = React.useState([]);
  const { user } = useContext(UserContext);

  let myTimeout;
  clearTimeout(myTimeout);
  if (isLoading) {
    myTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  const type = "account";
  const Hist = useFetchDBHook(db, type, user);
  const fetchAccountHist = useCallback(() => {
    let timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setCartHist(Hist);
    }, 3000);
  }, [Hist]);
  React.useEffect(() => {
    fetchAccountHist();
  }, [fetchAccountHist]);

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Layout>
        <div className="tw-pt-[110px] md:tw-pt-[100px] tw-pb-[110px] md:tw-pb-[100px] tw-px-5 tw-bg-gray-300 tw-flex tw-flex-col tw-items-center">
          <div className="tw-w-full lg:tw-w-[95%]">
            <ProfileCard data={user} />
            <div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm tw-w-[100%]">
              <Heading children="Cart History" isBold={true} />

              <div className="tw-w-[100%]">
                {cartHist?.length < 1 ? (
                  isLoading ? (
                    <div className="tw-my-2">
                      <div className="tw-rounded-full progress tw-w-[30%]">
                        <div className="inner"></div>
                      </div>
                    </div>
                  ) : (
                    <span className="tw-text-red-700 tw-text-sm">
                      No Cart History Found...
                    </span>
                  )
                ) : (
                  <div className="tw-grid tw-grid-cols-1 tw-gap-x-3 lg:tw-grid-cols-2 2xl:tw-grid-cols-3 ">
                    {cartHist?.map((item, idx) => (
                      <div
                        key={idx}
                        className="tw-bg-neutral-200 tw-font-light tw-text-xs tw-text-neutral-900 tw-mb-3 tw-rounded-lg">
                        <div className="tw-flex tw-w-full tw-h-[150px] lg:tw-h-[100px] tw-flex-row tw-items-center tw-justify-between ">
                          <ListComponent item={item} />
                          <img
                            src={item?.image}
                            alt={item?.title}
                            loading="lazy"
                            className=" tw-rounded-tr-lg tw-w-[30%] md:tw-w-[20%] tw-h-[100%] tw-object-cover"
                          />
                        </div>
                        <div className="tw-m-3 tw-border-t-[1px] tw-border-neutral-400 tw-text-xs tw- tw-py-3">
                          <span>
                            <strong>Description: </strong> {item?.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Account;
