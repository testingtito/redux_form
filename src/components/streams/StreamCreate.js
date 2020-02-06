import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(formValue) {
    console.log(formValue);
    // this.props.createStream(formValue);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}// formValue is going to contain all the different values that exist inside of our form
const validate = (formValue) => {
  const errors = {}
  if (!formValue.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValue.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
}

export default reduxForm({
  form: 'streamCreate',
  validate  // same as validate: validate
})(StreamCreate)
