$(document).ready(function () {
  $('.js-signup').click(function (e) {  
    e.preventDefault();
    const account = {};
    account.email = $('#email').val();
    account.password = $('#password').val();

    $.ajax({
      method: 'POST',
      url: 'https://hexschool-tutorial.herokuapp.com/api/signup',
      data: account
    }).done((msg) => alert(msg.message))
      .always(() => $('.inputs')[0].reset())
    
  })
  
  $('.js-signin').click(function (e) {  
    e.preventDefault();
    const account = {};
    account.email = $('#email').val();
    account.password = $('#password').val();

    $.ajax({
      method: 'POST',
      url: 'https://hexschool-tutorial.herokuapp.com/api/signin',
      data: account
    }).done((msg) => {
      alert(msg.message);
      if (msg.success) {
        window.location.href ='/BMIcaculator/bmicalc.html'
      }
    }).always((msg) => $('.inputs')[0].reset())
  })
})