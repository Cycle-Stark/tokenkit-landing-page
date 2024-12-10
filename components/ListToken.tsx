import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import TextInput from "./inputs/TextInput";
import Link from "next/link";
import { UploadSimple } from "@phosphor-icons/react";

const ListToken = () => {
  return (
    <section className="h-full flex justify-center items-center">
      <Formik
        initialValues={{
          tokenaddress: "",
          shortlink: "",
          password: "",
        }}
        validationSchema={Yup.object({
          tokenaddress: Yup.string()
            .min(6, "Min of  6 Characters required")
            .required("Token Address is Required"),
          shortlink: Yup.string()
            .min(13, "Min of 6 Characters required")
            .required("Shortlink is Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            // Use the modifiedPhoneNumber in your API request
            const requestData = {
              ...values,
            };

            // Call the Initiate Register User Mutation
          }, 400);
        }}
      >
        <Form className="p-10 rounded-3xl bg-[#242424]">
          <h3 className="text-white text-[1.5rem]">List New Token</h3>
          <TextInput
            label="Token Address"
            name="tokenaddress"
            type="text"
            placeholder="TokenAddress"
          />
          <TextInput
            label="Icon Link"
            name="shortlink"
            type="text"
            placeholder="https://shortlink/xyz"
          />
          <button
            type="submit"
            className="bg-white mt-5 p-3 rounded-full font-bold w-full cursor-pointer flex justify-center"
          >
            <UploadSimple size={24} className="mx-1" />
            List Token
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default ListToken;
