import React, { useEffect } from 'react'
import { useChain, useMoralis, useMoralisWeb3Api, useTokenPrice, useWeb3Contract, useWeb3ExecuteFunction } from 'react-moralis'
import styles from '../styles/Navbar.module.css';
import InventoryABI from '../build/contracts/SpacePolyInventory.json';
import BigNumber from 'bignumber.js';

const Navbar = () => {
    const { authenticate, isWeb3Enabled, account: user, isAuthenticated, isInitialized, logout, Moralis, authError, enableWeb3, } = useMoralis()
    const [account, setAccount] = React.useState(null)
    const { switchNetwork } = useChain()
    const mint_abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "priceInSPT",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
    ]
    const Web3API = useMoralisWeb3Api()


    const { runContractFunction: mint } = useWeb3Contract({
        abi: mint_abi,
        contractAddress: '0x96921BDEc3B26ffCB9622921e32A39aDEe214137',
        functionName: "mint",
        params: {
            // price: BigNumber(ship.price).toString(),
            // priceInSPT: ship.priceSPZ,
        },
    });

    useEffect(() => {
        if (isAuthenticated && isWeb3Enabled) {
            Web3API.token.getAllTokenIds({
                address: "0x96921BDEc3B26ffCB9622921e32A39aDEe214137",
                chain: 'mumbai'
            }).then(console.log)
            // data.forEach(token => {
            // mint({
            //     params: {
            //         abi: mint_abi,
            //         contractAddress: '0x96921BDEc3B26ffCB9622921e32A39aDEe214137',
            //         functionName: "mint",
            //         params: {
            //             price: BigNumber(token.price).toString(),
            //             priceInSPT: token.priceSPZ,
            //         },
            //     },
            //     onError: (error) => {
            //         console.log(error)
            //     },
            //     onSuccess: (result) => {
            //         console.log(result)
            //     }

            // })
            // })
        }
    }, [isAuthenticated, isWeb3Enabled])


    useEffect(() => {
        if (isInitialized) {
            enableWeb3().then(val => {
                switchNetwork('0x13881')
            });
            if (isAuthenticated && user)
                setAccount(user)
        }

    }, [isInitialized, isAuthenticated, user])

    return (
        <div className={styles['navbar-container']}>
            <div className={styles['navbar-button']} onClick={() => {
                console.log("authenticate")
                authenticate()
            }}>{isAuthenticated ? account?.slice(0, 10) + "..." : `Connect`}</div>
            {isAuthenticated && <div className={styles['navbar-button']} onClick={() => {
                console.log("logout")
                logout()
            }
            }>Logout</div>}
        </div>
    )
}

export default Navbar