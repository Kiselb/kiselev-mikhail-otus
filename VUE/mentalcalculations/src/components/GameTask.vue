<template>
    <div :style="styleOuter">
        <div class="inner">
            <span class="operand">{{ operand1 }}</span>
            <span class="operation">{{ operation1 }}</span>
            <input type="text" :value=operand2 @focus="operand2Focus" @input="input2Changed" />
            <template v-if="operation2 !== null" >
                <span class="operation">{{ operation2 }}</span>
                <input type="text" :value=operand3 @focus="operand3Focus" @input="input3Changed" />
            </template>
            <br />
            <br />
            <span :gameStatus=gameStatus>= {{ result }}?</span>
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
            operation2: String,
            operandSelected: Function,
            operand2Changed: Function,
            operand3Changed: Function,
            gameStatus: String
        },
        //data: function() {
        //    return {
        //        inputOperand2: this.operand1,
        //        inputOperand3: this.operand2,
        //    };
        //},
        methods: {
            operand2Focus() {
                this.operandSelected(2);
            },
            operand3Focus() {
                this.operandSelected(3);
            },
            input2Changed(event) {
                this.operand2Changed(event.target.value);
            },
            input3Changed(event) {
                this.operand3Changed(event.target.value);
            }
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
    span[gameStatus="WIN"] {
        color: chartreuse;
    }
    span[gameStatus="LOSS"] {
        color:tomato;
    }
    span[gameStatus="UNKNOWN"] {
        color: silver;
    }
</style>
