<template>
    <div :style="styleOuter">
        <div class="inner">
            <p>
                {{ leftTime | formatTime }}
            </p>
        </div>
    </div>
</template>

<script>
    import { setInterval, clearInterval } from 'timers';

    export default {
        name: 'GameTime',
        props: {
            top: Number,
            left: Number,
            gameTime: Number,
            timeExhausted: Function
        },
        data: function() {
            return {
                leftTime: this.gameTime
            };
        },
        methods: {
            startTimer: function() {
                let timer;
                function updateLeftTime() {
                    if (this.leftTime > 0) {
                        this.leftTime = this.leftTime - 1;
                    } else {
                        clearInterval(timer);
                        this.timeExhausted();
                    }
                }
                timer = setInterval(updateLeftTime.bind(this), 1000);
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
        },
        filters: {
            formatTime: function(value) {
                const minutes = Math.floor((value) / 60);
                const seconds = value - minutes * 60;

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
