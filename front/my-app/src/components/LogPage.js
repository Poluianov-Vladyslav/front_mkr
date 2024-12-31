import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.LoginUser = this.LoginUser.bind(this)
    }
    render(){
        return (
            <div className="register-box">
                <div className="write-box">
                    <input type="text" className="input_info" placeholder="Ім'я користувача"
                           onChange={(e) => this.setState({username: e.target.value})}/>
                    <input type="password" className="input_info" placeholder="Пароль"
                           onChange={(e) => this.setState({password: e.target.value})}/>
                    <button className="button" onClick={() => {
                        this.LoginUser()
                    }}>Зареєструватися
                    </button>
                    <button className="button" onClick={() => this.props.navigate('/')}>Назад до реєстрації?</button>
                </div>
            </div>
        )
    }

    async LoginUser() {
        const { username, password } = this.state;
        try {
            const response = await axios.post(
                'http://localhost:8000/api/login',
                new URLSearchParams({
                    username: username,
                    password: password,
                    scope: "",
                    client_id: "",
                    client_secret: "",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const token = response.data.access_token;
            localStorage.setItem("token", token);
            alert('Ви авторизовані')
            this.props.navigate('/link'); // Навігація після входу

        } catch (error) {
            alert('Неправильний логін або пароль')
        }
    }
}

function withNavigation(Component) {
    return function (props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>;
    };
}

export default withNavigation(LoginPage);