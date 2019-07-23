<template>
    <div class="main">
        <br />
        <p class="welcome">
            Привет!
        </p>
        <p>
            Добро пожаловать на {{ trainingDay }} тренировочный день.<br />
            Ваш последний результат - решено {{ tasksResolved }} из {{ tasksTotal }}.<br />
            Общая точность {{ accuracy }}%.
        </p>
        <br />
        <p class="settings">
            Настройки
        </p>
        <Slider
            :top=250
            :left=40
            :width=150
            :min=1
            :max=15
            v-model="duration"
            caption="Длительность"
            units="минут"
        />
        <Slider
            :top=325
            :left=40
            :width=150
            :min=1
            :max=10
            v-model="difficulty"
            caption="Сложность"
            units=""
        />
        <Checkbox  :top=440 :left=40 caption="Суммирование" v-model="enabledSum" />
        <Checkbox  :top=480 :left=40 caption="Разность" v-model="enabledSub" />
        <Checkbox  :top=520 :left=40 caption="Умножение" v-model="enabledMul" />
        <Checkbox  :top=560 :left=40 caption="Деление" v-model="enabledDiv" />
        <Checkbox  :top=600 :left=40 caption="Возведение в степень" v-model="enabledPow" />
        <StartPlay :top=640 :left=450 :startGame="startGame"/>
    </div>
</template>

<script>
import StartPlay from './StartPlay.vue'
import Slider from './Slider.vue'
import Checkbox from './Checkbox.vue'

export default {
    name: 'StartSection',
    props: {
        trainingDay: Number
    },
    data: function() {
        return {
            duration: "8",
            difficulty: "5",
            enabledSum: true,
            enabledSub: true,
            enabledMul: true,
            enabledDiv: true,
            enabledPow: true,
            gameParams: {
                gametoken: null,
                gamestatus: "unknown",
                gameduration: null,
                operand1: null,
                operand2: null,
                operand3: null,
                operation1: null,
                operation2: null,
                result: null
            }
        };
    },
    methods: {
        startGame() {
            this.buildGame();
            this.$router.push({
                name: 'GameSection',
                params: this.gameParams,
            });
        },
        buildGame() {
            const patternGame = [
                { opScale: [1, 1],    opSet: ["+"]        },
                { opScale: [1, 1],    opSet: ["*"]        },
                { opScale: [1, 2],    opSet: ["+"]        },
                { opScale: [1, 2],    opSet: ["*"]        },
                { opScale: [1, 2],    opSet: ["*"]        },
                { opScale: [1, 1, 1], opSet: ["+"]        },
                { opScale: [1, 1, 2], opSet: ["+"]        },
                { opScale: [1, 2, 2], opSet: ["+", "*"]   },
                { opScale: [1, 2, 2], opSet: ["+", "*"]   },
                { opScale: [2, 2, 2], opSet: ["*", "*"]   },
            ];

            this.gameParams.gametoken = '' + Date.now();
            this.gameParams.gameduration = this.duration * 60;

            this.gameParams.operand1 = Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[0])) + Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[0]));
            this.gameParams.operand2 = Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[1])) + Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[1]));

            if (patternGame[(0 + this.difficulty) - 1].opScale.length === 3) {
                this.gameParams.operand3 = Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[2])) + Math.round(Math.random() * Math.pow(10, patternGame[(0 + this.difficulty) - 1].opScale[2]));
            }

            this.gameParams.operation1 = patternGame[(0 + this.difficulty) - 1].opSet[0];
            this.gameParams.operation2 = null;
            if (patternGame[(0 + this.difficulty) - 1].opScale.length === 3) {
                this.gameParams.operation2 = patternGame[(0 + this.difficulty) - 1].opSet[1];
            }
            
            this.gameParams.targetResult = eval('' + this.gameParams.operand1 + this.gameParams.operation1 + this.gameParams.operand2);
            if (this.gameParams.operation2) {
                this.gameParams.targetResult = eval('' + this.gameParams.operand1 + this.gameParams.operation1 + this.gameParams.operand2 + this.gameParams.operation2 + this.gameParams.operand3);
            }

            this.gameParams.operand2 = null;
            if (patternGame[(0 + this.difficulty) - 1].opScale.length === 2) {
                this.gameParams.operation2 = null;
            }
            if (patternGame[(0 + this.difficulty) - 1].opScale.length === 3) {
                this.gameParams.operand3 = null;
            }
            this.$store.commit('addTask', this.gameParams);
        }
    },
    computed: {
        tasksResolved() {
            return this.$store.state.tasks.reduce((acc, value) => (acc + ((value.gamestatus === "WIN") ? 1 : 0)), 0)
        },
        tasksTotal() {
            return this.$store.state.tasks.length;
        },
        accuracy() {
            if (this.tasksTotal > 0) {
                return Math.floor(this.tasksResolved / this.tasksTotal * 100);
            }
            return 0;
        }
    },
    components: {
        StartPlay,
        Slider,
        Checkbox
    }
}
</script>

<style scoped>
    .main {
        position: relative;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        text-align: left;
        padding-left: 40px;
    }
    .welcome {
        font-size: 30px;
    }
    .settings {
        font-size: 20px;
    }
</style>
