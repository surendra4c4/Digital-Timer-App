// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {start: false, count: 25, counter: 0}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  onReset = () => {
    this.clearTimeInterval()
    this.setState({start: false, count: 25, counter: 0})
  }

  runTimer = () => {
    const {count, counter} = this.state
    const isTimeCompleted = count * 60 === counter

    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({start: false})
    } else {
      this.setState(prevState => ({
        counter: prevState.counter + 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {count, counter} = this.state
    const remainingTime = count * 60 - counter
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  changeStart = () => {
    const {start, count, counter} = this.state
    const istimeCompleted = count * 60 === counter

    if (istimeCompleted) {
      this.setState({counter: 0})
    }
    if (start) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.runTimer, 1000)
    }
    this.setState(prevState => ({start: !prevState.start}))
  }

  clickMinus = () => {
    const {count} = this.state

    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  clickPlus = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {start, count, counter} = this.state
    const isButtonsDisabled = counter > 0

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="content-container">
          <div className="bg-timer-container">
            <div className="timer-container">
              <h1 className="timer-count">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="status">{start ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="start-and-reset-container">
              <div className="start-pause-container">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={this.changeStart}
                >
                  {start ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="images"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="images"
                    />
                  )}
                  <p className="icon-text">{start ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="start-pause-container">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="images"
                  />
                  <p className="icon-text">Reset</p>
                </button>
              </div>
            </div>
            <div className="set-timer-container">
              <p className="timer-heading">Set Timer Limit</p>
              <div className="buttons-and-counter-container">
                <button
                  type="button"
                  className="plus-and-minus-btn"
                  disabled={isButtonsDisabled}
                  onClick={this.clickMinus}
                >
                  -
                </button>
                <div className="counter-container">
                  <p className="counter">{count}</p>
                </div>
                <button
                  type="button"
                  className="plus-and-minus-btn"
                  disabled={isButtonsDisabled}
                  onClick={this.clickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
