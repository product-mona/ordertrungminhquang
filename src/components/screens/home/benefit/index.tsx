import styles from "./index.module.css";

// Import Swiper styles
import { Collapse, Image } from "antd";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const { Panel } = Collapse;

const UlContent = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <ul>
      {data?.map((item) => (
        <Content
          item={item}
          key={item.Id}
          active={active}
          setActive={setActive}
        />
      ))}
    </ul>
  );
};

const Content = ({ item, active, setActive }) => {
  return (
    <li className={styles.contentWrapper}>
      <div className={styles.head}>
        <h3 className={styles.h3}>{item?.Name}</h3>
        <Image
          src="/up-right-arrow.png"
          width={16}
          height={16}
          preview={false}
          className={`${styles.icon} ${
            active === item?.Id ? styles.iconActive : ""
          }`}
          onClick={() => {
            setActive(active === item?.Id ? 0 : item?.Id);
          }}
        />
      </div>
      <div
        className={`${active === item.Id ? styles.contentActive : ""} ${
          styles.content
        }`}
      >
        <p>{item?.Description}</p>
      </div>
    </li>
  );
};

export const HomeBenefit = ({ data }) => {
  const [cur, setCur] = useState(1);
  // console.log(data);

  return (
    <div className={styles.benefitWrap}>
      <div className="container">
        <div className={styles.innerBenefit}>
          <div className={styles.left}>
            <img src="./benefit.png" alt="" />
          </div>
          <div className={styles.right}>
            <h1 className={styles.mainTitle}>Quyền lợi khách hàng</h1>
            <p className={styles.mainDes}>
              Order Trung Minh Quang nhằm mang đến cho quý khách hàng dịch vụ
              nhập hàng tốt nhất, chúng tôi luôn nỗ lực cải tiền không ngừng
              nhằm nâng cao chất lượng phục vụ , đem đến sự hài lòng cho khách
              hàng sử dụng dịch vụ của chúng tôi !
            </p>
            <UlContent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
