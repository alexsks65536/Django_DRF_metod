import React from 'react';
import AuthorList from './components/Author.js';
import BookList from './components/Book.js';
import AuthorBookList from './components/AuthorBook.js';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import LoginForm from './components/Auth.js';

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        'authors': [],
        'books': []
        }
    }
    load_data() {
        axios.get('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                this.setState({authors: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/books/')
            .then(response => {
                this.setState({books: response.data})
            }).catch(error => console.log(error))
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                console.log(response.data)
            }).catch(error => alert('Неверный логин или пароль'))
        }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <AuthorList
                            items={this.state.authors} />} />
                        <Route exact path='/books' component={() => <BookList
                            items={this.state.books} />} />

                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route path='/author/:id'>
                            <AuthorBookList items={this.state.books} />
                        </Route>
                        <Redirect from='/authors' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
