var db = require('../config/connection')
const bcrypt = require('bcrypt')
var ObjectId=require('mongodb').ObjectId

module.exports={
    doSignUp:(userData)=>{
        return new Promise(async (resolve, reject) => { 
            userData.Password = await bcrypt.hash(userData.Password,10)
            db.get().collection('profiles').insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve, reject) => { 
            let response={}
            let user= await db.get().collection('profiles').findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("Login success")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("Wrong password")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("Wrong email")
                resolve({status:false})
            }
        })
    },

    getAllProfiles:()=>{
        return new Promise(async(resolve,reject)=>{
            let profiles=await db.get().collection('profiles').find().toArray()
            resolve(profiles)
        })
    },

    addFriend:(id,friendId)=>{
        return new Promise(async (resolve, reject) => { 
            let user = await db.get().collection('profiles').findOne({_id:new ObjectId(id)})
            let friendDetails = await db.get().collection('profiles').findOne({_id:new ObjectId(friendId)})
            let friend = user.friends
            if(friend){
                db.get().collection('profiles').updateOne({_id:new ObjectId(id)},
                    {
                        $push:{friends:friendDetails}   
                    }).then((response)=>{
                        console.log('friend added')
                        resolve()
                })
            }else{
              await db.get().collection('profiles').updateOne({_id:new ObjectId(id)},{
                $set:{
                    friends:[friendDetails]
                }
                }).then((response)=>{
                    console.log('friend created')
                    resolve(response) 
                })
            }    
        })
    },

    getFriendCount:(userId)=>{
        return new Promise(async (resolve,reject)=>{
            let count=0
            let user = await db.get().collection('profiles').findOne({_id: new ObjectId(userId)})
            console.log(user)
            if(user.friends){
                count=user.friends.length
            }else{
                count=0
            }
            resolve(count)
        })    
    },

    getProfile:(proId)=>{
        return new Promise(async (resolve, reject) => { 
            let profile=await db.get().collection('profiles').findOne({_id: new ObjectId(proId)})
            let friends = profile.friends
            resolve(profile,friends)
        })
    },

    getFriends:(proId)=>{
        return new Promise(async(resolve, reject) => { 
            let profile=await db.get().collection('profiles').findOne({_id: new ObjectId(proId)})
            console.log(profile)
            let friends = profile.friends
            resolve(friends)
        })
    },

    // isFriend:(userId)=>{
    //     return new Promise(async (resolve, reject) => { 
    //         let profiles=await db.get().collection('profiles').find()
    //         let user = await db.get().collection('profiles').findOne({_id: new objectId(userId)})
    //         let friends = user.friends 
    //         let friendId = friends.map(({_id})=>_id)
    //         let friendExist = await db.get().collection('profiles').find({"friends._id":"profiles._id"})

    //         console.log(friendId)
    //         resolve(friendExist)
    //     })
    // }

    // searchUser:(userName)=>{
    //     return new Promise(async(resolve, reject) => { 
    //         let user = await db.get().collection('profiles').findOne({Name: userName})
    //         resolve(user)
    //     })
    // }
    // mutualFriend:(userId,proId)=>{
    //     return new Promise(async (resolve, reject) => { 
    //         let profile=await db.get().collection('profiles').findOne({_id: new objectId(proId)})
    //         let user = await db.get().collection('profiles').findOne({_id: new objectId(userId)})
    //         let profileFriends = profile.friends
    //         let userFriends = user.friends
    //         const newArray = userFriends.map(item1 => {
    //             const item2 = profileFriends.find(item2 => item2._id.equals(item1._id));
    //             if (item2) {
    //               return { ...item1, ...item2 };
    //             }
    //             return item1;
    //           });
              
    //         console.log(newArray);


    //     })
    // }
}