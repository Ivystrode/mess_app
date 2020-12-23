import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from './homepage'

export default class App extends Component {
    constructor(props) {
        super(props)
        // this.state = { // whenever the "state" of the webpage updates we can re-render the component ie when the database updates - so can we display live meal orders coming in???
        //     }
        }
    // componentDidMount() {
    //     // this fetches the Api data
    //     // put a function like this on each page
    //     // one to show all orders
    //     // then on specific meal pages, to fetch the relevant menuitems
    //     console.log("test")
    //     const apiUrl = `http://127.0.0.1:8000/main/mealorders`
    //     fetch(apiUrl)
    //     .then((data) => data.json())
    //     .then((orders) => console.log(orders))
    // }

    render() {
        return (
            <div>
                <HomePage/>
            </div>)
    }
}

const appDiv = document.getElementById("app")
render(<App/>, appDiv)

// function App() {
//     return (
//         <div>
//             <HomePage/>
//         </div>
//     )
// }

// export default App;