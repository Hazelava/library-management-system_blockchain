// ⚠ PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE after running deploy
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ABI = [
  "function bookCount() view returns (uint)",
  "function getBook(uint) view returns (tuple(uint id, string title, string author, string genre, uint totalCopies, uint availableCopies, bool exists))",
  "function addBook(string,string,string,uint)",
  "function borrowBook(uint)",
  "function returnBook(uint)",
  "function getMyHistory() view returns (tuple(uint bookId, address borrower, uint borrowedAt, uint returnedAt, bool returned)[])",
  "function isAdmin(address) view returns (bool)",
  "event BookAdded(uint,string,string)",
  "event BookBorrowed(uint,address,uint)",
  "event BookReturned(uint,address,uint)"
];

let provider, signer, contract, userAddress, isAdminUser = false;

async function initWeb3() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    window.location.href = "login.html";
    return;
  }
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts.length === 0) {
    window.location.href = "login.html";
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  isAdminUser = await contract.isAdmin(userAddress);
  return { userAddress, isAdminUser };
}

async function getAllBooks() {
  const count = Number(await contract.bookCount());
  const books = [];
  for (let i = 1; i <= count; i++) {
    const b = await contract.getBook(i);
    books.push({
      id: Number(b.id), title: b.title, author: b.author,
      genre: b.genre, totalCopies: Number(b.totalCopies),
      availableCopies: Number(b.availableCopies), exists: b.exists
    });
  }
  return books;
}

async function borrowBook(bookId) {
  const tx = await contract.borrowBook(bookId);
  await tx.wait();
  return tx.hash;
}

async function returnBook(bookId) {
  const tx = await contract.returnBook(bookId);
  await tx.wait();
  return tx.hash;
}

async function addBook(title, author, genre, copies) {
  const tx = await contract.addBook(title, author, genre, copies);
  await tx.wait();
  return tx.hash;
}

async function getMyHistory() {
  const records = await contract.getMyHistory();
  return records.map(r => ({
    bookId: Number(r.bookId),
    borrowedAt: new Date(Number(r.borrowedAt) * 1000).toLocaleDateString(),
    returnedAt: r.returned ? new Date(Number(r.returnedAt) * 1000).toLocaleDateString() : "—",
    returned: r.returned
  }));
}

function shortAddr(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function shortHash(hash) {
  return hash.slice(0, 10) + "..." + hash.slice(-6);
}