import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        // prefilled user pass fields just for convenience for testing purposes
        this.state = { loginSuccess: false, username: 'calogero', password: 'test' };
    }
    updateField = (name, value) => {
        this.setState({ [name]: value });
    }

    doLogin = (event) => {
        event.preventDefault();
        if (this.form.checkValidity()) {
            this.setState({loginSuccess: true});
            this.props.setLoggedIn();
        } else {
            this.form.reportValidity();
        }
    }

    validateForm = (event) => {
        event.preventDefault();
    }

    render() {
        if (this.state.loginSuccess){
            return <Redirect to="/officer"/>
        } else
        return <div>
            <form className='form' method={'POST'}
                onSubmit={this.validateForm} ref={form => this.form = form}>
                <div className={'form-row'}>
                    <div className={'form-group'}>
                        <label htmlFor='username'>Username</label>
                        <input id='username' className={'form-control'} type='text' required={true}
                            name='username'
                            value={this.state.username}
                            onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                        />
                    </div>
                    &nbsp;
                    <div className={'form-group'}>
                        <label htmlFor='password'>Password</label>
                        <input id='password' className={'form-control'} type='password' required={true}
                            name='password'
                            value={this.state.password}
                            onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                        />
                    </div>
                </div>
                <div className={'form-row'}>
                    <button type='button' className='btn btn-primary' disabled={this.props.doingLogin}
                        onClick={this.doLogin}>Login</button>
                </div>
            </form>
        </div>
}

}

export default LoginForm