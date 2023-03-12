import { Image } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { user as userApi } from "~/api";
import {
  ForgotPasswordForm,
  RegisterForm,
  SignInForm,
} from "~/components/screens/auth";
import { getLevelId, socialList } from "~/configs";
import {
  selectConnection,
  selectFirstPageDashboard,
  useAppSelector,
} from "~/store";
import { _format } from "~/utils";
import Navbar from "../Navbar";
import styles from "./index.module.css";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const Header = ({ dataConfig, dataMenu }) => {
  const router = useRouter();
  const isLogOut = localStorage.getItem("currentUser");
  const user = useAppSelector((state) => state.user.current);
  const userId = user?.UserId;
  const firstPage = useAppSelector(selectFirstPageDashboard);
  const connection = useAppSelector(selectConnection);
  const [openModal, setOpenModal] = useState("");

  // if (dataConfig) {
  //   socialList?.forEach((social) => (social.link = dataConfig[social.title]));
  // }

  const { data: dataUser } = useQuery(
    ["clientData", userId],
    () => userApi.getByID(userId),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!userId && isLogOut !== null,
    }
  );

  // Handling scroll effect
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback((e) => setY(window.scrollY), [y]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <header className={`${styles.fixed} `}>
        <div
          className={clsx(
            styles.headerTop,
            `${y > 0 ? styles.headerTopHidden : ""}`
          )}
        >
          <div className="container">
            <div className={styles.headerTopInner}>
              <div className={styles.headerTopLeft}>
                <div className="mr-4 w-fit flex">
                  <span className={styles.headerTopLinkAuth}>Tỷ giá:</span>
                  <span> 1¥ = {_format.getVND(dataConfig?.Currency, "")}</span>
                </div>
                <div className="flex w-fit sm:display-none">
                  <span className={styles.headerTopLinkAuth}>Email:</span>
                  <span>{dataConfig?.EmailContact}</span>
                </div>
              </div>
              <div className={styles.headerTopRight}>
                {/* <div className={`flex mr-5 ${styles.socialHeader}`}>
                  {socialList.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Link href={item?.link ?? "/"}>
                          <a
                            style={{ display: !item?.link && "none" }}
                            className={styles.aLink}
                            target="_blank"
                          >
                            <div className={styles.boxCial}>
                              {item.icon ? (
                                <i className={`${item?.icon} text-[12px]`}></i>
                              ) : (
                                <div
                                  style={{
                                    backgroundImage: `url(${item.imgSrc})`,
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                ></div>
                              )}
                            </div>
                          </a>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div> */}
                <div>
                  <span className={styles.headerTopLinkAuth}>
                    HOTLINE/ZALO:{" "}
                  </span>
                  <span className={styles.hotline}>
                    {_format.getVND(dataConfig?.Hotline, "")}
                  </span>
                </div>
                <>
                  {!user?.UserId || isLogOut === null ? (
                    <div className="login-user flex items-center justify-end ml-4">
                      <a
                        className={styles.headerTopLinkAuth}
                        onClick={() => setOpenModal("register")}
                      >
                        Đăng Ký
                      </a>
                      <span className={styles.headerTopLinkAuth}>
                        &nbsp;|&nbsp;
                      </span>
                      <a
                        className={styles.headerTopLinkAuth}
                        onClick={() => setOpenModal("signIn")}
                      >
                        Đăng Nhập
                      </a>
                    </div>
                  ) : (
                    <div className="relative group ml-4">
                      <Link href={firstPage ? firstPage : "/user"}>
                        <a className="uppercase font-semibold flex text !text-[#16aafb] login-user flex items-center">
                          <i className="text-[#16aafb] text fas fa-user mr-2"></i>
                          <div>{user?.UserName || "Anonymus"} </div>
                        </a>
                      </Link>
                      <div
                        className="z-50 rounded-[13px] group-hover:scale-100 scale-0 transition-all duration-300 origin-[88%_-6%] before:content-[''] before:absolute before:right-[24px] before:top-[-28px] before:border-solid before:border-[14px] before:border-[transparent] before:border-b-[#464646] absolute right-[-20px] top-[40px] w-[300px] overflow-hidden"
                        style={{
                          boxShadow: "#39393945 5px 8px 40px 0px",
                        }}
                      >
                        <div className="rounded-t-sm bg-[#135963] px-4 py-3 text-center text-xl text-white font-medium">
                          {
                            <span
                              className={`${dataUser?.Data?.LevelId} font-semibold text-lg`}
                            >
                              {getLevelId[dataUser?.Data?.LevelId]?.Name}
                            </span>
                          }
                        </div>
                        <div className="bg-white">
                          <div className="p-4 bg-[#f8f8f8]">
                            <div className="flex mb-2 items-center justify-between">
                              <span className="text-sm font-semibold text-[#000]">
                                Level
                              </span>
                              {
                                <span
                                  className={`${
                                    dataUser?.Data?.LevelId > 3
                                      ? "text-[#8a64e3]"
                                      : "text-[#18a9f9]"
                                  } font-semibold text-xs`}
                                >
                                  {getLevelId[dataUser?.Data?.LevelId]?.Name}
                                </span>
                              }
                            </div>
                            <div className="h-5 bg-[#ebebeb] rounded-xl p-[2px]">
                              <div
                                className="rounded-[9px] bg-[#884620] bg-custom h-full"
                                style={{
                                  width: `${
                                    (dataUser?.Data?.LevelId * 100) / 9
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-[#000] flex p-4 items-center justify-between">
                            <span className="text-sm font-semibold">
                              Số dư:
                            </span>
                            <span className="text-sm font-bold text-[#18a9f9]">
                              {dataUser?.Data?.Wallet !== 0
                                ? _format.getVND(dataUser?.Data?.Wallet)
                                : "0 VNĐ"}
                            </span>
                          </div>
                          <Link href={firstPage ? firstPage : "/user"}>
                            <a>
                              <div className="hover:text-warningBold text-[#000] transition-all duration-300 flex bg-[#f8f8f8] p-4 items-center justify-between">
                                <span className="text-sm font-semibold">
                                  Quản trị:
                                </span>
                                <span className="text-sm font-bold text-warningBold">
                                  <i className="fas fa-caret-right"></i>
                                </span>
                              </div>
                            </a>
                          </Link>
                          <Link href={"/user/cart"}>
                            <a>
                              <div className="hover:text-warningBold text-[#000] transition-all duration-300 flex p-4 items-center justify-between">
                                <span className="text-sm font-semibold">
                                  Giỏ hàng của bạn:
                                </span>
                                <span className="text-sm font-bold text-warningBold">
                                  <i className="fas fa-caret-right"></i>
                                </span>
                              </div>
                            </a>
                          </Link>
                          <Link href={"/user/info-users"}>
                            <a>
                              <div className="hover:text-warningBold text-[#000] transition-all duration-300  bg-[#f8f8f8] flex p-4 items-center justify-between">
                                <span className="text-sm font-semibold">
                                  Thông tin tài khoản:
                                </span>
                                <span className="text-sm font-bold text-warningBold">
                                  <i className="fas fa-caret-right"></i>
                                </span>
                              </div>
                            </a>
                          </Link>
                        </div>
                        <div
                          className="rounded-b-sm bg-[#135963] px-4 py-3 text-center text-sm text-white font-medium cursor-pointer"
                          onClick={() => {
                            connection &&
                              connection.invoke(
                                "leave",
                                user.UserId.toString(),
                                user.UserGroupId.toString()
                              );
                            localStorage.removeItem("currentUser");
                            Cookies.remove("tokenNHTQ-OTMQ");
                            window.location.reload();
                          }}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.headerBottom} ${
            y >= 100 && styles.headerBottomChange
          }`}
        >
          <div className="container">
            <div className="justify-between flex items-center">
              <div className={clsx(styles.left, " xl:block hidden")}>
                <Link href="/">
                  <a className="flex items-center">
                    <div className={styles.logo}>
                      <Image
                        // src="/logo.jpg"
                        src="/logo.png"
                        alt=""
                        width={"100%"}
                        height={"auto"}
                        preview={false}
                        style={{
                          paddingTop: 7,
                          filter: "drop-shadow(2px 4px 6px #ffffff08)",
                        }}
                      />
                    </div>
                    {/* <span className="uppercase text-[#fff] font-bold text-[20px] tracking-[2px]">
											{dataConfig?.CompanyLongName}
										</span> */}
                  </a>
                </Link>
              </div>
              <div className="flex items-center">
                <Navbar dataConfig={dataConfig} dataMenu={dataMenu} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <SignInForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "signIn" ? true : false}
      />
      <RegisterForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "register" ? true : false}
      />
      <ForgotPasswordForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "forgetPassword" ? true : false}
      />
    </>
  );
};

export default Header;
