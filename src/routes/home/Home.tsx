import React from "react";
import { useState, useMemo } from "react";
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'

export default function Home() {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabs = useMemo(() => ['Traits', 'Event History', 'Identities'], [])

    return (
       <div>Hello</div>
    )
}