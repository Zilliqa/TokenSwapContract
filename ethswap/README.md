# TokenSwap Contract

This project is to swap interim ERC20 zil to wrapped ERC20 zil bridged from Zilliqa chain.

# Setup

1. Deploy wrapped ERC20 zil using repo https://github.com/Zilliqa/switcheo-tradehub-eth

2. Deploy testing ERC20 zil using repo https://github.com/Zilliqa/Zilliqa-ERC20-Token

3. Prepare a payer account, fund it with some wrapped ERC20 zil

4. Prepare an admin acount

5. Deploy TokenSwap contract, its parameters come from step 1,2,3,4

6. Using payer account, call apporve on wrapped ERC20 zil

7. Before calling swap function, users need call approve on ERC20 zil