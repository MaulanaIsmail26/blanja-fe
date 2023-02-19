import React from "react";
import Link from "next/link";
import style from "../../styles/pages/sidebarStyle.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillPencilFill, BsShop, BsCart2 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export const getServerSideProps = async (context) => {
  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";

  return {
    props: {
      token,
      profile,
    },
  };
};
export default function sidebar() {
  return (
    <div>
      <div className="sidebarInfo d-flex align-items-center">
        <img
          src="../../images/profile.png"
          className={`${style.profile}`}
          alt="profile"
        />
        <div className="info ms-4">
          <h6>Johanes Mikael</h6>
          <Link
            href="/"
            className="link-secondary"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <small>
              <BsFillPencilFill /> <span>Ubah profile</span>
            </small>
          </Link>
        </div>
      </div>
      <div className="store mt-5 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#456BF3",
          }}
        >
          <AiOutlineUser className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/profile"
          role="button"
          style={{ textDecoration: "none" }}
        >
          My Account
        </Link>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F36F45",
          }}
        >
          <CiLocationOn className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/address"
          role="button"
          style={{ textDecoration: "none" }}
        >
          Shipping Address
        </Link>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#F3456F",
          }}
        >
          <BsCart2 className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/user/order"
          role="button"
          style={{ textDecoration: "none" }}
        >
          My Order
        </Link>
      </div>
      <div className="product mt-3 d-flex align-items-center">
        <div
          className={`${style.bgIcon}`}
          style={{
            backgroundColor: "#DB3022",
          }}
        >
          <BsShop className={`${style.icon}`} size={100} />
        </div>
        <Link
          className="ms-3 link-dark"
          href="/store/profile"
          role="button"
          style={{ textDecoration: "none" }}
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
