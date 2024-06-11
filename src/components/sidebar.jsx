'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'; 
import { setNewDoubt, setprompt } from '../redux/slice';

const SideBar = () => {
    const [extendSide, setExtendSide] = useState(true);
    const { prevPrompt, prompt } = useSelector((state) => state.doubts);
    const dispatch = useDispatch();
    console.log(prevPrompt);
    console.log(prompt);

    const loadPromt = async (prompt) => {
        dispatch(setprompt(prompt));
    }

    const openNewDoubt = () => {
        dispatch(setNewDoubt(true));
    }

    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [prevPrompt])
    return (
        <div className={`min-h-[100vh] inline-flex flex-col justify-between bg-[#f0f4f9] p-6 ${extendSide ? "w-[25%]" : "w-auto"}`}>
            <div className=' block '>
                <FaBars size={20} fontSize={18} className=" cursor-pointer ml-[10px]" onClick={() => setExtendSide(prev => !prev)} />
                <div className='flex mt-4 items-center gap-3 p-3 bg-[#e6eaf1] rounded-3xl text-black cursor-pointer' onClick={openNewDoubt}>
                    <BsChatText fontSize={22} fontFamily='serif' fontWeight={500}/>
                    {
                        extendSide ? (<p className='font-semibold font-serif text-base'>New Chat</p>) : (null)
                    }
                </div>
                {
                    extendSide ? (
                        <div className='flex flex-col '>
                            <strong className='font-bold mt-[30px] mb-[20px]'>Recent</strong>
                            <div className='overflow-y-scroll no-scrollbar h-[360px]'>
                                {
                                    prevPrompt.map((item, index) => {
                                        return (
                                            <div className='flex flex-row items-center gap-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb] px-4 py-2 ' key={index} onClick={() => loadPromt(item)}>
                                                <MdOutlineMarkChatRead className=' mt-1' size={20} fontSize={16} />
                                                <p className='font-medium font-serif'>{item.slice(0, 15)}...</p>
                                            </div>
                                        )
                                    })
                                }
                                <div ref={bottomRef}/>
                            </div>
                        </div>
                    ) : (null)
                }
            </div>
        </div>
    )
}

export default SideBar;