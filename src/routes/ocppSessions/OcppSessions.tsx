import { Heading, majorScale } from "evergreen-ui";
import RoutePage from "../../shared/layout/routePage/RoutePage";
import { useState } from "react";
import ListOcppSessions from "../../features/listOcppLiveSessions/ListOcppLiveSessions";

export default function OcppSessions(){

    return <RoutePage>
        <Heading is="h2" size={900} marginBottom={majorScale(5)}>Ocpp Sessions</Heading>
        <ListOcppSessions />
    </RoutePage>
}