//navbar
(function($) {
  "use strict"; 
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };

  navbarCollapse();
  $(window).scroll(navbarCollapse);
})(jQuery); 
// end navbar

//hover effect
let serv1 = document.getElementById("serv1");
let servhr1 = document.getElementById("servhr1");

let serv2 = document.getElementById("serv2");
let servhr2 = document.getElementById("servhr2");

let serv3 = document.getElementById("serv3");
let servhr3 = document.getElementById("servhr3");

let serv4 = document.getElementById("serv4");
let servhr4 = document.getElementById("servhr4");

let serv5 = document.getElementById("serv5");
let servhr5 = document.getElementById("servhr5");

let serv6 = document.getElementById("serv6");
let servhr6 = document.getElementById("servhr6");

serv1.onmouseover = function () {
  servhr1.style.borderBottom = "3px solid white";
}
serv1.onmouseout = function () {
  servhr1.style.borderBottom = "3px solid black";
}

serv2.onmouseover = function () {
  servhr2.style.borderBottom = "3px solid white";
}
serv2.onmouseout = function () {
  servhr2.style.borderBottom = "3px solid black";
}

serv3.onmouseover = function () {
  servhr3.style.borderBottom = "3px solid white";
}
serv3.onmouseout = function () {
  servhr3.style.borderBottom = "3px solid black";
}

serv4.onmouseover = function () {
  servhr4.style.borderTop = "3px solid white";
}
serv4.onmouseout = function () {
  servhr4.style.borderTop = "3px solid #64a19d";
}

serv5.onmouseover = function () {
  servhr5.style.borderTop = "3px solid white";
}
serv5.onmouseout = function () {
  servhr5.style.borderTop = "3px solid #64a19d";
}

serv6.onmouseover = function () {
  servhr6.style.borderTop = "3px solid white";
}
serv6.onmouseout = function () {
  servhr6.style.borderTop = "3px solid #64a19d";
}
//end hover effect


//validation of the registration form
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
//end validation of the registration form


//feedback form validation
jQuery(document).ready(function($) {
  "use strict";

  $('form.php-mail-form').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { 

      var i = $(this); 
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; 
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { 

      var i = $(this); 
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; 
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }
    
    var this_form = $(this);
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        if (msg == 'OK') {
          this_form.find('.loading').slideUp();
          this_form.find('.sent-message').slideDown();
          this_form.find("input, textarea").val('');
        } else {
          this_form.find('.loading').slideUp();
          this_form.find('.error-message').slideDown().html(msg);
        }
      }
    });
    return false;
  });

});
//end feedback form validation