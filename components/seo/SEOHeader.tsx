import { DEFAULT_APP_URL } from '@/utils/constants'
import Head from 'next/head'

export interface SEOHeaderProps {
    url: string
    title: string
    description?: string
    keywords?: string
    image?: string
    twitter_card?: string
    schema?: Object
}

const SEOHeader = (props: SEOHeaderProps) => {
    const { url, title, description, keywords, image, twitter_card, schema } = props

    return (
        <Head>
            <title>{`${title}`}</title>
            <meta name="description" content={description ?? "Manage, deploy, and interact with tokens effortlessly using TokenKit. A powerful tool for streamlined token operations on Starknet and beyond."} />
            <meta name="keywords" content={keywords ?? "TokenKit, token management, deploy tokens, Starknet, blockchain, crypto tokens, smart contracts"} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description ?? "Manage, deploy, and interact with tokens effortlessly using TokenKit. A powerful tool for streamlined token operations on Starknet and beyond."} />
            <meta property="og:image" content={image ?? `${DEFAULT_APP_URL}/static/images/tokenkit-banner.png`} />

            {/* Twitter */}
            <meta property="twitter:card" content={twitter_card} />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description ?? "Manage, deploy, and interact with tokens effortlessly using TokenKit. A powerful tool for streamlined token operations on Starknet and beyond."} />
            <meta property="twitter:image" content={image ?? `${DEFAULT_APP_URL}/static/images/tokenkit-banner.png`} />

            {/* <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> */}
        </Head>
    )
}

export default SEOHeader