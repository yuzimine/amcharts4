/**
 * Functionality for any series-based elements, like Line Series (graphs),
 * Pie slice lists, etc.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component, IComponentProperties, IComponentDataFields, IComponentAdapters, IComponentEvents } from "../../core/Component";
import { AxisDataItem } from "../axes/Axis";
import { Sprite, SpriteEventDispatcher, AMEvent } from "../../core/Sprite";
import { List, ListTemplate, IListEvents } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { DataItem, IDataItemEvents } from "../../core/DataItem";
import { Container } from "../../core/Container";
import { SerialChart } from "../types/SerialChart";
import { Axis } from "../axes/Axis";
import { Bullet } from "../elements/Bullet";
import { ILegendItem, LegendDataItem, LegendSettings } from "../Legend";
import { Animation } from "../../core/utils/Animation";
import * as $iter from "../../core/utils/Iterator";
export interface IHeatRule {
    target: Sprite;
    property: string;
    min: any;
    max: any;
    dataField?: string;
    minValue?: number;
    maxValue?: number;
}
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Series]].
 *
 * @see {@link DataItem}
 */
export declare class SeriesDataItem extends DataItem {
    /**
     * Related item's width in pixels.
     *
     * This is passed to bullets so that we'd know if the bullet (LabelBullet)
     * fits to max width/height.
     *
     * At the moment this is only used by column series.
     *
     * @ignore Exclude from docs
     * @type {number}
     */
    itemWidth: number;
    /**
     * Related item's height in pixels.
     *
     * This is passed to bullets so that we'd know if the bullet (LabelBullet)
     * fits to max width/height.
     *
     * At the moment this is only used by column series.
     *
     * @ignore Exclude from docs
     * @type {number}
     */
    itemHeight: number;
    /**
     * A dictionary of data items bullets, where key is uid of a bullet template.
     *
     * @ignore Exclude from docs
     * @todo review description
     * @type {Dictionary}
     */
    bullets: Dictionary<string, Bullet>;
    /**
     * Defines a type of [[Component]] this data item is used for.
     *
     * @ignore Exclude from docs
     * @type {Series}
     */
    _component: Series;
    /**
     * Constructor
     */
    constructor();
    /**
     * @return {number} Value
     */
    /**
     * data items's numeric value.
     *
     * @param {number}  value  Value
     */
    value: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[Series]].
 */
export interface ISeriesDataFields extends IComponentDataFields {
    /**
     * Name of the field in data that holds numeric value.
     *
     * @type {string}
     */
    value?: string;
}
/**
 * Defines properties for [[Series]].
 */
export interface ISeriesProperties extends IComponentProperties {
    /**
     * Minimal distance between two adjacent bullets in pixels.
     *
     * If bullet is closer, it will be skipped and not shown.
     *
     * This allows to avoid crammed up graphs wil a lot of bullets.
     *
     * @default 50
     * @type {number}
     */
    minBulletDistance?: number;
    /**
     * Should series be hidden in chart's legend?
     * @type {boolean}
     */
    hiddenInLegend?: boolean;
}
/**
 * Defines events for [[Series]].
 */
export interface ISeriesEvents extends IComponentEvents {
    /**
     * @todo Description
     */
    selectionextremeschanged: {};
    /**
     * @todo Description
     */
    extremeschanged: {};
    /**
     * @todo Description
     */
    dataitemchanged: {
        dataItem: DataItem;
    };
}
/**
 * Defines adapters for [[Series]].
 *
 * @see {@link Adapter}
 */
export interface ISeriesAdapters extends IComponentAdapters, ISeriesProperties {
    /**
     * Applied to the series name when it is retrieved.
     *
     * @type {string}
     */
    name: string;
    /**
     * Applied to the name used by screen readers.
     *
     * @type {string}
     */
    itemReaderText: string;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines base class for any kind of serial data.
 *
 * @see {@link ISeriesEvents} for a list of available Events
 * @see {@link ISeriesAdapters} for a list of available Adapters
 * @todo Separate axis-related stuff to some other class so that MapSeries would not have unrelated stuff
 */
export declare class Series extends Component implements ILegendItem<Series, ISeriesEvents> {
    /**
     * Defines the type of data fields used for the series.
     *
     * @ignore Exclude from docs
     * @type {ISeriesDataFields}
     */
    _dataFields: ISeriesDataFields;
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IComponentProperties}
     */
    _properties: ISeriesProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {ISeriesAdapters}
     */
    _adapter: ISeriesAdapters;
    /**
     * Event dispacther.
     *
     * @type {SpriteEventDispatcher<AMEvent<Series, ISeriesEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<Series, ISeriesEvents>>;
    /**
     * Defines a type of data item used for the series.
     *
     * @ignore Exclude from docs
     * @type {SeriesDataItem}
     */
    _dataItem: SeriesDataItem;
    /**
     * A name of the Series.
     *
     * @type {string}
     */
    protected _title: string;
    /**
     * A reference to the legend data item related to this series.
     *
     * @type {LegendDataItem<Series, ISeriesEvents>}
     */
    protected _legendDataItem: LegendDataItem<Series, ISeriesEvents>;
    /**
     * Should this series excluded from the axis scale calculations?
     *
     * @default false
     * @type {boolean}
     */
    protected _ignoreMinMax: boolean;
    /**
     * Container series' elements are placed in.
     *
     * @ignore Exclude from docs
     * @type {Container}
     */
    mainContainer: Container;
    /**
     * Should series' bullets?
     *
     * @default true
     * @type {boolean}
     */
    protected _showBullets: boolean;
    /**
     * List of series' bullets.
     *
     * @type {ListTemplate<Bullet>}
     */
    protected _bullets: ListTemplate<Bullet>;
    /**
     * Series' bullets by id.
     *
     * @ignore Exclude from docs
     * @type {Dictionary<string, List<Bullet>>}
     */
    bulletsLists: Dictionary<string, List<Bullet>>;
    /**
     * Bullet iterations by id.
     *
     * @ignore Exclude from docs
     * @type {Dictionary}
     */
    bulletsIterators: Dictionary<string, $iter.ListIterator<Bullet>>;
    /**
     * Container bullets are placed in.
     *
     * @ignore Exclude from docs
     * @type {Container}
     */
    bulletsContainer: Container;
    /**
     * A chart series belongs to.
     *
     * @ignore Exclude from docs
     * @type {SerialChart}
     */
    _chart: SerialChart;
    /**
     * A container axis ranges are placed in.
     *
     * @ignore Exclude from docs
     * @type {Container}
     */
    rangesContainer: Container;
    /**
     * A list of axis ranges for this series.
     *
     * @type {List<AxisDataItem>}
     */
    axisRanges: List<AxisDataItem>;
    /**
     * Settings for the appearance of the related legend items.
     */
    legendSettings: LegendSettings;
    /**
     * Lowest overal values by type.
     *
     * @type {Dictionary}
     */
    protected _tmin: Dictionary<string, number>;
    /**
     * Highest overal values by type.
     *
     * @type {Dictionary}
     */
    protected _tmax: Dictionary<string, number>;
    /**
     * Lowest values in current selection by type.
     *
     * @type {Dictionary}
     */
    protected _smin: Dictionary<string, number>;
    /**
     * Highest values in current selection by type.
     *
     * @type {Dictionary}
     */
    protected _smax: Dictionary<string, number>;
    /**
     * [dataItemsByAxis description]
     *
     * Both by category and date.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @type {Dictionary}
     */
    dataItemsByAxis: Dictionary<string, Dictionary<string, this["_dataItem"]>>;
    /**
     * Normally series items are focusable using keyboard, so that people can
     * select them with a TAB key. However, if there are a lot of data points on
     * screen it might be long and useless to tab through all o fthem.
     *
     * This is where `skipFocusThreshold` comes in. If there are more items than
     * the value set here, we will not make those focusable and rather let screen
     * reader software rely on the series summary, or authors provide alternative
     * detailed information display, such as HTML table.
     *
     * Different series might have different threshold defaults.
     *
     * @type {Number}
     */
    skipFocusThreshold: number;
    /**
     * Holds a default screen reader text for series data items. It will be used
     * to generate information for screen readers. If not set, the series will
     * try to deduce reader text from `tooltipText` or `tooltipHTML`. If those
     * are not set either, a default reader text will be used which is relevant
     * for each Series type.
     *
     * @type {string}
     */
    protected _itemReaderText: string;
    /**
     * flag which is set to true when initial animation is finished
     * @ignore
     */
    appeared: boolean;
    protected _heatRules: List<IHeatRule>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {SeriesDataItem} Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * @return {this} Chart
     */
    /**
     * Chart series is used on.
     *
     * @param {this["_chart"]}  value  Chart
     */
    chart: this["_chart"];
    /**
     * Performs initial animation of the series after data validation.
     *
     * @ignore Exclude from docs
     */
    appear(): void;
    /**
     * Fades in bullet container and related elements.
     *
     * @ignore Exclude from docs
     * @param  {number}     duration  Animation duration (ms)
     * @return {Animation}            Animation
     */
    showReal(duration: number): Animation;
    /**
     * Fades out bullet container and related elements.
     *
     * @ignore Exclude from docs
     * @param  {number}     duration  Animation duration (ms)
     * @return {Animation}            Animation
     */
    hideReal(duration: number): Animation;
    /**
     * Positions bullet.
     *
     * @param {Bullet}  bullet  Bullet
     */
    positionBullet(bullet: Bullet): void;
    /**
     * Decorates newly created bullet after it has been instert into the list.
     *
     * @param {IListEvents<Bullet>["insert"]}  event  List event
     * @todo investigate why itemReaderText is undefined
     */
    protected processBullet(event: IListEvents<Bullet>["insert"]): void;
    /**
     * Validates data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Returns first value for the specific key in the series.
     *
     * @param  {string}  key  Key
     * @return {number}       Value
     * @todo Description
     * @todo Convert to propert object property iterator
     */
    protected getFirstValue(key: string): number;
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     */
    protected rangeChangeUpdate(): void;
    /**
     * [processValues description]
     *
     * @todo Description
     * @todo Convert to propert object property iterator
     * @param {OrderedList<this["_dataItem"]>} dataItems [description]
     */
    protected processValues(working: boolean): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param {SeriesDataItem}  dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @todo Description
     */
    protected handleDataItemWorkingValueChange(event: AMEvent<SeriesDataItem, IDataItemEvents>["workingvaluechanged"]): void;
    /**
     * @return {boolean} Exclude from calculations?
     */
    /**
     * Should this series excluded from the axis scale calculations?
     *
     * @default false
     * @param {boolean}  value  Exclude from calculations?
     */
    ignoreMinMax: boolean;
    /**
     * Create a mask for the series.
     *
     * @ignore Exclude from docs
     */
    createMask(): void;
    /**
     * Process axis range after it has been added to the list.
     *
     * @param {IListEvents<AxisDataItem>["insert"]}  event  Event
     */
    protected processAxisRange(event: IListEvents<AxisDataItem>["insert"]): void;
    /**
     * [getAxisField description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param  {Axis}    axis  [description]
     * @return {string}        [description]
     */
    getAxisField(axis: Axis): string;
    /**
     * Shows the tooltip at specific position.
     *
     * @ignore Exclude from docs
     * @param {number}  xPosition  X
     * @param {number}  yPosition  Y
     */
    showTooltipAtPosition(xPosition: number, yPosition: number): void;
    /**
     * @return {number} Distance (px)
     */
    /**
     * Minimal distance between two adjacent bullets in pixels.
     *
     * If bullet is closer, it will be skipped and not shown.
     *
     * This allows to avoid crammed up graphs wil a lot of bullets.
     *
     * @default 50
     * @param {number}  value  Distance (px)
     */
    minBulletDistance: number;
    /**
     * List of bullets that can be used for the series' purposes.
     *
     * @return {ListTemplate<Bullet>} [description]
     */
    readonly bullets: ListTemplate<Bullet>;
    /**
     * Hides bullet elements that are currently not in use.
     * @ignore
     */
    protected hideUnusedBullets(): void;
    /**
     * Destroys series and related elements.
     */
    dispose(): void;
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param {Container}  marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * @return {boolean} Hidden in legend?
     */
    /**
     * Should the series be hidden in legend?
     *
     * @param {boolean} value Hidden in legend?
     */
    hiddenInLegend: boolean;
    /**
     * @return {string} Name
     */
    /**
     * Series' name.
     *
     * @param {string}  value  Name
     */
    name: string;
    /**
     * @return {string} Screen reader text template
     */
    /**
     * Screen reader text to be applied to each individual data item, such
     * as bullets, columns or slices.
     *
     * The template can contain field reference meta codes, i.e. `{dateX}`,
     * `{valueY}`, etc.
     *
     * Any text formatting options, e.g. `[bold]` will be ignored.
     *
     * @param {string} value Screen reader text template
     */
    itemReaderText: string;
    /**
     * Returns if number of data items in the series are beyond non-focusable
     * count and should not be available for TAB-through.
     *
     * @ignore Exclude from docs
     * @return {boolean} Items focusable?
     */
    itemsFocusable(): boolean;
    /**
     * @return {LegendDataItem<Series, ISeriesEvents>} Data item
     */
    /**
     * Legend data item that corresponds to this series.
     *
     * @param {LegendDataItem<Series, ISeriesEvents>}  value  Data item
     */
    legendDataItem: LegendDataItem<Series, ISeriesEvents>;
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param {this["_dataItem"]}  dataItem  Data item
     */
    updateLegendValue(dataItem?: this["_dataItem"]): void;
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param {Series}  source  Source series
     */
    copyFrom(source: this): void;
    /**
     * Displays a modal or console message with error, and halts any further
     * processing of this element.
     *
     * @param {Error} e Error
     */
    raiseCriticalError(e: Error): void;
    /**
     * Applies filters to the element.
     *
     * @ignore Exclude from docs
     */
    protected applyFilters(): void;
    /**
     * @todo Description
     */
    readonly heatRules: List<IHeatRule>;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param {object}  config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
