import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
class LinkPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            short_link: '',
        }
        this.ShortLink = this.ShortLink.bind(this);
    }

    render() {
        return (
            <div className="register-box">
                <div className="write-box">
                    <p>Ваше посилання</p>
                    <input type="text" className="input_info" placeholder="Введіть посилання"
                           onChange={(e) => this.setState({url: e.target.value})}/>
                    <button className="button" onClick={() => {
                        this.ShortLink()
                    }}>Скоротити посилання
                    </button>
                    {this.state.shortLink && (
                        <div id="link-container">
                            <p>Ваше коротке посилання: <a href={`http://localhost:8000/${this.state.shortLink}`} target="_blank"
                                                          rel="noopener noreferrer">{`http://localhost:8000/${this.state.shortLink}`}</a>
                            </p>
                        </div>
                    )}


                    <button className="button" onClick={() => this.props.navigate('/listlinks')}>До ваших посилань</button>
                    <button className="button" onClick={() => this.props.navigate('/')}>Назад до реєстрації?</button>
                </div>
            </div>
        )
    }

    async ShortLink() {
        const {url} = this.state;
        const token = localStorage.getItem('token');

        if (!token) {
            alert("Будь ласка, авторизуйтесь!");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/api/me/urls',
                { url: url },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            this.setState({ shortLink: response.data.short});

        } catch (error) {
            alert('Не вдалося скоротити')
            this.setState({shortLink: ''});
        }
    }
}


function withNavigation(Component) {
    return function (props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>;
    };
}

export default withNavigation(LinkPage);