const InvalidAccessException = use('App/Exceptions/InvalidAccessException')
const ResourceNotExist = use('App/Exceptions/ResourceNotExistException')
class AuthorizationService{
    verifyPemilik(resource, user){
        if(!resource){
            throw new ResourceNotExist()
        }
        if (resource.pemilik !== user.id){
            throw new InvalidAccessException()
        }
    }
}

module.exports = new AuthorizationService()