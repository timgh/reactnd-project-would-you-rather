import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddPoll extends Component {

  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleOptionOneChange = (event) => {
    this.setState({ optionOneText: event.target.value })
  }
  handleOptionTwoChange = (event) => {
    this.setState({ optionTwoText: event.target.value })
  }

  isValid = () => {
    const { optionOneText, optionTwoText } = this.state
    return optionOneText !== '' && optionTwoText !== ''
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/')
    this.props.dispatch(handleAddQuestion(this.state))
  }
  
  render() {
    const { optionOneText, optionTwoText } = this.state

    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3>Would you rather ....</h3>

        <textarea
          value={optionOneText}
          placeholder='Enter option one'
          onChange={this.handleOptionOneChange}
          name='optionOne'
          className='textarea'
          type='text'
        />
        <p>or</p>
        <textarea
          value={optionTwoText}
          placeholder='Enter option two'
          onChange={this.handleOptionTwoChange}
          name='optionTwo'
          className='textarea'
          type='text'
        />   
        <p></p>

        <button className='btn' type='submit' disabled={!this.isValid()}>
          SUBMIT
        </button>
      </form>
    )
  }
}

export default connect()(AddPoll)