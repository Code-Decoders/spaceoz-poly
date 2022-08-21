import React from 'react'
import styles from '../styles/Upgrades.module.css'

const Upgrades = ({upgrade, index}) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{upgrade.name}</td>
            <td className={styles.center}>20% Damage</td>
            <td className={styles['action-bar']}>
                <div className={styles['action-button']}>{upgrade.price / 10 ** 18} MATIC</div>
                <div className={styles['action-button']}>{upgrade.priceSPZ} SPZ</div>
            </td>
            <td className={styles.center}>
                3
            </td>
        </tr>
    )
}

export default Upgrades