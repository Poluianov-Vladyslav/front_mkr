import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../css/page.css';
class RegisterPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password1: '',
            password2: '',
            full_name: ''
        }
        this.RegisterNewUser = this.RegisterNewUser.bind(this)
    }


    render() {
        return(
            <div className="register-box">
                <div className="write-box">
                    <input type="text" className="input_info" placeholder="Ім'я користувача"
                           onChange={(e) => this.setState({username: e.target.value})}/>
                    <input type="text" className="input_info" placeholder="Повне ім'я"
                           onChange={(e) => this.setState({full_name: e.target.value})}/>
                    <input type="password" className="input_info" placeholder="Пароль"
                           onChange={(e) => this.setState({password1: e.target.value})}/>
                    <input type="password" className="input_info" placeholder="Введіть пароль ще раз"
                           onChange={(e) => this.setState({password2: e.target.value})}/>
                    <button className="button" onClick={() => {
                        this.RegisterNewUser()
                    }}>Зареєструватися
                    </button>
                    <button className="button" onClick={() => this.props.navigate('/login')}>Вже є акаунт?</button>
                </div>
            </div>
        )
    }

    RegisterNewUser = async () => {
        const {username, password1, password2, full_name } = this.state;
        if (password1 === password2){
            axios.post('http://localhost:8000/api/register', {
                username: username,
                password: password1,
                full_name: full_name,
            })
                .then(function (response) {
                    alert("Успішна реєстрація акаунта")
                })
                .catch(function (error) {
                    if (error.response.status===409){
                        alert('Такий юзер уже є')
                    }
                    if (error.response.status===422){
                        alert('Неправильні дані')
                    }
                });
        }
        else{
            alert("Паролі різні")
        }
    };
}
function withNavigation(Component) {
    return function (props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}
export default withNavigation(RegisterPage);