<template>
    <div :style="styleOuter" class="outer">
        <div :style="styleButton" class="inner">
            <p>{{ caption }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            caption: String,
            top: Number,
            left: Number,
            color: String
        },
        computed: {
            styleOuter() {
                return {
                    'position': "absolute",
                    'top': this.top + 'px',
                    'left': this.left + 'px'
                };
            },
            styleButton() {
                return {
                    'background-color': this.color
                };
            }
        }
    }
</script>

<style scoped>
    .inner {
        position: relative;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        box-shadow: 0 4px 6px gray;
    }
    .outer[buttonType="DIGIT"] .inner:hover {
        background-color: #FFB485 !important;
    }
    .outer[buttonType="DIGIT"] .inner:active:hover {
        background-color: greenyellow !important;
    }
    .outer[buttonType="CONTROL"] .inner:hover {
        background-color: #AED8F2 !important;
    }
    .outer[buttonType="CONTROL"] .inner:active:hover {
        background-color: greenyellow !important;
    }
    .inner p {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: 0;
        margin-bottom: 0;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 25px;
        color: black;
    }
</style>
