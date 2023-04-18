export default class WsService{
    static websocket(endpoint:string){
        return new WebSocket(`${process.env.REACT_APP_WS_HOST}${endpoint}`);
    }
    static subscribeOcppClients(){
        let ws = this.websocket("/ocppClient");
        return ws;
    }
    static subscribeOcppTransactions(){
        let ws = this.websocket("/transactions");
        return ws;
    }
}