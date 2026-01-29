import React from "react";
import Card from "./Card";

export default function Events() {

    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="font-semibold"> Upcoming events </h1>
            <div>
                <Card
                    cardTitle={'Meeting with Client'}
                    cardSubTitle={'Discuss project updates and next steps'}
                    event= {
                      {
                        eventTime:'1672565285',
                        eventType: 'meeting'
                      }
                    } // formatted from timestamp
                />
            </div>
        </div>
    );
}