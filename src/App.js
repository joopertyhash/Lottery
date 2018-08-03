import React, { Component } from 'react'
import web3 from './web3'
import lottery from './lottery'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: '',
      currentVisitorAccount: ''
    }
  }

  _loadManager = async () => {
    const manager = await lottery.methods.manager().call()
    this.setState({ manager })
  }

  _loadPlayers = async () => {
    const players = await lottery.methods.getPlayers().call()
    this.setState({ players })
  }

  _loadBalanace = async () => {
    const balance = await web3.eth.getBalance(lottery.options.address)
    this.setState({ balance })
  }

  _loadCurrentVisitorAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    const currentVisitorAccount = accounts[0]
    this.setState({ currentVisitorAccount })
  }

  componentWillMount() {
    this._loadManager()
    this._loadCurrentVisitorAccount()
    this._loadPlayers()
    this._loadBalanace()
  }

  _enterToTheLottery = async event => {
   event.preventDefault()

   const accounts = await web3.eth.getAccounts()

   this.setState({ message: 'Waiting on transaction success...' })

   await lottery.methods.enter().send({
     from: accounts[0],
     value: web3.utils.toWei(this.state.value, 'ether')
   })

   this.setState({ message: 'You have been entered!' })
   this._loadPlayers()
 }

 _pickAWinner = async () => {
   const accounts = await web3.eth.getAccounts()

   this.setState({ message: 'Waiting on transaction success...' })

   await lottery.methods.pickWinner().send({
     from: accounts[0]
   })

   this.setState({ message: 'A winner has been picked!' })
 }

  render() {
    const { manager, currentVisitorAccount } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col m4 s12 l12 center-align">
            <h1>Lottery Pool</h1>
          </div>
        </div>

        <p className="flow-text center-align">
          This contract is managed by: <b>{this.state.manager}</b>
        </p>
        <p className="flow-text center-align">
          There are currently{' '} <b>{this.state.players.length}</b> people entered
        </p>
        <p className="flow-text center-align">
          Competing to win{' '}<b>{web3.utils.fromWei(this.state.balance, 'ether')} ether! </b>
        </p>

        <hr />

        <form className="center-align" onSubmit={this._enterToTheLottery}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              placeholder="ex: .011"
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button class="waves-effect waves-light btn">
            Enter
          </button>
        </form>

        {
          currentVisitorAccount === manager ?
          <div >
            <hr />
            <h4>Ready to pick a winner?</h4>
            <button className="waves-effect waves-light btn" onClick={this._pickAWinner}>
              Pick a winner!
            </button>
            <hr />
          </div>
          : null
        }

        <h1>{this.state.message}</h1>
      </div>
    )
  }
}

export default App
