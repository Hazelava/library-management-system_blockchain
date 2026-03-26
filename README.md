**⛓ BlockLib — Blockchain Based Library Management System**
A decentralized Library Management System built on the Ethereum blockchain using Solidity smart contracts, Hardhat, and Web3/Ethers.js. Every book transaction (borrow/return) is recorded immutably on-chain — no central server, no database, no middleman.

📚 Built as an AAT (Assignment/Assessment Task) project for Blockchain Technology course.


🌟 Features

🔗 Blockchain-powered — all data stored on Ethereum smart contracts
🔐 MetaMask wallet login — no username/password needed
📖 Book catalog — browse all books with real-time availability
🏦 Borrow & Return — every transaction is a signed blockchain transaction
📜 Immutable history — complete borrow/return history recorded on-chain with timestamps
🔑 Admin panel — admin wallet can add new books to the library
🔍 Search & filter — search books by title, author, or genre
🌐 Fully decentralized frontend — no backend server required


🛠 Tech Stack
LayerTechnologySmart ContractSolidity ^0.8.19BlockchainEthereum (Hardhat local network)Development FrameworkHardhat 2.22.0FrontendHTML5, CSS3, Vanilla JavaScriptBlockchain InteractionEthers.js v6WalletMetaMaskLocal ServerNode.js / serve

📁 Project Structure
blockchain-library/
├── contracts/
│   └── LibraryContract.sol      # Main smart contract
├── scripts/
│   └── deploy.js                # Deployment script
├── frontend/
│   ├── index.html               # Home page
│   ├── login.html               # Wallet connect / login page
│   ├── dashboard.html           # Main library dashboard
│   ├── admin.html               # Admin panel (add books)
│   ├── app.js                   # Web3 / Ethers.js connector
│   └── style.css                # Styles
├── test/
│   └── (test files)
├── hardhat.config.js
└── package.json

