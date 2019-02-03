const pet = (function(){

    const listAllPets = function(ctx) {
        petModel.getAllPetsLikesDesc().done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const listCats = function(ctx) {
        petModel.getCategoryLikesDesc('Cat').done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const listDogs = function(ctx) {
        petModel.getCategoryLikesDesc('Dog').done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const listParrots = function(ctx) {
        petModel.getCategoryLikesDesc('Parrot').done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const listReptiles = function(ctx) {
        petModel.getCategoryLikesDesc('Reptile').done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const listOthers = function(ctx) {
        petModel.getCategoryLikesDesc('Other').done(function(data) {
            console.log(data);

            data = data.filter((p) => p._acl.creator !== storage.getData('userInfo').id);

            ctx.pets = data;
            ctx.partial('views/pet/dashboard.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const getAddPet = function(ctx) {
        ctx.partial('views/pet/add-pet.hbs')
    };

    const postAddPet = function(ctx) {
        petModel.createPet(ctx.params).done(function() {

            ctx.redirect('#/');
            notification.info('Pet Created');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const myPets = function(ctx) {
        petModel.getUserPets().done(function(data) {

            ctx.pets = data;
            ctx.partial('views/pet/my-pets.hbs');
        }).fail(function() {
            notification.error('Error');
        });
    };

    const getDetailsOther = function(ctx) {

        petModel.getPetById(ctx.params['id']).done(

            function(data) {

                if (data._acl.creator === storage.getData('userInfo').id) {
                    notification.error('Error');
                    return;
                }

                console.log(data);

                ctx.name = data.name;
                ctx.likes = data.likes;
                ctx.description = data.description;
                ctx.imageURL = data.imageURL;
                ctx._id = data._id;

                ctx.partial('views/pet/details-other-pet.hbs');
            }
        );
    };

    const getDetailsMy = function(ctx) {

        petModel.getPetById(ctx.params['id']).done(

            function(data) {

                if (data._acl.creator !== storage.getData('userInfo').id) {
                    notification.error('Error');
                    ctx.redirect();
                    return;
                }

                ctx.name = data.name;
                ctx.likes = data.likes;
                ctx.description = data.description;
                ctx.imageURL = data.imageURL;
                ctx._id = data._id;

                ctx.partial('views/pet/details-my-pet.hbs');
            }
        );
    };

    const edit = function(ctx) {

        let petId = ctx.params['id'];
        let newDescription = ctx.params.description;

        petModel.getPetById(petId).done(function(data) {

            let editedPet = {
                name : data.name,
                likes : data.likes,
                description : newDescription,
                imageURL : data.imageURL,
                category: data.category
            };

            petModel.editPet(petId, editedPet).done(function() {

                ctx.redirect('#/dashboard/all');
                notification.info('Updated successfully!');
            })
                .fail(function() {
                    notification.error('Error');
                });
        }).fail(function() {
            notification.error('Error');
        });

    };

    const getDeletePet = function(ctx) {

        let petId = ctx.params['id'];

        petModel.getPetById(petId).done(
            function(data) {

                ctx.name = data.name;
                ctx.description = data.description;
                ctx.likes = data.likes;
                ctx.imageURL = data.imageURL;
                ctx._id = data._id;
                ctx.partial('views/pet/delete-pet.hbs');
            }
        ).fail(function() {
            notification.error('Error');
        });
    };

    const postDeletePet = function(ctx) {
        let petId = ctx.params['id'];
        petModel.deletePet(petId).done(function() {
            ctx.redirect('#/dashboard/all');
            notification.info('Pet removed successfully!');
        })
            .fail(function() {
                notification.error('Error');
            });
    };

    const pet = function(ctx) {

        let petId = ctx.params['id'];

        petModel.getPetById(petId).done(function(data) {

            let newLikes = +data.likes + 1;

            let editedPet = {
                name : data.name,
                likes : newLikes,
                description : data.description,
                imageURL : data.imageURL,
                category: data.category
            };

            petModel.editPet(petId, editedPet).done(function() {

                ctx.redirect(`#/details-other-pet/${petId}`);
            })
                .fail(function() {
                    notification.error('Error');
                });
        }).fail(function() {
            notification.error('Error');
        });
    };

    return {
        listAllPets,
        listCats,
        listDogs,
        listParrots,
        listReptiles,
        listOthers,
        getAddPet,
        postAddPet,
        myPets,
        getDetailsOther,
        getDetailsMy,
        edit,
        getDeletePet,
        postDeletePet,
        pet
    };

})();