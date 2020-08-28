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
const Pager = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
const PagerButton = styled.button`
    background: none;
    padding: 5px 15px;
    color: ${props => props.theme.colors.buttonColor};
    border: none;
    cursor: pointer;
    transition: all .25s ease;

    &:hover, &:focus {
        outline: none;
        color: ${props => props.theme.colors.highlight};
    }

    &:disabled {
        cursor: default;
        color: ${props => props.theme.colors.disabledColor};
    }
`
const PagerText = styled.span`
    color: ${props => props.theme.colors.lowlight};
`

class Requests extends React.Component {
    state = {
        loading: true,
        error: false,
        requests: [],
        include_inactive: false,
        limit: 10,
        offset: 0,
        count: 0
    }

    loadData = () => {
        let API_URL = ''
        if (this.state.include_inactive) {
            API_URL = 'https://professionality-api.com/bank/requests/get'
        } else {
            API_URL = 'https://professionality-api.com/bank/requests/getActive'
        }

        axios.get(API_URL, {
            params: {
                limit: this.state.limit,
                offset: this.state.offset
            }
        })
        .then(results => {

            // get total count
            axios.get(API_URL)
            .then(total_results => {
                const count = total_results.data.length
                this.props.loadActiveRequestsFunction()
                this.setState({
                    loading: false,
                    requests: results.data,
                    count
                })
            })
            .catch(err => {
                window.alert('Issue loading bank requests, please try refreshing the page.')
                this.setState({ loading: false, error: true })
            })
            
        })
        .catch(err => {
            window.alert('Issue loading bank requests, please try refreshing the page.')
            this.setState({ loading: false, error: true })
        })
    }

    toggleActive = async (ev) => {
        const include_inactive = ev.target.checked
        await this.setState({ include_inactive, offset: 0 })
        this.loadData()
    }

    previousPage = async () => {
        let offset = this.state.offset - this.state.limit
        if (offset < 0) {
            offset = 0
        }
        await this.setState({ offset })
        this.loadData()
    }

    nextPage = async () => {
        let offset = this.state.offset + this.state.limit
        if (offset < this.state.count) {
            await this.setState({ offset: this.state.offset + this.state.limit })
            this.loadData()
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        let min = this.state.offset + 1
        let max = this.state.offset + this.state.limit
        if (max > this.state.count) {
            max = this.state.count
        }

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
                        <Pager>
                            <PagerButton onClick={this.previousPage} disabled={(this.state.offset === 0)?true:false}>Previous</PagerButton>
                            <PagerText>{min} - {max} of {this.state.count}</PagerText>
                            <PagerButton onClick={this.nextPage} disabled={(this.state.offset >= this.state.count - this.state.limit)?true:false}>Next</PagerButton>
                        </Pager>
                        {(this.state.requests.map(request => <Request key={`request_id_${request.id}`} data={request} loadDataFunction={this.loadData} /> ))}
                        <Pager>
                            <PagerButton onClick={this.previousPage} disabled={(this.state.offset === 0)?true:false}>Previous</PagerButton>
                            <PagerText>{min} - {max} of {this.state.count}</PagerText>
                            <PagerButton onClick={this.nextPage} disabled={(this.state.offset >= this.state.count - this.state.limit)?true:false}>Next</PagerButton>
                        </Pager>
                    </Article>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Requests
