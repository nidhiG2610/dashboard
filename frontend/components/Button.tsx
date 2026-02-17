import React, { ButtonHTMLAttributes } from "react";
import Icon from "./Icon";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children?: React.ReactNode;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"] | "cancel" | "button";
    variant?: "primary" | "secondary" | "tertiary";
    iconName?: string | null;
}

const buttonTypes = ["submit", "cancel", "button"] as const;

function Button({
    children,
    type = "button", 
    variant = "primary",
    disabled = false,
    className = "",
    iconName = null,
    ...props
}: ButtonProps) {
    // map "cancel" to a normal button type so forms don't submit
    const htmlButtonType = type === "submit" ? "submit" : "button";

    // base styling shared across variants
    const base =
        "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors transition-transform duration-100 ease-in-out focus:outline-none";

    const variantMap: Record<string, string> = {
        primary:
            "bg-primary text-white border border-transparent hover:bg-primary-dark disabled:bg-primary-disabled focus-visible:ring-3 focus-visible:ring-primary-light",
        secondary:
            "bg-secondary text-primary border border-secondary-outline hover:bg-secondary-outline disabled:bg-secondary-disabled focus-visible:ring-3 focus-visible:ring-secondary-light",
        tertiary:
            "bg-ghost text-ghost-text border border-ghost-outline disabled:bg-ghost-disabled hover:bg-ghost-hover focus-visible:ring-3 focus-visible:ring-ghost-outline",
    };

    const IconColor: Record<string, string> = {
        primary: "#FFFFFF",
        secondary: "#4A7AF0",
        tertiary: "#14171A"
    }

    const variantClass = variantMap[variant] || variantMap.primary;

    // disabled state
    const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

    // active press transform
    const activeClass = "active:translate-y-px";

    const classes = [
        base,
        variantClass,
        disabled ? disabledClass : activeClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={htmlButtonType}
            className={classes}
            disabled={disabled}
            {...props}
        >
            {children}
            {iconName && <Icon name={iconName} size={6} fillColor={IconColor[variant] as string} />}
        </button>
    );
}

export default Button;
