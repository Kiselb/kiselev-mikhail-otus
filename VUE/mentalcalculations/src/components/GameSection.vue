<template>
  <div class="root">
    <GameTime :top=10 :left=435 :gameTime=game.task.gameduration :timeExhausted=timeExhausted />
    <GameCancel :top=20 :left=10  :click="cancel"/>
    <GameTask
      :top=150
      :left=200  
      :game=game
      :operandSelected="operandSelected"
      :operand2Changed="operand2Changed"
      :operand3Changed="operand3Changed"
    />
    <GameButtonPad :top=300 :left=120 @button=buttonPressed />
    <div class="game-status">{{ game.misc.gameStatus }}</div>
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
        game: {
          task: null,
          misc: {
            gameResult: 0,
            selectedOperand: 3,
            gameStatus: 'UNKNOWN'
          }
        }
      };
    },
    created: function() {
      this.game.task = this.$store.getters.getTask(this.gametoken);
    },
    methods: {
        cancel() {
            this.$router.push({
                name: 'StartSection'
            })
        },
        buttonPressed(button) {
          if (this.game.misc.gameStatus.toUpperCase() !== "UNKNOWN"){
            return;
          }
          if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(button) >= 0) {
            if (this.game.misc.selectedOperand === 2) {
              this.game.task.operand2 = this.game.task.operand2 * 10 + Number(button);
            } else {
              this.game.task.operand3 = this.game.task.operand3 * 10 + Number(button);
            }
          } else {
            if (button === "=") {
              if (this.game.task.operation1) {
                if (this.game.task.operand2) {
                  this.game.misc.gameResult = eval('' + this.game.task.operand1 + this.game.task.operation1 + this.game.task.operand2)
                } else {
                  this.game.misc.gameResult = null;
                  return;
                }
              }
              if (this.game.task.operation2) {
                if (this.game.task.operand3) {
                  this.game.misc.gameResult = eval('' + this.game.task.operand1 + this.game.task.operation1 + this.game.task.operand2 + this.game.task.operation2 + this.game.task.operand3)
                } else {
                  this.game.misc.gameResult = null;
                  return;
                }
              }
              if (this.game.misc.gameResult === this.game.task.targetResult) {
                this.game.misc.gameStatus = "WIN";
              } else {
                this.game.misc.gameStatus = "LOSS"
              }
              this.game.task.gamestatus = this.game.misc.gameStatus;
              this.$store.commit('updateTask', this.game.task);
            }
          }
        },
        operandSelected(operand) {
            this.game.misc.selectedOperand = operand;
        },
        operand2Changed(value) {
          if (typeof (+value) === "number") {
            this.game.task.operand2 = (+value);
          }
          this.buttonPressed("=");
        },
        operand3Changed(value) {
          if (typeof (+value) === "number") {
            this.game.task.operand3 = (+value);
          }
          if (this.game.task.operand2) {
            this.buttonPressed("=");
          }
        },
        timeExhausted() {
          if (this.game.misc.gameStatus.toUpperCase() !== "UNKNOWN"){
            return;
          }
          this.game.misc.gameStatus = "LOSS"
          this.game.task.gamestatus = this.gameStatus;
          this.$store.commit('updateTask', this.game.task);
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

