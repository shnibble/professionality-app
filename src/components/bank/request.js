import React from 'react'
import axios from 'axios'
import Moment from 'moment'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import UserContext from '../../context/user'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'
import Popout from '../popout'

const Container = styled.div`
    background: #202020;
    padding: 10px;
    border-radius: 4px;
    margin: 5px;

    &.completed, &.rejected {
        background: #999;
    }
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    color: #f2f2f2;
    font-weight: bold;
`
const CreatedDate = styled.span`
    padding: 5px;
`
const Username = styled.span`
    padding: 5px;
`
const Timeframe = styled.span`
    padding: 5px;
`
const Message = styled.p`
    padding: 5px;
    color: #f2f2f2;
`
const Response = styled.div`
    padding: 5px;
    color: #f2f2f2;

    &.completed {
        color: green;
    }
    &.rejected {
        color: red;
    }
`
const Field = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const SubmitButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const CancelButton = styled.button`
    background: red;
    border: 2px solid red;
    color: #f2f2f2;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: red;
    }
`

class Request extends React.Component {
    state = {
        reject_active: false,
        reject_reason: ''
    }

    openRejectPopout = () => {
        this.setState({ reject_active: true })
    }

    closeRejectPopout = () => {
        this.setState({ reject_active: false })
    }

    updateRejectReason = (ev) => {
        const reject_reason = ev.target.value
        this.setState({ reject_reason })
    }

    deleteRequest = () => {
        if (window.confirm('Are you sure you want to delete this bank request?')) {
            axios.post('https://professionality-api.com/bank/requests/delete', {
                jwt: Cookies.get('token'),
                request_id: this.props.data.id
            })
            .then(() => {
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Issue deleting bank request, please try re-logging.')
            })
        }
    }

    rejectRequest = () => {
        axios.post('https://professionality-api.com/bank/requests/reject', {
            jwt: Cookies.get('token'),
            request_id: this.props.data.id,
            rejected_reason: this.state.reject_reason
        })
        .then(() => {
            this.setState({ reject_active: false })
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue rejecting bank request, please try re-logging.')
        })
    }

    completeRequest = () => {
            axios.post('https://professionality-api.com/bank/requests/complete', {
                jwt: Cookies.get('token'),
                request_id: this.props.data.id
            })
            .then(() => {
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Issue completing bank request, please try re-logging.')
            })
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <Container className={(this.props.data.completed)?'completed':(this.props.data.rejected)?'rejected':''}>
                        <Header>
                            <CreatedDate>{Moment(this.props.data.created).format('MM/DD/YYYY')}</CreatedDate>
                            <Username>{this.props.data.nickname}</Username>
                            <Timeframe><i>{this.props.data.timeframe}</i></Timeframe>
                        </Header>
                        <Message>
                            {this.props.data.message}
                        </Message>
                        <Response className={(this.props.data.completed)?'completed':(this.props.data.rejected)?'rejected':''}>
                            {(this.props.data.completed)
                            ?
                            <span>Completed {Moment(this.props.data.completed).format('MM/DD/YYYY')}</span>
                            :
                            (this.props.data.rejected)
                            ?
                            <span>Rejected {Moment(this.props.data.rejected).format('MM/DD/YYYY')} - {this.props.data.rejected_reason}</span>
                            :
                            null
                            }
                        </Response>
                        <TableButtonWrapper>
                        {(user.is_officer && !this.props.data.completed && !this.props.data.rejected)
                        ?
                        <TableButton title='Complete' onClick={this.completeRequest} />
                        :
                        null
                        }
                        {(user.is_officer && !this.props.data.completed && !this.props.data.rejected)
                        ?
                        <TableButton title='Reject' onClick={this.openRejectPopout} />
                        :
                        null
                        }
                        {(user.discord_user_id === this.props.data.discord_user_id || user.is_officer)
                        ?
                        <TableButton title='Delete' onClick={this.deleteRequest} />
                        :
                        null
                        }
                        </TableButtonWrapper>
                        {(this.state.reject_active)
                        ?
                        <Popout>
                            <h4>Reject Request</h4>
                            <Field type='text' placeholder='Rejection Reason' value={this.state.reject_reason} onChange={this.updateRejectReason} />
                            <div>
                                <SubmitButton onClick={this.rejectRequest}>Reject</SubmitButton>
                                <CancelButton onClick={this.closeRejectPopout}>Cancel</CancelButton>
                            </div>
                        </Popout>
                        :
                        null
                        }
                    </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Request