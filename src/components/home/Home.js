import React, { Component } from "react";
import "./Home.css";
import { createShortUrl } from "../../APIHelper";
import constants from "../../config/constants";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      showShortenUrl: false,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,
      exUrl:
        "https://www.amazon.com/Apple-iPhone-GSM-Unlocked-5-8/dp/B075QMZH2L",
      exShortUrl: constants.baseUrl
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: constants.baseUrl
      };
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: json.data.shortUrl
            });
          }, 0);
        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error"
          });
        });
    } else {
      this.setState({ showError: true });
    }
  }
  renderButton() {
    if (!this.state.showLoading) {
      return (
      <button
          className="btn btn-secondary btn-sm"
          name="action"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return (
        <div className="loader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="landing">
      <form>
        <div className="heading">
          <h5> Original Url</h5>
        </div>
        <div>
          Example: {" "}
          <a target="_blank" href={this.state.exUrl}>
            {this.state.exUrl}
          </a>
        </div>
        <input
          name="originalUrl"
          className="form-control"
          field="originalUrl"
          placeholder="Paste your link.."
          value={this.state.originalUrl}
          onChange={this.handleUserInput.bind(this)}
        />

        {this.state.showError && (
          <div className="formError">Original Url is required</div>
        )}

        <div>
          <h5>*Base Url</h5>
        </div>

        <input
          field="baseUrl"
          name="baseUrl"
          className="form-control"
          placeholder={this.state.exShortUrl}
          value={this.state.baseUrl}
          onChange={this.handleUserInput.bind(this)}
          disabled
        />
        {this.renderButton()}
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        {this.state.showShortenUrl && (
          <div className="shorten-title">
            Shortened Url is ->{` `}
            <a target="_blank" href={this.state.shortenUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}
        <div className="shorten-imp">
          [* Here base url has the default value{" "}
          <a target="_blank" href={this.state.exShortUrl}>
            {this.state.exShortUrl}
          </a>{" "}
          .This will change based on domain name]
        </div>
        </form>
      </div>
    );
  }
}

export default Home;