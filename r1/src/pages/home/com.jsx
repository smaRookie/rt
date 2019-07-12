import React, { Component, Fragment } from 'react'

class Com extends Component {
    constructor (props) {
        super(props)
        this.btn = this.btn.bind(this)
    }
    btn () {
        this.props.handle('test')
    }
    render () {
        return (
            <Fragment>
                {this.props.name}
                <div>
                    <button onClick={this.btn}>子组件按钮</button>
                </div>
            </Fragment>
        )
    }
}

export default Com
