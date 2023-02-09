import { connect, Contract, keyStores, KeyPair } from "near-api-js";

const NEAR_PRIVATE_KEY = process.env.NEAR_PRIVATE_KEY;
const NEAR_NETWORK = process.env.NEAR_NETWORK;
const NEAR_ACCOUNT_ID = process.env.NEAR_ACCOUNT_ID;
const NEAR_RPC_URL = process.env.NEAR_RPC_URL;

export async function NearContract() {
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(NEAR_PRIVATE_KEY);
  await keyStore.setKey(NEAR_NETWORK, NEAR_ACCOUNT_ID, keyPair);

  const connection = await connect({
    networkId: NEAR_NETWORK,
    keyStore: keyStore,
    masterAccount: NEAR_ACCOUNT_ID,
    nodeUrl: NEAR_RPC_URL,
  });
  const nearAccount = await connection.account(NEAR_ACCOUNT_ID);

  return new Contract(nearAccount, NEAR_ACCOUNT_ID, {
    changeMethods: ["permits_granted", "permits_rejected"],
    viewMethods: ["get_oracle_permits_to_verify"],
  });
}
