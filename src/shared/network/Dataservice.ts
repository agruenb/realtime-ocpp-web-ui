import { LiveTransaction } from "../../features/listOcppLiveTransactions/ListOcppLiveTransactions";
import { OcppTransaction, Station, StationTemplate } from "./apiTypes";

export default class DataService{
    static async get(endpoint:string){
        return fetch(`${process.env.REACT_APP_API_HOST}${endpoint}`,{
            method:"GET"
        });
    }
    static async delete(endpoint:string){
        return fetch(`${process.env.REACT_APP_API_HOST}${endpoint}`,{
            method:"DELETE"
        });
    }
    static async post(endpoint:string, body:object){
        return fetch(`${process.env.REACT_APP_API_HOST}${endpoint}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        });
    }
    static async getOcppClientInfo(ocppIdentity?:string){
        return this.get("/ocppClient").then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
    static async addStation(station:StationTemplate){
        return this.post("/ocppStation", station).then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
    static async getStation():Promise<Array<Station>>{
        return this.get("/ocppStation").then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
    static async deleteStation(id:number){
        return this.delete(`/ocppStation/${id}`).then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
    static async getTransaction():Promise<Array<OcppTransaction>>{
        return this.get("/transaction").then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
    static async getUnfinishedTransactions():Promise<Array<OcppTransaction>>{
        return this.get("/transaction?unfinished=true").then(
            resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            }
        );
    }
}