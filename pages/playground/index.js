import React, { useCallback, useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';

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

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        var ids = [1, 2, 3, 4, 5, 6, 7, 8];
        var ships = [1,2];
        var bullets = [6,7];

        setShips(ships);
        setBullets(bullets);
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