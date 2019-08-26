import React from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
// import logo from '../img/logo.svg';
import md5 from 'md5';
import { navigate } from '@reach/router';
import Gravatar from 'react-gravatar';
import { getCurrentUser, setUser } from '../utils/auth';
import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: '',
      user: null
    };
  }

  componentDidMount = () => {
    const user = getCurrentUser();
    this.setState({ user });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const user = getCurrentUser();
    if (this.state.user.email !== user.email) {
      // console.log(this.state, user);
      this.setState({ user });
    }
  };

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active'
            })
          : this.setState({
              navBarActiveClass: ''
            });
      }
    );
  };

  randomFont = () => {
    const fonts = [
      'Audiowide',
      'Baloo Chettan',
      'Concert One',
      'Fredoka One',
      'Fugaz One',
      'Megrim',
      'Monoton',
      'Nova Round',
      'Racing Sans One',
      'Righteous',
      'Sniglet',
      'Squada One',
      'Unica One'
    ];
    const randFont = Math.floor(Math.random() * Math.floor(fonts.length));
    return fonts[randFont];
  };

  logout = () => {
    Auth.signOut();
    this.setState({ user: {} });
    setUser({});
    navigate('/');
  };

  render() {
    const { user } = this.state;
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item is-size-5" title="Nixbox Main">
              <span
                className="nixbox-title"
                style={{ fontFamily: this.randomFont() }}
              >
                nixbox
              </span>
              {/* <img src={logo} alt="Kaldi" style={{ width: '88px' }} /> */}
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/products">
                Products
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <div className="userMenu navbar-item">
                {user && user.email ? (
                  <>
                    <div className="flexMiddle">
                      <span className="icon">
                        <Gravatar className="circle" md5={md5(user.email)} />
                      </span>
                      <span className="nav-greet">Hi, {user.username}</span>
                    </div>
                    <div className="userDropdown">
                      <p>
                        <Link to="/user/profile">Profile</Link>
                      </p>
                      <p>
                        <span onClick={this.logout} className="spanLink">
                          Log out
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <Link to="/user/login">Sign In</Link>
                )}
              </div>
              <a
                className="navbar-item"
                href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
