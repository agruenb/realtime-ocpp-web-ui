import React from "react";
import { useState, useMemo } from "react";
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui';
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const tabs = useMemo(() => [{
        paths: ["/", "home"],
        name: "Home"
    }, {
        paths: ["/test"],
        name: "Test"
    }], [])

    return (
        <Pane display="flex" padding={16} className="navbar">
            <Tablist marginBottom={8} flexBasis={240}>
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            className="tab"
                            direction="vertical"
                            isSelected={tab.paths.indexOf(location.pathname) != -1}
                            key={tab.name}
                            onSelect={() => navigate(tab.paths[0])}
                        >
                            {tab.name}
                        </Tab>
                    )
                })}
            </Tablist>
        </Pane>
    )
}