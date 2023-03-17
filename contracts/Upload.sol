//SPDX-License-Identifier:GPL-3.0
pragma solidity^0.8.0;
contract upload{
struct Access{
    address user;
    bool access;
}
mapping (address=> string[]) value;
mapping (address=> mapping(address=> bool)) ownership;
mapping(address=>Access[]) accesslist;
mapping(address=>mapping(address=> bool))previous;
 
 function add(address _user, string memory url)external{
     value[_user].push(url);
 }
 function allow(address _user)external{
ownership[msg.sender][_user]=true;
if(previous[msg.sender][_user]){
    for(uint i=0;i<accesslist[msg.sender].length;i++){
        if(accesslist[msg.sender][i].user== _user){
            accesslist[msg.sender][i].access=true;
        }
    }
}
    else{
       accesslist[msg.sender].push(Access(_user,true));
       previous[msg.sender][_user]=true;
    }
}
function disallow(address user)external{
    ownership[msg.sender][user]=false;
    for(uint i=0;i<accesslist[msg.sender].length;i++){
        if(accesslist[msg.sender][i].user==user){
            accesslist[msg.sender][i].access= false;
        }
    }
}
function display(address user)external view returns(string[] memory){
    require(user==msg.sender || ownership[user][msg.sender],"you dont have access");
    return value[user];
}
function shareAccess()public view returns(Access[] memory){
   return accesslist[msg.sender];

}


 }
