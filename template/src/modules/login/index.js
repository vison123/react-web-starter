import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, message, Checkbox } from 'antd'
import loginName from 'images/login/user.png'
import passWord from 'images/login/password.png'
import logo from 'images/login/logo.png'
import bottomImg from 'images/login/bottom.jpg'
import style from './index.less'
import { userLoginAct } from './reduck'
import storage from '../../utils/storage'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    const userInfo = storage.get('user')
    if (userInfo && userInfo.accessToken) {
      this.props.history.replace('/')
    }
  }

  componentWillReceiveProps(next) {
    let userInfo = next.userInfo
    if (userInfo.accessToken) {
      storage.set('user', userInfo)
      this.props.history.replace('/')
      location.reload()
    }
  }

  getEmail = e => {
    this.setState({ email: e.target.value })
  }

  getPwd = e => {
    this.setState({ password: e.target.value })
  }

  login = () => {
    let email = this.state.email
    let password = this.state.password
    if (email === '') {
      message.error('请输入账号')
      return
    }

    if (password === '') {
      message.error('请输入密码')
      return
    }

    this.props.dispatch(
      userLoginAct({
        name: email,
        password: password,
        assessToken: ''
      })
    )
  }

  render() {
    return (
      <div className={style['wrapper']}>
        <div className={style['wrap']}>
          <div className={style['login-wrapper']}>
            <div className={style['user-login-wrap']}>
              <img
                className={style['logo']}
                src={logo}
              />
              <div className={style['title']}>管理系统</div>
              <div className={style['input-row']}>
                <div className={style['icon']}>
                  <img src={loginName} />
                </div>
                <Input
                  type='text'
                  className={style['input']}
                  placeholder='请输入Email账号前缀'
                  onChange={this.getEmail}
                />
              </div>
              <div className={style['input-row']}>
                <div className={style['icon']}>
                  <img src={passWord} />
                </div>
                <Input
                  type='password'
                  className={style['input']}
                  placeholder='请输入密码'
                  onChange={this.getPwd}
                />
              </div>
              <Checkbox className={style['rember-password']}>记住密码</Checkbox>
              <Button
                className={style['btn-login']}
                onClick={this.login}
              >
                登&nbsp;&nbsp;录
              </Button>
            </div>
            <img
              className={style['bottom-img']}
              src={bottomImg}
            />
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.userLogin
  }
}

export default connect(mapStateToProps)(Login)
