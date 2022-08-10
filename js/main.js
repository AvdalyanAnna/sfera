$(document).ready(function () {
  function numberFixed(number, fixed) {
    if (
      (typeof number === "number" || typeof number === "string") &&
      !isNaN(number - parseFloat(number))
    ) {
      number = String(number);
      var split = number.split(".");
      if (split.length > 1) {
        var left = split[0];
        var right = split[1].substr(0, !fixed ? 4 : fixed);
        return Number(left + (fixed !== 0 ? "." + right : ""));
      } else {
        return Number(number);
      }
    }
  }

  function isNaNTry(num) {
    return isNaN(num) ? 0 : numberFixed(num, 7);
  }

  var kurs_btc_rub = 3245123;
  var kurs_btc_usd = 22858;
  var kurs_btc_euro = 22436;

  $(".balance__calc-inner input").bind("input", function () {
    let input_num = $(this)
      .val()
      .replace(/[^+\d,.]/g, "")
      .replace(/,/, ".");

    input_num = input_num.trim() ? parseFloat(input_num) : 1;

    //let kurs = $('.balance__price').text().split('₿');
    //kurs = parseFloat(kurs[kurs.length - 1].replace(/[^+\d,.]/g, '').replace(/,/, '.'));
    let kurs_convet = 0;
    switch ($(this).attr("id")) {
      case "btc":
        $("#ruble").val(isNaNTry(kurs_btc_rub * input_num));
        $("#usd").val(isNaNTry(kurs_btc_usd * input_num));
        $("#euro").val(isNaNTry(kurs_btc_euro * input_num));
        break;
      case "ruble":
        kurs_convet = input_num / kurs_btc_rub;
        $("#btc").val(isNaNTry(kurs_convet));
        $("#usd").val(isNaNTry(kurs_convet * kurs_btc_usd));
        $("#euro").val(isNaNTry(kurs_convet * kurs_btc_euro));
        break;
      case "usd":
        kurs_convet = input_num / kurs_btc_usd;
        $("#btc").val(isNaNTry(kurs_convet));
        $("#ruble").val(isNaNTry(kurs_convet * kurs_btc_rub));
        $("#euro").val(isNaNTry(kurs_convet * kurs_btc_euro));
        break;
      case "euro":
        kurs_convet = input_num / kurs_btc_euro;
        $("#btc").val(isNaNTry(kurs_convet));
        $("#ruble").val(isNaNTry(kurs_convet * kurs_btc_rub));
        $("#usd").val(isNaNTry(kurs_convet * kurs_btc_usd));
        break;
    }
  });
  $("#btc").val(1);
  $("#btc").trigger("input");

  var numberFormat = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  $(".pay__summ-input input").bind("input", function () {
    let input_num = $(this)
      .val()
      .replace(/[^+\d,.]/g, "")
      .replace(/,/, ".");

    input_num = input_num.trim() ? parseFloat(input_num) : 1000;

    $(".pay__line").each(function (index) {
      let kurs = $($(this).find(".pay__line-value")[0]).text().split("=");

      kurs = kurs[kurs.length - 1].replace(/[^+\d,.]/g, "").replace(/,/, ".");
      kurs = kurs.trim() ? parseFloat(kurs) : 0;
      let sum1 = (input_num / kurs).toFixed(7);
      let html = numberFormat.format(input_num).replace(/₽/, "<span>₽</span>");
      html += " = " + sum1 + " <span>BTC</span>";
      $(this).find(".pay__end-head").html(html);
    });

    if (!$(".pay__items .pay__item").hasClass("active")) {
      $(".pay__items .pay__item-input")[0].click();
    }
  });
  (function (inner, second) {
    const w_width = inner.width();
    second.attr("offset", w_width);
    second.width(w_width);

    const offset = {
      21: 19,
      63: 62,
      147: 148,
      189: 191,
    };

    // Получим ширину половины звёздочки
    const size = w_width / 5 / 2;
    // Округлим до следующей (21 => 42 => 64 => 84) px
    const sum = (e) =>
      Math.ceil((e.pageX - second.offset().left) / size) * size;
    // События
    inner
      .hover(function (e) {
        second.width(
          second.attr("offset") ? parseFloat(second.attr("offset")) : 0
        );
      })
      .mousemove(function (e) {
        let xx = sum(e);
        second.width(offset[xx] ? offset[xx] : xx);
      })
      .click(function (e) {
        let xx = sum(e);
        second.attr("offset", offset[xx] ? offset[xx] : xx);
      });
  })($(".order__review-stars--inner"), $(".order__review-stars--second"));

  function TickTimers() {
    $("[data-end-time]").each(function (index) {
      const endtime = $(this).attr("data-end-time");

      const t = Date.parse(endtime) - Date.parse(new Date());
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));

      if (minutes <= 0) minutes = 0;
      if (seconds <= 0) seconds = 0;

      const timeset = sprintf("%02d:%02d", minutes, seconds);

      $(this).find(".timeSet").html(timeset);
    });
  }

  setInterval(function () {
    TickTimers();
  }, 100);
  TickTimers();

  $(".header-top__user").click(function () {
    $(this).toggleClass("active");
    $(".header-top__user-drop").slideToggle(300);
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".header-top__user, .header-top__user-drop").length
    ) {
      $(".header-top__user-drop").slideUp(300);
      $(".header-top__user").removeClass("active");
    }
    e.stopPropagation();
  });

  $(".header-top__city-header").click(function () {
    $(this).toggleClass("active");
    $(this).next().slideToggle(300);
  });

  $(".card__header-link--points").click(function () {
    $(this).children().next().children().slideToggle(300);
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(
        ".card__header-link--points, .card__header-link--drop"
      ).length
    ) {
      $(".card__header-link--drop").slideUp(300);
    }
    e.stopPropagation();
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".header-top__city-header, .header-top__city-drop")
        .length
    ) {
      $(".header-top__city-drop").slideUp(300);
      $(".header-top__city-header").removeClass("active");
    }
    e.stopPropagation();
  });

  $(".header-bottom__balance-item").click(function () {
    $(this).toggleClass("active");
    $(".header-bottom__balance-drop").slideToggle(300);
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(
        ".header-bottom__balance-item, .header-bottom__balance-drop"
      ).length
    ) {
      $(".header-bottom__balance-drop").slideUp(300);
      $(".header-bottom__balance-item").removeClass("active");
    }
    e.stopPropagation();
  });

  $(".header-bottom__category-drop li span").click(function () {
    $(".header-bottom__category-drop ul ul").slideUp(300);
    $(".header-bottom__category-drop span").removeClass("active");
    if ($(this).next().is(":visible")) {
      $(this).next().slideUp(300);
      $(this).removeClass("active");
    } else {
      $(this).toggleClass("active");
      $(this).next().slideToggle(300);
    }
  });

  $(".header-bottom__category-header").click(function () {
    if ($(window).width() >= 767) {
      $(this).toggleClass("active");
      $(".header-bottom__category-drop").slideToggle(300);
    } else {
      $(".header-bottom__category-drop").toggleClass("active");
    }
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(
        ".header-bottom__category-header, .header-bottom__category-drop"
      ).length
    ) {
      $(".header-bottom__category-drop").slideUp(300);
      $(".header-bottom__category-header").removeClass("active");
    }
    e.stopPropagation();
  });

  $(".header-bottom__search").click(function () {
    if ($(window).width() <= 991) {
      $(this).toggleClass("active");
    }
  });

  $(".header-bottom__burger").click(function () {
    $(".header-bottom__mobile-item").toggleClass("active");
    return false;
  });

  $(".header-bottom__strong").click(function () {
    $(".header-bottom__mobile-item").removeClass("active");
  });

  $(".header-bottom__category-strong").click(function () {
    $(".header-bottom__category-drop").removeClass("active");
  });

  $(".massage__close").click(function () {
    $(this).parent().parent().parent().parent().slideUp(300);
  });

  $(".t-dropdown-input").on("click", function () {
    $(this).parent().toggleClass("active");
    $(this).parent().next().slideToggle("fast");
    $(this).toggleClass("active");
  });

  $(".t-dropdown-input").width(
    $(".t-dropdown-select").width() - $(".t-select-btn").width() - 13
  );

  $(".t-dropdown-list").width($(".t-dropdown-select").width());

  $(".t-dropdown-input").val("");

  $("li.t-dropdown-item").on("click", function () {
    var text = $(this).html();
    $(this).parent().parent().prev().find(".t-dropdown-input").val(text);
    $(".t-dropdown-list").slideUp("fast");
  });

  $(document).on("click", function (event) {
    if (
      $(event.target).closest(".t-dropdown-input, .t-select-btn, label").length
    )
      return;
    $(".t-dropdown-list").slideUp("fast");
    $(".t-dropdown-select").removeClass("active");
    event.stopPropagation();
  });

  $(".t-dropdown-item").click(function () {
    $(".t-dropdown-list").slideUp("fast");
    $(".t-dropdown-select").removeClass("active");
  });

  $(".filter__sidebar-close").click(function () {
    $(this).parent().next().slideToggle(300);
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).html("Развернуть");
    } else {
      $(this).html("Скрыть");
    }
  });

  $(window).resize(function () {
    if ($(window).width() >= 991) {
      $(".filter__sidebar-body").css("display", "block");
    }
  });

  $(".pay__item-input").click(function () {
    $(".pay__item").removeClass("active");
    if ($(this).is(":checked")) {
      $(".pay__lines").fadeIn();
      $(this).parent().addClass("active");
    }
  });

  $(".card__right-like").click(function () {
    $(this).toggleClass("active");
  });

  $("[data-tabs]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-content]").hide().eq(index).fadeIn();
    }
    return false;
  });

  $("[data-faq-tabs]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index2 = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-faq-content]").hide().eq(index2).fadeIn();
    }
    return false;
  });

  $(".balance__copy-icon").click(function () {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Кошелёк скопирован: " + copyText.value);
  });

  $("[data-table-tabs]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index2 = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-table-content]").hide().eq(index2).fadeIn();
    }
    return false;
  });

  $(".draft__block input").click(function () {
    $(".draft__block").removeClass("active");
    if ($(this).is(":checked")) {
      $(this).parent().addClass("active");
    }
  });

  $(".draft__radios-item input").click(function () {
    $(".draft__radios-item").removeClass("active");
    if ($(this).is(":checked")) {
      $(this).parent().addClass("active");
    }
  });

  $("#go-play").click(function () {
    $(".game").slideToggle(300);
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).html("Отменить");
    } else {
      $(this).html("Играть");
      $(this).removeClass("active");
    }
  });

  $(".forum-massage__answer-header").click(function () {
    $(this).toggleClass("active");
    $(this).next().slideToggle(300);
  });

  $("[data-table-tabs2]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index3 = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-table-content2]").hide().eq(index3).fadeIn();
    }
    return false;
  });

  $("[data-massage-tabs]").on("click", function () {
    if (!$(this).hasClass("current")) {
      var index4 = $(this).index();
      $(this).addClass("current").siblings().removeClass("current");
      $("[data-massage-content]").hide().eq(index4).fadeIn();
    }
    return false;
  });

  $(".links__header-item").click(function () {
    $(this).toggleClass("active");
    $(this).next().slideToggle(300);
  });

  $(window).resize(function () {
    if ($(window).width() > 991) {
      $(".links__items-inner").addClass("grid");
    } else {
      $(".links__items-inner").removeClass("grid");
    }
  });

  $(document).on("click", function (e) {
    if ($(window).width() <= 991) {
      if (!$(e.target).closest(".links__header-item, .links__items").length) {
        $(".links__items-inner").slideUp(300);
        $(".links__header-item").removeClass("active");
      }
      e.stopPropagation();
    }
  });

  $("[data-graphic-tabs]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index5 = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-graphic-content]").hide().fadeIn();
    }
    return false;
  });

  $("[data-drop-tabs]").on("click", function () {
    if (!$(this).hasClass("active")) {
      var index6 = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $("[data-drop-content]").hide().eq(index6).fadeIn();
    }
    return false;
  });

  $(".modal__follow-btn").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).html("В чате");
    } else {
      return;
    }
  });

  $(".chat__saidbar-title--icon").hover(function () {
    $(this).next().toggleClass("active");
  });

  $(".chat__saidbar-title--icon").click(function () {
    $(this).addClass("active");
    $(".chat__saidbar-item").removeClass("active");
  });

  $(".chat__saidbar-points").click(function () {
    $(this).toggleClass("active");
    $(this).parent().next().slideToggle(300);
  });
  if ($("div").is(".card-reveiew__text")) {
    autosize($(".card-reveiew__text"));
  }
  if ($("div").is(".card-reveiew__text-answer")) {
    autosize($(".card-reveiew__text-answer"));
  }

  $(".card-reveiew__redact").click(function () {
    $(this).toggleClass("active");
    let area = $(this).parent().prev().val().length;
    if ($(this).hasClass("active")) {
      $(this).parent().prev().toggleClass("active");
      $(this).parent().prev().focus();
      $(this).parent().prev().removeAttr("readonly");
      $(this).children().html("Сохранить");
    } else {
      $(this).children().html("Редактировать");
      $(this).parent().prev().removeClass("active");
      $(this).removeClass("active");
      $(this).parent().prev().attr("readonly", "");
    }
    if (area == 0) {
      $(this).parent().parent().parent().hide();
    }
  });

  $(".forum-massage__end-item--first").click(function () {
    $(".forum-massage__end-item--first").not(this).removeClass("active");
    $(".forum-massage__end-item--first").children().html("Редактировать");
    $(".card-reveiew__text").removeClass("active");
    $(".card-reveiew__text").attr("readonly", "");
    $(this).toggleClass("active");
    let area = $(this).parent().parent().prev().prev().val().length;
    if ($(this).hasClass("active")) {
      $(this).parent().parent().prev().prev().toggleClass("active");
      $(this).parent().parent().prev().prev().focus();
      $(this).parent().parent().prev().prev().removeAttr("readonly");
      $(this).children().html("Сохранить");
    } else {
      $(this).children().html("Редактировать");
      $(this).parent().parent().prev().prev().removeClass("active");
      $(this).removeClass("active");
      $(this).parent().parent().prev().prev().attr("readonly", "");
    }
    if (area == 0) {
      $(this).parent().parent().parent().hide();
    }
  });

  $(".profile-copy .copy").on("click", function () {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#copy-text").text()).select();
    document.execCommand("copy");
    $temp.remove();
    alert("Скопирована");
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#previewImage").attr("src", e.target.result);
        var resize = new Croppie($("#previewImage")[0], {
          viewport: {
            width: 175,
            height: 175,
            type: "circle",
          },
          boundary: {
            width: 255,
            height: 255,
          },
          mouseWheelZoom: false,
          showZoomer: false,
          enableResize: false,
          enableOrientation: false,
        });
        $("#use").fadeIn();
        $("#use").on("click", function () {
          resize.result("base64").then(function (dataImg) {
            var data = [{ image: dataImg }, { name: "myimgage.jpg" }];
            // use ajax to send data to php
            $("#result").attr("src", dataImg);
            // $('#fileInput').attr('value', dataImg);
          });
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#fileInput").change(function (e) {
    readURL(this);
    $(".upload-area__label span").html(e.target.files[0].name);
  });

  function timer() {
    var timer = 0;
    const date = $(".order__spor-timer .time").attr("data-time");
    const newDate = new Date(date).getTime();
    const countdown = setInterval(() => {
      timer = 1000;
      const date = new Date().getTime(),
        diff = newDate - date,
        days = Math.floor(
          (diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24)
        ),
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((diff % (1000 * 60)) / 1000),
        time = `${days < 10 ? "0" + days : days}:${
          hours < 10 ? "0" + hours : hours
        }:${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
      $(".order__spor-timer .time").text(time);
      if (diff === 0) {
        clearInterval(countdown);
      }
    }, timer);
  }

  if ($("div").is(".order__spor-timer")) {
    timer();
  }

  const ratings = document.querySelectorAll(".rating");
  if (ratings.length > 0) {
    initRatings();
  }

  function initRatings() {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }

    // Инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);

      setRatingActiveWidth();

      if (rating.classList.contains("rating_set")) {
        setRating(rating);
      }
    }

    // Инициализайция переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector(".rating__active");
      ratingValue = rating.querySelector(".rating__value");
    }
    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll(".rating__item");
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener("mouseenter", function (e) {
          // Обновление переменных
          initRatingVars(rating);
          // Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener("mouseleave", function (e) {
          // Обновление активных звезд
          setRatingActiveWidth();
        });
        ratingItem.addEventListener("click", function (e) {
          // Обновление переменных
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            // "Отправить" на сервер
            setRatingValue(ratingItem.value, rating);
          } else {
            // Отобразить указанную оцнку
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });
      }
    }

    async function setRatingValue(value, rating) {
      if (!rating.classList.contains("rating_sending")) {
        rating.classList.add("rating_sending");

        // Отправика данных (value) на сервер
        let response = await fetch("rating.json", {
          method: "GET",

          //body: JSON.stringify({
          //	userRating: value
          //}),
          //headers: {
          //	'content-type': 'application/json'
          //}
        });
        if (response.ok) {
          const result = await response.json();

          // Получаем новый рейтинг
          const newRating = result.newRating;

          // Вывод нового среднего результата
          ratingValue.innerHTML = newRating;

          // Обновление активных звезд
          setRatingActiveWidth();

          rating.classList.remove("rating_sending");
        } else {
          alert("Ошибка");

          rating.classList.remove("rating_sending");
        }
      }
    }
  }
  $("#demo").trumbowyg();
});
