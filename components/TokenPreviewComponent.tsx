'use client'

import { limitChars } from "starknet-tokenkit"

interface IToken {
  icon?: string
  symbol?: string
  name?: string
}

export const TokenPreviewComponent = ({ token }: { token?: IToken }) => {
  return (
    <div className="p-3 bg-black/40 rounded-lg cursor-pointer">
      <div className="flex items-center gap-1.5">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          {token?.icon ? (
            <img 
              src={token.icon} 
              alt={token?.symbol || 'Token'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-gray-200">
              {limitChars(token?.symbol ?? 'ST', 2, false)}
            </span>
          )}
        </div>

        {/* Token Info */}
        {token ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{token.name}</span>
            <span className="text-xs text-gray-300">{token.symbol}</span>
          </div>
        ) : (
          <span className="text-sm">Select Token</span>
        )}
      </div>
    </div>
  )
}

export default TokenPreviewComponent