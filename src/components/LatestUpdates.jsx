import React from "react";
import Card from "./Card";

export default function LatestUpdates() {
    const dummyData = [
        {
            id: 1,
            title: "New task assigned",
            description: "You have been assigned a new task",
            timestamp: "2023-03-15T10:00:00Z",
            cardImageIcon: "task"
        },
        {
            id: 2,
            title: "Item sale",
            description: "An item has been sold",
            timestamp: "2023-03-16T12:00:00Z",
            amount: "$100",
            currency: "USD",
            cardImageIcon: "cart"
        },
        {
            id: 3,
            title: "Item upload complete",
            timestamp: "2023-03-17T14:00:00Z",
            cardImageIcon: "message"
        },
        {
            id: 4,
            title: "Item processing complete",
            timestamp: "2023-03-18T16:00:00Z",
            cardImageIcon: "check"
        }
    ];

    return (
       <div className="flex flex-col gap-6 w-full">
            <h1 className="font-semibold"> Latest Updates </h1>
            <div className="flex flex-col gap-4">
                {dummyData.map((update) => (
                    <Card
                        key={update.id}
                        cardTitle={update.title}
                        cardSubTitle={update.description}
                        amount={update.amount}
                        currency={update.currency}
                        cardImageIcon={update.cardImageIcon}
                        timestamp={update.timestamp}
                    />
                ))}
            </div>
        </div>
    );
}