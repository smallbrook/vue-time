<template>
  <div class="all">
    <div class="dp" ref="main">
      <div class="dp-header">
        <a class="dp-h-1" @click="cy(-1)">«</a>
        <a class="dp-h-2" @click="cm(-1)">‹</a>
        <span class="dp-ym">{{y}}年 {{m}}月</span>
        <a class="dp-h-3" @click="cm(1)">›</a>
        <a class="dp-h-4" @click="cy(1)">»</a>
      </div>
      <table class="dp-table">
        <thead>
          <tr>
            <th>
              <span>一</span>
            </th>
            <th>
              <span>二</span>
            </th>
            <th>
              <span>三</span>
            </th>
            <th>
              <span>四</span>
            </th>
            <th>
              <span>五</span>
            </th>
            <th>
              <span>六</span>
            </th>
            <th>
              <span>日</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in data">
            <td v-for="item in items" v-bind:class="{'dp-last': m!= item.month, 'dp-today': cur == item.data, 'dp-select': sel_show == item.data}">
              <span @click="click(item.data)">{{ item.day }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="dp-footer">
        <span class="span_left">{{sel}}</span>
        <span>{{time}}</span>
        <br>
        <span class="btn" @click="timeShow($event)">{{time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="btn" @click="clickNow">今 天</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="btn" @click="ok">确 定</span>
      </div>
      <div class="dp time" v-if="time_show">
        <v-time :time="time" @ok="time_ok"></v-time>
      </div>
    </div>
  </div>
</template>

<script>
import Time from './time'

export default {
  name: 'Calendar',
  props: ['date'],
  data() {
    var d = '' //用于显示的日历

    if (!this.date) {
      //为空
      d = new Date()
    } else {
      var str = this.date.toString()
      str = str.replace(/-/g, '/')
      d = new Date(str)
    }

    if (Object.prototype.toString.call(d) === '[object Date]') {
      // 是日期
      if (isNaN(d.getTime())) {
        // d.valueOf() could also work
        // 无效日期
        d = new Date()
      }
    } else {
      d = new Date()
    }

    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var dt = d.getDate()
    var h = d.getHours()
    var min = d.getMinutes()
    var s = '00'

    var str_m = ''
    var str_dt = ''
    var str_h = ''
    var str_min = ''

    str_m = m < 10 ? '0' + m : m
    str_dt = dt < 10 ? '0' + dt : dt
    str_h = h < 10 ? '0' + h : h
    str_min = min < 10 ? '0' + min : min

    var separ = '-'
    var sel_show = y + separ + m + separ + dt
    var sel = y + separ + str_m + separ + str_dt
    var time = str_h + ':' + str_min

    var curTime = new Date()
    var cur =
      curTime.getFullYear() +
      separ +
      (curTime.getMonth() + 1) +
      separ +
      curTime.getDate() //当前日期

    var data = this.getCalendar(y, m) //显示的日历
    return {
      cur: cur,
      sel_show: sel_show,
      sel: sel,
      y: y,
      m: m,
      time: time,
      data: data,
      time_show: false,
      separ: separ
    }
  },
  components: {
    'v-time': Time
  },
  methods: {
    getCalendar(y, m) {
      //输出一个日历数据源  月份不必减1
      y = parseInt(y)
      m = parseInt(m)
      var separ = '-'
      var time = new Date(y, m - 1, 1)
      var lastDate, nextDate
      var lastMonth = m - 1
      var nextMonth = m + 1
      if (m == 1) {
        lastDate = '' + (y - 1) + separ + +12 + separ
        nextDate = '' + y + separ + 2 + separ
        lastMonth = 12
      } else if (m == 12) {
        lastDate = '' + y + separ + 11 + separ
        nextDate = '' + (y + 1) + separ + 1 + separ
        nextMonth = 1
      } else {
        lastDate = '' + y + separ + (m - 1) + separ
        nextDate = '' + y + separ + (m + 1) + separ
      }
      var maxNumber = 42
      var r1 = [],
        r2 = [],
        r3 = []
      var lastFix = time.getDay() - 1
      lastFix = lastFix < 0 ? lastFix + 7 : lastFix
      var lastMaxDate = new Date(y, m - 1, 0).getDate() //上个月份最大天数
      var maxDate = new Date(y, m, 0).getDate() //当前月份的
      var i, t
      for (i = 0; i < lastFix; i++) {
        t = lastMaxDate - lastFix + i + 1
        r1[i] = {
          month: lastMonth,
          day: t,
          data: lastDate + t
        }
      }
      for (i = 0; i < maxDate; i++) {
        t = i + 1
        r2[i] = {
          month: m,
          day: t,
          data: y + separ + +m + separ + t
        }
      }
      var nextFix = maxNumber - maxDate - lastFix
      for (i = 0; i < nextFix; i++) {
        t = i + 1
        r3[i] = {
          month: nextMonth,
          day: t,
          data: nextDate + t
        }
      }
      var result = r1.concat(r2, r3)
      var ar = []
      for (i = 0; i < 6; i++) {
        ar.push(result.splice(0, 7))
      }
      return ar
    },
    cm(flag) {
      //前进后退月
      if (flag == -1) {
        if (this.m == 1) {
          this.init(parseInt(this.y) - 1, 12)
        } else {
          this.init(this.y, parseInt(this.m) - 1)
        }
      } else {
        if (this.m == 12) {
          this.init(parseInt(this.y) + 1, 1)
        } else {
          this.init(this.y, parseInt(this.m) + 1)
        }
      }
    },
    cy(flag) {
      //前进后退年
      if (flag == -1) {
        this.init(parseInt(this.y) - 1, this.m)
      } else {
        this.init(parseInt(this.y) + 1, this.m)
      }
    },
    clickNow() {
      var t = new Date()
      var y = t.getFullYear()
      var m = t.getMonth() + 1
      var dt = t.getDate()
      var str_m = m < 10 ? '0' + m : m
      var str_dt = dt < 10 ? '0' + dt : dt
      this.init(y, m)
      this.sel_show = y + this.separ + m + this.separ + dt
      this.sel = y + this.separ + str_m + this.separ + str_dt
    },
    init(y, m) {
      //切换日历
      this.data = this.getCalendar(y, m)
      this.y = y
      this.m = m
    },
    ok() {
      var temp = this.sel + ' ' + this.time + ':00'
      this.$emit('ok', temp)
    },
    time_ok(time) {
      this.time = time
      this.time_cancle()
    },
    timeShow(e) {
      this.time_show = true
      this.$emit('time_to')
      e.stopPropagation()
      document.addEventListener('click', this.time_hidePanel, false)
    },
    time_hidePanel(e) {
      if (!this.$refs.main.contains(e.target)) {
        this.time_cancle()
      }
    },
    time_cancle() {
      this.time_show = false
      this.$emit('time_to')
      document.removeEventListener('click', this.time_hidePanel, false)
    },
    click(data) {
      //点击事件
      var ar = data.split(this.separ)
      var y = ar[0]
      var m = ar[1]
      var dt = ar[2]
      var str_m = m < 10 ? '0' + m : m
      var str_dt = dt < 10 ? '0' + dt : dt
      this.sel_show = data
      this.sel = y + this.separ + str_m + this.separ + str_dt
      if (m != this.m) {
        this.init(y, m)
      }
    }
  }
}
</script>

<style scoped>
.all {
  width: 150px;
  margin: 20px auto;
}

.time {
  position: relative;
  top: -301px;
  left: -1px;
}

.dp {
  width: 213px;
  height: 304px;
  border: 1px solid black;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  z-index: 10;
  font-size: 12px;
  color: #666;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.dp-table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.dp-table th {
  padding: 6px 0;
  border: 0;
  text-align: center;
}

.dp-table td {
  padding: 4px 0;
  line-height: 18px;
  border: 0;
}

.dp-table th span {
  display: block;
  font-weight: normal;
}

.dp-table td span {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid transparent;
  margin: 0 auto;
  transition: background 0.3s ease;
  border-radius: 4px;
  padding: 0;
  box-sizing: border-box;
}

.dp-table td span:hover {
  background: #eaf8fe;
  cursor: pointer;
}

.dp-table .dp-last span {
  color: #ccc;
}

.dp-table .dp-today span {
  border-color: #2db7f5;
  font-weight: bold;
  color: #2db7f5;
}

.dp-table .dp-select span {
  background: #2db7f5;
  color: #fff;
  border: 1px solid transparent;
}

.dp-table .dp-select span:hover {
  background: #2db7f5;
}

.dp-header {
  position: relative;
  text-align: center;
  height: 34px;
  line-height: 34px;
  text-align: center;
  border-bottom: 1px solid #e9e9e9;
}

.dp-header .dp-ym {
  font-weight: bold;
}

.dp-header a {
  color: #999;
  line-height: 34px;
  height: 34px;
  font-size: 16px;
  display: inline-block;
  padding: 0 5px;
  position: absolute;
}

.dp-header a:hover {
  color: #2db7f5;
  cursor: pointer;
}

.dp-header .dp-h-1 {
  left: 7px;
}

.dp-header .dp-h-2 {
  left: 29px;
}

.dp-header .dp-h-3 {
  right: 29px;
}

.dp-header .dp-h-4 {
  right: 7px;
}

.dp-footer {
  height: 68px;
  border-top: 1px solid #e9e9e9;
  position: relative;
}

.dp-footer .span_left {
  display: inline-block;
  line-height: 34px;
  height: 34px;
}

.dp-footer .now {
  position: absolute;
  right: 60px;
  top: 41px;
}

.dp-footer .ok {
  position: absolute;
  right: 16px;
  top: 41px;
}

.dp .btn {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  white-space: nowrap;
  line-height: 1.5;
  padding: 1px 6px;
  font-size: 12px;
  border-radius: 6px;
  background-color: #f4f4f4;
  outline: 0;
  opacity: 1;
  color: #fff;
  background-color: #2db7f5;
}
</style>


