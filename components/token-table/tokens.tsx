"use client";

import React from "react";


const TokenData = ({  }: { status: string }) => {

  // const getAllProperties = async () => {
  //   const res = await fetch(`${AtlasBackendApi}/admin/getAllProperties`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     credentials: "omit",
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch properties");
  //   }
  //   return res.json();
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["properties"],
  //   queryFn: getAllProperties,
  // });

  // const generateTblData = (item: TokenType): TokenType => {
  //   return {
  //   id:item.id,
  //   firstName:item.firstName,
  //   lastName:item.lastName,
  //   dateOfBirth:item.dateOfBirth,
  //   gender:item.gender,
  //   contactNumber:item.contactNumber,
  //   email:item.email,
  //   address:item.address,
  //   emergencyContact:item.emergencyContact,
  //   medicalHistory:item.medicalHistory,
  //   };
  // };

  // const tableData = Array.isArray(TokenHealthDataSource)
  //   ? TokenHealthDataSource?.map((element: TokenType) => generateTblData(element))
  //   : // .filter((item) => item.status === status)
  //     [];
  // console.log("table data", tableData);
  return (
    <article>
      {/* <TokenTable columns={TokenDataColumns} data={tableData} /> */}
    </article>
  );
};

export default TokenData;
