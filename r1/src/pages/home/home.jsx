import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './../../store'
import Com from './com'

class Home extends Component {
    constructor (props) {
        super(props)
        this.get = this.get.bind(this)
    }
    get (val) {
        console.log(val)
    }
    getRef () {
        console.log(this.divRef)
        this.divRef.style.color = 'red'
    }
    // 单个嵌套
    testWrap () {
        return (
            <Wrap>
               <p>单个嵌套</p>
            </Wrap>
        )
    }
    // 嵌套指定位置
    defineWrap () {
        return (
            <Define  top={<p>绿色</p>} other={<p>蓝色</p>}/>
        )
    }
    render () {
        return (
            <Fragment>
                home{this.props.value}
                <div ref={(e) => {this.divRef = e}}>ref</div>
                <button onClick={this.getRef.bind(this)}>获取Ref</button>
                <button onClick={this.props.changeData}>改变</button>
                <button onClick={this.props.changeTitle}>改变title</button>
                <div>
                    文本
                    <textarea value={'w文本内容'}/>
                </div>
                <Com name={'传递的name'} handle={this.get}></Com>
                {this.testWrap()}
                {this.defineWrap()}
            </Fragment>
        )
    }
}
//  单个嵌套
class Wrap extends Component {
    render (props) {
        return (
            <div style={{'color': 'red', 'fontWeight': 'bold'}}>{this.props.children}</div>
        )
    }
}

//  指定嵌套
class Define extends Component {
    render (props) {
        return (
            <div>
                <div style={{color: 'green'}}>{this.props.top}</div>
                <div style={{color: 'blue'}}>{this.props.other}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.get('m1').value
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeData () {
            dispatch(actionCreators.changeData())
        },
        changeTitle () {
            dispatch(actionCreators.changeTitle())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
