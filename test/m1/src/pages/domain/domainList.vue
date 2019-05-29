<template>
  <div>
    <div class="search">
      <v-text-field
        class="searchInput"
        label="搜索"
        prepend-inner-icon="search"
        clearable
        v-model="keyword"
      ></v-text-field>
      <v-btn color="info" small class="searchbtn" @click="searchMethod">搜索</v-btn>
    </div>
    <Table :columns="columns1" :data="list" stripe border></Table>
    <Page :total="parseInt(total)" show-sizer show-total class="pagination" @on-change="changePage" @on-page-size-change="changePageSize"/>
    <Modal
      v-model="modelShow"
      title="上下号操作"
      mask-closable:false
      :loading="btnLoadingShow"
      @on-ok="submit"
      @on-cancel="cancel">
      <div class="model-wrap">
        <span>
          网页地址：
        </span>
        <Input placeholder="请输入页面地址" style="width: auto" disabled v-model="currentItem.domainUrl">
          <Icon type="ios-link" slot="prefix" />
        </Input>
      </div>
      <div class="model-wrap">
        <span>
          页面微信：
        </span>
        <Input placeholder="请输入页面微信号，以英文逗号分隔" style="width: auto" v-model="currentItem.domainPagewx">
          <Icon type="ios-chatbubbles-outline" slot="prefix" />
        </Input>
      </div>
      <div class="model-wrap">
        <span>跳转微信：</span>
        <Input placeholder="请输入跳转页面微信，以英文逗号分隔" style="width: auto" v-model="currentItem.domainJumpwx">
          <Icon type="ios-chatbubbles" slot="prefix" />
        </Input>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'domainList',
  data () {
    return {
      token: '',
      sign: '',
      search: '',
      total: 0,
      keyword: '',
      btnLoadingShow: true,
      page: 1,
      pageSize: 10,
      modelShow: false, // 对话框的显示
      currentItem: {},
      columns1: [
        {
          title: '标识',
          key: 'domainKey'
        },
        {
          title: '域名',
          key: 'domainUrl'
        },
        {
          title: '页面微信',
          key: 'domainPagewx'
        },
        {
          title: '跳转微信',
          key: 'domainJumpwx'
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
              }, '上下号')
            ])
          }
        }
      ],
      list: []
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    this.sign = localStorage.getItem('sign')
    this.getDomainList()
  },
  methods: {
    searchMethod () {
      this.getDomainList()
    },
    changePage (event) {
      this.page = event
      this.getDomainList()
    },
    changePageSize (event) {
      console.log(event)
      this.pageSize = event
      this.page = 1
      this.getDomainList()
    },
    submit () {
      var data = new URLSearchParams()
      data.append('token', this.token)
      data.append('timestamp', new Date().getTime())
      data.append('sign', this.sign)
      data.append('domainKey', this.currentItem.domainKey)
      data.append('domainPagewx', this.currentItem.domainPagewx)
      data.append('domainJumpwx', this.currentItem.domainJumpwx)
      this.$axios.post(`/api/v2/domain/setdsnwx`, data).then((res) => {
        if (res.data.result_code === 200) {
          this.$Message.success('修改成功')
          this.getDomainList()
          this.currentItem = {}
        } else {
          this.$Message.error('修改失败，请重试')
        }
        this.modelShow = false
      }).catch(() => {
        this.$Message.error('修改失败，请重试')
        this.modelShow = false
      })
    },
    cancel () {
      this.modelShow = false
    },
    show (val) {
      this.currentItem = Object.assign({}, val.row)
      // this.currentItem = val.row
      this.modelShow = true
      console.log(val)
    },
    getDomainList () {
      let url = `/api/v2/domain/querydomain?token=${this.token}&timestamp=${new Date().getTime()}&sign=${this.sign}&page=${this.page}&pageSizeNum=${this.pageSize}`
      if (this.keyword) {
        url += `&keyword=${this.keyword}`
      }
      this.$axios.get(url).then((res) => {
        if (res.data.result_code === 200) {
          this.total = res.data.result_data.total
          this.list = res.data.result_data.list
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.tcontent
  text-align: justify;
  text-justify: newspaper;
  word-break: break-all;
.pagination
  text-align center
  display flex
  justify-content center;
  align-items center;
  margin-top: 15px;
.searchInput
  width: 300px;
  flex: 0 0 300px;
.search
  display flex
.searchbtn
  margin-top: 20px;
.model-wrap
  display flex
  align-items center
  margin-bottom 10px;
  .ivu-input-type
    flex-grow 1;
</style>
