import { Heading, Pane, Tab, Tablist, majorScale } from "evergreen-ui";
import RoutePage from "../../shared/layout/routePage/RoutePage";
import { useState } from "react";
import ListOcppLiveTransactions from "../../features/listOcppLiveTransactions/ListOcppLiveTransactions";

export default function OcppTransactions(){

    const [selectedTab, setSelectedTab] = useState("All Stations");
    const [tabs] = useState(["All Stations", "Add Station"]);

    return <RoutePage>
        <Heading is="h2" size={900} marginBottom={majorScale(5)}>Ocpp Transactions</Heading>
        <ListOcppLiveTransactions />
        
    </RoutePage>
}