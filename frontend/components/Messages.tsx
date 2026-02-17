import React, { JSX } from "react";
import Card from "./Card";

export default function Messages(): JSX.Element {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="font-semibold"> Messages   </h1>
            <div>
                <Card
                    cardImage={"https://placehold.co/60X40.png"}
                    badge={true}
                    cardTitle={'User name'}
                    cardSubTitle={'This is subtitle'}
                    timestamp={'2 hours ago'}
                    // amount={'$100'}
                    // currency={'USD'}
                    shippingStatus={"delivered"}
                />
            </div>
        </div>
    );
}