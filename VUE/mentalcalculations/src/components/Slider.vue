<template>
    <div :style="styleOuter">
        <span class="scale-min">{{min}}</span><span class="scale-max">{{max}}</span>
        <input type="range" :min="min" :max="max" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" class="slider">
        <p>{{ sliderStatus }}</p>
    </div>
</template>

<script>
    export default {
        name: 'Slider',
        props: {
            top: Number,
            left: Number,
            width: Number,
            min: Number,
            max: Number,
            caption: String,
            units: String,
            value: String,
        },
        computed: {
            styleOuter() {
                return {
                    'position': "absolute",
                    'top': this.top + 'px',
                    'left': this.left + 'px',
                    'width': this.width + 'px'
                };
            },
            sliderStatus() {
                return (this.caption + ' ' + this.value + ' ' + this.units);
            }
        }
    }
</script>

<style scoped>

    .scale-min {
        float:left;
    }
    
    .scale-max {
        float:right;
        white-space: nowrap;
    }

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 2px;
        border-radius: 4px;
        background: #FFF;
        border: solid;
        border-color: #5A5A5A;
        border-width: 1.5px;
        outline: none; /*#C0C0C0 auto 1px;*/
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    .slider:hover {
        opacity: 1;
    }
    
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 21px;
        height: 22px;
        border: 0;
        background: url('../assets/slider_thumb.png');
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 21px;
        height: 22px;
        border: 0;
        background: url('../assets/slider_thumb.png');
        cursor: pointer;
    }
</style>
