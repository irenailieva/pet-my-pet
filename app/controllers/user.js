const user = (function(){
    const getLogin = function(ctx){
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function(ctx){

        let username = ctx.params.username;
        let password = ctx.params.password;

        if (username.length < 3) {
            notification.error('Username must be at least 3 symbols');
            ctx.redirect('#/login');
            return;
        }
        else if (password < 6) {
            notification.error('Password must be at least 6 symbols');
            ctx.redirect('#/login');
            return;
        }

        userModel.login(username, password).done(function(data){

            storage.saveUser(data);

            ctx.redirect('#/');
            notification.info('Login successful.');

        }).fail(function() {

            notification.error('Login Error');
        });
    };

    const logout = function(ctx){
        userModel.logout().done(function(data){

            if (!!data) {
                notification.error('Logout Error');
                ctx.redirect('#/');
                return;
            }

            storage.deleteUser();
            
            ctx.redirect('#/');
            notification.info('Logout successful.');
        });
    };

    const getRegister = function(ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function(ctx) {

        if (ctx.params.username.length < 3) {
            notification.error('Username must be at least 3 symbols');
            ctx.redirect('#/register');
            return;
        }
        else if (ctx.params.password.length < 6) {
            notification.error('Password must be at least 6 symbols');
            ctx.redirect('#/register');
            return;
        }

        userModel.register(ctx.params).done(function(data){

            if (!!data.error) {
                notification.error('Registration Error');
                ctx.redirect('#/register');
                return;
            }

            storage.saveUser(data);

            ctx.redirect('#/');
            notification.info('User registration successful.');
        });
    };

    const initializeLogin = function(){
        if(!userModel.isAuthorized()){
            $('#navbar-dashboard').hide();
            $('#navbar-anonymous').show();
        }
        else {
            $('#navbar-dashboard').show();
            $('#navbar-anonymous').hide();
            $('#greeting').text(`Welcome, ${storage.getData('userInfo').username}!`);
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());