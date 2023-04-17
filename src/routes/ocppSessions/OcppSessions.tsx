import { Heading, Pane, Tab, Tablist, majorScale } from "evergreen-ui";
import RoutePage from "../../shared/layout/routePage/RoutePage";
import { useState } from "react";
import AddOcppStation from "../../features/addOcppStation/AddOcppStation";
import ListOcppSessions from "../../features/listOcppSessions/ListOcppSessions";

export default function OcppSessions(){
    const [selectedTab, setSelectedTab] = useState("All Stations");
    const [tabs] = useState(["All Stations", "Add Station"]);

    return <RoutePage>
        <Heading is="h2" size={900} marginBottom={majorScale(5)}>Ocpp Sessions</Heading>
        <ListOcppSessions />
        
    </RoutePage>
}