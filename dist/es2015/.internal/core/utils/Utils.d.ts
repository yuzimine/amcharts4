/**
 * A collection of universal utility functions.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { IPoint } from "../defs/IPoint";
import { IRectangle } from "../defs/IRectangle";
import { Percent } from "./Percent";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MISC FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Copies all properties of one object to the other, omitting undefined.
 *
 * @param  {Object}   fromObject  Source object
 * @param  {Object}   toObject    Target object
 * @return {Object}               Updated target object
 * @todo Maybe consolidate with utils.copy?
 */
export declare function copyProperties(source: Object, target: Object): Object;
/**
 * Copies all properties of one object to the other.
 *
 * @param  {Object}  source     Source object
 * @param  {Object}  recipient  Target object
 * @return {Object}             Updated target object
 */
export declare function copy(source: Object, target: Object): Object;
/**
 * Checks if value is not empty (undefined or zero-length string).
 *
 * @param  {any}      value  Value to check
 * @return {boolean}         `true` if value is "empty"
 */
export declare function empty(value: any): boolean;
/**
 * [relativeToValue description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param  {$type.Optional<number | Percent>}  percent  [description]
 * @param  {number}                            full     [description]
 * @return {number}                                     [description]
 */
export declare function relativeToValue(percent: $type.Optional<number | Percent>, full: number): number;
/**
 * [relativeRadiusToValue description]
 *
 * Differs from relativeToValue so that if a value is negative, it subtracts
 * it from full value.
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param  {$type.Optional<number | Percent>}  percent             [description]
 * @param  {number}                            full                [description]
 * @param  {boolean}                           subtractIfNegative  [description]
 * @return {number}                                                [description]
 */
export declare function relativeRadiusToValue(percent: $type.Optional<number | Percent>, full: number, subtractIfNegative?: boolean): $type.Optional<number>;
/**
 * [valueToRelative description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param  {number | Percent}  value  [description]
 * @param  {number}            full   [description]
 * @return {number}                   [description]
 */
export declare function valueToRelative(value: number | Percent, full: number): number;
/**
 * ============================================================================
 * STRING FORMATTING FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts camelCased text to dashed version:
 * ("thisIsString" > "this-is-string")
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function camelToDashed(str: string): string;
/**
 * Converts tring to uppercase.
 *
 * @param  {string}  str  String to convert
 * @return {string}       uppercased string
 * @todo Maybe make it better
 */
export declare function capitalize(str: string): string;
/**
 * Converts any value into its string representation.
 *
 * @param  {any}     value  Value
 * @return {string}         String represantation of the value
 */
export declare function stringify(value: any): string;
/**
 * Splits the text into multiple lines, respecting maximum character count.
 * Prioretizes splitting on spaces and punctuation. Falls back on splitting
 * mid-word if there's no other option.
 *
 * @param  {string}    text      Text
 * @param  {number}    maxChars  Maximum number of characters per line
 * @return {string[]}            An array of split text
 */
export declare function splitTextByCharCount(text: string, maxChars: number, fullWords?: boolean, rtl?: boolean): string[];
/**
 * Truncates the text to certain character count.
 *
 * Will add ellipsis if the string is truncated. Optionally, can truncate on full words only.
 *
 * For RTL support, pass in the fifth parameter as `true`.
 *
 * @param  {string}   text       Input text
 * @param  {number}   maxChars   Maximum character count of output
 * @param  {string}   ellipsis   Ellipsis string, i.e. "..."
 * @param  {boolean}  fullWords  If `true`, will not break mid-word, unless there's a single word and it does not with into `maxChars`
 * @param  {boolean}  rtl        Is this an RTL text?
 * @return {string}              Truncated text
 */
export declare function truncateWithEllipsis(text: string, maxChars: number, ellipsis: string, fullWords?: boolean, rtl?: boolean): string;
/**
 * Removes whitespace from beginning and end of the string.
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function trim(str: string): string;
/**
 * Removes whitespace from end of the string.
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function rtrim(str: string): string;
/**
 * Removes whitespace from beginning of the string.
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function ltrim(str: string): string;
/**
 * Reverses string.
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function reverseString(str: string): string;
/**
 * Removes quotes from the string.
 *
 * @param  {string}  str  Input
 * @return {string}       Output
 */
export declare function unquote(str: string): string;
/**
 * Pads a string with additional characters to certain length.
 *
 * @param  {any}            value  A numeric value
 * @param  {number = 0}     len    Result string length in characters
 * @param  {string = "0"}   char   A character to use for padding
 * @return {string}                Padded value as string
 */
export declare function padString(value: any, len?: number, char?: string): string;
/**
 * Tries to determine format type.
 *
 * @ignore Exclude from docs
 * @param {string}   format  Format string
 * @return {string}          Format type ("string" | "number" | "date" | "duration")
 */
export declare function getFormat(format: string): string;
/**
 * Cleans up format:
 * * Strips out formatter hints
 *
 * @ignore Exclude from docs
 * @param  {string}  format  Format
 * @return {string}          Cleaned format
 */
export declare function cleanFormat(format: string): string;
/**
 * Strips all tags from the string.
 *
 * @param  {string}  text  Source string
 * @return {string}        String without tags
 */
export declare function stripTags(text: string): string;
/**
 * Removes new lines and tags from a string.
 *
 * @param  {string}  text  String to conver
 * @return {string}        Converted string
 */
export declare function plainText(text: string): string;
/**
 * ============================================================================
 * TYPE CONVERSION FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts numeric value into string. Deals with large or small numbers that
 * would otherwise use exponents.
 *
 * @param  {number}  value  Numeric value
 * @return {string}         Numeric value as string
 */
export declare function numberToString(value: number): string;
/**
 * Converts anything to Date object.
 *
 * @param  {Date | number | string}  value  A value of any type
 * @return {Date}                           Date object representing a value
 */
export declare function anyToDate(value: Date | number | string): Date;
/**
 * Tries converting any value to a number.
 *
 * @param  {any}     value  Source value
 * @return {number}         Number
 */
export declare function anyToNumber(value: Date | number | string): $type.Optional<number>;
/**
 * ============================================================================
 * DATE-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns a year day.
 *
 * @param  {Date}     date  Date
 * @param  {boolean}  utc   Assume UTC dates?
 * @return {number}         Year day
 * @todo Account for UTC
 */
export declare function getYearDay(date: Date, utc?: boolean): number;
/**
 * Returns week number for a given date.
 *
 * @param  {Date}     date  Date
 * @param  {boolean}  utc   Assume UTC dates?
 * @return {number}         Week number
 * @todo Account for UTC
 */
export declare function getWeek(date: Date, utc?: boolean): number;
/**
 * Returns a week number in the month.
 *
 * @param  {Date}     date  Source Date
 * @param  {boolean}  utc   Assume UTC dates?
 * @return {number}         Week number in month
 */
export declare function getMonthWeek(date: Date, utc?: boolean): number;
/**
 * Returns a year day out of the given week number.
 *
 * @param  {number}   week     Week
 * @param  {number}   year     Year
 * @param  {number}   weekday  Weekday
 * @param  {boolean}  utc      Assume UTC dates
 * @return {number}            Day in a year
 */
export declare function getDayFromWeek(week: number, year: number, weekday?: number, utc?: boolean): number;
/**
 * Returns 12-hour representation out of the 24-hour hours.
 *
 * @param  {number}  hours  24-hour number
 * @return {number}         12-hour number
 */
export declare function get12Hours(hours: number, base?: number): number;
/**
 * Returns a string name of the tome zone.
 *
 * @param  {Date}     date     Date object
 * @param  {boolean}  long     Should return long ("Pacific Standard Time") or short abbreviation ("PST")
 * @param  {boolean}  savings  Include information if it's in daylight savings mode
 * @return {string}            Time zone name
 */
export declare function getTimeZone(date: Date, long?: boolean, savings?: boolean): string;
/**
 * ============================================================================
 * NUMBER-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns a random number between `from` and `to`.
 *
 * @param  {number}  from  From number
 * @param  {number}  to    To number
 * @return {number}        Random number
 */
export declare function random(from: number, to: number): number;
/**
 * Fits the number into specific `min` and `max` bounds.
 *
 * @param  {number}  value  Input value
 * @param  {number}  min    Minimum value
 * @param  {number}  max    Maximum value
 * @return {number}         Possibly adjusted value
 */
export declare function fitNumber(value: number, min: number, max: number): number;
/**
 * Fits the number into specific `min` and `max` bounds.
 *
 * If the value is does not fit withing specified range, it "wraps" around the
 * values.
 *
 * For example, if we have input value 10 with min set at 1 and max set at 8,
 * the value will not fit. The remainder that does not fit (2) will be added
 * to `min`, resulting in 3.
 *
 * The output of regular `fitNumber()` would return 8 instead.
 *
 * @param  {number}  value  Input value
 * @param  {number}  min    Minimum value
 * @param  {number}  max    Maximum value
 * @return {number}         Possibly adjusted value
 */
export declare function fitNumberRelative(value: number, min: number, max: number): number;
/**
 * ============================================================================
 * SPRITE-RELATED FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Converts SVG element coordinates to coordinates within specific [[Sprite]].
 *
 * @param  {IPoint}  point   SVG coordinates
 * @param  {Sprite}  sprite  Sprite
 * @return {IPoint}         Sprite coordinates
 */
export declare function svgPointToSprite(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates within [[Sprite]] to coordinates relative to the whole
 * SVG element.
 *
 * @param  {IPoint}  point   Sprite coordinates
 * @param  {Sprite}  sprite  Sprite
 * @return {IPoint}          SVG coordinates
 */
export declare function spritePointToSvg(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates of one sprite to another.
 *
 * @param  {IPoint}  point   Sprite coordinates
 * @param  {Sprite}  sprite  Sprite
 * @param  {Sprite}  toSprite  Sprite
 * @return {IPoint}  converted coordinates
 */
export declare function spritePointToSprite(point: IPoint, sprite: Sprite, toSprite: Sprite): IPoint;
/**
 * Converts a rectangle expressed in SVG element coordinates to coordinates
 * within specific [[Sprite]].
 *
 * @param  {IRectangle}  rect    SVG rectangle
 * @param  {Sprite}      sprite  Sprite
 * @return {IRectangle}          Sprite rectangle
 */
export declare function svgRectToSprite(rect: IRectangle, sprite: Sprite): IRectangle;
/**
 * Converts a rectangle expressed in [[Sprite]] coordinates to SVG coordinates.
 *
 * @param  {IRectangle}  rect    Sprite rectangle
 * @param  {Sprite}      sprite  Sprite
 * @return {IRectangle}          SVG rectangle
 */
export declare function spriteRectToSvg(rect: IRectangle, sprite: Sprite): IRectangle;
/**
 * Converts global document-wide coordinates to coordinates within SVG element.
 *
 * @param  {IPoint}       point         Global coordinates
 * @param  {HTMLElement}  svgContainer  SVG element
 * @return {IPoint}                     SVG coordinates
 */
export declare function documentPointToSvg(point: IPoint, svgContainer: HTMLElement): IPoint;
/**
 * Converts SVG coordinates to global document-wide coordinates.
 *
 * @param  {IPoint}       point         SVG coordinates
 * @param  {HTMLElement}  svgContainer  SVG element
 * @return {IPoint}                     Global coordinates
 */
export declare function svgPointToDocument(point: IPoint, svgContainer: HTMLElement): IPoint;
/**
 * Converts document-wide global coordinates to coordinates within specific
 * [[Sprite]].
 *
 * @param  {IPoint}  point   Global coordinates
 * @param  {Sprite}  sprite  Sprite
 * @return {IPoint}          Sprite coordinates
 */
export declare function documentPointToSprite(point: IPoint, sprite: Sprite): IPoint;
/**
 * Converts coordinates within [[Sprite]] to global document coordinates.
 *
 * @param  {IPoint}  point   Sprite coordinates
 * @param  {Sprite}  sprite  Sprite
 * @return {IPoint}          Global coordinates
 */
export declare function spritePointToDocument(point: IPoint, sprite: Sprite): IPoint;
/**
 * ============================================================================
 * DEPRECATED FUNCTIONS
 * @todo Review and remove
 * ============================================================================
 * @hidden
 */
/**
 * Returns element's width.
 *
 * @ignore Exclude from docs
 * @param  {HTMLElement}  element  Element
 * @return {number}                Width (px)
 * @deprecated Not used anywhere
 */
export declare function width(element: HTMLElement): number;
/**
 * Returns element's height.
 *
 * @ignore Exclude from docs
 * @param  {HTMLElement}  element  Element
 * @return {number}                Height (px)
 * @deprecated Not used anywhere
 */
export declare function height(element: HTMLElement): number;
/**
 * Returns number of decimals
 *
 * @ignore Exclude from docs
 * @param  {number}  number  Input number
 * @return {number}          Number of decimals
 */
export declare function decimalPlaces(number: number): number;
