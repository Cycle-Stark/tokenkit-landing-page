import { proxy, subscribe } from 'valtio'

const initialState = {
    mainnetRPCEndpoint: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
    sepoliaRPCEndpoint: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
    activeChainId: 'SN_SEPOLIA'
}

// Ensure localStorage is accessed only on the client
const getStoredState = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('contract_deployer_state') ?? '{}') || initialState
    }
    return initialState
}

const appState = proxy(getStoredState())

if (typeof window !== 'undefined') {
    subscribe(appState, () => {
        localStorage.setItem('contract_deployer_state', JSON.stringify(appState))
    })
}

export default appState
