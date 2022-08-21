import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const { authenticate, isAuthenticated, isInitialized, logout, Moralis, authError } = useMoralis()
    const [account, setAccount] = React.useState(null)
    useEffect(() => {
        if (isInitialized)
            Moralis.User.currentAsync().then(function (user) {
                var wallet = user.get('ethAddress');
                setAccount(wallet)
            });

    }, [isInitialized])
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