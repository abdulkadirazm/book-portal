import React from 'react'

class BookLib extends React.Component{
    constructor(props){
        super(props)
        this.state={title:"", publishDate:""}
        
    }


    render(){
        return (
            <div>
                <h2>BOOK LIBRARY </h2>
            </div>
        )
    }
}

export default BookLib;