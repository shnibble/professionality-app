import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import UserContext from '../../context/user'
import Article from '../article'
import Request from './request'
import AddRequest from './addRequest'
import CheckboxTrueImg from '../../images/checkbox-true.png'
import CheckboxFalseImg from '../../images/checkbox-false.png'

const RequestsHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const CheckboxContainer = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    margin: 2px;
    cursor: pointer;
`
const Checkbox = styled.input`
    display: none;

    &:checked + div {
        background-image: url(${CheckboxTrueImg});
    }
`
const Checkmark = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-image: url(${CheckboxFalseImg});
    background-size: 100%;
`

class Requests extends React.Component {
    state = {
        loading: true,
        error: false,
        requests: [],
        include_inactive: false
    }

    loadData = () => {
        let API_URL = ''
        if (this.state.include_inactive) {
            API_URL = 'https://professionality-api.com/bank/requests/get'
        } else {
            API_URL = 'https://professionality-api.com/bank/requests/getActive'
        }

        axios.get(API_URL)
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

    toggleActive = async (ev) => {
        const include_inactive = ev.target.checked
        await this.setState({ include_inactive })
        this.loadData()
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
                        <RequestsHeader>
                            {(user.is_member)
                            ?
                            <AddRequest loadDataFunction={this.loadData} />
                            :
                            null
                            }
                            <span>Show Inactive:</span>
                            <CheckboxContainer>
                                <Checkbox type='checkbox' checked={this.state.include_inactive} onChange={this.toggleActive} />
                                <Checkmark />
                            </CheckboxContainer>
                        </RequestsHeader>
                        {(this.state.requests.map(request => <Request key={`request_id_${request.id}`} data={request} loadDataFunction={this.loadData} /> ))}
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Requests
