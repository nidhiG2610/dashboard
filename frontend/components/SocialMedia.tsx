import React, { forwardRef, useId } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { twMerge } from "tailwind-merge";

const SocialMedia = function SocialMedia(
    {
        className = "",
    },
) {

    return (
        <div className={twMerge("flex flex-row gap-2", className)}>
            <Button type="button" variant="tertiary" iconName={"twitter"} className="flex-1"/>
            <Button type="button" variant="tertiary" iconName={"google"} className="flex-1"/>
            <Button type="button" variant="tertiary" iconName={"facebook"} className="flex-1"/>
            <div className="flex items-center">
                <span className="text-gray-500">Or sign in with</span>
            </div>
        </div>
    );
};

export default SocialMedia;