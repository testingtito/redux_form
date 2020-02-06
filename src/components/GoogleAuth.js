import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '44218978895-t9mqjqafn12v81dofuipp66fkeo29u8d.apps.googleusercontent.com',
        scope: 'email'

      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) { // if true
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else { // if false
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
  // isSignedIn value will be true, false, or null
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth)

/*
// This callback function is only going to be called after this ‘client:auth2’
// library has been successfully loaded up into the gapi.
// we need to get a callback of when that process is complete.
// after successfully load up the client library, we're going to initialize our
// app with clientId


// any time that our component is rendered onto the screen, we're going to try to
// load up that client portion of the library.

// scope is essentially talking about what different part of the user's profile
// or user's account that we want to get access to.
// in our case, wer're just going to say that we want to get access to the user's
// email member.
*/