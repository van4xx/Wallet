import React, {useEffect, useState} from 'react';
import DeliveryList from "./DeliveryList";
import Swap from "./Swap";
import Referal from "./Referal";
import Profile from "./Profile";

function Tab() {
    let [currentTab, setCurrentTab] = useState("Assets");
    let tabs = {"Assets": Swap, "Cargo" : DeliveryList ,"Referal" : Referal, "Profile": Profile};
    let excludedTabs = ["Swap"];
    let [lastTab, setLastTab] = useState("Assets");

    useEffect(() => {
        if (!excludedTabs.includes(currentTab)) {
            setLastTab(currentTab);
        }
    }, [excludedTabs, currentTab]);

    return (
        <>
            <div className="tab-section">
                {Object.keys(tabs).map((tab) => {
                    if (!excludedTabs.includes(tab)) {
                        return (
                            <div
                                className={lastTab === tab ? "tab selected" : "tab"}
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
                            >
                                {tab}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="tab-content">
                {React.createElement(tabs[currentTab], { setCurrentTab })}
            </div>
        </>
    );
}

export default Tab;
