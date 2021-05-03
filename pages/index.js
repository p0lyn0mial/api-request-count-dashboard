import React from "react"

import Details from "./details"
import Main from "./main"
import {DataSet} from "../assets/requests-count"

export default class Index extends React.Component {
    constructor(props) {
        super(props)

        // by default we are going to display the main page
        this.state = {page: "main"}
    }

    // this is a function used by the components to change the currently displayed component
    updateComponentToDisplay = (newComponent) => { this.setState({page: newComponent}) }

    render() {
        let componentToDisplay

        if (this.state.page === "details") {
            componentToDisplay = <Details setComponentToDisplay={this.updateComponentToDisplay}/>
        } else {
            componentToDisplay = <Main data={this.props.data} setComponentToDisplay={this.updateComponentToDisplay}/>
        }

        return(
            <div>{componentToDisplay}</div>
        )
    }
}

// this method loads data from the assets directory
export async function getStaticProps() {
    return {
        props: {
            data: DataSet,
        },
    }
}
