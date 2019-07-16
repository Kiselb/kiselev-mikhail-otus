<template>
    <div :style="styleOuter">
        <div class="inner">
            <p>
                {{ elapsedTimeText }}
            </p>
        </div>
    </div>
</template>

<script>
    import { setInterval } from 'timers';

    export default {
        name: 'GameTime',
        props: {
            top: Number,
            left: Number
        },
        data: function() {
            return {
                elapsedTime: 0
            };
        },
        methods: {
            startTimer: function() {
                function updateElapsedTime() {
                    this.elapsedTime = this.elapsedTime + 1;
                }
                setInterval(updateElapsedTime.bind(this), 1000)
            }
        },
        computed: {
            styleOuter() {
                return {
                    'position': "absolute",
                    'top': this.top + 'px',
                    'left': this.left + 'px'
                };
            },
            elapsedTimeText: function() {
                const minutes = Math.floor((this.elapsedTime) / 60);
                const seconds = this.elapsedTime - minutes * 60;

                return(('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2));
            }
        },
        mounted: function() {
            this.startTimer();
        }
    }
</script>

<style scoped>
    .inner {
        position: relative;
        width: 120px;
        height: 50px;
        background-color: lavender;
        border-style: solid;
        border-bottom-width: 3px;
        border-right-width: 30px;
        border-top-width: 3px;
        border-left-width: 3px;
        border-color:rgb(180, 202, 250);
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
        font-size: 25px;
        color:silver;
    }
</style>
