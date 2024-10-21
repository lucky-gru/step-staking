# Step Finance Staking DApp

Step Finance staking page implementation with Next.js

## Requirements

You will only need Node.js v18 or above, a node global package, Yarn, installed in your environement.

## Install

`yarn install`

## Run on localhost

`yarn dev`

## Deployment

Reference [Next.js official doc](https://nextjs.org/docs/pages/building-your-application/deploying "Next.js official doc")

## Environment vars

This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|NEXT_PUBLIC_MAINNET_RPC           | MAINNET RPC SERVER        | https://mainnet.helius-rpc.com      |
|NEXT_PUBLIC_STEP_STAKING_MAINNET_PROGRAM_ID | STEP staking program address | Stk5NCWomVN3itaFjLu382u9ibb5jMSHEsh6CuhaGjB      |
|NEXT_PUBLIC_STEP_TOKEN_MINT_ADDRESS  | STEP token mint address | StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT      |
|NEXT_PUBLIC_X_STEP_TOKEN_MINT_ADDRESS  | xSTEP token mint address | xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G |
|NEXT_PUBLIC_TOKEN_VAULT_ADDRESS  | vault address | ANYxxG365hutGYaTdtUQG8u2hC4dFX9mFHKuzy9ABQJi |
|NEXT_PUBLIC_MARKET_TOKEN_PRICE_API  | API to get token price | https://api-v3.raydium.io/mint/price |

## Tech used
- [Next.js 14](https://nextjs.org/docs "Next.js 14")
- [@coral-xyz/anchor](https://github.com/coral-xyz/anchor "@coral-xyz/anchor")
- [solana/web3.js](https://solana-labs.github.io/solana-web3.js/ "solana/web3.js")
- [tanstack](https://tanstack.com/query/latest "tanstack")
- [antd](https://ant.design/ "antd")
- [tailwindcss.com](https://tailwindcss.com/ "tailwindcss.com")

## Features

Nothing special, just forked staking page from Step Finance. Only Mainnet is supported.

## Trickies behind the scene

According to my analysis, step finance app uses an API to get some values such as token price in USD, staking rate, etc.

To get token price in USD, I used radium free API since I have no access to Step Finance APIs.

This fork version might be slower than the original [app](https://app.step.finance/en/stake "app") sometimes because I used a free Helius RPC server.