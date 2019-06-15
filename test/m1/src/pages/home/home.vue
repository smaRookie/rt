<template>
  <div class="home">
    <div class="home-top">
      <div class="figure1" ref="figure1"></div>
      <div class="figure2" ref="figure2"></div>
    </div>
    <div class="home-bottom">
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="domainList"
        class="elevation-1"
        hide-actions
        :pagination.sync="pagination"
        no-data-text="暂无数据"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.calories }}</td>
          <td class="text-xs-center">{{ props.item.fat }}</td>
          <td class="text-xs-center">{{ props.item.carbs }}</td>
          <td class="text-xs-center">{{ props.item.protein }}</td>
          <td class="text-xs-center">{{ props.item.iron }}</td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" @input="test(pagination.page)"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'home',
  data () {
    return {
      token: '',
      sign: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: '编号',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {text: '名称', value: 'calories', align: 'center', sortable: false},
        {text: '日期', value: 'fat', align: 'center', sortable: false},
        {text: '访问量', value: 'carbs', align: 'center', sortable: false},
        {text: '复制量', value: 'protein', align: 'center', sortable: false},
        {text: '所属', value: 'iron', align: 'center', sortable: false}
      ],
      domainList: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    this.sign = localStorage.getItem('sign')
    this.getDomainList()
    this.draw1()
    this.draw2()
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    test(number) {
      console.log(111, number)
    },
    getDomainList () {
      this.$axios.get(`/api/v2/domain/querydomain?token=${this.token}&timestamp=${new Date().getTime()}&sign=${this.sign}&page=1&pageSizeNum=10`).then((res) => {
        console.log(res)
        if (res.data.result_code === 200) {
          if (!res.data.result_data.list.length) {
            return 0
          }
          res.data.result_data.list.forEach((item, index) => {
            console.log(index)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    draw1 () {
      let draw1 = echarts.init(this.$refs.figure1)
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      }
      draw1.setOption(option)
    },
    draw2 () {
      let draw2 = echarts.init(this.$refs.figure2)
      let option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data:[ 120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data:[ 220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data:[ 150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data:[ 320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data:[ 820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      draw2.setOption(option)
    }
  }
}
</script>

<style scoped lang="stylus">
.home
  &-top
    height: 320px;
    display flex
    justify-content space-between
    margin-bottom: 10px;
    div
      width: calc((100% - 10px) / 2)
      height: 100%;
      background-color #fff;
      box-sizing border-box
      padding: 5px;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
      text-decoration: none;
    .figure1
      margin-right 10px;
</style>
