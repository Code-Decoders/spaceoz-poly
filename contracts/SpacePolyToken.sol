pragma solidity >=0.4.25 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpacePolyToken is ERC20, Ownable {
    address public inventory;

    constructor() ERC20("SpacePolyToken", "SPT") {
        _mint(msg.sender, 20000);
        _mint(address(0xA3B38051Bf77067fcCb02D83eCEF9CcE27c81A31), 20000);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function mint(address to_, uint256 amount) public onlyOwner {
        require(to_ != address(0), "to address is invalid");
        require(amount > 0, "amount is invalid");
        _mint(to_, amount);
    }

    function burnFrom(address account, uint256 amount) public virtual {
        _spendAllowance(account, address(this), amount);
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }
}
