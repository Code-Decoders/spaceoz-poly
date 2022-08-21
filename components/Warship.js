import React from 'react'
import styles from '../styles/Warship.module.css'
import ReactBlockies from 'react-blockies'

const Warship = ({ship}) => {

    const handleBuyWithMatic = () => {
        console.log("buy with matic")
    }

    const handleByWithSPZ = () => {
        console.log("buy with spz")
    }

    
    return (
        <div className={styles['warship-container']}>
            <img src={ship.image} className={styles['warship-image']} />
            <div className={styles['warship-title']}>{ship.name}</div>
            <div className={styles['warship-owners']}>
                <div style={{ fontSize: "15px" }}>Owners: 100</div>
                <div style={{display: "flex", gap: "0 5px", alignItems: "center"}}>
                    {
                        [1, 2, 3].map((e, i) => {
                            return <ReactBlockies key={i} seed='0xA3B38051Bf77067fcCb02D83eCEF9CcE27c81A31' size={7} className={styles['warship-owner']} />
                        })
                    }
                    <div>...More</div>
                </div>
            </div>
            <div className={styles['action-bar']}>
                <div className={styles['action-button']} onClick={handleBuyWithMatic}>{ship.price/ 10 ** 18} MATIC</div>
                <div className={styles['action-button']} onClick={handleByWithSPZ}>{ship.priceSPZ} SPZ</div>
            </div>
        </div>
    )
}

export default Warship