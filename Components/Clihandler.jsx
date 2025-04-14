"use client"
import React from 'react'
import Image from 'next/image';
import img1 from "../Assets/gitlab.png"
import { useEffect,useState,useRef } from 'react';
function Clihandler() {
    const inputRefs = useRef([]);
    const [useridentification,setuseridentification]=useState("...")
    const [dots, setdots] = useState(0);
    const array=["|","/","—","\\"]

    const [masterhistory, setMasterhistory] = useState([
        { input: "IS IT", response: "YES", isdone: true },
      ]);
    const masterdata=[{calltype:"apiad",link:"https://apiad.vercel.app",specification:"",title:"Passwordless Active Directory"}]

    useEffect(() => {
        setMasterhistory(prev => {
          const temp = [...prev]; // copy to avoid mutation
          const lastelement = temp.pop();
          const lastIndex = masterhistory.findIndex(item => !item.isdone);
    if (lastIndex !== -1 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
      
          if (lastelement?.isdone) {
            const obj = { input: "", response: "", isdone: false };
            return [...temp, lastelement, obj]; // re-add the popped + new
          } else {
            console.log("Waiting for the Input");
            return prev; // no change
          }
        });
      }, [masterhistory]);
      

    useEffect(() => {
      const interval = setInterval(() => {
        setdots(prev => (prev < 3 ? prev + 1 : 0));
      }, 120);
    
      return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        setuseridentification(navigator.userAgent)
      }, []);
    

      const handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            setMasterhistory(prev => {
                const temp = [...prev]; // copy to avoid mutation
                const lastelement = temp.pop();
                const lastIndex = masterhistory.findIndex(item => !item.isdone);
          if (lastIndex !== -1 && inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
          }
            
                if (!lastelement?.isdone) {


                    //perform operation
                    //and then store the values inside the objects
                  const obj = { input: "1", response: "2", isdone: true };
                  return [...temp, obj]; // re-add the popped + new
                } else {
                  console.log("Waiting for the Input");
                  return prev; // no change
                }
              });

        }
      };


     


  return (
    <div className='bg-black flex text-white flex-col p-5'>
        
        <pre className="text-gray-500 font-mono text-xs leading-tight whitespace-pre">
{`
███████╗██╗   ██╗███████╗
██╔════╝██║   ██║██╔════╝
███████╗██║   ██║█████╗      
╚════██║██║   ██║██╔══╝     
███████║╚██████╔╝███████╗   ██║   ██║   ██║   ██║  
╚══════╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝   ╚═╝   ╚═╝ 
`}
</pre>


        <div className='outline-1 mt-10 p-1  outline-white'>

            <div className='flex font-mono flex-col items-left ml-10 gap-3 mt-3 mb-3  text-gray-400'>
                <p>Workspace</p>
                <p>Browser</p>
                <p>Version</p>
                <p>Engine</p>
                <p>State <span className='text-green-600'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running {array[dots]}</span></p>

            </div>


        </div>
        <div className='outline-1 mt-10 p-1 outline-white'>

<div className='flex font-mono flex-col items-left ml-10 gap-3 mt-3 mb-3  text-gray-400'>
    <p>Database</p>
    <p>Server</p>

</div>
</div>


<div className='flex mt-5 w-full flex-col'>
    {masterhistory.map((item,index)=>(
        <div key={index}>
            <p className='text-white font-mono mt-5'>User @ <span className='text-green-600'>~   {useridentification}</span></p>
            <div className='flex flex-row'>
            {item.isdone&& <p><span className='text-purple-600'>Inp $-{'>'}</span>{item.input}</p>}
            {!(item.isdone)&&<div className='flex flex-row'>
                <span className='text-purple-600'>Inp $-{'>'}&nbsp;</span>
                <input onKeyDown={handleKeyDown} className='outline-none caret-purple-600' ref={(el) => (inputRefs.current[index] = el)} type="text"/>
                </div>}
            </div>

            <div>
            {item.isdone&&<p><span className='text-red-600'>Resp $-{'>'} </span>{item.response}</p>}
            <iframe style={{
                width: '1500px',       // make iframe content bigger
                height: '1000px',
                transform: 'scale(0.3)', // zoom out
                transformOrigin: 'top left',
                border: 'none',
                }} src="https://apiad.vercel.app"></iframe>
            

            </div>
            

        </div>
    ))}


</div>


    </div>
  )
}

export default Clihandler