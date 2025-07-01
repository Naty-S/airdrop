import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json"
import mint_wallet from "./mint-wallet.json"


const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");
const SYSTEM_PROGRAM_ID = SystemProgram.programId;
const turbin3_wallet_KP = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(turbin3_wallet_KP), {
  commitment: "confirmed"
});
const turbin3_program: Program<Turbin3Prereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const account_seeds = [
  Buffer.from("prereqs"),
  turbin3_wallet_KP.publicKey.toBuffer(),
];
const [pda, _account_bump] = PublicKey.findProgramAddressSync(account_seeds, turbin3_program.programId)

// console.log(pda)

const mintCollection = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");
const mintauth = new PublicKey("5xstXUdRJKxRrqbJuo5SAfKf68y7afoYwTeH1FXbsA3k");
const mintTs = Keypair.fromSecretKey(new Uint8Array(mint_wallet));


// Execute the initialize transaction
// (async () => {
//   try {
//     const txhash = await turbin3_program.methods
//       .initialize("Naty-S")
//       .accountsPartial({
//         user: turbin3_wallet_KP.publicKey, // public key used for the Turbin3 application
//         account: pda, // account created by our program with a custom PDA seed
//         system_program: SYSTEM_PROGRAM_ID,
//       })
//       .signers([turbin3_wallet_KP])
//       .rpc();
//     console.log(`Success! Check out your TX here:\nhttps://explorer.solana.com/tx/${txhash}?cluster=devnet`);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

const auth_seeds = [
  Buffer.from("collection"),
  mintCollection.toBuffer(),
];
const [auth_pda, _auth_bump] = PublicKey.findProgramAddressSync(auth_seeds, turbin3_program.programId)
// console.log(mintCollection);
// console.log(mintauth);
console.log(auth_pda);

// Execute the submitTs transaction
// (async () => {
//   try {
//     const txhash = await turbin3_program.methods
//       .submitTs()
//       .accountsPartial({
//         user: turbin3_wallet_KP.publicKey,
//         account: pda,
//         mint: mintTs.publicKey, // the address of the new asset (that will be created by our program)
//         collection: mintCollection, // the collection to which the asset belongs
//         authority: mintauth, // the authority signing for the creation of the NFT (also a PDA)
//         mpl_core_program: MPL_CORE_PROGRAM_ID, // the Metaplex Core program
//         system_program: SYSTEM_PROGRAM_ID,
//       })
//       .signers([turbin3_wallet_KP, mintTs])
//       .rpc();
//     console.log(`Success! Check out your TX here:\nhttps://explorer.solana.com/tx/${txhash}?cluster=devnet`);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();
