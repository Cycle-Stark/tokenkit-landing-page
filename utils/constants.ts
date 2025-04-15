
export const DEFAULT_API_ROOT = process.env.NEXT_PUBLIC_DEFAULT_API_ROOT
export const SEPOLIA_API_ROOT = process.env.NEXT_PUBLIC_SEPOLIA_API_ROOT
export const MAINNET_API_ROOT = process.env.NEXT_PUBLIC_MAINNET_API_ROOT
export const DEFAULT_APP_URL = process.env.NEXT_PUBLIC_DEFAULT_APP_URL
export const BASE_MEDIA_URL = process.env.NEXT_PUBLIC_BASE_MEDIA_URL

// AUTH TOKENS
export const SEPOLIA_API_KEY = process.env.NEXT_PUBLIC_SEPOLIA_API_KEY
export const MAINNET_API_KEY = process.env.NEXT_PUBLIC_MAINNET_API_KEY

export const APP_NAME: string = "Tokenkit"
export const APP_KEY: string = "TOKENKIT"
export const THEME_COOKIE_NAME: string = "TOKENKIT_COOKIES"
export const LINK_WEIGHT: number = 400

export const API_ENDPOINTS = {
    // AUTH
    REGISTER: `/users/account/view`,
    LOGIN: `/users/auth/login`,
    LOGOUT: `/users/auth/logout`,
    REQUEST_PASSWORD_RESET: `/users/auth/password-reset`,
    PASSWORD_RESET_CONFIRM: `/users/auth/password-reset/confirm`,
    PASSWORD_RESET_VALIDATE_TOKEN: `/users/auth/password-reset/validate-token`,
    CHECK_LOGIN_STATUS: '/users/auth/check-login-status',
    CHANGE_PASSWORD: '/users/auth/change-password',

    // USERS
    USERS: `/users/account/view`,
    PROFILES: `/users/account/profiles`,

    // Extras
    PROJECTS: `/extras/projects`,
    EVENTS: `/extras/events`,
    PARTNERS: '/extras/partners',
    EVENT_TYPES: '/extras/event-types',
    LISTED_TOKENS: 'listed-tokens',
    ALL_TOKENS: 'tokens',

    // // Agric
    // FARMERS: `/agric/farmers`,
    // FARMERS_LIST: `/agric/farmers-list`,
    // BULK_CREATE_FARMERS: '/agric/bulk-create/farmers',
    // AGENTS: `/agric/agents`,
    // BULK_CREATE_AGENTS: '/agric/bulk-create/agents',
    // CROPS: `/agric/crops`,
    // OTHER_CROP_NAMES: `/agric/other-crop-names`,
    // BOOK_SOIL_TEST: `/agric/soil-test-bookings`,
    // SOIL_TEST_UUID: `/agric/soil-test-bookings-uuid`,
    // DEVICES: `/agric/devices`,
    // SOIL_TEST_SAMPLES: '/agric/soil-test-samples',
    // SOIL_TEST_SAMPLES_GENERATE_RESULTS: '/agric/samples/generate-results',
    // PH_ADJUST: '/agric/samples/adjust-ph',

    // // Report
    // START_REPORT_GENERATION: '/agric/report-generation',
    // CREATE_REPORT_PDF: '/agric/report-pdf-generation',

    // COLLECT_COMMISION: '/agric/collect-commission',
    // COMMISSIONS: '/agric/commissions',
    // DISBURSE_COMMISSION: '/agric/disburse-commission',
    // MARK_AS_PAID: '/agric/mark-booking-as-paid',

    // Main
    SMS: `/sms`,
    COUNTIES: `/counties`,
    CONTACT_FORM: `/contact`,
    REVIEWS: `/reviews`,
    SUBSCRIBERS: `/subscribers`,
    APP_STATS: `/app-stats`,
    USER_STATS: `/user-stats`,
    FAQs: `/faqs`,
    CATEGORIES: `/categories`,
    BLOGS: `/blogs`,
    RANDOMBLOGS: '/blogs/random-blogs',
    MEDIA: `/media`,

    // UTILS
    UPLOAD_IMAGE: `/utils/image/upload`,
    INITIALIZE_PAYMENT: '/utils/initialize-payment',
    PAYMENTS: `/utils/payments`,
    REQUEST_PAYMENT: `/utils/check-payment-status`,
    CHECK_PAYMENT_STATUS: `/utils/check-payment-status`,
}


export const STARKNET_NETWORKS: Record<string, string> = {
    "SN_SEPOLIA": "0x534e5f5345504f4c4941",
    "0x534e5f5345504f4c4941": "SN_SEPOLIA",
    "SN_MAIN": "0x534e5f4d41494e",
    "0x534e5f4d41494e": "SN_MAIN",

}

export const LOCAL_STORAGE_KEYS = {
    user: `${APP_KEY}_user`,
    user_id: `${APP_KEY}_user_id`,
    token: `${APP_KEY}_token`,
    login_status: `${APP_KEY}_login_status`,
    category: `${APP_KEY}_category`,
    search: `${APP_KEY}_search`,
    page: `${APP_KEY}_page`,
}

export const TABLE_ICON_SIZE = "22px"