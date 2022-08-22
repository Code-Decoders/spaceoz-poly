import React, { useCallback, useEffect, useState } from 'react'
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { metadata } from '..';

const Playground = () => {

    const {
        unityProvider,
        isLoaded,
        unload,
        loadingProgression,
        addEventListener,
        removeEventListener,
        sendMessage,
    } = useUnityContext({
        loaderUrl: "build/Build.loader.js",
        dataUrl: "build/Build.data",
        frameworkUrl: "build/Build.framework.js",
        codeUrl: "build/Build.wasm",
        productName: "SpaceOz",
        companyName: "CodeDecoders",
    });

    const [coins, setCoins] = useState(0);

    const [ships, setShips] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, isInitialized, account } = useMoralis()
    const Web3API = useMoralisWeb3Api()
    const { fetchERC20Balances } = useERC20Balances()

    useEffect(() => {
        if (isAuthenticated && isInitialized && account) {
            getData();
        }
    }, [isAuthenticated, isInitialized, account]);

    const getData = async () => {
        setLoading(true);
        var result = await Web3API.account.getNFTsForContract({
            chain: 'mumbai',
            token_address: "0x96921BDEc3B26ffCB9622921e32A39aDEe214137",
            address: account,
        })
        var ids = result.result.map(e => parseInt(e.token_id));

        ids.forEach(async (id) => {
            if (metadata.find(e => e.id === id).type === "Warship") {
                setShips(val => [...val, id])
            }
            else {
                setBullets(val => [...val, id])
            }
        })
        var balances = await fetchERC20Balances({
            chain: 'mumbai',
        })
        console.log(balances)
        setCoins(parseInt(balances?.find(e => e.token_address === "0xbe1b7d3c99f480648443c0f6f542336e9eede3d9")?.balance ?? 0));
        setLoading(false);
    };

    const handleCoins = useCallback((val) => {
        console.log(val)
        // getActiveAccount().then(account =>
        // minSPZTokens(val, account.address));
    }, []);

    const OnAppReady = useCallback(() => {
        sendMessage("Coins", "GetUserCoins", coins);
        sendMessage("Coins", "GetShips", ships.join(","));
        sendMessage("Coins", "GetBullets", bullets.join(","));
    }, [sendMessage]);

    useEffect(() => {
        addEventListener("MintTokens", handleCoins);
        addEventListener("OnAppReady", OnAppReady);
        return () => {
            unload();
            removeEventListener("MintTokens", handleCoins);
            removeEventListener("OnAppReady", OnAppReady);
        };
    }, [addEventListener, removeEventListener, handleCoins, OnAppReady, unload]);

    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);

    return (
        <div>
            {!loading && (
                <Unity
                    className="unity"
                    unityProvider={unityProvider}
                    style={{
                        width: "calc(100% - 5rem)",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                    }}
                />
            )}
        </div>
    )
}

export default Playground