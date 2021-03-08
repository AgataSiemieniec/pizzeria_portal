import {classNames, select, settings, templates} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';


class Booking{
  constructor(bookingWidgetContainer){
    const thisBooking = this;

    thisBooking.render(bookingWidgetContainer);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.tableSelect();
    thisBooking.sendBooking();

  }
  getData(){ // będzie pobierać dane z APi używajac adresów filtrujacych wyniki
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = { // dlaczego zrobilismy to w tablicach i jakie są jeszcze możliwosci ?
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };
    // console.log('getData params', params);

    const urls = {
      booking:        settings.db.url + '/' + settings.db.booking
                                      + '?' + params.booking.join('&'), // zwróci Adres
      eventsCurrent:  settings.db.url + '/' + settings.db.event
                                      + '?' + params.eventsCurrent.join('&'), // jednorazowki
      eventsRepeat:   settings.db.url + '/' + settings.db.event
                                      + '?' + params.eventsRepeat.join('&'), //eventy z powtórzeniami
    };
    // console.log('getData urls', urls);

    Promise.all([ // spowoduje, że napierw muszą zostać wykonane operacje zawarte wewnątrz, aby mogły zostać wykonane operacje kolejne
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat){ // dostepność stolików, sprawdzajacy w czy danym terminie stolik nie jest zarejestrowany
    const thisBooking = this;

    thisBooking.booked = {}; // obiekt w którym sa zapisane info o zajętych stolikach <= lista zajętych stolików

    for(let item of bookings){ // pętla na wszystkie rezarwacje
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for(let item of eventsCurrent){ // pętla na wszystkie wydarzenia jednorazowe
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for(let item of eventsRepeat){ // pętla na wszystkie wydarzenia cykliczne
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){ // to obiekt z datę, wiec musimy zastosować opjcę utils
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    // console.log('thisBooking.booked', thisBooking.booked);

    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table){ // metoda, która uzupełnia nam informacje niezbędne do metody thisBooking.booked
    const thisBooking = this;

    if(typeof thisBooking.booked[date] == 'undefined'){
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour); // konwertujemy liczę jako godzine

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5){
      // console.log('loop', hourBlock);
      if(typeof thisBooking.booked[date][hourBlock] == 'undefined'){
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM(){
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value; // wartości wybrane przez użytkownika
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value); // wartości wybrane przez użytkownika

    let allAvailable = false; // zmienna będzie oznaczać, że tego dnia i danej godzine wszystkie stoliki są dostępne

    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined' // dla thisBooking.date nie ma obiektu
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined' // dla thisBooking.date][thisBooking.hour nie istanieje tablica
    ){ // będzie to oznaczałało, że żaden stolik nie jest zajety, czy wszystkie stoliki są wolne
      allAvailable = true; // wtedy zmieniamy wartość allAvailable na true
    }

    for(let table of thisBooking.dom.tables){ // pętla iteruje po wszystkich stolikach
      let tableId = table.getAttribute(settings.booking.tableIdAttribute); //i pobiera Id aktualnego stolika poprzez. ATRYBUT Z ELEMENTU DOM BEDZIE ZAWSZE TEKSTEM
      if(!isNaN(tableId)){ // sprawdzamy czy tableId jest liczbą
        tableId = parseInt(tableId); // parseInt przekonweruje tableId na liczbę
      } //

      if(
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId) // includes sprawdza czy ten element znajduje się w tablicy
      ){
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  tableSelect(){
    const thisBooking = this;

    /* checking if any tables is available */
    for(let table of thisBooking.dom.tables){
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      tableId = parseInt(tableId);

      table.addEventListener('click', function(){
        if(table.classList.contains(classNames.booking.tableBooked)) {
          alert('Table is not available. Choose a different table');
        } else {
          table.classList.toggle(classNames.booking.tableBooked);
          alert('Table is booked');
        }
      });

      thisBooking.tableSelected = tableId;
    }
  }

  sendBooking(){
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;

    const payload = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      table: thisBooking.tableSelected,
      duration: thisBooking.hoursAmount.value,
      ppl: thisBooking.peopleAmount.value,
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,

      starters: [],
    };

    for (let starter of thisBooking.dom.starters){
      if(starter.checked == true){
        payload.starters.push(starter.value);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(respone){
        return respone.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }

  render(bookingWidgetContainer){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingWidgetContainer;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    thisBooking.dom.form = thisBooking.dom.wrapper.querySelectorAll(select.booking.form);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(select.booking.address);

  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });

    thisBooking.dom.wrapper.addEventListener('submit', function(event){
      event.preventDefault();
      thisBooking.sendBooking();
    });
  }
}

export default Booking;
