import React from 'react'
import Moment from 'moment'
import styled from 'styled-components'
import UserContext from '../../context/user'
import { cancelRequest, deleteRequest, rejectRequest, completeRequest, addRequestComment } from '../../services/requests'
import TableButtonWrapper from '../tableButtonWrapper'
import TableButton from '../tableButton'
import Popout from '../popout'
import RequestComment from './requestComment'

const Container = styled.div`
    background: #202020;
    padding: 10px;
    border-radius: 4px;
    margin: 5px;

    &.completed, &.rejected, &.cancelled {
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
const Comments = styled.div`
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
const CommentsHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`
const AddCommentButton = styled.button`
    background: #009933;
    border: 2px solid #009933;
    color: #f2f2f2;
    padding: 2px;
    margin: 5px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
        background: transparent;
        color: #009933;
    }
`
const CommentMessageField = styled.textarea`
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
`
const ResponseContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1px;
    border-radius: 4px;
`
const ResponseTimestamp = styled.span`
    padding: 5px;
    color: #ccc;
`
const ResponseMessage = styled.p`
    padding: 5px;
`

class Request extends React.Component {
    state = {
        updating: false,
        reject_active: false,
        reject_reason: '',
        comment_active: false,
        comment_message: ''
    }

    openCommentPopout = () => {
        this.setState({ reject_active: false, comment_active: true })
    }

    closeCommentPopout = () => {
        this.setState({ comment_active: false, comment_message: '' })
    }

    updateCommentMessage = (ev) => {
        const message = ev.target.value
        this.setState({ comment_message: message })
    }

    addComment = () => {
        this.setState({ updating: true })
        if (this.state.comment_message.length === 0) {
            window.alert('Please enter a valid comment.')
            this.setState({ updating: false })
        } else {
            addRequestComment(this.props.data.id, this.state.comment_message)
            .then(() => {
                this.setState({ updating: false, comment_active: false, comment_message: '' })
                this.props.loadDataFunction()
            })
            .catch(err => {
                window.alert('Issue adding comment, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    openRejectPopout = () => {
        this.setState({ reject_active: true, comment_active: false })
    }

    closeRejectPopout = () => {
        this.setState({ reject_active: false })
    }

    updateRejectReason = (ev) => {
        const reject_reason = ev.target.value
        this.setState({ reject_reason })
    }

    handleCancelRequest = () => {
        this.setState({ updating: true })
        if (window.confirm('Are you sure you want to cancel this bank request?')) {
            cancelRequest(this.props.data.id)
            .then(() => {
                this.props.loadDataFunction()
                this.setState({ updating: false })
            })
            .catch(err => {
                window.alert('Issue cancelling bank request, please try re-logging.')
                this.setState({ updating: false })
            })
        }
    }

    handleDeleteRequest = () => {
        this.setState({ updating: true })
        if (window.confirm('Are you sure you want to delete this bank request?')) {
            deleteRequest(this.props.data.id)
            .then(() => {
                this.props.loadDataFunction()
                this.setState({ updating: false })
            })
            .catch(err => {
                window.alert('Issue deleting bank request, please try re-logging.')
                this.setState({ updating: false })
            })
        } else {
            this.setState({ updating: false })
        }
    }

    handleRejectRequest = () => {
        this.setState({ updating: true })
        rejectRequest(this.props.data.id, this.state.reject_reason)
        .then(() => {
            this.setState({ updating: false, reject_active: false })
            this.props.loadDataFunction()
        })
        .catch(err => {
            window.alert('Issue rejecting bank request, please try re-logging.')
            this.setState({ updating: false })
        })
    }

    handleCompleteRequest = () => {
        this.setState({ updating: true })
        completeRequest(this.props.data.id)
        .then(() => {
            this.props.loadDataFunction()
            this.setState({ updating: false })
        })
        .catch(err => {
            window.alert('Issue completing bank request, please try re-logging.')
            this.setState({ updating: false })
        })
    }

    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <Container className={(this.props.data.completed)?'completed':(this.props.data.rejected)?'rejected':(this.props.data.cancelled)?'cancelled':''}>
                        <Header>
                            <CreatedDate>{Moment(this.props.data.created).format('MM/DD/YYYY')}</CreatedDate>
                            <Username>{this.props.data.nickname}</Username>
                            <Timeframe><i>{this.props.data.timeframe}</i></Timeframe>
                        </Header>
                        <Message>
                            {this.props.data.message}
                        </Message>
                        <Comments>
                            <CommentsHeader>
                                <h4>Comments</h4>
                                {((user.discord_user_id === this.props.data.discord_user_id || user.is_officer) && !this.props.data.completed && !this.props.data.rejected && !this.props.data.cancelled)
                                ?
                                <AddCommentButton onClick={this.openCommentPopout}>Add Comment</AddCommentButton>
                                :
                                null
                                }
                            </CommentsHeader>
                            {(this.props.data.comments.map(comment => <RequestComment key={`request_comment_id_${comment.id}`} data={comment} /> ))}
                            {(this.props.data.completed)
                            ?
                            <ResponseContainer>
                                <ResponseTimestamp>{Moment(this.props.data.completed).format('MM/DD/YYYY')}</ResponseTimestamp>
                                <ResponseMessage>Completed</ResponseMessage>                   
                            </ResponseContainer>
                            :
                            (this.props.data.rejected)
                            ?
                            <ResponseContainer>
                                <ResponseTimestamp>{Moment(this.props.data.rejected).format('MM/DD/YYYY')}</ResponseTimestamp>
                                <ResponseMessage>Rejected - {this.props.data.rejected_reason}</ResponseMessage>                   
                            </ResponseContainer>
                            :
                            (this.props.data.cancelled)
                            ?
                            <ResponseContainer>
                                <ResponseTimestamp>{Moment(this.props.data.cancelled).format('MM/DD/YYYY')}</ResponseTimestamp>
                                <ResponseMessage>Cancelled</ResponseMessage>                   
                            </ResponseContainer>
                            :
                            null
                            }
                        </Comments>
                        <TableButtonWrapper>
                        {(user.is_officer && !this.props.data.completed && !this.props.data.rejected && !this.props.data.cancelled)
                        ?
                        <TableButton title='Complete' onClick={this.handleCompleteRequest} disabled={this.state.updating} />
                        :
                        null
                        }
                        {(user.is_officer && !this.props.data.completed && !this.props.data.rejected && !this.props.data.cancelled)
                        ?
                        <TableButton title='Reject' onClick={this.openRejectPopout} disabled={this.state.updating} />
                        :
                        null
                        }
                        {(user.discord_user_id === this.props.data.discord_user_id && !this.props.data.completed && !this.props.data.rejected && !this.props.data.cancelled)
                        ?
                        <TableButton title='Cancel' onClick={this.handleCancelRequest} disabled={this.state.updating} />
                        :
                        null
                        }
                        {(user.is_officer)
                        ?
                        <TableButton title='Delete' onClick={this.handleDeleteRequest} disabled={this.state.updating} />
                        :
                        null
                        }
                        </TableButtonWrapper>
                        {(this.state.reject_active)
                        ?
                        <Popout submitFunction={this.handleRejectRequest} cancelFunction={this.closeRejectPopout} disabled={this.state.updating}>
                            <h4>Reject Request</h4>
                            <Field type='text' placeholder='Rejection Reason' value={this.state.reject_reason} onChange={this.updateRejectReason} />
                        </Popout>
                        :
                        null
                        }
                        {(this.state.comment_active)
                        ?
                        <Popout submitFunction={this.addComment} cancelFunction={this.closeCommentPopout} disabled={this.state.updating}>
                            <h4>Add Comment</h4>
                            <CommentMessageField value={this.state.comment_message} onChange={this.updateCommentMessage} />
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