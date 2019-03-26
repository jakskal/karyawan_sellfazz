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
    verifyPegawai(resource,user){
        if(!resource){
            throw new ResourceNotExist()
        }
        if(resource.ktp !== user.ktp){
            throw new InvalidAccessException()
        }
    }
    verifyPertemanan(resource, user){
        if(!resource){
            throw new ResourceNotExist()
        }
        if(resource.ktp_user !== user.ktp){
            throw new InvalidAccessException()
        }
    }
}

module.exports = new AuthorizationService()