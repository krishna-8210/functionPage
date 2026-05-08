
import { createSlice } from '@reduxjs/toolkit'

const default_pagination = {
    limit: 9,
    page: 1,
    totalPages: 1
}


export const Slice = createSlice({
    name: 'datalist',
    initialState: {
        work: {
            list: [],
            pagination: { ...default_pagination }
        },
        worker: {
            list: [],
            pagination: { ...default_pagination },
            selected_worker: null
        },
        selected_work: {
            data: null,

        },
        inventry: {
            list: [],
            pagination: { ...default_pagination }
        },
        invoice: {
            list: [],
            pagination: { ...default_pagination,limit:11 }
        },
        customer: {
            list: [],
            pagination: { ...default_pagination }
        },
        agent: {
            list: [],
            pagination: { ...default_pagination }
        },

    },

    reducers: {
        work_list_update_reducer: (state: any, { payload }: any) => {
            console.log("work reducer update");
            // state.work.list = payload;
             state.work.list = payload.list;
            state.work.pagination = payload.pagination;
        },
        //it will select the work 
        select_work_handler_reducer: (state: any, { payload }: any) => {
            console.log("select_work_handler_reducer");
            state.selected_work.data = payload;
        },
        worker_list_update_reducer: (state: any, { payload }: any) => {
            console.log("worker_list_update_reducer");
            // state.worker.list = payload;
             state.worker.list = payload.list;
            state.worker.pagination = payload.pagination;
        },
        select_worker_handler_reducer: (state: any, { payload }: any) => {
            console.log("select_worker_handler_reducer");
            state.worker.selected_worker = payload;
        },
        inventry_list_update_reducer: (state: any, { payload }: any) => {
            console.log("inventry_list_update_reducer");
            // state.inventry.list = payload;
             state.inventry.list = payload.list;
            state.inventry.pagination = payload.pagination;
        },
        customer_list_update_reducer: (state: any, { payload }: any) => {
            console.log("customer_list_update_reducer");
            state.customer.list = payload.list;
            state.customer.pagination = payload.pagination;
        },
        invoice_list_update_reducer: (state: any, { payload }: any) => {
            console.log("invoice_list_update_reducer");
            state.invoice.list = payload.list; 
            state.invoice.pagination = payload.pagination; 
        },
        agent_list_update_reducer: (state: any, { payload }: any) => {
            console.log("agent_list_update_reducer");
            // state.agent.list = payload;
             state.agent.list = payload.list;
            state.agent.pagination = payload.pagination;
        },
    }
}
)

// Action creators are generated for each case reducer function
export const {
    customer_list_update_reducer,
    invoice_list_update_reducer,
    agent_list_update_reducer,
    work_list_update_reducer,
    select_work_handler_reducer,
    worker_list_update_reducer,
    select_worker_handler_reducer,
    inventry_list_update_reducer,

} = Slice.actions

export default Slice.reducer