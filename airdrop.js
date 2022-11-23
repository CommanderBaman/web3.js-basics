const solanaWeb3 = require("@solana/web3.js");

// as our process is async, defining an async function to use await
const main = async () => {
  // get connection to devnet
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
  )
  // generate keypairs for communication with the network
  const { publicKey, secretKey } = solanaWeb3.Keypair.generate()
  // console.log({publicKey, type: typeof publicKey})

  // access wallet
  // let tokenAmount = await connection.getTokenAccountBalance(publicKey) // gives something else
  let tokenAmount = await connection.getBalance(publicKey)
  // check status of wallet - amount of tokens
  console.log({
    amount: tokenAmount, // gives out number of lamports -> 
  })
  
  // create a signature to ask for tokens
  const airdropSignature = await connection.requestAirdrop(
      publicKey,
      // lamports 
      solanaWeb3.LAMPORTS_PER_SOL
  )
  // make transaction
  await connection.confirmTransaction(airdropSignature)
  
  // update tokenAmount
  tokenAmount = await connection.getBalance(publicKey)
  console.log({ amount: tokenAmount })
};

main();
