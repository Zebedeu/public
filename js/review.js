let selectedRating = 0, selected_product_id = '';
function selectStar(no){
	let ratingStr = "";
	selectedRating = no;
	for(let i=1; i<=5; i++){
		if(selectedRating >= i){
			ratingStr+= "<span class='review-fa-stars fa fa-star checked' no='"+i+"' onclick='selectStar("+i+")'></span>";
		} else {
			ratingStr+= "<span class='review-fa-stars fa fa-star' no='"+i+"' onclick='selectStar("+i+")'></span>";
		}
	}
	
	$('.review-stars').html(ratingStr);
}

function validateReview(validate_comment, validate_name, validate_email, validate_correct_email){
	let comment = '', name = '', email = '', errCommentFlag = 0, errName = 0, errEmail = 0;

	if(!$('#comment').val()){
		errCommentFlag = 1;
		$('#err-comment').text(validate_comment).show();
	} else {
		errCommentFlag = 0;
		$('#err-comment').hide();
	}

	if(!$('#name').val()){
		errCommentFlag = 1;
		$('#err-name').text(validate_name).show();
	} else {
		errCommentFlag = 0;
		$('#err-name').hide();
	}

	errEmail = validateEmailAddress($('#email').val());
	if(errEmail > 0){
		caption = (errEmail == 1) ? validate_email : validate_correct_email;
		$('#err-email').text(caption).show();
	} else {
		$('#err-email').hide();
	}

	if(!errCommentFlag && !errName && !errEmail){
		return true;
	} else {
		return false;
	}
}

function addReview(url, title, validate_comment, validate_name, validate_email, validate_correct_email){
	if(validateReview(validate_comment, validate_name, validate_email, validate_correct_email)){
		$('#addReviewModal').modal('hide');
		$.post( url+"add-product-review", { product_id: selected_product_id, rating: selectedRating, comment: $('#comment').val(), name: $('#name').val(), email: $('#email').val() }).done(function( response ) {
	        if(response.code == 200){
	            $('#comment').val('');
	            $('#name').val('');
	            $('#email').val('');
	            selectStar(0);
	        }

	        showAlert(response.message, url, title);
	        setTimeout(() => {
	            hideAlert()
	        }, 3000);
	    })
	}
}

function openAddReview(product_id){
	selectStar(0);
	$('#err-comment').text('');
    $('#err-name').text('');
    $('#err-email').text('');
	selected_product_id = product_id;
	$('#addReviewModal').modal('show');
}