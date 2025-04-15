import { MantineColorScheme } from "@mantine/core"
import { isArray, isObject } from "util";
import { RequestProps } from "./types";
import { DEFAULT_API_ROOT, DEFAULT_APP_URL } from "./constants";
import axios, { AxiosRequestConfig } from "axios";
import { shortString } from "starknet";
import BigNumber from "bignumber.js"



export const isDarkMode = (colorScheme: MantineColorScheme) => {
    return colorScheme === "dark"
}

export const checkIfEndwithSlash = (st: string) => {
    const len = st.length;
    const end = st.substring(len - 1, len)
    const regex = new RegExp(/\//)
    return regex.test(end)
}

export const removeLastSlash = (st: string) => {
    const len = st.length;
    return st.substring(0, len - 1);
}


export const matchTest = (str1: string, str2: string) => {
    let string1 = str1;
    let string2 = str2;

    const str1endswithslash = checkIfEndwithSlash(string1)
    const str2endswithslash = checkIfEndwithSlash(string2)

    if (str1endswithslash) {
        string1 = removeLastSlash(string1)
    }
    if (str2endswithslash) {
        string2 = removeLastSlash(string2)
    }

    const testpath = `^${string1}$`

    const regex = new RegExp(testpath, "gi");

    return regex.test(string2);
}

export function displayErrors(form: any, errors: any, parentKey: string | null = null) {
    for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
            const key = parentKey ? `${parentKey}.${field}` : field;
            const value = errors[field];

            if (isArray(value)) {
                form.setFieldError(key, value?.join(", "))
            }
            else if (isObject(value)) {
                displayErrors(form, value, key);
            }
        }
    }
}

export const makeRequestOne = async ({ url, method, extra_headers, data, params, useNext, useDirectUrl }: RequestProps) => {
    let BASE_URL = DEFAULT_API_ROOT
    if (useNext) {
        BASE_URL = `${DEFAULT_APP_URL}/api`
    }
    const options: AxiosRequestConfig = {
        method: method,
        url: useDirectUrl ? url : `${BASE_URL}${url}/`,
        headers: {
            ...extra_headers
        },
        data: data,
        params: params
    };
    return axios.request(options)
}

export function bigintToShortStr(bigintstr: string) {
    if (!bigintstr) return ""
    const bn = BigNumber(bigintstr)
    const hex_sentence = `0x` + bn.toString(16)

    return shortString.decodeShortString(hex_sentence)
}

export function validateStarknetAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(address);
}

export function validateURL(url: string): boolean {
    return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/.test(url);
}

export function stripSpecialCharacters(str: string) {
    return str.replace(/[^a-zA-Z0-9\s]/g, '');
}


export function updatePageFilter(path: string, page: any) {
    const url = new URL(path, DEFAULT_APP_URL); // Parse the existing URL

    // Get the existing query parameters as an object
    const params = Object.fromEntries(url.searchParams.entries());

    // Update the "page" filter
    params.page = page;

    // Create a new URL with the updated query parameters
    const updatedUrl = new URL(url.pathname, DEFAULT_APP_URL);
    updatedUrl.search = new URLSearchParams(params).toString();

    return updatedUrl.toString();
}

export const convertToReadableTokens = (tokens: string | number | null, decimals: number|null) => {
    if (!tokens || !decimals) return 'N/A'
    const bn = BigNumber(tokens)
    return bn.div(10 ** decimals).toFixed(2).toString()
}