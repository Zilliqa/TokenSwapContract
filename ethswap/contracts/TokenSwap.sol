//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./libs/token/ERC20/IERC20.sol";
import "./libs/utils/ReentrancyGuard.sol";
import "./libs/utils/Utils.sol";
import "./libs/math/SafeMath.sol";

contract TokenSwap is ReentrancyGuard {
    using SafeMath for uint256;

    /// legacy zil address
    address private _address0;
    /// wrapped zil address
    address private _address1;

    event SwapEvent(
        address indexed sender,
        uint256 amount
    );

    constructor (address address0, address address1) public {
        _address0 = address0;
        _address1 = address1;
    }

    /// @dev transfers funds from an address into this contract
    /// only support token transfer
    function _transferIn(
        address _tokenAddress,
        uint256 _callAmount
    )
        private
    {
        IERC20 token = IERC20(_tokenAddress);
         _callOptionalReturn(
            token,
            abi.encodeWithSelector(
                token.transferFrom.selector,
                msg.sender,
                address(this),
                _callAmount
            )
        );
    }

    function _transferOut(
        address _toAddress,
        address _tokenAddress,
        uint256 _amount
    )
        private
    {
         IERC20 token = IERC20(_tokenAddress);
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(
                token.transfer.selector,
                _toAddress,
                _amount
            )
        );
    }


     /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves.

        // A Solidity high level call has three parts:
        //  1. The target address is checked to verify it contains contract code
        //  2. The call itself is made, and success asserted
        //  3. The return value is decoded, which in turn checks the size of the returned data.
        // solhint-disable-next-line max-line-length
        require(Utils.isContract(address(token)), "SafeERC20: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");

        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }

    function swap(
        uint256 _callAmount
    )
        external
        nonReentrant
        returns (bool)
    {
        _transferIn(_address0, _callAmount);
        _transferOut(_address1, msg.sender, _callAmount);
        emit SwapEvent(msg.sender, _callAmount);
        return true;
    }
}