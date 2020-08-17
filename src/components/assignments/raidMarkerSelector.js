import React from 'react'
import styled from 'styled-components'
import SkullImg from '../../images/IconSmall_RaidSkull.png'
import CrossImg from '../../images/IconSmall_RaidCross.png'
import CircleImg from '../../images/IconSmall_RaidCircle.png'
import StarImg from '../../images/IconSmall_RaidStar.png'
import SquareImg from '../../images/IconSmall_RaidSquare.png'
import TriangleImg from '../../images/IconSmall_RaidTriangle.png'
import DiamondImg from '../../images/IconSmall_RaidDiamond.png'
import MoonImg from '../../images/IconSmall_RaidMoon.png'

const Container = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    background: #fff;
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    border-radius: 2px;

    &.icon-1 {
        background-image: url(${SkullImg});
    }
    &.icon-2 {
        background-image: url(${CrossImg});
    }
    &.icon-3 {
        background-image: url(${CircleImg});
    }
    &.icon-4 {
        background-image: url(${StarImg});
    }
    &.icon-5 {
        background-image: url(${SquareImg});
    }
    &.icon-6 {
        background-image: url(${TriangleImg});
    }
    &.icon-7 {
        background-image: url(${DiamondImg});
    }
    &.icon-8 {
        background-image: url(${MoonImg});
    }
`
const List = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 20px 20px 20px 20px;
    grid-gap: 5px;
    top: 0;
    left: 0;
    padding: 5px;
    background: #fff;
    border-radius: 2px;
    z-index: 2;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.25);
`
const Icon = styled.button`
    width: 20px;
    height: 20px;
    background: none;
    background-size: 100%;
    background-position: center;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`
const BlankIcon = styled.button`
    grid-column-start: span 4;
    height: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`

class RaidMarkerSelecter extends React.Component {
    state = {
        active: false
    }

    open = () => {
        if (!this.state.active) {
            this.setState({ active: true })
        }
    }

    close = () => {
        this.setState({ active: false })
    }

    handleClick = (ev) => {
        const raid_target_marker = ev.target.value
        this.close()
        this.props.onClickFunction(raid_target_marker)
    }

    render() {
        return(
            <Container onClick={this.open} className={`icon-${this.props.value}`}>
                {(this.state.active)
                ?
                <List>
                    <Icon value={1} style={{ backgroundImage: `url(${SkullImg}` }} onClick={this.handleClick} />
                    <Icon value={2} style={{ backgroundImage: `url(${CrossImg}` }} onClick={this.handleClick} />
                    <Icon value={3} style={{ backgroundImage: `url(${CircleImg}` }} onClick={this.handleClick} />
                    <Icon value={4} style={{ backgroundImage: `url(${StarImg}` }} onClick={this.handleClick} />
                    <Icon value={5} style={{ backgroundImage: `url(${SquareImg}` }} onClick={this.handleClick} />
                    <Icon value={6} style={{ backgroundImage: `url(${TriangleImg}` }} onClick={this.handleClick} />
                    <Icon value={7} style={{ backgroundImage: `url(${DiamondImg}` }} onClick={this.handleClick} />
                    <Icon value={8} style={{ backgroundImage: `url(${MoonImg}` }} onClick={this.handleClick} />
                    <BlankIcon value='' onClick={this.handleClick}>None</BlankIcon>
                </List>
                :
                null
                }
            </Container>
        )
    }
}

export default RaidMarkerSelecter
