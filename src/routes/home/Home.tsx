import React from "react";
import { useState, useMemo } from "react";
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import RoutePage from "../../shared/layout/routePage/RoutePage";
import ChargepointStatusDesignCard from "../../features/chargepointStatusDesignCard/ChargepointStatusDesignCard";

export default function Home() {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabs = useMemo(() => ['Traits', 'Event History', 'Identities'], [])

    return (
       <RoutePage>
            <ChargepointStatusDesignCard />
       </RoutePage>
    )
}