pragma solidity >=0.4.25 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpacePolyToken is ERC20, Ownable {
    address public inventory;

    constructor(address inventory_) ERC20("SpacePolyToken", "SPT") {
        inventory = inventory_;
        _mint(msg.sender, 20000);
    }

    function updateInventory(address inventory_) public onlyOwner {
        inventory = inventory_;
    }

    function decimals() public view virtual override returns (uint8) {
        return 1;
    }

    function mint(address to_, uint256 amount) public onlyOwner {
        require(to_ != address(0), "to address is invalid");
        require(amount > 0, "amount is invalid");
        _mint(to_, amount);
    }

    function burn(address from_, uint256 amount) public onlyOwner {
        require(balanceOf(from_) >= amount, "not enough balance");
        require(from_ != address(0), "from address is invalid");
        require(amount > 0, "amount is invalid");
        _burn(from_, amount);
    }
}
