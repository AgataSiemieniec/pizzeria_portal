import {settings, select, classNames} from './settings.js'; // <- tego spoosu używamy gdy importujemy więcej niż jedną rzecz i nie jest to rzecz domyślna
import Product from './components/Product.js'; // <- tego spoosu używamy gdy importujemy jedną rzecz i to domyślną. wtedy możemy nie zastosować nawiasów klamrowych
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';


const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children; // znajdą się tu wszytskie dzieci "pages"
    thisApp.navLinks = document.querySelectorAll(select.nav.links); // znalezienie wszystkich linków

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break; //to sprawia, że nie zostaną wykonane kolejne iteracje pętli
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attribute */
        const  id = clickedElement.getAttribute('href').replace('#', '');

        /*run thisApp.activatePage with that id*/
        thisApp.activatePage(id);

        /* chnage URL hash */
        window. location.hash = '#/' + id;

      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    /* add class "active" to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      // if(page.id == pageId){
      //   page.classList.add(classNames.pages.active);
      // } else {
      //   page.classList.remove(classNames.pages.active);
      // }

      page.classList.toggle(classNames.pages.active, page.id == pageId); // toggle nadaje klasę podaną jako pierwszy argument. jeżeli tej klasy nie było, odbiera ją. drugi argument kontroluje czy klasa zostanie nadana czy nie
    }
    /* add class "active" to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initMenu: function(){
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]); // zmiana --> new Product(productData, thisApp.data.products[productData]);
    }
  },

  initData: function (){
    const thisApp = this;

    thisApp.data = {}; // zmiana --> thisApp.data = dataSource;

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){

        thisApp.data.products = parsedResponse;

        thisApp.initMenu();
      });
    // console.log('thisApp.data',JSON.stringify(thisApp.data));
  },

  initCart: function (){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function(){
    const thisApp = this;

    const bookingWidgetContainer = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(bookingWidgetContainer);

  },

  init: function(){
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);

    thisApp.initPages();

    thisApp.initData();
    // thisApp.initMenu();
    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();

