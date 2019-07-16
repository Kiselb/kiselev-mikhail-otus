<template>
    <div :style="styleOuter">
        <div class="inner" @click="play">
            <p>Play!</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StartPlay',
        props: {
            top: Number,
            left: Number
        },
        methods: {
            play() {
                this.$router.push({
                    name: 'GameSection'
                })
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
        position: relative;
        width: 90px;
        height: 40px;
        background-color: rgb(255, 255, 255);
        border-style: solid;
        border-bottom-width: 2px;
        border-right-width: 1px;
        border-top-width: 0;
        border-left-width: 1px;
        border-color:whitesmoke;
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
        font-size: 16px;
        color:rgb(138, 137, 137);
    }
    .inner:active:hover {
        border-bottom-width: 0;
        border-right-width: 1px;
        border-top-width: 2px;
        border-left-width: 1px;
        background-color:greenyellow;
    }
    .inner p:hover {
        color:lightgreen;
    }
</style>
