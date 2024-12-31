import React, { Component } from 'react';
import axios from 'axios';

class ListLinkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            redirects: {},
            error: null
        };
    }

    componentDidMount() {
        this.fetchLinks();
    }

    async fetchLinks() {
        const token = localStorage.getItem('token');
        const links = [];
        const redirects = {};
        let page = 1;

        try {
            while (true) {
                const response = await axios.get(`http://localhost:8000/api/me/urls?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const currentLinks = response.data;
                if (currentLinks.length === 0) break;

                links.push(...currentLinks);
                page++;
            }

            for (let link of links) {
                const redirectResponse = await axios.get(`http://localhost:8000/api/me/links/${link.short}/redirects`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                redirects[link.short] = redirectResponse.data;
            }
            this.setState({ links, redirects, error: null});
        } catch (error) {
            this.setState({ error: 'Не вдалося завантажити посилання'});
        }
    }

    render() {
        const { links, redirects, error } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="link-list-container">
                <h2>Ваші скорочені посилання</h2>
                <table className="link-table">
                    <thead>
                    <tr>
                        <th>Посилання</th>
                        <th>Дата створення</th>
                        <th>Кількість кліків</th>
                        <th>Дати відвідувань</th>
                    </tr>
                    </thead>
                    <tbody>
                    {links.map((link) => (
                        <tr key={link.short}>
                            <td>
                                <a href={`http://localhost:8000/${link.short}`} target="_blank"
                                   rel="noopener noreferrer">
                                    {`http://localhost:8000/${link.short}`}
                                </a>
                            </td>
                            <td>{new Date(link.created_at).toLocaleString()}</td>
                            <td>{link.redirects}</td>
                            <td>
                                {redirects[link.short] && redirects[link.short].length > 0 ? (
                                    redirects[link.short].map((timestamp, index) => (
                                        <div key={index}>{new Date(timestamp).toLocaleString()}</div>
                                    ))
                                ) : (
                                    <span>Ще не відвідувалось</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListLinkPage