<template>
  <div class="root">
    <GameTime :top=10 :left=435 :gameTime=gameduration :timeExhausted=timeExhausted />
    <GameCancel :top=20 :left=10  :click="cancel"/>
    <GameTask
      :top=150
      :left=200
      
      :operand1=operand1
      :operand2=operand2
      :operand3=operand3
      :operation1=operation1
      :operation2=operation2
      :result=targetResult
      
      :operandSelected="operandSelected"
      :operand2Changed="operand2Changed"
      :operand3Changed="operand3Changed"

      :gameStatus=gameStatus />
    <GameButtonPad :top=300 :left=120 :buttonPressed=buttonPressed />
    <div class="game-status">{{ gameStatus }}</div>
  </div>
</template>

<script>
  import GameButtonPad from './GameButtonPad.vue'
  import GameTime from './GameTime.vue'
  import GameCancel from './GameCancel.vue'
  import GameTask from './GameTask.vue'

  export default {
    name: 'GameSection',
    props: {
      gametoken: String,
    },
    data: function() {
      return {
        task: null,
        gameduration: null,
        operand1: null,
        operand2: null,
        operand3: null,
        operation1: null,
        operation2: null,
        targetResult: null,
        gameResult: 0,
        selectedOperand: 3,
        gameStatus: 'UNKNOWN'
      };
    },
    created: function() {
      this.task = this.$store.getters.getTask(this.gametoken);
      this.gameduration = this.task.gameduration;
      this.operand1 = this.task.operand1;
      this.operand2 = this.task.operand2;
      this.operand3 = this.task.operand3;
      this.operation1 = this.task.operation1;
      this.operation2 = this.task.operation2;
      this.targetResult = this.task.targetResult;
    },
    methods: {
        cancel() {
            this.$router.push({
                name: 'StartSection'
            })
        },
        buttonPressed(button) {
          if (this.gameStatus.toUpperCase() !== "UNKNOWN"){
            return;
          }
          if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(button) >= 0) {
            if (this.selectedOperand === 2) {
              this.operand2 = this.operand2 * 10 + Number(button);
            } else {
              this.operand3 = this.operand3 * 10 + Number(button);
            }
          } else {
            if (button === "=") {
              if (this.operation1) {
                if (this.operand2) {
                  this.gameResult = eval('' + this.operand1 + this.operation1 + this.operand2)
                } else {
                  this.gameResult = null;
                  return;
                }
              }
              if (this.operation2) {
                if (this.operand3) {
                  this.gameResult = eval('' + this.operand1 + this.operation1 + this.operand2 + this.operation2 + this.operand3)
                } else {
                  this.gameResult = null;
                  return;
                }
              }
              if (this.gameResult === this.targetResult) {
                this.gameStatus = "WIN";
              } else {
                this.gameStatus = "LOSS"
              }
              this.task.gamestatus = this.gameStatus;
              this.$store.commit('updateTask', this.task);
            }
          }
        },
        operandSelected(operand) {
            this.selectedOperand = operand;
        },
        operand2Changed(value) {
          if (typeof (+value) === "number") {
            this.operand2 = (+value);
          }
          this.buttonPressed("=");
        },
        operand3Changed(value) {
          if (typeof (+value) === "number") {
            this.operand3 = (+value);
          }
          if (this.operand2) {
            this.buttonPressed("=");
          }
        },
        timeExhausted() {
          if (this.gameStatus.toUpperCase() !== "UNKNOWN"){
            return;
          }
          this.gameStatus = "LOSS"
          this.task.gamestatus = this.gameStatus;
          this.$store.commit('updateTask', this.task);
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

<style scoped>
  .root {
    position: relative;
  }
  .game-status {
    position: absolute;
    top: 150px;
    left: 400px;
  }
</style>

