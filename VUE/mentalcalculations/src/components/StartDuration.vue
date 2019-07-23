<template>
    <Slider
        :top=top
        :left=left
        :width=width
        :min=1
        :max=15
        v-bind:value="duration"
        v-on:input="duration = $event"
        caption="Длительность"
        units="минут" />
</template>

<script>
    import Slider from './Slider.vue'

    export default {
        name: 'StartDuration',
        props: {
            top: Number,
            left: Number,
            width: Number,
        },
        data: function() {
            return {
                duration: "8"
            };
        },
        components: {
            Slider
        }
    }
</script>

<style>
</style>
