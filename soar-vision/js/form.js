var data;
var length;

  
$.ajax({
  type: "GET",
  url: '/documents/MiniAssessment.csv',
  // contentType: "text/plain",
  // crossDomain: 'true',
  dataType: "text",
  success: function (response) {
    data = $.csv.toObjects(response);
    console.log(data);
    length = data.length;
  },
});
$(document).ready(function () {


  for (var i = 1; i <= length; i++) {

    var container, content;
    container = jQuery('.form');
    console.log(container);
    if (i === 1) {
      content = '<div class="mm-survey-page active" data-page="' + i + '">' +
        '<div class="mm-survery-content">' +
        '<div class="mm-survey-question"><p>' + data[i - 1].question + '</p></div>' +
        '</div>' +
        '</div>';

    }
    else {
      content = '<div class="mm-survey-page" data-page="' + i + '">' +
        '<div class="mm-survery-content">' +
        '<div class="mm-survey-question"><p>' + data[i - 1].question + '</p></div>' +
        '</div>' +
        '</div>';

    }

    container.append(content);


    for (var ii = 1; ii <= 4; ii++) {

      var datax, containerx, contentx;
      valuex = ['responseA', 'responseB', 'responseC', 'responseD'];
      datax = [data[i - 1].responseA, data[i - 1].responseB, data[i - 1].responseC, data[i - 1].responseD];
      containerx = jQuery('[data-page="' + i + '"] .mm-survery-content');


      contentx = '<div class="mm-survey-item">' +
        '<input type="radio" id="radio' + i + '0' + ii + '" data-item="' + ii + '" name="radio' + i + '" value="' + valuex[ii] + '" />' +
        '<label for="radio' + i + '0' + ii + '"><span></span><p>' + datax[ii - 1] + '</p></label>' +
        '</div>';

      containerx.append(contentx);

    }



  }



  jQuery('.mm-prev-btn .prev').css({ visibility: 'hidden' });

  var x;
  var count;
  var current;
  var percent;
  var z = [];


  init();
  getCurrentSlide();
  goToNext();
  goToPrev();
  getCount();
  // checkStatus();
  // buttonConfig();
  buildStatus();
  deliverStatus();


  function AppendFormHtml() {
    // for(var keys in questions[0]){
    //   console.log(`${keys} = ${questions[0][keys]}`)
    // }






  }

  function init() {

    jQuery('.mm-survey-container .mm-survey-page').each(function () {

      var item;
      var page;

      item = jQuery(this);
      page = item.data('page');
      console.log(item)

      item.addClass('mm-page-' + page);
      //item.html(page);

    });

  }

  function getCount() {

    count = jQuery('.mm-survey-page').length;
    console.log(count);
    return count;

  }

  function goToNext() {

    jQuery('.mm-next-btn .next').on('click', function () {
      goToSlide(x);
      getCount();
      current = x + 1;
      var g = current / count;
      buildProgress(g);
      var y = (count + 1);
      getButtons();
      jQuery('.mm-survey-page').removeClass('active');
      jQuery('.mm-page-' + current).addClass('active');
      getCurrentSlide();
      checkStatus();
      if (jQuery('.mm-page-' + count).hasClass('active')) {
        if (jQuery('.mm-page-' + count).hasClass('pass')) {
          $('.final-submit').css({ visibility: 'visible' });
        }
        else {
          jQuery('.mm-page-' + count + ' .mm-survery-content .mm-survey-item').on('click', function () {
            $('.final-submit').css({ visibility: 'visible' });
          });
        }
      }
      else {
        jQuery('.mm-finish-btn').removeClass('active');
        if (jQuery('.mm-page-' + current).hasClass('pass')) {
          jQuery('.mm-survey-container').addClass('good');
          jQuery('.mm-survey').addClass('okay');
        }
        else {
          jQuery('.mm-survey-container').removeClass('good');
          jQuery('.mm-survey').removeClass('okay');
        }
      }
      buttonConfig();
    });

  }

  function goToPrev() {

    jQuery('.mm-prev-btn .prev').on('click', function () {
      goToSlide(x);
      getCount();
      current = (x - 1);
      var g = current / count;
      buildProgress(g);
      var y = count;
      getButtons();
      jQuery('.mm-survey-page').removeClass('active');
      jQuery('.mm-page-' + current).addClass('active');
      getCurrentSlide();
      checkStatus();
      jQuery('.mm-finish-btn').removeClass('active');
      if (jQuery('.mm-page-' + current).hasClass('pass')) {
        jQuery('.mm-survey-container').addClass('good');
        jQuery('.mm-survey').addClass('okay');
      }
      else {
        jQuery('.mm-survey-container').removeClass('good');
        jQuery('.mm-survey').removeClass('okay');
      }
      buttonConfig();
    });

  }

  function buildProgress(g) {

    if (g > 1) {
      g = g - 1;
    }
    else if (g === 0) {
      g = 1;
    }
    g = g * 100;
    jQuery('.mm-survey-progress-bar').css({ 'width': g + '%' });

  }

  function goToSlide(x) {

    return x;

  }

  function getCurrentSlide() {

    jQuery('.mm-survey-page').each(function () {

      var item;

      item = jQuery(this);

      if (jQuery(item).hasClass('active')) {
        x = item.data('page');
      }
      else {

      }

      return x;

    });

  }

  function getButtons() {

    if (current === 0) {
      current = y;
    }
    if (current === count) {
      jQuery('.mm-next-btn').css({ visibility: 'hidden' });
    }
    else if (current === 1) {
      jQuery('.mm-prev-btn .prev').css({ visibility: 'hidden' });
    }
    else {
      jQuery('.mm-next-btn .next').css({ visibility: 'visible' });
      jQuery('.mm-prev-btn .prev').css({ visibility: 'visible' });
    }

  }

  jQuery('.mm-survey-q li input').each(function () {

    var item;
    item = jQuery(this);

    jQuery(item).on('click', function () {
      if (jQuery('input:checked').length > 0) {
        // console.log(item.val());
        jQuery('label').parent().removeClass('active');
        item.closest('li').addClass('active');
      }
      else {
        //
      }
    });

  });

  percent = (x / count) * 100;
  jQuery('.mm-survey-progress-bar').css({ 'width': percent + '%' });

  function checkStatus() {
    jQuery('.mm-survery-content .mm-survey-item').on('click', function () {
      var item;
      item = jQuery(this);
      item.closest('.mm-survey-page').addClass('pass');
    });
  }

  function buildStatus() {
    jQuery('.mm-survery-content .mm-survey-item').on('click', function () {
      var item;
      item = jQuery(this);
      item.addClass('bingo');
      item.closest('.mm-survey-page').addClass('pass');
      jQuery('.mm-survey-container').addClass('good');
    });
  }

  function deliverStatus() {
    jQuery('.mm-survey-item').on('click', function () {
      if (jQuery('.mm-survey-container').hasClass('good')) {
        jQuery('.mm-survey').addClass('okay');
      }
      else {
        jQuery('.mm-survey').removeClass('okay');
      }
      buttonConfig();
    });
  }



  function buttonConfig() {
    if (jQuery('.mm-survey').hasClass('okay')) {
      jQuery('.mm-next-btn button').prop('disabled', false);
      jQuery('.mm-next-btn .next svg').prop('disabled', false);
    }
    else {
      jQuery('.mm-next-btn button').prop('disabled', true);
    }
  }



});

