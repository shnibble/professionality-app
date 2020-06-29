import React from 'react'
import axios from 'axios'
import UserContext from '../../context/user'
import Article from '../article'
import Request from './request'
import AddRequest from './addRequest'

class Requests extends React.Component {
    state = {
        loading: true,
        error: false,
        requests: [],
    }

    loadData = () => {
        axios.get('https://professionality-api.com/bank/requests/get')
        .then(results => {
            this.props.loadActiveRequestsFunction()
            this.setState({
                loading: false,
                requests: results.data
            })
        })
        .catch(err => {
            window.alert('Issue loading bank requests, please try refreshing the page.')
            this.setState({ loading: false, error: true })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    (this.state.error)
                    ?
                    <Article>
                        <p>Error loading requests.</p>
                    </Article>
                    :
                    (this.state.loading)
                    ?
                    <Article>
                        <p>Loading bank requests...</p>
                    </Article>
                    :
                    <Article>
                        {(user.is_member)
                        ?
                        <AddRequest loadDataFunction={this.loadData} />
                        :
                        null
                        }
                        {(this.state.requests.map(request => <Request key={`request_id_${request.id}`} data={request} loadDataFunction={this.loadData} /> ))}
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Requests
