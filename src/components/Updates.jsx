import React from "react";
import Messages from "./Messages";
import LatestUpdates from "./LatestUpdates";
import Events from "./Events";
import ConversionHistory from "./ConversionHistory";

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