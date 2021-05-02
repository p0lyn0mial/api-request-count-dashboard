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

    // react to updates in the url address
    onURLAddressChange = () => { this.setState({page: window.location.hash}) }

    // register to updates in the url address
    componentDidMount() { window.addEventListener("hashchange", this.onURLAddressChange) }

    render() {
        let componentToDisplay

        if (this.state.page === "#details") {
            componentToDisplay = <Details/>
        } else {
            componentToDisplay = <Main data={this.props.data}/>
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
