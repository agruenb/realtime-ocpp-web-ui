import { Heading, Pane, Tab, Tablist, majorScale } from "evergreen-ui";
import RoutePage from "../../shared/layout/routePage/RoutePage";
import AddOcppStation from "../../features/addOcppStation/AddOcppStation";
import { useState } from "react";
import ListOcppStations from "../../features/listOcppStations/ListOcppStations";

export default function Stations() {

    const [selectedTab, setSelectedTab] = useState("All Stations");
    const [tabs] = useState(["All Stations", "Add Station"]);

    return <RoutePage>
        <Heading is="h2" size={900} marginBottom={majorScale(5)}>Stations</Heading>
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
            aria-labelledby={"All Stations"}
            aria-hidden={selectedTab !== "All Stations"}
            display={selectedTab === "All Stations" ? 'block' : 'none'}
            role="tabpanel"
        >
            <ListOcppStations />
        </Pane>
        <Pane
            aria-labelledby={"Add Station"}
            aria-hidden={selectedTab !== "Add Station"}
            display={selectedTab === "Add Station" ? 'block' : 'none'}
            role="tabpanel"
        >
            <AddOcppStation />
        </Pane>
    </RoutePage>
}