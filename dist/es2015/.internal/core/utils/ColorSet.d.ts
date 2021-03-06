/**
 * This module contains ColorSet object definition
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { Color, iHSL } from "./Color";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines an interface for objects identifying a color step.
 *
 * A "color step" object is used when [[ColorSet]] is generating colors, when
 * it has ran out of pre-set colors.
 *
 * It takes the last available color, then applies one or several of the
 * properties, like hue, or saturation with each subsequent generated color.
 */
export interface iColorSetStepOptions {
    hue?: number;
    brighten?: number;
    lighten?: number;
    lightness?: number;
    saturation?: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents a set of colors. Can also generate colors according to set rules.
 *
 * @important
 */
export declare class ColorSet extends BaseObject {
    /**
     * Holds the list of the colors in this set. (preset or auto-generated)
     *
     * @type {Color[]}
     */
    protected _list: Color[];
    /**
     * Current step in a color generator's cycle.
     *
     * @type {number}
     */
    protected _currentStep: number;
    /**
     * Current pass in the color generator's cycle. Normally a generator would
     * cycle through all available hue range, then repeat it, alternating other
     * color properties, to generate distinctive colors.
     *
     * @type {number}
     */
    protected _currentPass: number;
    /**
     * A base color. If there are no colors pre-set in the color list, ColorSet
     * will use this color as a base when generating new ones, applying
     * `stepOptions` and `passOptions` to this base color.
     *
     * @type {Color}
     */
    baseColor: Color;
    /**
     * Modifications to apply with each new generated color.
     *
     * @type {iColorSetStepOptions}
     */
    stepOptions: iColorSetStepOptions;
    /**
     * Modifications to apply on top of `stepOptions` for each "pass" of the
     * color generation.
     *
     * A "pass" is when ColorSet generates `minColors` number of colors.
     *
     * @type {iColorSetStepOptions}
     */
    passOptions: iColorSetStepOptions;
    /**
     * An index increment to use when iterating through color list.
     *
     * Default is 1, which means returning each and every color.
     *
     * Setting it to a bigger number will make ColorSet `next()` iterator skip
     * some colors.
     *
     * E.g. setting to 2, will return every second color in the list.
     *
     * This is useful, when the color list has colors that are too close each
     * other for contrast.
     *
     * However, having bigger number will mean that `next()` iterator will go
     * through the list quicker, and the generator will kick sooner.
     *
     * @type {number}
     */
    step: number;
    /**
     * A number of colors to generate in one "pass".
     *
     * This setting can be automatically overridden, if ColorSet has a list of
     * pre-set colors. In such case ColorSet will generate exactly the same
     * number of colors with each pass as there were colors in original set.
     *
     * @type {number}
     */
    minColors: number;
    /**
     * Do not let the "lightness" of generated color to fall below this
     * threshold.
     *
     * @type {number}
     */
    minLightness: number;
    /**
     * Do not let the "lightness" of generated color to get above this threshold.
     *
     * @type {number}
     */
    maxLightness: number;
    /**
     * Randomly shuffle generated colors.
     *
     * @type {boolean}
     */
    shuffle: boolean;
    /**
     * When colors are generated, based on `stepOptions`, each generated color
     * gets either lighter or darker.
     *
     * If this is set to `true`, color generator will switch to opposing spectrum
     * when reaching `minLightness` or `maxLightness`.
     *
     * E.g. if we start off with a red color, then gradually generate lighter
     * colors through rose shades, then switch back to dark red and gradually
     * increase the lightness of it until it reaches the starting red.
     *
     * If set to `false` it will stop there and cap lightness at whatever level
     * we hit `minLightness` or `maxLightness`, which may result in a number of
     * the same colors.
     *
     * @type {boolean}
     */
    wrap: boolean;
    /**
     * Re-use same colors in the pre-set list, when ColorSet runs out of colors,
     * rather than start generating new ones.
     *
     * @type {boolean}
     */
    reuse: boolean;
    /**
     * Saturation of colors. THis will change saturation of all colors of color set.
     * It is recommended to set this in theme, as changing it at run time won't make the items to redraw and change color.
     *
     * @type {boolean}
     */
    saturation: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns current list of colors.
     *
     * If there are none, a new list of colors is generated, based on various
     * ColorSet settings.
     *
     * @return {Color[]} Color list
     */
    /**
     * Sets a list of pre-defined colors to use for the iterator.
     *
     * @param {Color[]} value Color list
     */
    list: Color[];
    /**
     * Returns next color in the list using internal iterator counter.
     *
     * If `step` is set to something other than 1, it may return other color than
     * exact next one in the list.
     *
     * @return {Color} Color
     */
    next(): Color;
    /**
     * Returns a color at specific index in the list.
     *
     * @param  {number}  i  Index
     * @return {Color}      Color
     */
    getIndex(i: number): Color;
    /**
     * Resets internal iterator.
     *
     * Calling `next()` after this will return the very first color in the color
     * list, even if it was already returned before.
     */
    reset(): void;
    /**
     * Generates colors based on the various ColorSet settings.
     *
     * @param {number} count Number of colors to generate
     */
    generate(count: number): void;
    /**
     * Returns current last color. It's either the last color in the list of
     * colors, or `baseColor` if list is empty.
     *
     * @return {Color} Color
     */
    protected readonly currentColor: Color;
    /**
     * Generates modifiers for color, based on what step and pass.
     *
     * @param {iHSL}                  hsl   Curren HSL value of the color to modify
     * @param {iColorSetStepOptions}  base  The modifiers that were before modification to use as a base
     * @param {number}                step  Current step
     * @param {number}                pass  Current pass
     */
    protected applyStepOptions(hsl: iHSL, base: iColorSetStepOptions, step: number, pass: number): void;
}
