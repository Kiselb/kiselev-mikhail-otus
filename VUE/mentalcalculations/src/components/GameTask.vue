<template>
    <div :style="styleOuter">
        <div class="inner">
            <span class="operand">{{ operand1 }}</span>
            <span class="operation">{{ operation1 }}</span>
            <input type="text" />
            <template v-if="operation2 !== null">
                <span class="operation">{{ operation2 }}</span>
                <input type="text" />
            </template>
            <br />
            <br />
            <span>= {{ result }}?</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameTask',
        props: {
            top: Number,
            left: Number,
            operand1: Number,
            operand2: Number,
            operand3: Number,
            result: Number,
            operation1: String,
            operation2: String
        },
        //data: function() {
        //},
        //methods: {
        //},
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
    .inner {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 25px;
        color:silver; /* lavender; */
        text-align: left;
        vertical-align: bottom;
    }
    .operand {
        display:inline-block;
        width: 50px;
        color:black;
        border-style: none;
    }
    input {
        display:inline-block;
        width: 50px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 25px;
        border-left-style: none;
        border-top-style: none;
        border-right-style: none;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: silver;
    }
    .operation {
        display:inline-block;
        width: 10px;
    }
</style>
