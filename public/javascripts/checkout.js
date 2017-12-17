var stripe = Stripe('pk_test_IBNTXZale0UoPJeE93Nyy9E5');

var elements = stripe.elements();

var cardNumber = elements.create('cardNumber');
cardNumber.mount('#cardNumber');
var cardNum = $('#cardNumber');
var cardNumErr = $('#cardNumber-error');
cardNumber.addEventListener('change', check(cardNum, cardNumErr));

var cardExpiry = elements.create('cardExpiry');
cardExpiry.mount('#cardExpiry');
var cardExp = $('#cardExpiry');
var cardExpErr = $('#cardExp-error');
cardExpiry.addEventListener('change', check(cardExp, cardExpErr));

var cardCvc = elements.create('cardCvc');
cardCvc.mount('#cvc');
var cardpin = $('#cvc');
var cardpinErr = $('#cvc-error');
cardCvc.addEventListener('change', check(cardpin, cardpinErr));

var $form = $('#checkout-form');

$form.submit(function(event) {
	event.preventDefault();
	$form.find('button').prop('disabled', true);

	stripe.createToken(cardNumber).then(function(result){
		if(result.error) {
			$('#alert').removeClass('d-none');
			console.log(result.error);
			$('#alert').text(result.error.message);
			$form.find('button').prop('disabled', false);
			return false;
		} else {
			stripeTokenHandler(result.token);
		}
	});
});

function check(ele, eleErr) {
	return function(event) {
		if(event.error) {
			ele.addClass('is-invalid');
			eleErr.text(event.error.message)
			console.log(event.error.message);
		} else {
			ele.removeClass('is-invalid');
		}
	}
}

function stripeTokenHandler(token) {
	var form = document.getElementById('checkout-form');
	var hiddenInput = document.createElement('input');
	hiddenInput.setAttribute('type', 'hidden');
	hiddenInput.setAttribute('name', 'stripeToken');
	hiddenInput.setAttribute('value', token.id);
	console.log(hiddenInput);
	form.appendChild(hiddenInput);

	form.submit();
}