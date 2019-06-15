<template>
    <div>
      <WxList :flag=false></WxList>
    </div>
</template>

<script>
import WxList from '@/components/wxList.vue'
export default {
  name: 'list',
  data () {
    return {
      token: '',
      sign: '',
      page: 1,
      pageSizeNum: 10,
      list: [], // 表单数据
      scaleUser: [], // 销售人列表
      total: 0,
      btnLoadingShow: true,
      currentItem: {}, // 当前表格数据
      modelShow: false,
      columns1: [
        {
          title: '微信ID',
          key: 'wxId'
        },
        {
          title: '微信号',
          key: 'wxWechat'
        },
        {
          title: '状态管理',
          key: 'status'
        },
        {
          title: '所属销售',
          key: 'wxSaleName'
        },
        {
          title: '推广负责人',
          key: 'wxUser'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params)
                  }
                }
              }, '分配')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    this.sign = localStorage.getItem('sign')
    this.getList()
  },
  methods: {
    //  获取表单数据
    getList () {
      this.$axios.get(`/api/v2/wxm/querywx?sign=${this.sign}&token=${this.token}&timestamp=${new Date().getTime()}&page=${this.page}&pageSizeNum=${this.pageSizeNum}`).then((res) => {
        console.log(res)
        if (res.data.result_code !== 200) {
          return 0
        }
        this.list = res.data.result_data.list
        this.list.forEach((item, index) => {
          item.status = item.wxStatus.val
        })
        this.scaleUser = res.data.result_data.salesmanlist
        this.total = res.data.result_data.total
      }).catch((err) => {
        console.log(err)
      })
    },
    // 分配
    show (val) {
      this.currentItem = Object.assign({}, val.row)
      // this.currentItem = val.row
      this.modelShow = true
      console.log(val)
    },
    // 修改页码
    changePage (event) {
      this.page = event
      this.getList()
    },
    changePageSize (event) {
      this.pageSizeNum = event
      this.page = 1
      this.getList()
    }
  },
  components: {
    WxList
  }
}
</script>

<style scoped lang="stylus">
.pagination
  text-align center
  display flex
  justify-content center;
  align-items center;
  margin-top: 15px;
</style>
