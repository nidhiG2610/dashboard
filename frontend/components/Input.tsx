import React, { useState, forwardRef } from 'react';
import Icon from './Icon.js';
import { twMerge } from 'tailwind-merge';
// import PropTypes from 'prop-types';

/**
 * Flexible Input component supporting any HTML input types (text, email, password, number, etc.)
 * - Controlled or uncontrolled usage (accepts value or defaultValue)
 * - Password visibility toggle when type="password"
 * - Accessible label support and error display
 * - Forwards ref to the underlying input
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { 
    label?: string;
    error?: string;
    showPasswordToggle?: boolean;
    iconName?: string | null;
    ref?: React.Ref<HTMLInputElement>;
}
const Input = (
    {
        type = 'text',
        id,
        name,
        label,
        value,
        defaultValue,
        onChange,
        placeholder,
        required = false,
        className = '',
        error,
        showPasswordToggle = true,
        iconName = null,
        ref,
        ...rest
    } : InputProps
) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const inputId = id || name;
    const inputColor = error ? '#e53e3e' : '#cbd5e0';

    return (
        <div className={`input-wrapper ${className}`} style={{ display: 'inline-block' }}>
            {label && (
                <label htmlFor={inputId} style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#8181A5' }}>
                    {label} {required ? <span aria-hidden="true">*</span> : null}
                </label>
            )}

            <div className={twMerge('flex flex-row gap-1 text-align border-b pt-0 pr-1 pb-1', `border-b-${inputColor}`)}>
                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={inputType}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    style={{
                        // padding: '0px 8px 8px 0px',
                        fontSize: 12,
                        fontWeight: 500,
                        border: 'none',
                        borderRadius: 0,
                        outline: 'none',
                        flex: 1,
                    }}
                    {...rest}
                />
                {iconName && <Icon name={iconName} size={5} fillColor={inputColor} />}

                {isPassword && showPasswordToggle && (
                    // @to-do implement password visibility toggle
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        style={{
                            // marginLeft: 8,
                            // padding: '6px 8px',
                            fontSize: 12,
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: 0,
                            background: '#fff',
                        }}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>

            {error && (
                <div id={`${inputId}-error`} role="alert" style={{ color: '#e53e3e', marginTop: 6, fontSize: 13 }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default Input;