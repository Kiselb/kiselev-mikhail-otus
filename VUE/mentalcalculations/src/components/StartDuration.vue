<template>
    <Slider :top=top :left=left :width=width :min=1 :max=15 :initialValue=8 caption="Длительность" units="минут" />
</template>

<script>
    import Slider from './Slider.vue'

    export default {
        name: 'StartDuration',
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
