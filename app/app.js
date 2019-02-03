const app = Sammy('#site-content', function(){
    this.use('Handlebars', 'hbs');
    this.before({except: {}}, function() {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/dashboard/all', pet.listAllPets);
    this.get('#/dashboard/cats', pet.listCats);
    this.get('#/dashboard/dogs', pet.listDogs);
    this.get('#/dashboard/parrots', pet.listParrots);
    this.get('#/dashboard/reptiles', pet.listReptiles);
    this.get('#/dashboard/other', pet.listOthers);
    this.get('#/add-pet', pet.getAddPet);
    this.post('#/add-pet', pet.postAddPet);
    this.get('#/my-pets', pet.myPets);

    this.get('#/details-other-pet/:id', pet.getDetailsOther);
    this.get('#/details-my-pet/:id', pet.getDetailsMy);

    this.post('#/edit/:id', pet.edit);

    this.get('#/delete-pet/:id', pet.getDeletePet);
    this.post('#/delete-pet/:id', pet.postDeletePet);

    this.get('#/pet/:id', pet.pet);
});

$(function(){
    app.run('#/');
});