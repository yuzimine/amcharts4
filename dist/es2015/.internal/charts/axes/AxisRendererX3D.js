/**
 * Module, defining Axis Renderer for horizontal 3D axes.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererX } from "../axes/AxisRendererX";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Renderer for horizontal 3D axis.
 *
 * @see {@link IAxisRendererX3DEvents} for a list of available events
 * @see {@link IAxisRendererX3DAdapters} for a list of available Adapters
 */
var AxisRendererX3D = /** @class */ (function (_super) {
    __extends(AxisRendererX3D, _super);
    /**
     * Constructor.
     *
     * @param {Axis} axis Related axis
     */
    function AxisRendererX3D() {
        var _this = _super.call(this) || this;
        /**
         * A related chart.
         *
         * @todo Description
         * @type {MutableValueDisposer}
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "AxisRendererX3D";
        _this.applyTheme();
        return _this;
    }
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param {Grid}    grid         Grid element
     * @param {number}  position     Starting position
     * @param {number}  endPosition  End position
     */
    AxisRendererX3D.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        if (grid.element) {
            var dx = this.chart.dx3D;
            var dy = this.chart.dy3D;
            var h = this.gridContainer.pixelHeight;
            grid.element.attr({ "d": $path.moveTo({ x: dx, y: dy }) + $path.lineTo({ x: dx, y: h + dy }) + $path.lineTo({ x: 0, y: h }) });
        }
        this.positionItem(grid, point);
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererX3D.prototype.updateBaseGridElement = function () {
        _super.prototype.updateBaseGridElement.call(this);
        var h = this.gridContainer.pixelHeight;
        var dx = this.chart.dx3D;
        var dy = this.chart.dy3D;
        this.baseGrid.element.attr({ "d": $path.moveTo({ x: dx, y: dy }) + $path.lineTo({ x: dx, y: h + dy }) + $path.lineTo({ x: 0, y: h }) });
    };
    Object.defineProperty(AxisRendererX3D.prototype, "chart", {
        /**
         * Returns currently set associated chart.
         *
         * @ignore Exclude from docs
         * @return {XYChart3D} Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * Sets a chart, associated with the Axis.
         *
         * @ignore Exclude from docs
         * @param {XYChart3D} value Chart
         */
        set: function (chart) {
            if (chart) {
                this._chart.set(chart, chart.events.on("propertychanged", this.handle3DChanged, this));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Invoked when 3D-related settings change, like depth or angle.
     *
     * @param {AMEvent<Sprite, ISpriteEvents>["propertychanged"]} event Event
     */
    AxisRendererX3D.prototype.handle3DChanged = function (event) {
        if (event.property == "depth" || event.property == "angle") {
            this.invalidate();
        }
    };
    return AxisRendererX3D;
}(AxisRendererX));
export { AxisRendererX3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererX3D"] = AxisRendererX3D;
//# sourceMappingURL=AxisRendererX3D.js.map