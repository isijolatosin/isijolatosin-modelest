import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { db } from "../firebase";
import firebase from "../firebase";
import { RiHomeLine } from "react-icons/ri";
import useFetchDBHook from "../utils/useFetchDBHook";
import { AMB, AMBASSADOR } from "../constant";
import AmbassadorForm from "../components/shared/AmbassadorForm";

const Ambassador = () => {
  const [ambObj, setAmbObj] = useState({});
  const [exist, setAlreadyExist] = React.useState(false);
  const [ambCode, setAmbCode] = React.useState("");
  const type = AMB;
  const allAmb = useFetchDBHook(db, type);

  const handleUpdateAmbObj = (e) => {
    setAmbObj({ ...ambObj, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        !!ambObj.accountNo,
        !!ambObj.bankName,
        !!ambObj.firstname,
        !!ambObj.lastname,
        !!ambObj.email,
        !!ambObj.code,
        !!ambObj.phone,
        !!ambObj.country,
        !!ambObj.date,
      ].every((a) => a === true) &&
      [!!ambObj.instagram, !!ambObj.tiktok, !!ambObj.snapchat].includes(true)
    ) {
      const code = `AMB${ambObj.country
        .slice(0, 3)
        .toUpperCase()}${Math.random().toString(18).slice(2).toUpperCase()}`;

      const index =
        allAmb && allAmb?.findIndex((obj) => obj.email === ambObj.email);
      if (!index || index < 0) {
        db.collection(AMBASSADOR)
          .add({
            accountNo: ambObj?.accountNo,
            bankName: ambObj?.bankName,
            country: ambObj?.country,
            date: ambObj?.date,
            email: ambObj?.email,
            displayName: `${ambObj?.firstname} ${ambObj?.lastname}`,
            instagram: ambObj?.instagram,
            phone: ambObj?.code + ambObj?.phone,
            state: ambObj?.state,
            snapchat: ambObj?.snapchat ? ambObj?.snapchat : "",
            tiktok: ambObj?.tiktok ? ambObj?.tiktok : "",
            yourSalesCode: code,
            totalSales: 0,
            month: "",
            monthCount: 0,
            currentMonthIncome: 0,
            role: `${ambObj?.country}-${AMB}`,
          })
          .then(() => {
            setAmbObj({});
            setAlreadyExist(false);
            setAmbCode(code);
          });

        db.collection("authorized-users").onSnapshot((snapshot) => {
          // eslint-disable-next-line array-callback-return
          snapshot.docs.filter((doc) => {
            // const savedData = doc.data()?.adminUsers;
            db.collection("authorized-users")
              .doc(doc.id)
              .set(
                {
                  adminUsers: firebase.firestore.FieldValue.arrayUnion({
                    code: code,
                    email: ambObj?.email,
                    type: AMB,
                  }),
                },
                { merge: true }
              );
          });
        });
      } else {
        setAlreadyExist(true);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Ambassador Sign Up</title>
      </Helmet>
      <Layout>
        <section className="tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 logo">
          <div className="tw-text-center tw-relative">
            <div className="tw-w-[55%] tw-mx-auto tw-my-10 tw-text-neutral-50 tw-font-light">
              <Link to="/">
                <span className="tw-text-[#bba371]">modelEst.</span>
              </Link>
            </div>
            <Link
              to="/"
              className="tw-absolute tw-top-[-60px] md:tw-top-[-100px] tw-left-[15px] tw-flex tw-items-center tw-text-[#bba371]">
              <RiHomeLine size={25} />
              <p className="tw-ml-1 tw-text-xs">Home</p>
            </Link>
          </div>
          <AmbassadorForm
            ambObj={ambObj}
            handleUpdateAmbObj={handleUpdateAmbObj}
            handleSubmit={handleSubmit}
            exist={exist}
          />
          <div
            className={`tw-flex tw-flex-col tw-items-center tw-text-white tw-mb-5 tw-ease-in tw-duration-500 ${
              ambCode ? "tw-opacity-1 tw-scale-100" : "tw-opacity-0 tw-scale-50"
            }`}>
            <p className="tw-text-xs">Your personal sales code is</p>
            <p className="yellow tw-bg-white tw-text-neutral-900  tw-px-20 tw-w-fit tw-flex">
              {ambCode}
            </p>
          </div>

          <div>
            <p className="tw-text-neutral-300 tw-font-light tw-text-center  tw-text-xs ">
              Already Created Your Space?{" "}
              <Link to="/">
                <button className="tw-text-[#bba371] tw-font-thin tw-mb-10">
                  go to home page
                </button>
              </Link>{" "}
            </p>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Ambassador;
