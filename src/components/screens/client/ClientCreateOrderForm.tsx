import { useRouter } from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { mainOrder } from "~/api";
import { ActionButton } from "~/components/globals/button/ActionButton";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  FormInput,
  FormInputNumber,
  FormSelect,
  FormUpload,
} from "~/components/globals/formBase";
import { DataTable } from "~/components/globals/table";
import { toast } from "~/components/toast";
import { useCatalogue, useDeepEffect, usePressKeyboard } from "~/hooks";
import { TColumnsType } from "~/types/table";

type TProps = {
  userData?: TEmployee;
};

export const ClientCreateOrderForm = ({ userData }: TProps) => {
  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!userData,
    warehouseVNEnabled: !!userData,
    shippingTypeToWarehouseEnabled: !!userData,
  });
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<TUserCreateOrder>({
    mode: "onBlur",
  });

  useDeepEffect(() => {
    reset({
      UID: userData?.Id,
      UserName: userData?.UserName,
      WarehouseTQ: warehouseTQ?.[0]?.Id,
      WarehouseTQName: warehouseTQ?.[0]?.Name,
      WarehouseVN: warehouseVN?.[0]?.Id,
      WarehouseVNName: warehouseVN?.[0]?.Name,
      ShippingType: shippingTypeToWarehouse?.[0]?.Id,
      ShippingTypeName: shippingTypeToWarehouse?.[0]?.Name,
      Products: [
        {
          Id: new Date().getTime(),
          PriceProduct: null,
          ImageProduct: null,
          LinkProduct: null,
          NameProduct: null,
          NoteProduct: null,
          PropertyProduct: null,
        },
      ],
    });
  }, [userData, warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const { append, fields, remove } = useFieldArray({
    control,
    name: "Products",
  });

  const columns: TColumnsType<TUserCreateOrderProduct> = [
    {
      dataIndex: "ImageProduct",
      align: "center",
      title: "???nh ?????i di???n",
      render: (_, __, index) => (
        <FormUpload
          image={true}
          control={control}
          name={`Products.${index}.ImageProduct` as const}
        />
      ),
    },
    {
      dataIndex: "LinkProduct",
      align: "center",
      title: "Link s???n ph???m",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.LinkProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "NameProduct",
      align: "center",
      title: "T??n s???n ph???m",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NameProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "PropertyProduct",
      align: "center",
      title: "M??u s???c / k??ch th?????c",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.PropertyProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "PriceProduct",
      align: "center",
      title: "Gi?? s???n ph???m NDT",
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`Products.${index}.PriceProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "QuantityProduct",
      align: "center",
      title: "S??? l?????ng",
      render: (_, __, index) => (
        <FormInputNumber
          control={control}
          name={`Products.${index}.QuantityProduct` as const}
          placeholder=""
          hideError
          rules={{ required: "This field is required" }}
        />
      ),
    },
    {
      dataIndex: "NoteProduct",
      align: "center",
      title: "Ghi ch??",
      render: (_, __, index) => (
        <FormInput
          control={control}
          name={`Products.${index}.NoteProduct` as const}
          placeholder=""
        />
      ),
    },
    {
      dataIndex: "action",
      align: "center",
      title: "Thao t??c",
      render: (_, __, index) => (
        <ActionButton
          title="X??a"
          icon="fas fa-minus-circle"
          iconContainerClassName="border-none"
          onClick={() => {
            if (fields.length > 1) {
              remove(index);
            } else {
              toast.error({
                title: "Kh??ng th??? xo??",
                message: "1 ????n h??ng ph???i c?? ??t nh???t 1 s???n ph???m",
              });
            }
          }}
        />
      ),
    },
  ];

  const mutationAdd = useMutation(mainOrder.addAnother, {
    onSuccess: () => {
      toast.success(
        `B???n ???? t???o ????n h??ng kh??c th??nh c??ng cho user ${userData.UserName}`
      );
      router.push("/manager/order/order-list?q=3");
    },
    onError: toast.error,
  });

  const _onPress = async (data: TUserCreateOrder) => {
    mutationAdd.mutateAsync(data);
  };

  usePressKeyboard(
    [
      {
        keyList: ["Control", "b"],
        cb: () =>
          append({
            Id: 1,
            PriceProduct: null,
            ImageProduct: null,
            LinkProduct: null,
            NameProduct: null,
            NoteProduct: null,
            PropertyProduct: null,
          }),
      },
      {
        keyList: ["Control", "m"],
        cb: handleSubmit(_onPress),
      },
    ],
    {}
  );

  return (
    <React.Fragment>
      <div className="lg:grid grid-cols-2 gap-4 ">
        <div className="col-span-2 lg:grid grid-cols-2 gap-4 !mb-0 px-4">
          <div className="col-span-1 flex items-center">
            <FormInput
              control={control}
              name="UserName"
              placeholder=""
              label="UserName"
              disabled
              required={false}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <FormSelect
              control={control}
              name="ShippingType"
              placeholder=""
              label="Ph????ng th???c v???n chuy???n"
              data={shippingTypeToWarehouse}
              defaultValue={shippingTypeToWarehouse?.[0]}
              select={{ label: "Name", value: "Id" }}
              required={false}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <FormSelect
              control={control}
              name="WarehouseTQ"
              placeholder=""
              label="Kho Trung Qu???c"
              data={warehouseTQ}
              defaultValue={warehouseTQ?.[0]}
              select={{ label: "Name", value: "Id" }}
              required={false}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <FormSelect
              control={control}
              name="WarehouseVN"
              placeholder=""
              label="Kho Vi???t Nam"
              data={warehouseVN}
              defaultValue={warehouseVN?.[0]}
              select={{ label: "Name", value: "Id" }}
              required={false}
              rules={{ required: "This field is required" }}
            />
          </div>
        </div>
        <div className="col-span-2 px-4">
          <IconButton
            title="Th??m s???n ph???m (Ctrl + B)"
            onClick={() =>
              append({
                Id: 1,
                PriceProduct: null,
                ImageProduct: null,
                LinkProduct: null,
                NameProduct: null,
                NoteProduct: null,
                PropertyProduct: null,
              })
            }
            btnClass={""}
            icon="far fa-plus"
            showLoading
            toolip=""
          />
        </div>
        <div className="col-span-2">
          <DataTable columns={columns} data={fields} bordered={true} />
        </div>
        <div className="col-span-2 lg:text-right mt-4 lg:mt-0 px-4">
          <IconButton
            icon="far fa-check-circle"
            title="T???o ????n h??ng (Ctrl + M)"
            onClick={handleSubmit(_onPress)}
            showLoading
            toolip=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};
