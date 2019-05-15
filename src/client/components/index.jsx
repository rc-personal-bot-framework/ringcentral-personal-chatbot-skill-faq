import { Component } from 'react'
import { Button, List } from 'antd'
import logo from '../images/rc128.png'

export default class App extends Component {

  render () {
    let { logined } = this.props.store
    return logined
      ? this.renderLogined()
      : this.renderNotLogined()
  }
}
