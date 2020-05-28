<!-- Base component of Discover Quickdraw page -->
<template>
    <div class="container">
        <!-- Loading screen -->
        <loading :active="!loadingModelOver" :can-cancel="false" :is-full-page="true" color="#428bca"></loading>

        <!-- Header for component -->
        <h2 class="header">Нарисуй все {{getLengthNames}}!</h2>
        <div class="main">
            <label>Выбери сложность</label>
            <toggle-button
                    :labels="{checked: 'Много', unchecked: 'Мало'}"
                    :width="70"
                    class="toggle"
                    color="#428bca"
                    v-model="toggleBigModel"
            />
        </div>

        <!-- Drawing part of the component -->
        <main class="main">
            <b-row class="main__content">
                <b-col class="main__canvas" lg="5">
                    <canvas class="canvas" height="300" id="c" width="300"></canvas>
                </b-col>
                <b-col class="slider">
                    <div class="slider__label">Толщина кисти</div>
                    <vue-slider
                            :interval="1"
                            :max="100"
                            :min="0"
                            class="slider__controls"
                            v-model="brushWidth"
                    ></vue-slider>
                    <b-row class="buttons">
                        <b-col>
                            <button class="button__erase" v-on:click="clearCanvas()">Очистить</button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </main>

        <!-- Row of buttons -->
        <b-row>
            <v-chart :options="getBar"/>
        </b-row>
        <b-row class="buttons">
            <b-col>
                <button class="button__add" v-on:click="submitDrawing()">Подтвердить</button>
            </b-col>
        </b-row>

        <!-- Table of all results -->
        <b-row class="ranking">
            <b-col>
                <vue-good-table
                        :columns="tableColumns"
                        :fixed-header="true"
                        :rows="tableRows()"
                        max-height="400px"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import fabric from "fabric";
    import {BIG_CLASS_NAMES, SMALL_CLASS_NAMES} from "@/utils/class_names";

    import ECharts from "vue-echarts";
    import "echarts/lib/chart/bar";
    import "vue-good-table/dist/vue-good-table.css";
    import {VueGoodTable} from "vue-good-table";
    import VueSlider from "vue-slider-component";
    import "vue-slider-component/theme/default.css";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import {disposeTFVariables, TFModel} from "@/utils/model";

    const SMALL_MODEL_URL = "./small_model/model.json";
    const BIG_MODEL_URL = "./big_model/model.json";

    export default {
        name: "BaseModel",
        components: {
            "v-chart": ECharts,
            VueGoodTable,
            VueSlider,
            Loading
        },
        data() {
            return {
                loadingModelOver: false, // responsible for loading screen visibility
                raw_predictions: [], // stores raw probabilities of prediction for all classes
                mousePressed: false, // propagate mouse press event into component
                coords: [], // stores all coordinates of points on drawing
                small_ranking: {}, // stores results of submit for small model
                big_ranking: {}, // stores results of submit for big model
                brushWidth: 10, // stores width of brush
                toggleBigModel: false, // switch variable between small and big model
                tableColumns: [
                    {label: "Класс", field: "class"},
                    {label: "Подтверждено", field: "submitted", type: "number"}
                ]
            };
        },
        methods: {
            recordCoor() {
                /**
                 * Record the x,y coordinates of mouse on canvas when mouse is pressed
                 */
                var pointer = this.canvas.getPointer(event.e);
                var posX = pointer.x;
                var posY = pointer.y;

                if (posX >= 0 && posY >= 0 && this.mousePressed) {
                    this.coords.push(pointer);
                }
            },
            getMinBox() {
                /**
                 * Get top left and bottom right coords of bounding box of the drawing
                 */
                var coorX = this.coords.map(function (p) {
                    return p.x;
                });
                var coorY = this.coords.map(function (p) {
                    return p.y;
                });

                var min_coords = {
                    x: Math.min.apply(null, coorX),
                    y: Math.min.apply(null, coorY)
                };
                var max_coords = {
                    x: Math.max.apply(null, coorX),
                    y: Math.max.apply(null, coorY)
                };

                return {
                    min: min_coords,
                    max: max_coords
                };
            },
            submitCanvas() {
                /**
                 * Get image on canvas and submit it to the model for prediction
                 */
                let input_img = this.getImageData();
                if (!this.toggleBigModel) {
                    this.raw_predictions = this.small_model.predictClass(input_img);
                } else {
                    this.raw_predictions = this.big_model.predictClass(input_img);
                }
            },
            submitDrawing() {
                /**
                 * Add a point to the top class in predictions in result table for model
                 */
                const winClass = this.getTopClassNames[0];
                this.$toasted.show(
                    "Класс '" + winClass + "' подтвержден"
                );
                if (!this.toggleBigModel) {
                    this.small_ranking[winClass] = this.small_ranking[winClass] + 1;
                } else {
                    this.big_ranking[winClass] = this.big_ranking[winClass] + 1;
                }
                this.clearCanvas();
            },
            clearCanvas() {
                /**
                 * Resets the canvas
                 */
                this.canvas.clear();
                this.canvas.backgroundColor = "#FFFFFF";
                this.raw_predictions = [];
                this.coords = [];
            },
            getImageData() {
                /**
                 * Get image data in canvas
                 */
                const mbb = this.getMinBox();
                const dpi = window.devicePixelRatio;

                const imgData = this.canvas.contextContainer.getImageData(
                    mbb.min.x * dpi,
                    mbb.min.y * dpi,
                    (mbb.max.x - mbb.min.x) * dpi,
                    (mbb.max.y - mbb.min.y) * dpi
                );
                return imgData;
            },
            tableRows() {
                /**
                 * Convert results object in component to list for vue-good-table
                 */
                if (!this.toggleBigModel) {
                    return Object.keys(this.small_ranking).map(key => {
                        return {class: key, submitted: this.small_ranking[key]};
                    });
                } else {
                    return Object.keys(this.big_ranking).map(key => {
                        return {class: key, submitted: this.big_ranking[key]};
                    });
                }
            }
        },
        computed: {
            findIndicesOfMax: function () {
                /**
                 * Get indices of 5 classes with highest predicted probabilities
                 */
                var outp = [];
                for (var i = 0; i < this.raw_predictions.length; i++) {
                    outp.push(i); // add index to output array
                    if (outp.length > 5) {
                        let pred = this.raw_predictions;
                        outp.sort(function (a, b) {
                            return pred[b] - pred[a];
                        }); // descending sort the output array
                        outp.pop(); // remove the last index (index of smallest element in output array)
                    }
                }
                return outp;
            },
            findTopValues: function () {
                /**
                 * Find probs for highest predicted indices from findIndicesOfMax
                 */
                var outp = [];
                let indices = this.findIndicesOfMax;
                // show 5 greatest scores
                for (var i = 0; i < indices.length; i++)
                    outp[i] = this.raw_predictions[indices[i]];
                return outp;
            },
            getTopClassNames: function () {
                /**
                 * Find classes for highest predicted indices from findIndicesOfMax
                 */
                var outp = [];
                let indices = this.findIndicesOfMax;
                for (var i = 0; i < indices.length; i++)
                    outp[i] = this.getClassNames[indices[i]];
                return outp;
            },
            getBar: function () {
                /**
                 * Get specification of eCharts bar chart
                 */
                return {
                    xAxis: {
                        type: "category",
                        data: this.getTopClassNames,
                        axisLabel: {
                            rotate: 45
                        }
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [
                        {
                            data: this.findTopValues,
                            type: "bar"
                        }
                    ]
                };
            },
            getClassNames: function () {
                /**
                 * Get all classes from models
                 */
                if (!this.toggleBigModel) {
                    return SMALL_CLASS_NAMES;
                } else {
                    return BIG_CLASS_NAMES;
                }
            },
            getLengthNames: function () {
                /**
                 * Get number of classes from the model
                 */
                return this.getClassNames.length;
            }
        },
        watch: {
            brushWidth: function (val) {
                this.canvas.freeDrawingBrush.width = val;
            }
        },
        mounted() {
            this.loadingModelOver = false;

            if (Object.entries(this.small_ranking).length === 0) {
                SMALL_CLASS_NAMES.forEach(c => (this.small_ranking[c] = 0));
            }
            if (Object.entries(this.big_ranking).length === 0) {
                BIG_CLASS_NAMES.forEach(c => (this.big_ranking[c] = 0));
            }

            this.canvas = new fabric.fabric.Canvas("c", {
                isDrawingMode: true
            });
            this.canvas.backgroundColor = "#FFFFFF";
            this.canvas.freeDrawingBrush.width = this.brushWidth;
            this.canvas.renderAll();

            let that = this;
            this.canvas.on("mouse:up", function () {
                that.submitCanvas();
                that.mousePressed = false;
            });
            this.canvas.on("mouse:down", function () {
                that.mousePressed = true;
            });
            this.canvas.on("mouse:move", function (e) {
                that.recordCoor(e);
            });

            this.small_model = new TFModel();
            this.big_model = new TFModel();

            Promise.all([
                this.small_model.loadModel(SMALL_MODEL_URL),
                this.big_model.loadModel(BIG_MODEL_URL)
            ]).then(() => {
                this.loadingModelOver = true;
            });
        },

        beforeDestroy: function () {
            disposeTFVariables();
        }
    };
</script>

<style scoped>
    .buttons {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .button__add {
        margin-bottom: 5px;
        display: block;
        font-weight: 600;
        text-transform: uppercase;
        font-size: .75em;
        letter-spacing: 1px;
        height: 38px;
        width: 120px;
        line-height: 38px;
        overflow: hidden;
        background: #4dbecf;
        border-radius: 3px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
        border: 0;
    }

    .button__erase {
        display: block;
        font-weight: 600;
        text-transform: uppercase;
        font-size: .75em;
        letter-spacing: 1px;
        height: 38px;
        width: 120px;
        line-height: 38px;
        overflow: hidden;
        background: #4dbecf;
        border-radius: 3px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
        border: 0;
    }

    .toggle {
        margin-left: 1.5em;
    }

    canvas {
        border: 1px solid #000000;
    }
</style>
