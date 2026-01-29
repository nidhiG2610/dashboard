import React from "react";
import { getFirstChar } from "../Helpers/utitlies";
import { twMerge } from "tailwind-merge";
import { router } from "../router";

export default function WelcomeCard() {
    return (
        <div className="flex flex-col gap-4 ">        
            <div className={twMerge("size-fit flex items-center justify-center px-7 py-4 mt-14 text-7xl font-bold text-white bg-primary rounded-[45px] shadow-lg")}> 
                {getFirstChar("Cogo")}   
            </div>
            <div>
                <p className="text-2xl font-extralight text-secondary-text">Welcome,</p>
                <p className="text-xl font-bold ">User name,</p>
            </div>
        </div>
    );
}