<template>
    <div id="test" :style="styleOuter">
        <label class="container">{{ caption}}
            <input type="checkbox" checked="checked" v-bind:value="checked" v-on:input="$emit('input', $event.target.checked)">
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            caption: String,
            top: Number,
            left: Number,
            checked: String
        },
        computed: {
            styleOuter() {
                return {
                    'position': "absolute",
                    'top': this.top + 'px',
                    'left': this.left + 'px'
                };
            }
        }
    }
</script>

<style scoped>
    /* https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: -4px;
        left: 0;
        height: 22px;
        width: 22px;
        background-color: #EFEFEF;
        border-style: solid;
        border-color: #2196F3;
        border-width: 2px;
        border-radius: 4px;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 7px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
