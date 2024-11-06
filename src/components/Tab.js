import React, {useEffect, useState} from 'react';
import DeliveryList from "./DeliveryList";
import Swap from "./Swap";
import Referal from "./Referal";
import Profile from "./Profile";
import WalletLogo from './wallet.svg';
import SwipeLogo from './swipe.svg';
import DiscoverLogo from './discover.svg';
import ProfileLogo from './profile.svg';

function Tab() {
    let [currentTab, setCurrentTab] = useState("Assets");
    let tabs = {"Assets": Swap, "Cargo" : DeliveryList , "Profile": Profile};
    let excludedTabs = ["Swap"];
    let [lastTab, setLastTab] = useState("Assets");
    let icons = {"Assets": WalletLogo, "Cargo": SwipeLogo, "Referal": DiscoverLogo, "Profile": ProfileLogo}

    useEffect(() => {
        if (!excludedTabs.includes(currentTab)) {
            setLastTab(currentTab);
        }
    }, [excludedTabs, currentTab]);

    return (
        <>
            <div className="tab-content">
                {React.createElement(tabs[currentTab], { setCurrentTab })}
            </div>
            <div className="tab-section">
                {Object.keys(tabs).map((tab) => {
                    if (!excludedTabs.includes(tab)) {
                        return (
                            <div
                                className={lastTab === tab ? "tab selected" : "tab"}
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
                            >
                                <img src={icons[tab]}/>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>
    );
}

export default Tab;
