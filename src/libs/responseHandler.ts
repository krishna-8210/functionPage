

// how to use
/**
 * 
 * api_manager(hostel_loginService, values, 200, "Login Successful");

 */



import { API_Arg_Type } from "@/types";
import { custom_add_toast } from "@/ui-component/CustomToast";


// export const api_manager = async (apiService:any, arg:any, checkStatus:any, isAlert:any, message:string) => {
//   try {
//     // body-body that needed when pass api
//     const resp = await apiService(arg)
//     console.log(resp)
//     if (isAlert === true) {
//       if (message) {
//         alert(message);
//       }
//       else {
//         alert(resp.data.message);
//       }

//     }
//     // setgrouplist(data.data)
//     if (resp.data.error == false) {
//       // if(message){
//       //   alert(message);
//       // }

//       return { statusCode: resp.status, error: false, data: resp.data.data, message: resp.data.message };

//     }
//     else {
//       console.log('error')
      
//       // alert(resp.data.message)
//       return { statusCode: resp.status, error: true, message: resp.data.message }
//     }


//   } catch (error:any) {
//      console.log('error')
//     // alert(error.response.data.message);
//     if (isAlert === true) {
//       if (message) {
//         alert(message);
//       }
//       else {
//         alert(error.response.data.message);
//       }

//     }

//     console.log(error.message, "(internal error)");
//     console.log(error)
//     return { statusCode: error.status, error: true, message: error.response.data.message }

//   }
// }
export const api_manager_v2 = async (apiService:any, arg:any) => {
  try {
    // body-body that needed when pass api
    const resp = await apiService(arg)
    console.log(resp, "api_manager_v2()")

    if (resp?.data?.success == true) {
      return { statusCode: resp.status, success: true, data: resp.data.data, message: resp.data.message, resp };
    }
    else {

      return { statusCode: resp?.status, success: false, message: resp?.data?.message, resp }
    }

  } catch (error:any) {
 
    console.log(error)
    console.log(error.message, "(internal error)");
      return { statusCode: error.status, success: false, message:error.message+" or "+error?.response?.data?.message, resp: error }
  }
}


export const responseHandler = async (apiService: any, arg: API_Arg_Type<any> = { data: '', id: '', query: '' }, options = { toast_display: false }) => {
  try {
    const response = await api_manager_v2(apiService, arg);
    console.log('response', response);

    if (response.success == true) {
      if (options.toast_display) {
        custom_add_toast({
          title: response.message || "Success",
          description: "",
          variant: "success"
        })
      }
    }

    else {
        custom_add_toast({
          title: response.message || "Failed",
          description: "",
          variant: "danger"
        }); 
    }
    return response;
  } catch (error:any) {
    console.error('Error in responseHandler:', error);
    custom_add_toast({
      title: "System Error",
      description: "An unexpected error occurred.",
      color: "danger"
    })
    return { status: false, data: null, message: error.message };
  }
}