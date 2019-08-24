import React from "react";
// import { navigate } from "gatsby-link";
import md5 from "md5";
import Gravatar from "react-gravatar";
import Layout from "../../components/Layout";

// function encode(data) {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// }

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const form = e.target;
    fetch("/.netlify/functions/hello")
      .then(response => response.json())
      .then(json => this.setState({ message: json.msg }));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
              <Gravatar md5={md5("jolyon@nixbox.com")} />
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={"message"}>
                    Message
                  </label>
                  <div className="control">{this.state.message}</div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Get Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
