import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import configHomeData from "~/api/config-home";
import { FilterInput, IconButton } from "~/components";
import { _format } from "~/utils";

type TProps = {
  onReload: () => Promise<unknown>;
  onHide: () => Promise<unknown>;
  onOutstock: () => Promise<unknown>;
  outStockSessionPackages: TOutStockSessionPackages[];
  dataAll: any;
};

export const OutStockFormFilter: React.FC<TProps> = ({
  onHide,
  onReload,
  onOutstock,
  outStockSessionPackages,
  dataAll,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      UserName: dataAll?.UserName,
      UserPhone: dataAll?.UserPhone,
    });
  }, [dataAll]);

  const { data: configData } = useQuery(
    ["configData"],
    () => configHomeData.get(),
    {
      onSuccess: (res) => {
        return res?.Data;
      },
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const componentRef = useRef<ReactToPrint>(null);
  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    const orderTable = outStockSessionPackages?.filter(
      (item) => item?.SmallPackage?.OrderType === 1
    );
    const transTable = outStockSessionPackages?.filter(
      (item) => item?.SmallPackage?.OrderType === 2
    );

    return (
      <div className="w-full mb-10 p-4" ref={ref}>
        <div className="text-xs text-black">
          {_format.getVNDate(new Date())}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="text-xs text-black my-2 font-bold uppercase">
              {configData?.Data?.CompanyLongName}
            </div>
            <div className="text-xs text-black">
              <span
                dangerouslySetInnerHTML={{
                  __html: configData?.Data?.Address,
                }}
              ></span>
            </div>
            <div className="text-xs text-black">
              Website: {configData?.Data?.WebsiteName}
            </div>
            <div className="text-xs text-black">
              ??i???n tho???i: {configData?.Data?.Hotline}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-right ml-auto max-w-[270px]">
              <div className="text-xs my-2 text-center text-black">
                M???u s??? 01 - TT
              </div>
              <div className="text-xs text-black text-center">
                (Ban h??nh theo Th??ng t?? s??? 133/2016/TT-BTC ng??y 26/8/2016 c???a B???
                t??i ch??nh)
              </div>
            </div>
          </div>
        </div>
        <div className="text-2xl my-8 text-black font-bold text-center">
          PHI???U XU???T KHO
          <div className="text-sm text-black font-normal text-center">
            Th???i gian xu???t kho: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          H??? v?? t??n ng?????i ?????n nh???n: <p className="w-48">{user?.UserName}</p>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          S??? ??i???n tho???i ng?????i ?????n nh???n:{" "}
          <p className="w-48">{user?.UserPhone}</p>
        </div>
        {orderTable?.length > 0 && (
          <>
            <div className="text-black text-sm my-3">
              Danh s??ch ki???n mua h???:
            </div>
            <table className="table-preview">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>M?? ki???n</th>
                  <th>C??n th???c (kg)</th>
                  <th>S??? kh???i (m3)</th>
                  <th>K??ch th?????c (D x R x C)</th>
                  <th>Ph?? c??n n???ng (VN??)</th>
                </tr>
              </thead>
              <tbody>
                {orderTable.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <td>{++index}</td>
                      <td>{item?.OrderTransactionCode}</td>
                      <td>{item?.SmallPackage?.Weight}</td>
                      <td>{item?.SmallPackage?.VolumePayment}</td>
                      <td>{item?.SmallPackage?.LWH}</td>
                      <td>
                        {_format.getVND(item?.SmallPackage?.PriceWeight, "")}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5}>T???ng ti???n c???n thanh to??n</td>
                  <td>
                    {_format.getVND(
                      Number(
                        outStockSessionPackages.reduce(
                          (prev, cur) => prev + cur?.TotalPriceVND,
                          0
                        )
                      )
                    )}
                    {/* {_format.getVND(dataAll?.TotalPay)} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {/* {transTable?.length > 0 && (
          <>
            <div className="text-black text-sm my-3">
              Danh s??ch ki???n k?? g???i:
            </div>
            <table className="table-preview">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>M?? ki???n</th>
                  <th>C??n th???c (kg)</th>
                  <th>Th??? t??ch (m3)</th>
                  <th>Ph?? c??n n???ng (VN??)</th>
                  <th>K??ch th?????c (D x R x C)</th>
                </tr>
              </thead>
              <tbody>
                {transTable?.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <td>{++index}</td>
                      <td>{item?.OrderTransactionCode}</td>
                      <td>{item?.SmallPackage?.Weight}</td>
                      <td>{item?.SmallPackage?.VolumePayment}</td>
                      <td>
                        {_format.getVND(item?.SmallPackage?.PriceWeight, "")}
                      </td>
                      <td>{item?.SmallPackage?.LWH}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5}>T???ng ti???n ????n h??ng</td>
                  <td>
                    {_format.getVND(dataAll?.TotalPay)}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )} */}
        <div className="mt-4">
          <strong>***L??u ??:</strong>
          <div className="text-sm">
            * Qu?? kh??ch vui l??ng quay video trong khi m??? h??ng, gi??? l???i t?? li???u
            h???p v?? m?? v???n ????n ????? ch??ng t??i c?? t?? li???u ph???n ??nh v???i shop n???u ph??t
            sinh l???i
          </div>
          <div className="text-sm">
            * S???n ph???m c?? x???y ra l???i vui l??ng ph???n h???i trong 24h, Sau th???i gian
            tr??n ????n h??ng ???????c x??c nh???n ho??n th??nh.
          </div>
          <div className="text-sm">
            * M???i ch??nh s??ch ???????c c???p nh???t t???i m???c CH??NH S??CH tr??n Website.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <div className="text-center text-base">Ng?????i xu???t h??ng</div>
            <div className="text-center text-sm">(K??, h??? t??n)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Ng?????i nh???n</div>
            <div className="text-center text-sm">(K??, h??? t??n)</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="grid grid-cols-8 max-w-[1100px]">
        <div className="col-span-2 mr-4">
          <FilterInput
            placeholder="H??? t??n ng?????i nh???n"
            id="username"
            name="UserName"
            inputClassName=""
            value={user?.UserName}
            handleSearch={(val) => setUser({ ...user, UserName: val })}
          />
        </div>
        <div className="col-span-2 mr-4">
          <FilterInput
            placeholder="S??? ??i???n tho???i ng?????i nh???n"
            id="userphone"
            name="UserPhone"
            inputClassName=""
            value={user?.UserPhone}
            handleSearch={(val) => setUser({ ...user, UserPhone: val })}
          />
        </div>
        <div className="col-span-4 flex items-end">
          {!!outStockSessionPackages?.find((x) => !x.IsPayment) ? (
            <IconButton
              onClick={onReload}
              title="Reload"
              icon="fas fa-sync"
              btnClass="!mr-4"
              showLoading
              toolip=""
            />
          ) : (
            <ReactToPrint content={() => componentRef.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <IconButton
                    onClick={() => onOutstock().then(() => handlePrint())}
                    title="Xu???t kho"
                    icon="fas fa-boxes"
                    btnClass="!mr-4"
                    showLoading
                    toolip=""
                  />
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          )}
          <IconButton
            onClick={onHide}
            icon="fas fa-ban"
            title="???n ????n ch??a thanh to??n"
            showLoading
            toolip=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};
