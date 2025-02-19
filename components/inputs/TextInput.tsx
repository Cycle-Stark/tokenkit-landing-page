import { useField } from 'formik';
import React from 'react'

const TextInput = ({ label, ...props }: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <article className="my-5">
        <label htmlFor={props.id || props.name} className="text-white">
          {label}
        </label>
        <input
          className="text-white py-2 px-6 rounded-sm w-full border border-[#424242] bg-[#2E2E2E]"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error text-red-500 text-sm mt-1">{meta.error}</div>
        ) : null}
      </article>
    );
  };

export default TextInput
  
