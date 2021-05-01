import React from "react"

import Details from "./details"
import Main from "./main"
import {DataSet} from "../assets/requests-count";
import {store} from "../assets/store";

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {page: "index"}
    }

    updatePage = () => {
        this.setState({page: window.location.hash})
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.updatePage)
    }

    render() {
        const state = store.getState()
        console.log("index")
        console.log(state)
        let component

        if (this.state.page === "#details") {
            component = <Details/>
        } else {
            component = <Main data={this.props.data}/>
        }

        return(
            <div>{component}</div>
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
