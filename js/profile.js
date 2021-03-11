function getUserInfo(type, dis_label, error_label){
    $('#err-profile-field').text('');

    let title = '', label = '', value = '';
    if(type == 'first_name'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_first_name').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'last_name'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_last_name').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'email'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_email').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'phone_number'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_phone_number').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'password'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_password').text());
        $(".profile_value").prop("type", "password");
    } else if(type == 'bank_name'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_bank_name').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'bank_account_no'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_bank_account_no').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'nif'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_nif').text());
        $(".profile_value").prop("type", "text");
    } else if(type == 'address'){
        $('.profile_title').text(dis_label);
        $('.profile_label').text(dis_label);
        $('.profile_value').val($('.profile_address').text());
        $(".profile_value").prop("type", "text");
    }
    
    $('.profile_type').val(type);
    $('.profile_type_error').val(error_label);
    
    $('#editUserInfoModal').modal('show');
}

function getUserStateCityInfo(base_url, type, dis_label, error_label, state_id, city_id){
    $('#err-profile-state-city-field').text('');
    $('.profile_title').text(dis_label);
    $('.profile_label').text(dis_label);
    $('.profile_type').val(type);
    $('.profile_type_error').val(error_label);

    let url = "";
    if(type == 'state'){
        url = base_url+"get-states?state_id="+state_id;
    } else {
        url = base_url+"get_city?state_id="+state_id+"&city_id="+city_id;
    }
    
    $.ajax({url,  success: function(result) {
        $('.state_city_id').html(result.response)
        $('#editUserStateCityInfoModal').modal('show');
    }});
}

//function getUserStateDocInfo(base_url, type, dis_label, error_label, state_id, city_id){
function getUserStateDocInfo(base_url){
    $('#err-profile-state-city-field').text('');
    $('.profile_title').text('');
   // $('.profile_title').text('dis_label');
   // $('.profile_label').text('dis_label');
    $('.profile_label').text('');
    $('.profile_type').val('type');
    $('.profile_type_error').val('error_label');

    $('#editUserDocInfoModal').modal('show');
/*
    let url = "";
    if(type == 'state'){
        url = base_url+"get-states?state_id="+state_id;
    } else {
        url = base_url+"get_city?state_id="+state_id+"&city_id="+city_id;
    }
    
    $.ajax({url,  success: function(result) {
        $('.state_city_id').html(result.response)
        $('#editUserDocInfoModal').modal('show');
    }});*/
}

function getUserPasswordInfo(type, dis_label, password){
    $('.profile_title').text(dis_label);
    $('.profile_value_old_password').val($('.default_profile_password').val());
    $('.profile_value_new_password').val('');
    $('.profile_value_confirm_new_password').val('');
    $('#editUserInfoPasswordModal').modal('show');
}

function setUserPasswordInfo(url, title, old_password, new_password, confirm_new_password, match_password){
    let isError = 0;
    if(!$('.profile_value_old_password').val()){
        isError = 1;
        $('#err-old-password').text(old_password);
    } else {
        $('#err-old-password').text('');
    }

    if(!$('.profile_value_new_password').val()){
        isError = 1;
        $('#err-new-password').text(new_password);
    } else {
        $('#err-new-password').text('');
    }

    if(!$('.profile_value_confirm_new_password').val()){
        isError = 1;
        $('#err-confirm-password').text(confirm_new_password);
    } else if($('.profile_value_new_password').val() && $('.profile_value_confirm_new_password').val() && $('.profile_value_new_password').val() != $('.profile_value_confirm_new_password').val()){
        isError = 1;
        $('#err-confirm-password').text(match_password);
    } else{
        $('#err-confirm-password').text('');
    }

    if(isError){
        return false;
    }

    $.post( url+"update-password", { old_password: $('.profile_value_old_password').val(), new_password: $('.profile_value_new_password').val() }).done(function( response ) {
        showAlert(response.message, url, title);
        setTimeout(() => {
            hideAlert()
            if(response.code == 200){
                setTimeout(() => {
                    $('#editUserInfoPasswordModal').modal('hide');
                    $('.profile_password').text($('.profile_value_new_password').val().replace(/./g, "*"));
                    $('.default_profile_password').val($('.profile_value_new_password').val());
                }, 500);
            } else if(response.code == 404){
                window.location.href = '/';
            }
        }, 1000);
    })
}

function setUserStateDOCInfo(url, title){
   
    console.log('aqui - ' + url);
   
   /* let isError = 0;
    if(!$('.state_city_id').val()){
        isError = 1;
        $('#err-profile-state-city-field').text($('.profile_type_error').val());
    }

    if(isError){
        return false;
    }

    $('#editUserStateCityInfoModal').modal('hide');
    let type = $('.profile_type').val();
    let fieldType = (type == 'state') ? 'state_id' : 'city_id';
    $.post( url+"update-profile", { type: fieldType, [fieldType]: $('.state_city_id').val() }).done(function( response ) {
        if(response.code == 200){
            if(type == 'state'){
                $('.profile_state').text($(".state_city_id option:selected").text());
            } else {
                $('.profile_city').text($(".state_city_id option:selected").text());
            }
        }
        
        showAlert(response.message, url, title);
        setTimeout(() => {
            hideAlert()
            location.reload();
        }, 3000);
    })*/
}

function setUserStateCityInfo(url, title){
    let isError = 0;
    if(!$('.state_city_id').val()){
        isError = 1;
        $('#err-profile-state-city-field').text($('.profile_type_error').val());
    }

    if(isError){
        return false;
    }

    $('#editUserStateCityInfoModal').modal('hide');
    let type = $('.profile_type').val();
    let fieldType = (type == 'state') ? 'state_id' : 'city_id';
    $.post( url+"update-profile", { type: fieldType, [fieldType]: $('.state_city_id').val() }).done(function( response ) {
        if(response.code == 200){
            if(type == 'state'){
                $('.profile_state').text($(".state_city_id option:selected").text());
            } else {
                $('.profile_city').text($(".state_city_id option:selected").text());
            }
        }
        
        showAlert(response.message, url, title);
        setTimeout(() => {
            hideAlert()
            location.reload();
        }, 3000);
    })
}

function setUserInfo(url, title){
    if($('.profile_type').val() == 'bank_account_no'){
        let bankAccountNo = $('.profile_value').val().replace(/ /g,"");
        let isError = validateBankAccountNo(bankAccountNo);
        if(isError){
            $('#err-profile-field').text($('.profile_type_error').val());    
            return false;
        }
    } else if(!$('.profile_value').val()){
        $('#err-profile-field').text($('.profile_type_error').val());
        return false;
    } else {
        $('#err-profile-field').text('');
    }

    $('#editUserInfoModal').modal('hide');
    let type = $('.profile_type').val();
    $.post( url+"update-profile", { type, [type]: $('.profile_value').val() }).done(function( response ) {
        if(response.code == 200){
            if(type == 'first_name'){
                $('.profile_first_name').text($('.profile_value').val());
            } else if(type == 'last_name'){
                $('.profile_last_name').text($('.profile_value').val());
            } else if(type == 'email'){
                $('.profile_email').text($('.profile_value').val());
            } else if(type == 'phone_number'){
                $('.profile_phone_number').text($('.profile_value').val());
            } else if(type == 'password'){
                let password = $('.profile_value').val();
                $('.profile_password').text(password.replace(/./g, "*"));
            } else if(type == 'bank_name'){
                $('.profile_bank_name').text($('.profile_value').val());
            } else if(type == 'bank_account_no'){
                $('.profile_bank_account_no').text($('.profile_value').val());
            } else if(type == 'nif'){
                $('.profile_nif').text($('.profile_value').val());
            } else if(type == 'address'){
                $('.profile_address').text($('.profile_value').val());
            }
        }
        
        showAlert(response.message, url, title);
        setTimeout(() => {
            hideAlert()
        }, 3000);
    })
}

$(document).ready(function(){
    $('.your_account_details').on('keypress', (e) => {
        if($('.profile_type').val() == 'bank_account_no'){
            if($('.your_account_details').val().length > 30){
                e.preventDefault();
            } else {
                $('.your_account_details').val($('.your_account_details').val().replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
            }
        }
    });
});