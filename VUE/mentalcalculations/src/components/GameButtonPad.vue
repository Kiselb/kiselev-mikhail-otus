<template>
    <div :style="styleOuter">
        <Button v-for="(button, index) in buttonsPlacements" v-bind="button" :key="index" :onButton="onButton"/>
    </div>
</template>

<script>
    import Button from '../components/Button.vue'

    export default {
        name: 'GameButtonPad',
        props: {
            top: Number,
            left: Number,
            buttonPressed: Function
        },
        data: () => ({
            buttonsPlacements: [
                    { buttonType: "DIGIT",    caption: '0', top: 300,   left: 100,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '1', top: 0,     left: 0,      color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '2', top: 0,     left: 100,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '3', top: 0,     left: 200,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '4', top: 100,   left: 0,      color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '5', top: 100,   left: 100,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '6', top: 100,   left: 200,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '7', top: 200,   left: 0,      color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '8', top: 200,   left: 100,    color: "#FF7F08" },
                    { buttonType: "DIGIT",    caption: '9', top: 200,   left: 200,    color: "#FF7F08" },
                    { buttonType: "CONTROL",  caption: '<', top: 0,     left: 300,    color: "#808080" },
                    { buttonType: "CONTROL",  caption: '>', top: 100,   left: 300,    color: "#808080" },
                    { buttonType: "CONTROL",  caption: '?', top: 200,   left: 300,    color: "#808080" },
                    { buttonType: "CONTROL",  caption: '=', top: 300,   left: 300,    color: "#808080" }
                ]
        }),
        methods: {
            onButton(value) {
                this.buttonPressed(value);
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
        components: {
            Button
        }   
    }
</script>
