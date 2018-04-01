import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {Client} from "../../services/api";
import {passwordToAddress} from "../../utils/crypto";

class ApplyForDelegate extends Component {

  constructor() {
    super();

    this.state = {
      url: "",
      check: false,
      applyResponse: null,
      loading: false,
    };
  }

  isValid = () => {
    let {url, check} = this.state;
    return url.length > 0 && check;
  };

  doApply = async () => {
    let {account} = this.props;
    let {url} = this.state;

    this.setState({ loading: true, });

    let isValid = await Client.applyForDelegate(account.key, url);

    this.setState({
      applyResponse: isValid,
      loading: false,
    });
  };

  renderFooter() {
    let {applyResponse, loading} = this.state;

    if (applyResponse === true ){
      return (
        <div className="alert alert-success text-center">
          Thanks for your apply!
        </div>
      )
    }

    if (applyResponse === false) {
      return (
        <div className="alert alert-danger text-center">
          An unknown error occurred
        </div>
      );
    }

    return (
      <p className="text-center">
        <button
          disabled={!this.isValid() || loading}
          className="btn btn-success"
          onClick={this.doApply}>{tu("submit")}</button>
      </p>
    );
  }

  render() {


    return (
      <main className="container pt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center">
                {tu("apply_for_delegate")}
              </div>
              <div className="card-body">
                <p className="card-text">
                  TRX holders can apply to become a super delegate by using the account management function, and vote for candidates. Each account can update current voter information and also is allowed to vote for multiple candidates. The maximum number of votes is less than or equal to the number of TRX users hold each time. (If you have certain sum of TRX, you can vote less than or equal to certain number of votes). The result of votes will be calculated based on the final voter information of every account in each voting cycle of which the time is from 00:00 to 24:00. TRX holders with the most votes will become super delegate. Every transaction made in the network is required to be validated by all SuperDelegates, and some bonuses will be getted.TRX will not be consumed in the process of super delegate application and voting.
                </p>
                <hr/>
                <p className="mt-5 text-center">
                  <label>{tu("your_personal_website_address")}</label>
                  <input className="form-control text-center"
                         type="text"
                          placeholder="http://"
                         onChange={(ev) => this.setState({ url: ev.target.value })}/>
                </p>
                <div className="text-center">
                  <div className="form-check">
                    <input type="checkbox"
                           className="form-check-input" onChange={(ev) => this.setState({ check: ev.target.checked })} />
                    <label className="form-check-label">
                      I understand how to be a TRON representative
                    </label>
                  </div>
                </div>
                <div className="pt-3">
                  {this.renderFooter()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.app.account,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForDelegate)

