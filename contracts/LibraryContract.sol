// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Library {
    address public admin;

    struct Book {
        uint id;
        string title;
        string author;
        string genre;
        uint totalCopies;
        uint availableCopies;
        bool exists;
    }

    struct BorrowRecord {
        uint bookId;
        address borrower;
        uint borrowedAt;
        uint returnedAt;
        bool returned;
    }

    uint public bookCount = 0;
    mapping(uint => Book) public books;
    mapping(address => BorrowRecord[]) public borrowHistory;
    mapping(address => mapping(uint => bool)) public hasBorrowed;

    event BookAdded(uint id, string title, string author);
    event BookBorrowed(uint bookId, address borrower, uint timestamp);
    event BookReturned(uint bookId, address borrower, uint timestamp);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addBook(
        string memory _title,
        string memory _author,
        string memory _genre,
        uint _copies
    ) public onlyAdmin {
        bookCount++;
        books[bookCount] = Book(bookCount, _title, _author, _genre, _copies, _copies, true);
        emit BookAdded(bookCount, _title, _author);
    }

    function borrowBook(uint _bookId) public {
        require(books[_bookId].exists, "Book does not exist");
        require(books[_bookId].availableCopies > 0, "No copies available");
        require(!hasBorrowed[msg.sender][_bookId], "Already borrowed this book");

        books[_bookId].availableCopies--;
        hasBorrowed[msg.sender][_bookId] = true;

        borrowHistory[msg.sender].push(
            BorrowRecord(_bookId, msg.sender, block.timestamp, 0, false)
        );
        emit BookBorrowed(_bookId, msg.sender, block.timestamp);
    }

    function returnBook(uint _bookId) public {
        require(hasBorrowed[msg.sender][_bookId], "You haven't borrowed this book");

        books[_bookId].availableCopies++;
        hasBorrowed[msg.sender][_bookId] = false;

        BorrowRecord[] storage records = borrowHistory[msg.sender];
        for (uint i = records.length; i > 0; i--) {
            if (records[i-1].bookId == _bookId && !records[i-1].returned) {
                records[i-1].returned = true;
                records[i-1].returnedAt = block.timestamp;
                break;
            }
        }
        emit BookReturned(_bookId, msg.sender, block.timestamp);
    }

    function getBook(uint _bookId) public view returns (Book memory) {
        return books[_bookId];
    }

    function getMyHistory() public view returns (BorrowRecord[] memory) {
        return borrowHistory[msg.sender];
    }

    function isAdmin(address _addr) public view returns (bool) {
        return _addr == admin;
    }
}