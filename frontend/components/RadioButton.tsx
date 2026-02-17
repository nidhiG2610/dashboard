import React, { forwardRef, useId } from "react";

/**
 * RadioButton
 *
 * Props:
 * - id, name, value, checked, defaultChecked, onChange, disabled
 * - label: string or node shown after the control
 * - className: wrapper label classes (for spacing / layout)
 * - inputClassName: classes applied to the actual <input> (hidden)
 * - controlClassName: classes applied to the visual radio control (use Tailwind)
 * - dotClassName: classes applied to the inner dot (use Tailwind)
 * - labelClassName: classes applied to the label text
 * - size: 'sm' | 'md' | 'lg' (affects default control size)
 *
 * The component uses "peer" utilities so you can override with Tailwind by passing classes.
 */

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    controlClassName?: string;
    dotClassName?: string;
    labelClassName?: string;
    type?: "sm" | "md" | "lg";
}

const RadioButton = forwardRef(function RadioButton(
    {
        id,
        name,
        value,
        checked,
        defaultChecked,
        onChange,
        disabled = false,
        label,
        children,
        className = "",
        inputClassName = "",
        controlClassName = "",
        dotClassName = "",
        labelClassName = "text-sm",
        type = "md",
        ...rest
    } : RadioButtonProps,
    ref: React.Ref<HTMLInputElement>
) {
    const genId = useId ? useId() : `radio-${Math.random().toString(36).slice(2, 9)}`;
    const inputId = id || genId;

    const dotSizeMap = {
        sm: "w-1 h-1",
        md: "w-2 h-2",
        lg: "w-3 h-3",
    };

    const sizeMap = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };
    const controlBase =
        "inline-flex items-center justify-center rounded-full border bg-white transition-colors";
    const defaultControl = `${sizeMap[type]} ${controlBase} border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600`;
    const controlClasses = `${defaultControl} ${controlClassName}`.trim();
    const dotBase = "rounded-full transform transition-transform";
    const dotDefault = `${dotSizeMap[type]} scale-1 peer-checked:scale-100 bg-white`;
    const dotClasses = `${dotBase} ${dotDefault} ${dotClassName}`.trim();

    return (
        <label
            htmlFor={inputId}
            className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`}
        >
            <input
                id={inputId}
                ref={ref}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                className={`sr-only peer ${inputClassName}`}
                {...rest}
            />

            <span className={controlClasses} aria-hidden>
                <span className={dotClasses} />
            </span>

            <span className={labelClassName}>{label ?? children}</span>
        </label>
    );
});

export default RadioButton;