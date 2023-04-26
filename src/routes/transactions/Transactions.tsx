import { Heading, Pane, Tab, Tablist, majorScale } from "evergreen-ui";
import RoutePage from "../../shared/layout/routePage/RoutePage";
import { useState } from "react";
import ListOcppLiveTransactions from "../../features/listOcppLiveTransactions/ListOcppLiveTransactions";
import ListOcppTransactions from "../../features/listOcppTransactions/ListOcppTransactions";

export default function OcppTransactions(){

    const [selectedTab, setSelectedTab] = useState("Current Transactions");
    const [tabs] = useState(["Current Transactions", "Finished Transactions"]);

    return <RoutePage>
        <Heading is="h2" size={900} marginBottom={majorScale(5)}>Ocpp Transactions</Heading>
        <Tablist marginBottom={16} borderBottom="1px solid #efefee">
            {tabs.map((tab, index) => (
                <Tab
                    aria-controls={`panel-${tab}`}
                    isSelected={tab === selectedTab}
                    key={tab}
                    onSelect={() => setSelectedTab(tab)}
                    appearance="primary"
                >
                    {tab}
                </Tab>
            ))}
        </Tablist>
        <Pane
            aria-labelledby={"Current Transactions"}
            aria-hidden={selectedTab !== "Current Transactions"}
            display={selectedTab === "Current Transactions" ? 'block' : 'none'}
            role="tabpanel"
        >
            <ListOcppLiveTransactions />
        </Pane>
        <Pane
            aria-labelledby={"Finished Transactions"}
            aria-hidden={selectedTab !== "Finished Transactions"}
            display={selectedTab === "Finished Transactions" ? 'block' : 'none'}
            role="tabpanel"
        >
            <ListOcppTransactions />
        </Pane>
    </RoutePage>
}