function productDetails(url, user_type, product_id) {
    if (user_type == 'compradors') {
        window.location.href = url + user_type + "/explore/details/" + product_id;
    } else {
        window.location.href = url + user_type + "/product/display/" + product_id;
    }
}

function orderDetails(url, user_type, order_id) {
    window.location.href = url + user_type + "/order/details/" + order_id;
}

function showAlert(message, url, title) {
    notify({
        type: "error",
        title: title || 'Message',
        theme: "dark-theme",
        position: {
            x: "right",
            y: "top"
        },
        icon: '<img src="' + url + 'images/paper_plane.png" />',
        message: message
    });
}

function hideAlert() {
    $(".notify-close-btn").trigger("click");
}

function redirectToWallet(url) {
    window.location.href = url + "wallet";
}

function addAmountInWallet(baseURL) {
    let url = baseURL + "get-wallet-details";
    $.get(url, function (data) {
        $("#wallet_account_no").html(data.bank_information.account_no);
        $("#wallet_iban").html(data.bank_information.code);
        $("#wallet_company").html(data.bank_information.company_name);
        $('#addAmountInWalletModal').modal('show');
    });
}

function generateReference(base_url, err_message, message, toast_message) {
    if (!$('#load_amount').val() || $('#load_amount').val() <= 0) {
        $('#err-total-load-amount').text(err_message).show();
        return false;
    } else {
        $('#err-total-load-amount').hide();
    }
    $('#addAmountInWalletATMModal').modal('hide');



    var num = $("#load_amount").val()

    $.ajax({
        url: base_url + "reference/generate?amount=" + num, success: (result) => {
            $('#load_amount').val('');
            showAlert(toast_message, base_url, message);
            setTimeout(() => {
                hideAlert()
            }, 3000);
        }
    });
}

function removePointerInCurrence(number) {
    let regex = /([+-]?[0-9|^.|^,]+)[\.|,]([0-9]+)$/igm
    let result = regex.exec(number);

    let floatResult = result ? result[1].replace(/[.,]/g, "") + "." + result[2] : number.replace(/[^0-9-+]/g, "");
    return floatResult
}
function getWhereToDeliver(base_url, address_id = null) {
    let url = base_url + "deliver-addresses";
    if (address_id) {
        url = base_url + "deliver-addresses?address_id=" + address_id;
    }

    $.ajax({
        url, success: (result) => {
            console.log(result);
            $('.where_to_deliver_id').html(result.response)
        }
    });
}

function getMobileCountryCodes(base_url, mobile_country_code = null) {
    let url = base_url + "get-mobile-country-codes";
    let columnAndValues = {};
    if (mobile_country_code) {
        columnAndValues = {
            mobile_country_code
        }
    }

    $.post(url, columnAndValues).done((result) => {
        $('.mobile_country_code').html(result.response)
    });
}

function getStates(base_url, state_id = null) {
    let url = base_url + "get-states";
    if (state_id) {
        url += "?state_id=" + state_id;
    }

    $.ajax({
        url, success: function (result) {
            $('.state_id').html(result.response)
        }
    });
}

function getCities(base_url, city_id = null, state_id = null) {
    if (state_id || $('.state_id').val()) {
        let state = state_id || $('.state_id').val();
        let url = base_url + "get_city?state_id=" + state;
        if (city_id) {
            url += "&city_id=" + city_id;
        }

        $.ajax({
            url, success: function (result) {
                console.log(result.response);
                $('.city_id').html(result.response)
            }
        });
    } else {
        $('.city_id').htdml("")
    }
}

function getMaxPriceRange(base_url) {
    getMinQty(base_url);

    $('#lower_price_range').val(0);
    $('#higher_price_range').val(0);
    let instance = $(".js-range-slider").data("ionRangeSlider");
    if ($('.units_id').val()) {
        $.ajax({
            url: base_url + "get-max-price-range?units_id=" + $('.units_id').val(), success: function (result) {
                instance.update({
                    from: 0,
                    min: 0,
                    max: parseFloat(result.response),
                });
            }
        });
    } else {
        instance.update({
            from: 0,
            min: 0,
            max: 0,
        });
    }
}

function getFarmers(base_url, producer_id = null) {
    let url = base_url + "get-producer";
    if (producer_id) {
        url = base_url + "get-producer?producer_id=" + producer_id;
    }


    $.ajax({url,  success: (result) => {
        console.log(result.response);
        if(result.response != ""){
            $('.producer_id').html(result.response);
        }
        else{
            $.confirm({
                title: 'Produtor em falta',
                icon: 'fa fa-check',
                content: 'Antes de adicionar algum produto precisa registar o produtor. Obrigado!',
                type: 'kepya',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Ok',
                        btnClass: 'kepya-green',
                        action: function () {
                            window.location.replace("/aggregators/user/add");
                        }
                    }
                } 
                });
            }

        }
    });
}

function getCategories(base_url, category_id = null) {
    let url = base_url + "get-category";
    if (category_id) {
        url = base_url + "get-category?category_id=" + category_id;
    }

    $.ajax({
        url, success: (result) => {
            $('.category_id').html(result.response);
        }
    });
}

function getProducts(base_url, sub_category_id = null, category_id = null) {
    if (category_id || $('.category_id').val()) {
        let cat_id = category_id || $('.category_id').val();
        let url = base_url + "get-subcategory?category_id=" + cat_id;
        if (sub_category_id) {
            url = base_url + "get-subcategory?category_id=" + cat_id + "&sub_category_id=" + sub_category_id;
        }

        $.ajax({
            url, success: function (result) {
                console.log(result.response);
                $('.sub_category_id').html(result.response)
            }
        });
    } else {
        $('.sub_category_id').html("")
        $('.product_variety_id').html("")
    }
}

function getVerities(base_url, product_variety_id = null, sub_category_id = null) {
    if (sub_category_id || $('.sub_category_id').val()) {
        let sub_cat_id = sub_category_id || $('.sub_category_id').val();
        let url = base_url + "get-verieties?sub_category_id=" + sub_cat_id;
        if (product_variety_id) {
            url = base_url + "get-verieties?sub_category_id=" + sub_cat_id + "&product_variety_id=" + product_variety_id;
        }

        $.ajax({
            url, success: function (result) {
                $('.product_variety_id').html(result.response)
            }
        });
    } else {
        $('.product_variety_id').html("")
    }
}

function getUnits(base_url, unit_type = null) {
    let url = base_url + "get-units";
    if (unit_type) {
        url = base_url + "get-units?unit_id=" + unit_type;
    }

    $.ajax({
        url, success: (result) => {
            $('.units_id').html(result.response);
        }
    });
}

function getMinQty(base_url) {
    let url = base_url + "get-min-unit-qty?unit_id=" + $('.units_id').val();
    $.ajax({
        url, success: (result) => {
            $('.min_unit_qty').val(result.qty);
            $('.min_unit_qty_error').val(result.error);
        }
    });
}

function getSizes(base_url, size_id = null) {
    let url = base_url + "get-sizes";
    if (size_id) {
        url = base_url + "get-sizes?size_id=" + size_id;
    }

    $.ajax({
        url, success: (result) => {
            $('.size_id').html(result.response);
        }
    });
}

function calculateTotalPrice() {
    let formattedNo = ($('#unit_value').val() && $('#unit_price').val()) ? (parseFloat($('#unit_value').val()) * parseFloat($('#unit_price').val())) : 0;
    $('#total_unit_price').val(thousands_separators(formattedNo));

    let unit = parseFloat($('#unit_value').val())
    if (300 > unit) {
        $('.unit-error').text("A quantidade mínima deve ser maior ou igual a 300 kg");
    } else {
        $('.unit-error').text("");

    }

    let ton = parseFloat($('#unit_value').val()) / 1000
    if (isNaN(ton)) {
        $('#ton_result').val(thousands_separators(00));
    } else {
        $('#ton_result').val(thousands_separators(ton));
    }

}

function thousands_separators(num) {
    num = parseFloat(num).toFixed(2)
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
}

$(document).ready(function () {
    $('.your_account_details').on('keypress', (e) => {
        if ($('.profile_type').val() == 'bank_account_no') {
            if ($('.your_account_details').val().length > 30) {
                e.preventDefault();
            } else {
                $('.your_account_details').val($('.your_account_details').val().replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
            }
        }
    });

    $('.farmer_bank_account_no').on('keypress', (e) => {
        if ($('.farmer_bank_account_no').val().length > 25) {
            e.preventDefault();
        } else {
            $('.farmer_bank_account_no').val($('.farmer_bank_account_no').val().replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
        }
    });

    $('.farmer_bank_account_no_edit').on('keypress', (e) => {
        if ($('.farmer_bank_account_no_edit').val().length > 30) {
            e.preventDefault();
        } else {
            $('.farmer_bank_account_no_edit').val($('.farmer_bank_account_no_edit').val().replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
        }
    });

    $('input.farmer_currency_number').keyup(function (event) {

        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }

        $(this).val(function (index, value) {
            return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
                ;
        });
    });

    $('input.farmer_nif_number').keyup(function (event) {

        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }

        $(this).val(function (index, value) {
            return value
                .replace(/[^A-Za-z0-9]+/g, "")
                ;
        });
    });

    $('.date-picker').datepicker({
        'format': 'yyyy-mm-dd',
        "setDate": new Date(),
        'autoclose': true,
        language: 'pt'

        
    });

    $(".js-accordion-item:eq(0)").addClass("active");

});
