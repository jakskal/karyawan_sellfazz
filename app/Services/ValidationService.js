const InvalidPertemananStatus = use('App/Exceptions/InvalidPertemananStatusException')
const InvalidKepegawaianStatus = use('App/Exceptions/InvalidKepegawaianStatusException')
const ResourceNotExist = use('App/Exceptions/ResourceNotExistException')
const NoChange = use('App/Exceptions/NoChangeException')
class ValidationService{
    pertemananStatusValidation(resource){
        if(!resource){
            throw new ResourceNotExist()
        
        }
        const acceptance = ['menunggu','teman','teman kantor','pernah bekerja sama']
        if(!acceptance.includes(resource)){
            throw new InvalidPertemananStatus()
        }
    }
    kepegawaianStatusValidation(resource, status){
        if(!resource){
            console.log('masuk');
            throw new ResourceNotExist()
        }
        const acceptance = ['telah','sedang']
        if(!acceptance.includes(status)){
            throw new InvalidKepegawaianStatus()
        }
        if(resource.status == status){
            throw new NoChange()
        }
    }
    
}

module.exports = new ValidationService()