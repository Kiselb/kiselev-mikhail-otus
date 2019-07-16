<template>
    <Slider :top=top :left=left :width=width :min=1 :max=10 :initialValue=5 caption="Сложность" units="" />
</template>

<script>
    import Slider from './Slider.vue'

    export default {
        name: 'StartDifficulty',
        props: {
            top: Number,
            left: Number,
            width: Number
        },
        components: {
            Slider
        }
    }
</script>

<style>
</style>
