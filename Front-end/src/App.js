import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import web3 from './web3';
import token from './token';
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      owner: '',
      balance: '',
      value: '',
      message: '',
      address: '',
      addressFrom: ''
    }

  }


  async componentDidMount() {
    const owner = await web3.eth.getAccounts();        // change this line with your current address;
    this.setState({ owner });

  }

  getTokens = async event => {
    event.preventDefault();
    const val = this.state.value;
    console.log(val);
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.getTokens().send({
      value: val,
      from: accounts[0],
      gas: '1000000',
      //gasPrtice: '15000000000', 
    }); // your code here;
    this.setState({ message: 'You got your tokens!' });

  };
  tokenBalance = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    console.log(this.state.address);
    console.log(accounts[0]);
    let result = await token.methods.balances(this.state.address).call({
      gas: '1000000',
    }); // your code here; 
    console.log(result)
    this.setState({ message: result });
  };
  transfer = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });

    await token.methods.transfer(this.state.address, this.state.value).send({
      from: accounts[0],
      gas: '1000000',
    })// your code here;

      this.setState({ message: "transaction has been entered" });
  };
  transferFrom = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.transferFrom(this.state.addressFrom, this.state.address, this.state.value).send({
      from: this.state.addressFrom,
      to: this.state.address,
      gas: '1000000',
    })
      this.setState({ message: "transaction has been entered" });
  };
  approve = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.approve(this.state.address, this.state.value).send({
      from: accounts[0],
      gas: '1000000',
    })
      this.setState({ message: "transaction has been entered" });
  };
  getEthers = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();  // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.getEthers(this.state.value).send({
      gas: '1000000',
    })// your code here;
      this.setState({ message: 'You sold your tokens!' });
  };

  render() {
    return (
      <div>
        <h2>My Currency</h2>
        <p>
          This token is owned by {this.state.owner}.
        </p>
        <hr />
        <form onSubmit={this.getTokens}>
          <h4>Buy Tokens</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>getTokens</button>
        </form>
        <hr />
        <form onSubmit={this.tokenBalance}>
          <h4>View your balance of Tokens</h4>
          <div>
            <label>Enter the address</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>
          <button>Get balance!</button>
        </form>

        <hr />
        <form onSubmit={this.transfer}>
          <h4>Transfer token to an address</h4>
          <div>
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
        <form onSubmit={this.transferFrom}>
          <h4>Transfer token to an address to another</h4>
          <div>
            <label>Enter the address to transfer from</label>
            <input
              addressFrom={this.state.addressFrom}
              onChange={event => this.setState({ addressFrom: event.target.value })}
            />
            <br /><br />
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
        <form onSubmit={this.approve}>
          <h4>give permission to an account to spend some ether</h4>
          <div>
            <label>Enter the address of the spender</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the allowance value</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Set allowance!</button>
        </form>
        <hr />
        <form getEthers={this.getEthers}>
          <h4>Sell Tokens</h4>
          <div>
            <label>Amount of tokens to sell</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>sell Tokens</button>
        </form>
        <hr />
        <h1> Transaction status : {this.state.message}</h1>
        <hr />

      </div>
    );
  }
}
export default App