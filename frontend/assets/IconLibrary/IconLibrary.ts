
import type { Icon } from "../../interfaces/icon.ts";
import { icons } from "./IconLibraryHelper.ts";
// /home/bhautik/projects/dashboard/frontend/assets/IconLibrary.ts
// Simple icon library: an array of { name, svg } and helpers to get SVG string or a React element.

// Icon list (add more icons here)


// Map for fast lookup
const iconsMap: Record<string, string> = icons.reduce((map: Record<string, string>, item: Icon) => {
    map[item.name] = item.path;
    return map;
}, {});

/**
 * Convert options to attribute string to inject into the <svg ...>
 * Supported options: width, height, className, fill, ariaHidden (boolean), role
 */
function attrsToString(options = {}) {
    const parts = [];
    if (options.width) parts.push(`width="${options.width}"`);
    if (options.height) parts.push(`height="${options.height}"`);
    if (options.className) parts.push(`class="${options.className}"`);
    if (options.fill) parts.push(`fill="${options.fill}"`);
    if (options.role) parts.push(`role="${options.role}"`);
    if (options.ariaHidden) parts.push(`aria-hidden="${options.ariaHidden}"`);
    return parts.join(' ');
}

function injectAttrsIntoSvg(svg, attrsString) {
    if (!attrsString) return svg;
    // Insert attributes into the opening <svg ...> tag
    return svg.replace(/^<svg\b/, `<svg ${attrsString}`);
}

/**
 * Get raw SVG string for an icon name.
 * Returns null if icon not found.
 *
 * Example:
 *   getSvgString('home', { width: 20, height: 20, className: 'icon' })
 */
export function getSvgString(name, options = {}) {
    const svg = iconsMap[name];
    if (!svg) return null;
    const attrs = attrsToString(options);
    return injectAttrsIntoSvg(svg, attrs);
}

/**
 * Get a React element for the icon.
 * Pass React as the second argument (no automatic import).
 * Returns null if icon not found.
 *
 * Example:
 *   import React from 'react';
 *   const HomeIcon = getReactIcon('home', React, { width: 16, height: 16 });
 */
export function getReactIcon(name, React, options = {}) {
    if (!React) throw new Error('Pass React as second argument: getReactIcon(name, React, options)');
    const svgString = getSvgString(name, options);
    if (!svgString) return null;
    // Using a span wrapper with dangerouslySetInnerHTML keeps this file free of JSX.
    return React.createElement('span', {
        dangerouslySetInnerHTML: { __html: svgString },
    });
}

// Default export: getSvgString for simple usage
export default getSvgString;

// Also export the raw array in case you want to iterate or build a sprite
export { icons };