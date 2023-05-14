import { StatusIndicator } from "evergreen-ui";
import "./chargepointStatusDesignCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug } from "@fortawesome/free-solid-svg-icons";

export default function ChargepointStatusDesignCard() {

    function _buildConnector(connectorName:string, status:string, current:number, ) {
        return <div className="connector-card">
            <div className="name">
                <FontAwesomeIcon icon={faPlug} style={{transform:"rotate(90deg)"}}/>
                {connectorName}
            </div>
            <div className="status-indicator">
                <div className="status-top">
                    <div className="status-title">
                        {status}
                    </div>
                    <div className="status-info">
                        {current} A
                    </div>
                </div>
                <div className="status-bottom">
                    <div className="status-bar" />
                </div>
            </div>
        </div>
    }

    return <div className="cp-design-card card-shadow">
        <div className="header-bar">
            <div className="card-title">
                Ocpp Simulator
            </div>
            <div className="card-sub">
                Kinetos PowerBox
            </div>
            <StatusIndicator color="success">
                Connected
            </StatusIndicator>
        </div>
        <div className="chargebox-img-container card-shadow">
            <img src="/img/Kinetos_box.png" />
        </div>
        <div className="card-content">
            {_buildConnector("Connector 1", "Charging", 32)}
            {_buildConnector("Connector 2", "Charging", 32)}
        </div>
    </div>
}