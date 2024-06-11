'use client'
import React, { useEffect, useState } from 'react'
import { GiThink } from "react-icons/gi";
import { RiGalleryUploadLine } from "react-icons/ri";
import { CiMicrophoneOn } from "react-icons/ci";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setNewDoubt, setPrevPrompt, setResultData, setprompt } from '../../redux/slice';
import { onSent } from '../../config/generateResponse';
import botImg from '../../../public/bot_profile.jpeg';
import { VscAccount } from "react-icons/vsc";
import "./loader.css";
import Image from 'next/image';

const Main = () => {

    const { prompt, newDoubt, resultData } = useSelector((state) => state.doubts);
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [currPrompt, setCurrPropt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log("The input is : ", input);

    const handlekeyDown = (e) => {
        if (e.key === "Enter") {
            submitHandler();
        }
    }
    // const delayPara = (index, nextWord) =>{
    //     setTimeout(() => {
    //         setResultData(input)
    //     }, index * 100);
    // }
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    useEffect(() => {
        if (newDoubt === true) {
            newChat();
            dispatch(setNewDoubt(false));
        }
    }, [newDoubt]);

    const submitHandler = async () => {
        try {
            if (prompt !== "") {
                console.log("The curr prompt is : ", prompt)
                setLoading(true);
                setShowResult(true);
                setCurrPropt(prompt);
                const res = await onSent(prompt);
                let responseArray = res.split("**");
                // To old the imp stuff
                let newRes = "";
                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newRes += responseArray[i];
                    } else {
                        newRes += "<b>" + responseArray[i] + "</b>";
                    }
                }
                // to create new line
                let newRes2 = newRes.split("*").join("</br>");
                dispatch(setprompt(""));
                dispatch(setResultData(newRes2));
                setLoading(false);
            } else {
                setLoading(true);
                setCurrPropt(input);
                setShowResult(true);
                if (prompt !== "" || input !== "") {
                    dispatch(setPrevPrompt(input));
                }
                setInput("");
                const res = await onSent(input);
                let responseArray = res?.split("**");
                // To old the imp stuff
                let newRes = "";
                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newRes += responseArray[i];
                    } else {
                        newRes += "<b>" + responseArray[i] + "</b>";
                    }
                }
                // to create new line
                let newRes2 = newRes.split("*").join("</br>");
                dispatch(setResultData(newRes2));
                setLoading(false);
                console.log("The reult id : ", res);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (prompt !== "") {
            submitHandler();
        }
    }, [prompt])
    return (
        <div className='min-h-[100vh] pb-2 relative w-full bg-white text-black'>
            <div className='flex items-center text-lg p-4'>
                <div className='flex flex-row items-center justify-between gap-3'>
                    <GiThink size={26} />
                    <p className='font-bold text-3xl'>Doubt Forum</p>    
                </div>
            </div>
            {
                !showResult ? (
                    <div className=' max-w-[90%] mx-auto mim-h-[15vh] '>
                        <div className=' ml-4 font-bold text-pretty p-4'>
                            <p>
                                <span className='text-6xl font-semibold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>Hello, Student</span>
                            </p>
                            <p className='text-5xl ml-16 mt-3 italic text-transparent bg-clip-text font-bold bg-gradient-to-r from-[#ff2fc4] to-[#d4ce0c]'>How can I help u today ? </p>
                        </div>
                    </div>
                ) : (
                    <div className=' px-16 py-14 max-h-[75vh] overflow-y-auto overflow-x-hidden no-scrollbar'>
                        <div className="mx-[40px] flex items-center gap-5 mb-4">
                            <VscAccount size={50} className=' shadow-lg shadow-blue-500 rounded-full'/>
                            <p className=' font-semibold text-pretty italic text-2xl ml-2'>
                                "{currPrompt}"
                            </p>
                        </div>
                        <div className='flex gap-5 mx-[40px] mt-4 w-full'>
                            <div className='flex flex-col max-h-full w-[7%] justify-start items-center'>
                                <Image src={botImg} alt='bot Image' width={50} height={50} className='rounded-full shadow-lg shadow-blue-500'/>
                            </div>
                            {
                                loading ? (
                                    <div className='gemini-loader w-[80%]'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                ) : (
                                    <div className='w-[80%]'>
                                        <p className='text-lg leading-7' dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div className='absolute bottom-0 w-[98%] max-w-[1260px] py-5 mx-auto right-3 text-black'>
                <div className='flex items-center justify-between gap-5 rounded-full bg-[#e2e6eb]'>
                    <input type="text" placeholder='Ask ur Doubt' className=' flex-1 outline-none border-none text-lg rounded-2xl font-medium bg-[#e2e6eb] h-12 ml-4' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={handlekeyDown} />
                    <div className='flex items-center gap-5 mr-5 text-black'>
                        <RiGalleryUploadLine size={20} fontWeight={500} />
                        <CiMicrophoneOn size={20} fontWeight={500} />
                        <button>
                            <BiSend size={20} onClick={() => submitHandler()} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;