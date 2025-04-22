"use client";
import React from "react";
import Image from "next/image";
import img1 from "../Assets/gitlab.png";
import { useEffect, useState, useRef } from "react";
function Clihandler() {
  const fixedinputs = ["apiad", "newag", "maersk", "dfsbfs"];
  const [currentstring, setcurrentstring] = useState("");

  const inputRefs = useRef([]);
  const [useridentification, setuseridentification] = useState("...");
  const [dots, setdots] = useState(0);
  const array = ["|", "/", "—", "\\"];

  const [masterhistory, setMasterhistory] = useState([{}]);
  const masterdata = [
    {
      calltype: "apiad",
      link: "https://apiad.vercel.app",
      specification: `specification: 'Passwordless Auth System 🔐
   - Web + Android-based login flow
   - QR Code pairing, fingerprint verification
   - Secure device fingerprinting (IMEI, network hash, Keystore integration)
   - Built from scratch, aimed at redefining web auth'`,
      title: "Passwordless Active Directory",
    },

    {
      calltype: "newag",
      link: "https://news-aggregators.vercel.app/",
      specification: "",
      title: "News Aggregator Website",
    },
    {
      calltype: "maersk",
      link: "https://maersk-nine.vercel.app/",
      specification: "",
      title: "Maersk Supply Chain Frontend Clone",
    },
    {
      calltype: "dfsbfs",
      link: "https://pathfinder-ten-phi.vercel.app/",
      specification: "",
      title: "DFS+BFS Algorithm in React Visualation",
    },
  ];

  useEffect(() => {
    setMasterhistory((prev) => {
      const temp = [...prev]; // copy to avoid mutation
      const lastelement = temp.pop();
      const lastIndex = masterhistory.findIndex((item) => !item.isdone);
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
    console.log(masterhistory.response);
    const interval = setInterval(() => {
      setdots((prev) => (prev < 3 ? prev + 1 : 0));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setuseridentification(navigator.userAgent);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setMasterhistory((prev) => {
        const temp = [...prev]; // copy to avoid mutation
        const lastelement = temp.pop();
        const lastIndex = masterhistory.findIndex((item) => !item.isdone);
        if (lastIndex !== -1 && inputRefs.current[lastIndex]) {
          inputRefs.current[lastIndex].focus();
        }

        if (!lastelement?.isdone) {
          var setresponse = "";
          var inputdata = "";
          var heading="";
          var specification=""
          if (fixedinputs.includes(currentstring)) {
            for (const current of masterdata)
              if (current.calltype == currentstring) {
                setresponse = current.link;
                inputdata = current.calltype;
                specification=current.specification;
                heading=current.title
              }
          } else if (currentstring === "cls") {
            setMasterhistory([{}]);
            setcurrentstring("hello");
          } else if (currentstring === "ls prj") {
            setresponse = fixedinputs;
            inputdata = currentstring;
          } else {
            setresponse = "Validation Fail";
          }

          //perform operation
          //and then store the values inside the objects
          const obj = {
            input: inputdata,
            response: setresponse,
            heading: heading,
            specification:specification,
            isdone: true,
          };
          return [...temp, obj]; // re-add the popped + new
        } else {
          console.log("Waiting for the Input");
          return prev; // no change
        }
      });
    }
  };

  return (
    <div className="bg-black flex text-white flex-col p-5">
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

      <div className="outline-1 mt-10 p-1  outline-white">
        <div className="flex font-mono flex-col items-left ml-10 gap-3 mt-3 mb-3  text-gray-400">
          <p>Workspace</p>
          <p>Browser</p>
          <p>Version</p>
          <p>Engine</p>
          <p>
            State{" "}
            <span className="text-green-600">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Running {array[dots]}
            </span>
          </p>
        </div>
      </div>
      <div className="outline-1 mt-10 p-1 outline-white">
        <div className="flex font-mono flex-col items-left ml-10 gap-3 mt-3 mb-3  text-gray-400">
          <p>
            Database&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <span className="text-red-600">Not developed</span>
          </p>
          <p>
            Server&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <span className="text-red-600">Not developed</span>
          </p>
          <p>
            Version&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <span className="text-red-600">1.0.0</span>
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col">
        {masterhistory.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <p className="text-white font-mono">
              User @{" "}
              <span className="text-green-600">~ {useridentification}</span>
            </p>
            <div className="flex flex-row">
              {item.isdone && (
                <p>
                  <span className="text-purple-600">Inp $-{">"}</span>
                  {item.input}
                </p>
              )}
              {!item.isdone && (
                <div className="flex flex-row">
                  <span className="text-purple-600">Inp $-{">"}&nbsp;</span>
                  <input
                    onChange={(e) => {
                      setcurrentstring(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    className="outline-none caret-purple-600"
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                  />
                </div>
              )}
            </div>

            {item.isdone && !(typeof(item.response)=="object") && (
              <p>
                <span className="text-red-600">Resp $-{">"} </span>
                {item.response}
                
              </p>
            )}

            {item.isdone && (typeof item.response=="object")&& (
                          <div>
                            <div className="flex">
                            <span className="text-red-600">Resp $-{">"} </span>
                            <p className="text-amber-500">&nbsp;Projects</p>

                            </div>
                           
                            {item.response.map((index,value)=>(
                              <div className="ml-1" key={value}>
                               <span className="text-amber-500">--</span>&nbsp;
                               <span className="italic text-amber-500">{index}</span> 
                              </div>
                            ))}
                            <p className="text-blue-500">Type Above Commands to Get in Detailed</p>
                          </div>
                        )}

                        <span className="text-lime-600 mt-1 mb-1">{item.heading}</span>
                        <pre className="text-lime-600 whitespace-pre-wrap break-words overflow-x-auto">{item.specification}</pre>                            

            {item.input !== "ls prj" &&
              item.response !== "" &&
              item.response != undefined && (
                <div
                  style={{
                    width: "300px",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    className="bg-white"
                    style={{
                      width: "1500px", // iframe content size
                      height: "1000px",
                      transform: "scale(0.2)", // zoom out
                      transformOrigin: "top left",
                      border: "none",
                    }}
                    src={item.response}
                  ></iframe>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clihandler;
