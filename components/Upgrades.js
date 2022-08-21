import React, { useEffect } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import styles from '../styles/Upgrades.module.css'

const Upgrades = ({ upgrade, index }) => {



    const mint_existing_abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "token_id",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ]

    const { enableWeb3, isWeb3Enabled, isAuthenticated, Moralis } = useMoralis()


    const { runContractFunction: mint_existing } = useWeb3Contract({
        abi: mint_existing_abi,
        contractAddress: '0x96921BDEc3B26ffCB9622921e32A39aDEe214137',
        functionName: "mint",
        msgValue: Moralis.Units.ETH(upgrade.price / 10 ** 18),
        params: {
            token_id: upgrade.id,
        },
    });

    const { runContractFunction: mint_existing_spt } = useWeb3Contract({
        abi: mint_existing_abi,
        contractAddress: '0x96921BDEc3B26ffCB9622921e32A39aDEe214137',
        functionName: "mint",
        msgValue: Moralis.Units.ETH(0),
        params: {
            token_id: upgrade.id
        },
    });



    useEffect(() => {
        enableWeb3()
    }, [])

    const handleBuyWithMatic = () => {
        console.log('buy with matic')
        if (isWeb3Enabled && isAuthenticated) {
            mint_existing({
                onError: (error) => {
                    console.log(ship.id, error)
                },
                onComplete: (result) => {
                    console.log(result)
                }
            })
        }
    }

    const handleByWithSPZ = () => {
        console.log("buy with spz")
        if (isWeb3Enabled && isAuthenticated) {
            mint_existing_spt({
                onError: (error) => {
                    console.log(ship.id, error)
                },
                onSuccess: (result) => {
                    console.log(result)
                },
                onComplete: (result) => {
                    console.log(result)
                }
            })
        }
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{upgrade.name}</td>
            <td className={styles.center}>20% Damage</td>
            <td className={styles['action-bar']}>
                <div className={styles['action-button']} onClick={handleBuyWithMatic}>{upgrade.price / 10 ** 18} MATIC</div>
                <div className={styles['action-button']} onClick={handleByWithSPZ}>{upgrade.priceSPZ} SPZ</div>
            </td>
            <td className={styles.center}>
                {upgrade.owners.length}
            </td>
        </tr>
    )
}

export default Upgrades