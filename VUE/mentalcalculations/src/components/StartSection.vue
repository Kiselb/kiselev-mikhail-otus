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
        <StartDuration :top=250 :left=40 :width=75 />
        <StartDifficulty :top=335 :left=40 :width=75 />
        <Checkbox  :top=440 :left=40 caption="Суммирование" />
        <Checkbox  :top=480 :left=40 caption="Разность" />
        <Checkbox  :top=520 :left=40 caption="Умножение" />
        <Checkbox  :top=560 :left=40 caption="Деление" />
        <Checkbox  :top=600 :left=40 caption="Возведение в степень" />
        <StartPlay :top=640 :left=450 />
    </div>
</template>

<script>
import StartPlay from './StartPlay.vue'
import StartDuration from './StartDuration.vue'
import StartDifficulty from './StartDifficulty.vue'
import Checkbox from './Checkbox.vue'

export default {
    name: 'StartSection',
    props: {
        trainingDay: Number,
        tasksResolved: Number,
        tasksTotal: Number,
        accuracy: Number
    },
    components: {
        StartPlay,
        StartDuration,
        StartDifficulty,
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
