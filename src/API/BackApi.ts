import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;


export default class BackApi {
    static async CreateEntity(){
        const response = await axios.post(`${API_URL}/v1/outlay-rows/entity/create`)
        return response.data as Entity;
    }

    static async getTreeRows(eID: number) {
        const response = await axios.get(`${API_URL}/v1/outlay-rows/entity/${eID}/row/list`)
        return response.data as TreeRows[]
    }

    static async deleteRow(eID: number, rID: number) {
        await axios.delete(`${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`)
    }

    static async createRow(eID: number, request: {}) {
        await axios.post(`${API_URL}/v1/outlay-rows/entity/${eID}/row/create/`, {...request})
    }

    static async updateRow(eID: number, rID: number, request: {}) {
        await axios.post(`${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/update/`, {...request})
    }

}



export interface Entity {
    id: number;
    rowName: string;
}

export interface TreeRows {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child: TreeRows[] | []
}