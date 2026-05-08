import { API_Arg_Type } from "@/types/index.ts";
import { baseurl, headerFunctions } from "./connection.ts"


import Axios from "axios"


const presetApi = (route: string) => {
    return {
        create: async (data: API_Arg_Type<any>) => await Axios.post(baseurl + '/' + route, data.data, { headers: headerFunctions() }),
        list: async (data: API_Arg_Type<any>) => await Axios.get(baseurl + '/' + route + '?' + data.query, { headers: headerFunctions() }),
        details: async (data: API_Arg_Type<any>) => await Axios.get(baseurl + '/' + route + '/' + data.id, { headers: headerFunctions() }),
        update: async (data: API_Arg_Type<any>) => await Axios.put(baseurl + '/' + route + '/' + data.id, data.data, { headers: headerFunctions() }),
        delete: async (data: API_Arg_Type<any>) => await Axios.delete(baseurl + '/' + route + '/' + data.id, { headers: headerFunctions() }),
        search: async (data: API_Arg_Type<any>) => await Axios.get(baseurl + '/' + route + '/search/' + '?search_query=' + data.data + data.query, { headers: headerFunctions() }),
    }
}


export const work_api_service = {
    ...presetApi('work'),

}

// export const worker_transction_api_service = {
//     ...presetApi('worker_transaction'),
//     individual_credit_amount: async (data: api_arg_type) => await Axios.post(baseurl + '/worker_transaction/' + 'credit_individual', data.data, { headers: headerFunctions() }),
//     debit_amount: async (data: api_arg_type) => await Axios.post(baseurl + '/worker_transaction/' + 'debit', data.data, { headers: headerFunctions() }),
//     list: async (data: api_arg_type) => await Axios.get(baseurl + '/worker_transaction/' + data.id, { headers: headerFunctions() }),
//     details: async (data: api_arg_type) => await Axios.get(baseurl + '/worker_transaction/details/' + data.id, { headers: headerFunctions() }),
// }

