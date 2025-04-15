import { ReactNode } from "react"


export interface HeaderLinkProps {
    label: string,
    href: string,
    icon?: React.ReactNode,
}


export interface RequestProps {
    url: string
    method: string
    extra_headers?: any
    data?: Object
    params?: Object
    useNext?: boolean
    useDirectUrl?: boolean
}

export interface ISimpleCard {
    title: string
    description: string
}

export interface ITimeline {
    date: string;
    title: string;
    description: string;
    icon: ReactNode;
}

export interface IWalletConnectionAndFormSubmission {
    loading: boolean
    submitButtonTitle: string
}

export interface CustomDrawerLinkProps {
    href: string,
    icon?: React.ReactElement | null,
    label: string,
    children?: CustomDrawerLinkProps[] | null,
    loginRequired?: boolean,
    click?: any
    isExternal?: boolean
}