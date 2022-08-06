$(document).ready(function () {
    (function (factory) {
        'use strict'

        if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define(['../widgets/datepicker'], factory)
        } else {
          // Browser globals
          factory(jQuery.datepicker)
        }
      })(function (datepicker) {
        'use strict'

        datepicker.regional.ru = {
          closeText: 'Закрыть',
          prevText: 'Пред',
          nextText: 'След',
          currentText: 'Сегодня',
          monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
          dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
          dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          weekHeader: 'Нед',
          dateFormat: 'dd.mm.yy',
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: '',
        }
        datepicker.setDefaults(datepicker.regional.ru)

        return datepicker.regional.ru
      })

      $.datepicker.setDefaults($.datepicker.regional['ru'])
      $(function () {
        var availableTags = [
          'Albania',
          'Andorra',
          'Armenia',
          'Austria',
          'Azerbaijan',
          'Belarus',
          'Belgium',
          'Bosnia and Herzegovina',
          'Bulgaria',
          'Croatia',
          'Cyprus',
          'Czech Republic',
          'Denmark',
          'Estonia',
          'Finland',
          'France',
          'Georgia',
          'Germany',
          'Greece',
          'Hungary',
          'Iceland',
          'Ireland',
          'Italy',
          'Macedonia',
          'Malta',
          'Monaco',
          'Montenegro',
          'Netherlands',
          'Norway',
          'Poland',
          'Portugal',
          'Romania',
          'Russia',
          'Serbia',
          'Slovakia',
          'Slovenia',
          'Spain',
          'Sweden',
          'Switzerland',
          'Turkey',
          'Ukraine',
          'United Kingdom',
        ]
        $('#tags').autocomplete({
          source: availableTags,
        })
      })

      $(function () {
        $('#from').datepicker({
          defaultDate: '+1w',
          changeMonth: true,
          numberOfMonths: 1,
          onClose: function (selectedDate) {
            $('#to').datepicker('option', 'minDate', selectedDate)
          },
        })
        $('#to').datepicker({
          defaultDate: '+1w',
          changeMonth: true,
          numberOfMonths: 1,
          onClose: function (selectedDate) {
            $('#from').datepicker('option', 'maxDate', selectedDate)
          },
        })
      })
});