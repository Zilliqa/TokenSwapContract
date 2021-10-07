const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const { getAddressFromPrivateKey } = require('@zilliqa-js/crypto');

// change the following parameters
const API = 'https://dev-api.zilliqa.com'
const CHAIN_ID = 333;
const PRIVATE_KEY = 'e53d1c3edaffc7a7bab5418eb836cf75819a82872b4a1a0f1c7fcf5c3e020b89';
// existing xcad contract address: 0x0589d8c7c35ccf1ac5454a2944611a1cbe580edd
// bridged xcad contract address: 0xc1a711c39c54930cb4dff11f3e1a1c9b21a23188
// swap contract address: 0x6c989aad950c78b3ee140652ee0612a6ce38854b
const SWAP_CONTRACT_ADDRESS = "zil1djvf4tv4p3ut8ms5qefwupsj5m8r3p2t5ddmaj"

const zilliqa = new Zilliqa(API);
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);
const GAS_PRICE = units.toQa('2000', units.Units.Li);


async function main() {
    zilliqa.wallet.addByPrivateKey(PRIVATE_KEY);
    const address = getAddressFromPrivateKey(PRIVATE_KEY);
    console.log("Your account address is: %o", `${address}`);

    console.log("------------------------ begin swap ------------------------\n");
    try {
        const contract = zilliqa.contracts.at(SWAP_CONTRACT_ADDRESS);
        const callTx = await contract.call(
            'ExistingZRC2ToBridgedZRC2',
            [
                {
                    vname: 'amount_from',
                    type: 'Uint128',
                    value: "1000000"
                },
            ],
            {
                version: VERSION,
                amount: new BN(0),
                gasPrice: GAS_PRICE,
                gasLimit: Long.fromNumber(50000)
            },
            33,
            1000,
            true
        );
    
        console.log("transaction: %o", callTx.id);
        console.log(JSON.stringify(callTx.receipt, null, 4));

    } catch (err) {
        console.log(err);
    }
    console.log("------------------------ end swap ------------------------\n");
}

main();