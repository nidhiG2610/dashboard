import React from "react";
import LatestUpdates from "./LatestUpdates";
import Events from "./Events";
import ConversionHistory from "./ConversionHistory";
import Messages from "./Messages";

export default function Updates() {
    return (
      <>
      <div>
            <Messages />
            <LatestUpdates />
            <Events />
            <ConversionHistory />
      </div>
      </>

    );
}