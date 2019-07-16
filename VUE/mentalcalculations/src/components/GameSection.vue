<template>
  <div @click="cancel">
    <GameTime :top=10 :left=435 />
    <GameCancel :top=20 :left=10 />
    <GameTask :top=150 :left=200 :operand1=13 :operand2=null :operand3=null :result=84240 operation1="*" operation2="*" />
    <GameButtonPad :top=300 :left=120 />
  </div>
</template>

<script>
  import GameButtonPad from './GameButtonPad.vue'
  import GameTime from './GameTime.vue'
  import GameCancel from './GameCancel.vue'
  import GameTask from './GameTask.vue'

  export default {
    name: 'GameSection',
    methods: {
        cancel() {
            this.$router.push({
                name: 'StartSection'
            })
        }
    },
    components: {
      GameButtonPad,
      GameTime,
      GameCancel,
      GameTask
  }
}
</script>
