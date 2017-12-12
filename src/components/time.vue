<template>
    <div class="all">
        <br>
        <div class="row">
            <div class="col-lg-4" style="padding-right:0;padding-left:25px;">
                <div class="row">
                    <span class="btn_gly glyphicon glyphicon-chevron-up" @click="h_add"></span>
                </div>
                <div class="row">
                    <input type="text" readonly v-model="h">
                </div>
                <div class="row">
                    <span class="btn_gly glyphicon glyphicon-chevron-down" @click="h_minus"></span>
                </div>
            </div>
            <div class="col-lg-4 fw">
                <div class="row" style="padding-top:43px;">
                    :
                </div>
            </div>
            <div class="col-lg-4" style="padding-right:25px;padding-left:0;">
                <div class="row">
                    <span class="btn_gly glyphicon glyphicon-chevron-up" @click="m_add"></span>
                </div>
                <div class="row">
                    <input type="text" readonly v-model="m">
                </div>
                <div class="row">
                    <span class="btn_gly glyphicon glyphicon-chevron-down" @click="m_minus"></span>
                </div>
            </div>
        </div>
        <br><br>
        <span class="btn" @click="ok">确 定</span>
    </div>
</template>

<script>
export default {
  name: 'Time',
  props: ['time'],
  data() {
    if (!this.time) {
      this.time = '00:00'
    }

    var arr = this.time.split(':')
    var h = arr[0]
    var m = arr[1]

    var H = []
    var M = []
    var h_index = 0
    var m_index = 0
    for (var i = 0; i < 60; i++) {
      if (i < 10) {
        M[i] = '0' + i
      } else {
        M[i] = i.toString()
      }
      if (i < 24) {
        H[i] = M[i]
      }
      if (h == H[i]) {
        h_index = i
      }
      if (m == M[i]) {
        m_index = i
      }
    }

    return {
      H: H,
      M: M,
      h: h,
      m: m,
      h_index: h_index,
      m_index: m_index
    }
  },
  methods: {
    ok() {
      var time = this.h + ':' + this.m
      this.$emit('ok', time)
    },
    h_add() {
      if (this.h_index + 1 == this.H.length) {
        this.h_index = 0
      } else {
        this.h_index++
      }
      this.h = this.H[this.h_index]
    },
    h_minus() {
      if (this.h_index == 0) {
        this.h_index = this.H.length - 1
      } else {
        this.h_index--
      }
      this.h = this.H[this.h_index]
    },
    m_add() {
      if (this.m_index + 1 == this.M.length) {
        this.m_index = 0
      } else {
        this.m_index++
      }
      this.m = this.M[this.m_index]
    },
    m_minus() {
      if (this.m_index == 0) {
        this.m_index = this.M.length - 1
      } else {
        this.m_index--
      }
      this.m = this.M[this.m_index]
    }
  }
}
</script>

<style scoped>
input {
  display: block;
  width: 30px;
  line-height: 1.5;
  margin: 10px auto;
  border: none;
  text-align: center;
}

.all {
  font-size: 20px;
}

.fw {
  font-weight: bold;
  padding: auto;
}

.btn_gly {
  line-height: 1.5;
  padding: 1px 6px;
  font-size: 20px;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
  color: #2db7f5;
}

.btn {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  white-space: nowrap;
  line-height: 1.5;
  padding: 1px 6px;
  font-size: 20px;
  border-radius: 6px;
  background-color: #f4f4f4;
  outline: 0;
  opacity: 1;
  color: #fff;
  background-color: #2db7f5;
}
</style>
