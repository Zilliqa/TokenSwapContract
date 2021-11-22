//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./libs/token/ERC20/IERC20.sol";

contract TokenSwap {
    function _transferIn(
        address _tokenAddress,
        uint256 _amount
    )
        private
    {
        IERC20 token = IERC20(_tokenAddress);
    }
}