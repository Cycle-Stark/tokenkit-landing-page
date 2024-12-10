export type TokenType = {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  totalSupply: bigint;
  is_erc20: boolean;
  is_erc721: boolean;
  is_touched: boolean;
};

type TokenBalance = {
    token: TokenType;        // Token details
    balance: string | null; // Token balance as a string or null
};

type AddressTokens = {
    address: string;          // Address of the account
    tokens: TokenBalance[];   // List of tokens with balances
    erc20_tokens_count: number; // Count of ERC-20 tokens
    erc721_tokens_count: number; // Count of ERC-721 tokens
};

type Links = {
    next: string | null;     // Link to the next page, if available
    previous: string | null; // Link to the previous page, if available
};

export type TokenAPIData = {
    links: Links;            // Navigation links
    count: number;           // Total count of results
    total_pages: number;     // Total number of pages
    results: AddressTokens[]; // List of addresses with their token details
};

