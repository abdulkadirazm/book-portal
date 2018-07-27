import React from "react"
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            books:[],
            query:'',
            bookId:1
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.changeQuery = this.changeQuery.bind(this)
    }

    changeHandler(event){
        this.setState({[event.target.name]: event.target.value})
    }


    clickHandler(event){
       this.changeQuery(this.state.query)
    }

    changeQuery = ((query) => {
        BooksAPI.getAll().then((books) => {
            this.setState({books:books})
        });
    });

    render(){
        const { query, books } = this.state

        return(
            <div>
                <input
                    name="query"
                    type="text"
                    onChange={this.changeHandler}
                    placeholder="Search by title or author"
                    value={query}/>
                <button onClick={this.clickHandler}>Search</button>
                
                <div>
                    <ol>
                      {books.map((book) => (
                        <li>
                          <div>
                              <p>{JSON.stringify({book})}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;