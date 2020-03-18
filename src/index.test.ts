import {providers} from "ethers";
import {deployAndWait, connect} from "./index";
import {DocumentStoreCreatorFactory} from "../types/ethers-contracts/DocumentStoreCreatorFactory";
import {overwriteDocumentStoreCreatorAddress} from "./config";

const provider = new providers.JsonRpcProvider();
const signer = provider.getSigner();
let account: string;

beforeAll(async () => {
  // Deploy an instance of DocumentStoreFactory on the new blockchain
  const factory = new DocumentStoreCreatorFactory(signer);
  const receipt = await factory.deploy();
  const factoryAddress = receipt.address;
  overwriteDocumentStoreCreatorAddress(factoryAddress);
  account = await signer.getAddress();
});

describe("deployAndWait", () => {
  it("deploys a new DocumentStore contract", async () => {
    const instance = await deployAndWait("My Store", signer);
    const owner = await instance.functions.owner.call(undefined);
    expect(owner).toBe(account);
    const name = await instance.functions.name.call(undefined);
    expect(name).toBe("My Store");
  });
});

describe("connect", () => {
  it("connects to existing contract", async () => {
    const {address} = await deployAndWait("My Store", signer);
    const instance = await connect(address, signer);
    const owner = await instance.functions.owner.call(undefined);
    expect(owner).toBe(account);
    const name = await instance.functions.name.call(undefined);
    expect(name).toBe("My Store");
  });
});