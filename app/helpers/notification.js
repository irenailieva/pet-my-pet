const notification = (function(){

    $(function() {
        $(document).ajaxStart(function() {
            $('#loadingBox').show();
        });

        $(document).ajaxStop(function() {
            $('#loadingBox').hide();
        });
    });

    const info = function (text) {
        $('#infoBox>span').text(text);
        const infoBox = $('#infoBox');
        infoBox.show();
        infoBox.fadeOut(5000);
    };

    const error = function (text) {
        $('#errorBox>span').text(text);
        const errorBox = $('#errorBox');
        errorBox.show();
        errorBox.fadeOut(5000);
    };

    return {
        info,
        error
    }
})();