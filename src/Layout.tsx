import { Button } from '@heroui/react'


function Layout({children,actions=[],setPage}:{children:any,actions:any[],setPage:any}) {
  return (
    <main className="mx-auto   h-[100vh]  ">
      <div className=" h-[50px]  p-2">
        <div className="flex w-full justify-between items-center border h-10 p-1 pl-4 rounded-full">
          <div className="  flex gap-2 items-center">
            <h2 className="text-blue-500 font-bold">FunctionPage</h2>
            <div className='flex gap-2'>
                <div>
        
                </div>
                {/* <Link to={'/'}> */}
                  <Button onPress={()=>setPage('home')} className='h-7' size='sm' variant='outline'>Home</Button>
                {/* </Link> */}
                {/* <Link to={'/snippet'}> */}
                <Button onPress={()=>setPage('snippet')}  className='h-7' size='sm' variant='outline'>Snippets</Button>
                {/* </Link> */}
                {/* <Link to={'/about'}> */}
                <Button onPress={()=>setPage('about')}  className='h-7' size='sm' variant='outline'>About</Button>
                {/* </Link> */}
                
              
            </div>
          </div>
          <div>
            {actions.map((e:any)=>e)}

          </div>
        </div>
      </div>
      <div className='p-2 h-[calc(100%-50px)] '>
        {children}
      </div>
      </main>
  )
}

export default Layout
