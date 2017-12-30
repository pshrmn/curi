import React from 'react';
import { Block } from '@curi/react';

function confirm(info, success, failure) {
  const resp = window.confirm('Are you sure you want to navigate? The form has not been submitted');
  if (resp) {
    success();
  } else {
    failure();
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.state = {
      email: '',
      message: '',
      dirty: false,
      submitted: false
    };
  }

  setEmail(event) {
    const value = event.target.value;
    this.setState({
      email: value,
      dirty: value !== '' || this.state.message !== ''
    });
  }

  setMessage(event) {
    const value = event.target.value;
    this.setState({
      message: value,
      dirty: value !== '' || this.state.email !== ''
    });
  }

  submitForm(event) {
    if (this.state.email === '' || this.state.message === '') {
      return;
    }
    this.setState({
      submitted: true
    });
  }

  render() {
    const { dirty, email, message, submitted } = this.state;
    if (submitted) {
      return <div>Thanks you for contacting us!</div>;
    }
    return (
      <form>
        <Block
          active={dirty}
          confirm={confirm}
        />
        <p>
          <label>
            Email{' '}
            <input
              type='text'
              value={email}
              onChange={this.setEmail}
            />
          </label>
        </p>
        <p>
          <label>
            Message{' '}
            <input
              type='text'
              value={message}
              onChange={this.setMessage}
            />
          </label>
        </p>
        <button type='button' onClick={this.submitForm}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
