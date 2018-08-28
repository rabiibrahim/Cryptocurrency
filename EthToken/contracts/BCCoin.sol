
pragma solidity ^0.4.21;

import "./Interface.sol";            // change this line


contract BCCoin is Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    // declare balances variable here
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
   
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    uint8 public tokenValue;              //token value in ethers
    address public Owner;                 //address account who deplyed the contract       

    constructor (
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        uint8 _tokenValue
    ) public {
        // your code here
        Owner = msg.sender;
        balances[Owner]=_initialAmount;
        name=_tokenName;
        symbol=_tokenSymbol;
        tokenValue= _tokenValue;
       
    }


    function transfer(address _to, uint256 _value) public {
       // your code here
        balances[_to]+=_value;
        balances[msg.sender]-=_value;
    }

    function transferFrom(address _from, address _to, uint256 _value) public  {
        uint256 allowance = allowed[_from][msg.sender];
        // your code here
         
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
            balances[_to] += _value;
            balances[_from] -= _value;
        }
     
    }    
   
    function approve(address _spender, uint256 _value) public  {
       // your code here 
        allowed[msg.sender][_spender] += _value;
    }

    function getBalance()  public view returns (uint){
        return msg.sender.balance;
    }   


    function getTokens() public payable {
        uint tokens=msg.value/tokenValue;
        balances[Owner] -= tokens;
        balances[msg.sender] += tokens;
    }


    function getEthers(uint tokVal) public payable{
        uint ethVal = tokVal*tokenValue;
        balances[Owner] += tokVal;
        balances[msg.sender] -= tokVal;
        msg.sender.transfer(ethVal);
    }
}
