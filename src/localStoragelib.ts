const function_key = "custom_functions";

export const localStorageLib_for_function = {
  get: () => {
    return localStorage.getItem(function_key);
  },
  set: (data: string) => {
    return localStorage.setItem(function_key, data);
  },
  fork:(new_data:any)=>{
    const pre= JSON.parse(localStorage.getItem(function_key)||"[]");
    const updated=[...pre,{...new_data,isForked:true}];
    localStorage.setItem(function_key,JSON.stringify(updated));
  }
};
