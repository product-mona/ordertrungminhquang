import { BackTop } from "antd";

const backTopWrapper = "!right-[2%]";
const backTopInner = "hover:animate-bounce delay-2000";
const backTopIcon =
  "fas fa-angle-double-up text-[#fff] transition-all hover:text-[#fff] bg-[#089efb] text-xl py-[14px] px-[18px] rounded-3xl shadow-xl hover:rounded-[12px]";

export const ButtonBackTop: React.FC<{}> = ({ children }) => {
  return (
    <BackTop className={backTopWrapper}>
      <div className={backTopInner}>
        <i className={backTopIcon}></i>
      </div>
    </BackTop>
  );
};
