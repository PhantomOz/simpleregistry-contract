import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleRegistry", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySimplyRegistry() {
    
    const dname = "Favour";
    const dage = 18;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
    const simpleRegistry = await SimpleRegistry.deploy(dname, dage);

    return { simpleRegistry, dname, dage, owner, otherAccount };
  }

  describe("Deployment", function(){
    it("Should have name and age deployed", async function(){
        const {simpleRegistry, dname, dage} = await loadFixture(deploySimplyRegistry);
        const [name, age] = await simpleRegistry.getEntityDetails();
        expect(name).to.be.equal(dname);
        expect(age).to.be.equal(dage);
    })
  })
  describe("Updating Registry", function(){
    it("should update name", async function(){
        const {simpleRegistry, dname, dage} = await loadFixture(deploySimplyRegistry);
        await simpleRegistry.updateName("Glory");
        const [name,] = await simpleRegistry.getEntityDetails();
        expect(name).to.be.equal("Glory");
    });
    it("should update age", async function(){
        const {simpleRegistry, dname, dage} = await loadFixture(deploySimplyRegistry);
        await simpleRegistry.updateAge(25);
        const [, age] = await simpleRegistry.getEntityDetails();
        expect(age).to.be.equal(25);
    });
  })
});