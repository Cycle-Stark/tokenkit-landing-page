'use client'

import { SelectTokenModal, IToken } from "starknet-tokenkit"
import { useState } from "react"
import TokenPreviewComponent from "./TokenPreviewComponent"

/*

@params
selectedToken - This is the selected token for this particular component. It can be null or undefined.

callBackFunc - a callback function that will be called once one clicks ona given token. 
    This callback function takes in IToken(token). ie `function myCallbackFunc = (token: IToken) => {* Perforom your logic here *}`
    
modalHeight - default 90dvh - Not required, 
*/

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal 
                selectedToken={token} 
                callBackFunc={setToken} 
                animation={'fade'} // Optional - Default 'fade', Options: 'bounce' | 'slide' | 'ease' | 'fade'
            >
                 <TokenPreviewComponent token={token} />
            </SelectTokenModal>
        </div>
    )
}
export default SelectToken