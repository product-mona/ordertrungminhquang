import clsx from "clsx";
import styles from "./index.module.css";

export const HomeServices = ({ data }) => {
  return (
    <div className={clsx(styles.servicesWrap)}>
      <div className="container">
        <h1>dịch vụ của chúng tôi</h1>
        <p className="mainDes !text-[#4D4D4D] w-[50%] m-auto text-center">
          Order Trung Minh Quang là giải pháp nhập hàng tối ưu cho quý khách.
          Chúng tôi mang lại cho khách hàng nguồn hàng phong phú với mức giá cực
          rẻ.
        </p>
        <div className={styles.innerContent}>
          {data?.map((item, index) => (
            <div className={styles.box} key={`${item?.Code}-${index}`}>
              <div className={styles.logo}>
                <img src={item?.IMG} alt="" />
              </div>
              <h3 className="secondTitle !text-center my-4">{item?.Name}</h3>
              <p className="mainDes !text-[#808080] !text-[16px] !text-center">
                {item?.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
