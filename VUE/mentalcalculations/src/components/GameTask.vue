<template>
    <div :style="styleOuter">
        <div class="inner">
            <span class="operand">{{ game.task.operand1 }}</span>
            <span class="operation">{{ game.task.operation1 }}</span>
            <input type="text" :value=game.task.operand2 @focus="operand2Focus" @input="input2Changed" />
            <template v-if="game.task.operation2 !== null" >
                <span class="operation">{{ game.task.operation2 }}</span>
                <input type="text" :value=game.task.operand3 @focus="operand3Focus" @input="input3Changed" />
            </template>
            <br />
            <br />
            <span v-bind:class="{
                'status-win': game.misc.gameStatus === 'WIN',
                'status-loss': game.misc.gameStatus === 'LOSS',
                'status-unknown': game.misc.gameStatus === 'UNKNOWN'
            }" >= {{ game.task.targetResult }}?</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameTask',
        props: {
            top: Number,
            left: Number,
            game: Object,
            operandSelected: Function,
            operand2Changed: Function,
            operand3Changed: Function,
        },
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
    .status-win {
        color: chartreuse;
    }
    .status-loss {
        color:tomato;
    }
    .status-unknown {
        color: silver;
    }
</style>
