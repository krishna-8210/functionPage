import { useState } from 'react'

function SideNav({lists,clickAction}:{lists:any[],clickAction:any}) {
    const [selectedindex,setSelectedIndex]=useState<number|null>()
  return (
    <>
     {lists.map((item: any, index: number) => (
                  <div
                    onClick={()=>{
                       clickAction(item,index) ;
                       setSelectedIndex(index)
                    }}
                    className="space-y-3 cursor-pointer"
                  >
                    <div className="flex justify-between  items-center">
                      <h3
                        className={`hover:text-blue-500 p-1   px-2 ${selectedindex == index && "text-blue-500  w-full rounded-xl "} transition `}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
                </>
  )
}

export default SideNav
