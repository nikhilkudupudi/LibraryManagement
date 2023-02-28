const {Users}=require("../../models/models");

const {createUserSchema}=require("../../utils/validations");


async function createUser(user){
    try{
        const validateUser= await createUserSchema.validateAsync(user);
        const newUser=await Users.create(validateUser);
        console.log(newUser);
        return newUser;
    }
    catch (err) {
        throw new Error(err);
    }
    }
async function getUserByUsername(username){
    try{
        const user=await Users.findOne({where:{username: username}});
        if(user){
            console.log(username);
            return user;
        }

            return "user not found";

    }
    catch (err) {
        throw new Error(err);
    }
}
async function updateUserByUsername(username,data){
    try{
        const user=await Users.findOne({where:{username:username}});
        if(user){
            await createUserSchema.validateAsync(data);

            await user.update(data);
            return "user updated";
        }
            return "user not found";
    }
    catch (err) {
        throw new Error(err);
    }
}
async function deleteUserById(userId){
    try{
        const user=await Users.findByPk(userId);
        if(user){
            await Users.destroy({where:{id:userId}});
            return "user deleted"
        }
            return "user not found";

    }
    catch(err){
        throw new Error(err);
    }
}
module.exports = {
    createUser,
    getUserByUsername,
    updateUserByUsername,
    deleteUserById

}