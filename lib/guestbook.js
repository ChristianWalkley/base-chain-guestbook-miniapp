export const guestbookAddress = '0xf41cf25dcc080f9af84cb4189215d0d9dc9232bf';

export const guestbookAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'Signed',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'entries',
    outputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'message',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getEntry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEntriesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'message',
        type: 'string'
      }
    ],
    name: 'sign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
