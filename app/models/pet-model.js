const petModel = (function(){

    let petUrl = `appdata/${storage.appKey}/pets`;

    const getAllPetsLikesDesc = function() {
        return requester.get(petUrl + '?query={}&sort={"likes": -1}');
    };

    const getCategoryLikesDesc = function(category) {
        return requester.get(petUrl + `?query={"category":"${category}"}&sort={"likes": -1}`);
    };

    const createPet = function(params) {

        let data = {
            name: params.name,
            description: params.description,
            imageURL: params.imageURL,
            category: params.category,
            likes: 0
        };

        return requester.post(petUrl, data);
    };

    const getUserPets = function() {
        return requester.get(petUrl + `?query={"_acl.creator":"${storage.getData('userInfo').id}"}`);
    };

    const getPetById = function(id) {
        return requester.get(petUrl + '/' + id);
    };

    const editPet = function (id, data) {
        return requester.put(petUrl + '/' + id, data);
    };

    const deletePet = function (id) {
        return requester.del(petUrl + '/' + id);
    };

    const petPet = function() {

    };

    return {
        getAllPetsLikesDesc,
        getCategoryLikesDesc,
        createPet,
        getUserPets,
        getPetById,
        editPet,
        deletePet,
        petPet
    };
})();