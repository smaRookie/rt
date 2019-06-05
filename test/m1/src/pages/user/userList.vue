<template>
  <div>
    asd
<!--    <Table :columns="columns1" :data="list" stripe border></Table>-->
  </div>
</template>

<script>
export default {
  name: 'userList',
  data () {
    return {
      keyword: '',
      page: 1,
      pageSizeNum: 10,
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
              }, '管理')
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
    getList () {
      let url = `?sign=${this.sign}&token=${this.token}&timestamp=${new Date().getTime()}&page=${this.page}&pageSizeNum=${this.pageSizeNum}`
      if (this.keyword.trim()) {
        url += `&keyword=${this.keyword}`
      }
      this.$axios.get(`/api/v2/user/queryuser` + url).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
