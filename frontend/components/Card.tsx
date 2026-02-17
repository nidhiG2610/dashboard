import React, { JSX } from "react";
import Icon from "./Icon";
import Dot from "./Dot";
import { twMerge } from "tailwind-merge";
import { formatDate, formatTimestamp } from "../Helpers/utilities";

interface BaseProps {
    cardImage?: string; // src path
    cardImageIcon?: string; // icon name
    cardTitle: string;
    cardSubTitle?: string | undefined;
    timestamp?: string | undefined;
    amount?: number | undefined;
    currency?: string | undefined;
    shippingStatus?: "delivered" | "pending" | "failed" | "cancelled" | "shipping";
    badge?: boolean;
    event?: {
        eventType: string;
        eventTime: string;
    };

}
// interface CardWithImageProps extends BaseProps {
//     cardImage: string; // src path
// }

// interface CardWithIconProps extends BaseProps {
//     cardImageIcon: string; // icon name
// }

export default function Card({
    cardImage,
    cardTitle,
    cardSubTitle,
    cardImageIcon, // icon name
    timestamp, // in date time
    amount, // increment/decreament
    currency = 'CAD', // can be USD | EUR | GBP | etc.
    shippingStatus, // can be delivered | pending | failed | cancelled | shipping
    badge,
    event
}: BaseProps): JSX.Element {

    const shippingColorMapping: Record<string, string> = {
        'delivered': 'text-green-500',
        'pending': 'text-yellow-500',
        'failed': 'text-red-500',
        'cancelled': 'text-gray-500',
        'shipping': 'text-blue-500'
    };
    const shippingLabelColor: string = shippingStatus && shippingColorMapping[shippingStatus] || 'text-gray-500';

    const eventTypeColorMapping: Record<string, string> = {
        'meeting': 'primary',
        'call': 'success',
        'email': 'danger'
    };

    // add peer hover effect for cardImageIcon
    // add bg-primary of <Icon when hovering on <div>

    const classList = cardImageIcon ? "bg-primary-light border-primary-light hover:bg-white hover:border hover:border-secondary-outline" : "bg-gray-100 border-gray-100 hover:bg-gray-50 hover:border hover:border-bg-gray-100";

    return (
        <div className={twMerge("group flex flex-row gap-4 w-full p-4 rounded-lg duration-200 border ", classList)}>
            {
                (cardImage || cardImageIcon)
                && (
                    <div className="relative flex-shrink-0">
                        {cardImage && <img src={cardImage} alt="Card Image" className="flex items-center justify-center w-9 h-9 rounded-lg shadow-sm shadow-gray-300" />}
                        {
                            cardImageIcon && <Icon name={cardImageIcon} size={5} fillColor={'#5a6cd1ff'} />
                        }
                        {
                            badge && <div className="absolute -mt-2 ml-7">
                                <Dot color={twMerge('bg-success')} />
                            </div>
                        }
                    </div>
                )
            }

            <div className="flex flex-col justify-center gap-0.5">
                {
                    event && <div className="flex flex-row gap-1 items-center pb-2" >
                        <Dot color={twMerge(`bg-${eventTypeColorMapping[event.eventType]}`, 'relative -mt-0.5')} shouldPulse={false} />
                        <span className={twMerge(`text-xs font-semibold text-${eventTypeColorMapping[event.eventType]}`)}>{formatTimestamp(event.eventTime)}</span>
                    </div>
                }
                <h1 className="font-semibold">{cardTitle}</h1>
                {cardSubTitle && <div className="text-xs text-gray-500">{cardSubTitle}</div>}
            </div>
            <div className="flex flex-col gap-1 ml-auto text-xs text-right text-gray-500">
                {timestamp && <p>{formatTimestamp(timestamp)}</p>}
                {amount && <p>{amount} {currency && <span className="text-gray-400">{currency}</span>}</p>}
                {shippingStatus && <p className={shippingLabelColor}>{shippingStatus}</p>}
            </div>
        </div>
    );
}