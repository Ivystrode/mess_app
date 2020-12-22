import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from './homepage'

export default class App extends Component {
    constructor(props) {
        super(props)
        // this.state = { // whenever the "state" of the webpage updates we can re-render the component ie when the database updates - so can we display live meal orders coming in???
        //     }
        }

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