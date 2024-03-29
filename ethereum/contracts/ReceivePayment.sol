// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract RequestFactory {
    ReceivePayment[] public deployedRequests;

    function createRequest(uint val, address logisticsP) public {
        ReceivePayment newRequest = new ReceivePayment(val, msg.sender, logisticsP);
        deployedRequests.push(newRequest);
    }

    function getDeployedRequests() public view returns (ReceivePayment[] memory) {
        return deployedRequests;
    }

    function getLastDeployedRequest() public view returns (ReceivePayment) {
        return deployedRequests[deployedRequests.length - 1];
    }
}


contract ReceivePayment {
    uint public value;
    address payable public seller;
    address payable public buyer;
    address public forwarder;

    enum State { Created, Locked, Closed }
    // The state variable has a default value of the first member, `State.created`
    State public state;

    // Only the buyer can call this function.
    error OnlyBuyer();
    error OnlyForwarder();
    // Only the seller can call this function.
    error OnlySeller();
    // The function cannot be called at the current state.
    error InvalidState();


    modifier restrictedSeller() {
        if (msg.sender != seller)
            revert OnlySeller();
        _;
    }

    modifier restrictedForwarder() {
        if (msg.sender != forwarder)
            revert OnlyForwarder();
        _;
    }

    modifier restrictedBuyer() {
        if (msg.sender != buyer)
            revert OnlyBuyer();
        _;
    }

    modifier inState(State _state) {
        if (state != _state)
            revert InvalidState();
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemDelivered();


    constructor(uint val, address creator, address logisticsP) payable {
        seller = payable(creator);
        forwarder = logisticsP;
        value = val;
    }
    // Abort the purchase and reclaim the ether.
    // Can only be called by the seller before the contract is locked.
    function abort() public restrictedSeller inState(State.Created) {
        emit Aborted();
        state = State.Closed;
        // We use transfer here directly. It is
        // reentrancy-safe, because it is the
        // last call in this function and we
        // already changed the state.
        seller.transfer(address(this).balance);
    }

    // Buyer declines the payment request
    function decline() public restrictedBuyer inState(State.Created) {
        emit Aborted();
        state = State.Closed;
    }

    // Confirm the purchase as buyer.
    // Transaction has to include value ether.
    // The ether will be locked until releasePayment is called.
    function confirmPurchase() public inState(State.Created) payable {
        require(msg.value == value);
        emit PurchaseConfirmed();
        buyer = payable(msg.sender);
        state = State.Locked;
    }

    // Logistics partner confirms that goods have been delivered and signals money release
    function releasePayment() public restrictedForwarder {
        emit ItemDelivered();
        state = State.Closed;
        seller.transfer(value);
    }
}
