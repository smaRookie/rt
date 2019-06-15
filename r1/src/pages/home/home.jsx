import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './../../store'

class Home extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <Fragment>
                home{this.props.value}
                <button onClick={this.props.changeData}>改变</button>
                <button onClick={this.props.changeTitle}>改变title</button>
            </Fragment>
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
