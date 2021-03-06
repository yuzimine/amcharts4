/**
 * Play button functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Button, IButtonProperties, IButtonAdapters, IButtonEvents } from "./Button";
import { SpriteEventDispatcher, AMEvent } from "../Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[PlayButton]].
 */
export interface IPlayButtonProperties extends IButtonProperties {
}
/**
 * Defines events for [[PlayButton]].
 */
export interface IPlayButtonEvents extends IButtonEvents {
}
/**
 * Defines adapters for [[PlayButton]].
 *
 * @see {@link Adapter}
 */
export interface IPlayButtonAdapters extends IButtonAdapters, IPlayButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a zoom out button.
 *
 * @see {@link IPlayButtonEvents} for a list of available events
 * @see {@link IPlayButtonAdapters} for a list of available Adapters
 */
export declare class PlayButton extends Button {
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IPlayButtonProperties}
     */
    _properties: IPlayButtonProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IPlayButtonAdapters}
     */
    _adapter: IPlayButtonAdapters;
    /**
     * Event dispacther.
     *
     * @type {SpriteEventDispatcher<AMEvent<PlayButton, IPlayButtonEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<PlayButton, IPlayButtonEvents>>;
    /**
     * Orientation of the resize direction.
     *
     * @deprecated Not used
     * @type {Orientation}
     */
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
}
