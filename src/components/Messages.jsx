import React from "react";
import Card from "./Card";

export default function Messages() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="font-semibold"> Messages   </h1>
            <div>
                <Card 
                    cardImage={"https://placehold.co/60X40.png"}
                    badge={'notification'}
                    cardTitle={'User name'}
                    cardSubTitle={'This is subtitle'}
                    time={'2 hours ago'}
                    // amount={'$100'}
                    // currency={'USD'}
                    shippingStatus={"delivered"}
                />
            </div>
        </div>
    );
}