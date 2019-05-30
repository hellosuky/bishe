import React from 'react'
import { Form, Icon, Input, Button,message} from 'antd'
import {connect} from 'react-redux'
import {login} from '../../reducers/login.redux'
import './index.css'

@connect(
  state => state.loginReducers,
  {login}
)
class NormalLoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      user:'',
      pwd:""
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isLogin){
      this.props.history.push('/adminpage/uploadbrand')
    }
  }
  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      }
      if(!values.username || !values.password){
        message.error('密码或者用户名没有输入')
      }else{
        this.props.login(values.username,values.password)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <p>管理员登陆</p>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              autoComplete="new-username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" >
            登陆
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const Admin = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Admin
