<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
      <br>
    </div>
    <div class="row">
      <div class="col-lg-4 col-lg-offset-4">
        <div class="input-group">
          <input class="form-control" type="text" v-model="startTime" readonly>
          <span class="input-group-addon" @click="clean">
            <span class="glyphicon glyphicon-remove"></span>
          </span>
          <span class="input-group-addon" @click="calendar_show($event)">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
          <span v-if="show" style="position: relative;" ref="canlendar">
            <v-calendar @ok="ok" @time_to="time_to" :date="startTime" class="v_calendar"></v-calendar>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './calendar.vue'

export default {
  name: 'VueTime',
  data() {
    return {
      msg: 'VueTime',
      startTime: '',
      show: false,
      time_show: false
    }
  },
  components: {
    'v-calendar': Calendar
  },
  methods: {
    calendar_show(e) {
      this.show = true
      e.stopPropagation()
      document.addEventListener('click', this.hidePanel, false)
    },
    hidePanel(e) {
      if (!this.$refs.canlendar.contains(e.target) && !this.time_show) {
        this.cancle()
      }
    },
    cancle() {
      this.show = false
      document.removeEventListener('click', this.hidePanel, false)
    },
    ok(temp) {
      this.startTime = temp
      this.cancle()
    },
    time_to() {
      this.time_show = !this.time_show
    },
    clean() {
      this.startTime = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v_calendar {
  position: absolute;
  left: -212px;
  top: 14px;
  z-index: 99999;
}
</style>
