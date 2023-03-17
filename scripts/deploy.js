const hre =require("hardhat");
async function main(){
  const upload = await hre.ethers.getContractFactory("upload");
  const Upload = await upload.deploy();
  await Upload.deployed();
  console.log("deployed",Upload.address);
}
main().catch((error)=>{console.error(error);
process.exitCode=1;});