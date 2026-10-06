const contractAddress = "0xAF7a3F7AE891cf3E898C3D27626303Cd8DAAd91D";

const abi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_authorities",
                "type": "address[3]",
                "internalType": "address[3]"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "REQUIRED_APPROVALS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "addCandidate",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "approveElection",
        "inputs": [
            {
                "name": "_proposalId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "approveVoter",
        "inputs": [
            {
                "name": "_voter",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "authorities",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "candidateCount",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "candidates",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "voteCount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "commitVote",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_voteHash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "electionCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "elections",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "revealEndTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "exists",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "candidatesLocked",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "finalizeElection",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCandidate",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_candidateId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasApproved",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasCommitted",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasRevealed",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isFinalized",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isVerified",
        "inputs": [
            {
                "name": "_voter",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "lockCandidates",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proposalApproved",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proposalCount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proposals",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "approvals",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "executed",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proposeElection",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_endTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_revealEndTime",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revealVote",
        "inputs": [
            {
                "name": "_electionId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_candidateId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_secret",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalCommitted",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalRevealed",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verificationApprovals",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "voteCommit",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "winner",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ElectionCreated",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ElectionFinalized",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "winnerCandidateId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ElectionProposed",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoteCommitted",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "voter",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoteRevealed",
        "inputs": [
            {
                "name": "electionId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "candidateId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "voter",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoterApproved",
        "inputs": [
            {
                "name": "voter",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "authority",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoterMinted",
        "inputs": [
            {
                "name": "voter",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ERC721IncorrectOwner",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InsufficientApproval",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidApprover",
        "inputs": [
            {
                "name": "approver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOperator",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidReceiver",
        "inputs": [
            {
                "name": "receiver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidSender",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC721NonexistentToken",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
];
let provider;
let signer;
window.contract = null;

async function connectWallet() {
    if (!window.ethereum) {
        alert("Install MetaMask");
        return;
    }

    // connect wallet
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    window.contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );

    console.log("Contract initialized:", window.contract);
}

// 2️⃣ commit vote
async function commitVote(electionId, candidateId) {
    try {
        const secret = Math.random().toString();

        const voteHash = ethers.keccak256(
            ethers.solidityPacked(
                ["uint256", "string"],
                [candidateId, secret]
            )
        );

        const tx = await window.contract.commitVote(electionId, voteHash, {
            maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
            maxFeePerGas: ethers.parseUnits("40", "gwei"),
            gasLimit: 300000 // Forces Ethers to skip the dry-run gas math and just send it!
        });
        await tx.wait();

        alert("Vote committed!\nTx: " + tx.hash);

        localStorage.setItem("vote_secret", secret);

        return tx.hash;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

async function getActiveElectionId() {
    try {
        const count = await window.contract.electionCount();
        const totalElections = Number(count);
        const now = Math.floor(Date.now() / 1000);

        console.log("🚨 --- CHECKING ACTIVE ELECTIONS ---");
        console.log(`🕰️ Current System Time (now): ${now}`);
        console.log(`📊 Total Elections on Blockchain: ${totalElections}`);

        for (let i = 0; i < totalElections; i++) {
            const election = await window.contract.elections(i);

            // Safely parse Ethers.js v6 BigInts and Structs
            const startTime = Number(election.startTime || election[2]);
            const endTime = Number(election.endTime || election[3]);
            const exists = election.exists !== undefined ? election.exists : election[5];

            console.log(`\n📦 Checking Election ID ${i}:`);
            console.log(`   - Exists: ${exists}`);
            console.log(`   - Start Time: ${startTime}`);
            console.log(`   - End Time:   ${endTime}`);

            // The exact reason it is failing:
            if (!exists) {
                console.log(`   ❌ Failed: Election does not exist.`);
            } else if (now < startTime) {
                console.log(`   ❌ Failed: Election hasn't started yet. (Wait ${startTime - now} more seconds)`);
            } else if (now > endTime) {
                console.log(`   ❌ Failed: Election has already ended! (Missed by ${now - endTime} seconds)`);
            } else {
                console.log(`   ✅ SUCCESS: Election ${i} is ACTIVE!`);
                return i;
            }
        }

        console.log("\n❌ NO ACTIVE ELECTIONS FOUND.");
        return null;
    } catch (err) {
        console.error("Error finding active election:", err);
        return null;
    }
}

//create election function
async function createElection(name, durationMinutes) {
    try {
        const now = Math.floor(Date.now() / 1000);

        const start = now + 10; // start after 10 sec
        const end = start + (durationMinutes * 60);
        const revealEnd = end + 600;

        console.log("Please confirm the transaction in MetaMask...");

        const tx = await window.contract.proposeElection(
            name,
            start,
            end,
            revealEnd,
            {
                maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
                maxFeePerGas: ethers.parseUnits("40", "gwei")
            }
        );

        console.log("Transaction sent! Waiting for blockchain confirmation...");

        // THIS is the magic line that fixes the bug!
        await tx.wait();

        // This will ONLY run if the blockchain actually accepted it.
        alert("Election proposed successfully!");

    } catch (error) {
        // If you run out of gas or reject it in MetaMask, it safely lands here.
        console.error("Transaction Error:", error);
        alert("Transaction failed! Check the console or your gas settings in MetaMask.");
    }
}

//approve function
async function approveElection(proposalId) {
    const tx = await window.contract.approveElection(
        proposalId,
        { // <-- ADD THIS OBJECT AS THE LAST PARAMETER
            maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
            maxFeePerGas: ethers.parseUnits("40", "gwei")
        }
    );
    await tx.wait();

    alert("Election approved!");
}

/* Proposal data for UI
async function getAllProposals() {
    if (!window.contract) await connectWallet();

    const proposals = [];

    try {
        // 1. Get the exact count so the network doesn't block us for spamming!
        const count = await window.contract.proposalCount();
        const totalProposals = Number(count);

        // 2. Loop EXACTLY that many times
        for (let i = 0; i < totalProposals; i++) {
            const p = await window.contract.proposals(i);

            // 3. Hide this proposal if you already clicked "Approve"
            if (p.executed === true || p[5] === true) continue;

            // 4. Safely add to the list
            proposals.push({
                id: i,
                name: p.name || p[0],
                startTime: Number(p.startTime || p[1]),
                endTime: Number(p.endTime || p[2]),
                revealEndTime: Number(p[3]) // Grabs the unnamed variable safely
            });
        }

    } catch (err) {
        console.error("Error fetching proposals:", err);
    }

    return proposals;
}
    */

// DIAGNOSTIC VERSION
async function getAllProposals() {
    if (!window.contract) await connectWallet();
    const proposals = [];

    console.log("🚀 --- FETCHING PROPOSALS TRIGGERED ---");

    try {
        const count = await window.contract.proposalCount();
        const totalProposals = Number(count) + 1; // Adding 1 to include the last proposal (since it's 0-indexed)
        console.log("📊 Total proposals saved on blockchain:", totalProposals);

        for (let i = 0; i < totalProposals; i++) {
            console.log(`⏳ Fetching proposal ID ${i}...`);
            const p = await window.contract.proposals(i);

            // Print the raw data straight from the blockchain so we can see it!
            console.log(`📦 Raw data for ID ${i}:`, p);

            // 🛑 THE FIX: Skip if it's approved, OR if the start time is 0 (The 1970 Ghost!)
            if (p.executed === true || p[5] === true || Number(p.startTime || p[1]) === 0) {
                console.log(`🛑 Proposal ${i} is skipped (approved or blank).`);
                continue;
            }

            console.log(`✅ Proposal ${i} is pending. Adding to UI!`);
            proposals.push({
                id: i,
                name: p.name || p[0],
                startTime: Number(p.startTime || p[1]),
                endTime: Number(p.endTime || p[2]),
                revealEndTime: Number(p[3])
            });
        }
    } catch (err) {
        console.error("❌ ERROR FETCHING PROPOSALS:", err);
    }

    console.log("📋 Final list being sent to the screen:", proposals);
    return proposals;
}