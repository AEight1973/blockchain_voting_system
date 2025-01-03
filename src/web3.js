import Web3 from 'web3';
import data from "./assets/contracts/abi.js"
import keystore from "./assets/contracts/keystore.js"

const {data: {bytecode}, abi} = data

const web3 = new Web3('http://127.0.0.1:8545');
const contract = new web3.eth.Contract(abi);
// const contractAddress = '0x964AbB194ddABb8dDE28110dc423e733CD001A87';
// const contract = new web3.eth.Contract(contractABI, contractAddress);
//
// async function interactWithContract() {
//     const accounts = await web3.eth.getAccounts();
//     await contract.methods.setValue(42).send({ from: accounts[0] });
//     const value = await contract.methods.getValue().call();
//     console.log('Value:', value);
// }
//
// interactWithContract();


export async function createNewAccount() {
    const account = await web3.eth.personal.newAccount("password")
    await web3.eth.personal.unlockAccount(account, "password", 10000)
    return account
}

export function deployContract() {
    // const account = '0x22d19D7C36b2FB6Ca49Fc98Bba8c146F7568Ee37'
    web3.eth.getBlock('latest').then(block => {
        console.log('Current block gas limit:', block.gasLimit);
    });
    web3.eth.accounts.decrypt(keystore, '123456').then(
        async account => {
            const tx = {
                from: account.address,
                gas: 10000000,  // 需要根据实际情况调整 gas 限制
                gasPrice: web3.utils.toWei('0', 'gwei'),
                data: contract.deploy({
                    data: bytecode.object,
                    arguments: [1000, ["A", "B", "C"]]
                }).encodeABI()
            };

            const signedTx = await account.signTransaction(tx)
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            console.log('Contract deployed at address:', receipt.contractAddress);


            // 部署合约
            // .send({
            //     from : account.address,
            //     gas : '3000000',
            // }).then(instance => {
            //     console.log("contract address : ", instance.options.address)
            // })
        }
    ).catch(error => console.log(error))
}
