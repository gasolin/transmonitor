const initialState = {
  blockNumber: "",
  from: "",
  to: "",
  value: "0", // BigNumber
  gasPrice: "0",  // BigNumber
};

export function transactionReducer(state = initialState, action) {
  return state;
}

export default transactionReducer;
