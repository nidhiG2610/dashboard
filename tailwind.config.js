/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./frontend/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            spacing: {
                '1': '4px',
                '5xl': '56px',
                '6xl': '64px',
                // '2': '12px',
                // '3': '16px',
                // '4': '24px',
                // '5': '32px',
                // '6': '48px',
            },
            fontSize: {
                'h1-large': '2rem',
                'h1-small': '1.5rem',
                'h2': '1.125rem',
                'h3': '1.25rem',
                'h4': '1.5rem',
                'h5': '1rem',
                'h6': '0.875rem',
                'sm': '0.875rem',
                'xs': '0.75rem'
            },
            fontWeight: {
                thin: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                black: '900',
            },
            lineHeight: {
                tight: '1.2',
                snug: '1.375',
                relaxed: '1.625',
                loose: '2',
            },
            colors: {
                primary: {
                    DEFAULT: '#4A7AF0',      // active / primary filled
                    dark: '#2e3b81ff',      // hover
                    light: '#bfd2f7ff',      // resting / subtle bg for outline hover
                    lighter: '#dce9ffff',     // lighter than light
                    lightest: '#eef6ffff',     // very subtle / near-white
                    pale: '#f7fbffff',     // almost white with tiny blue tint
                    disabled: '#E9EEF9',      // disabled bg
                    text: '#FFFFFF',      // text on primary button
                    outline: '#5E81F4',
                },
                secondary: {
                    DEFAULT: '#FFFFFF',
                    light: '#F2F2F2',
                    dark: '#1F2937',  // ghost/white background
                    hover: '#909092ff',      // ghost hover bg
                    outline: '#DCE8FF',      // subtle outline
                    text: '#14171A',
                },
                warning: {
                    DEFAULT: '#F5A623',
                    light: '#F8E1B4',
                    dark: '#C68A1D',
                },
                success: {
                    DEFAULT: '#28A745',
                    light: '#B2E2B1',
                    dark: '#1E7A33',
                },
                // backGround: {
                //     DEFAULT: '#FFFFFF',
                //     light: '#F5F8FA',
                //     dark: '#E1E8ED',
                // },
                error: {
                    DEFAULT: '#D50000',
                    light: '#FF6F6F',
                    dark: '#A00000',
                },
                ghost: {
                    DEFAULT: '#FFFFFF',      // ghost/white background
                    hover: '#F5F8FF',      // ghost hover bg
                    outline: '#DCE8FF',      // subtle outline
                    text: '#14171A',
                },
                text: {
                    primary: {
                        DEFAULT: '#14171A',
                    },
                    secondary: {
                        DEFAULT: '#657786',
                    },
                    disabled: {
                        DEFAULT: '#AAB8C2',
                    },
                },
                outline: {
                    DEFAULT: '#1DA1F2',
                    light: '#A0D8E1',
                    dark: '#1A91DA',
                },
            },
        },
    },
    plugins: [],
};
