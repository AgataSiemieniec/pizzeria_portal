import {select, classNames, templates} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';


class Product{
  constructor(id, data){
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();

    // console.log('new Product:', thisProduct);
  }

  renderInMenu(){
    const thisProduct = this;

    /* generate HTML based on template - wygenerować kod HTML pojedynczego produktu*/
    const generatedHTML = templates.menuProduct(thisProduct.data);
    /* create element using utils.createElementeFromHTML - stworzyć element DOM na podstawie tego kodu produktu,*/
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);
    /* find menu container - znaleźć na stronie kontener menu*/
    const menuContainer = document.querySelector(select.containerOf.menu);
    /* add element to menu - wstawić stworzony element DOM do znalezionego kontenera menu*/
    menuContainer.appendChild(thisProduct.element);
  }

  getElements(){
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  initAccordion(){
    /*pod żadnym z produktów nie są widoczne opcje.
    po kliknięciu w nazwę produktu, opcje pokazują się, ale tylko dla tego produktu.
    Jeśli jeden produkt ma wyświetlone opcje, to kliknięcie w nazwę innego produktu powinno zamknąć opcje
    wcześniej otwartego produktu, i jednocześnie pokazać opcje produktu, którego nazwę kliknęliśmy.*/
    const thisProduct = this;

    /* find the clickable trigger (the element that should react to clicking) */
    const clickableTriggers = thisProduct.accordionTrigger;//<---zmienione na - const clickableTriggers = thisProduct.element.querySelectorAll(select.menuProduct.clickable);
    // console.log(clickableTriggers);
    /* START: click event listener to trigger */
    //for(let clickableTrigger of clickableTriggers) {
    clickableTriggers.addEventListener('click', function(event){
      // console.log('clicked');
      /* prevent default action for event */
      event.preventDefault();
      /* toggle active class on element of thisProduct */
      thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      // console.log('Link was clicked');
      /* find all active products */
      const activeProducts = document.querySelectorAll(select.all.menuProductsActive);
      // console.log(activeProducts);
      /* START LOOP: for each active product */
      for(let activeProduct of activeProducts){
        /* START: if the active product isn't the element of thisProduct */
        if(activeProduct !== thisProduct.element){
          /* remove class active for the active product */
          activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
        /* END: if the active product isn't the element of thisProduct */
        }
      /* END LOOP: for each active product */
      }
    /* END: click event listener to trigger */
    });
    //}
  }

  initOrderForm (){
    /* będzie uruchamiana tylko raz dla każdego produktu. Będzie odpowiedzialna za dodanie
    listenerów eventów do formularza, jego kontrolek, oraz guzika dodania do koszyka.*/
    const thisProduct = this;
    // console.log('initOrderForm', thisProduct);
    thisProduct.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisProduct.processOrder();
    });

    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function(event){
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder(){
    const thisProduct = this;
    // console.log('processOrder', thisProduct);
    /* odczytaj wszystkie dane dostępne dla utils.serializeFormToObject */
    /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
    const formData = utils.serializeFormToObject(thisProduct.form);
    // console.log('formData', formData);
    thisProduct.params = {}; /* zapisałam pusty obiekt do właściwości thisProduct.params*/
    /* set variable price to equal thisProduct.data.price */
    let price = thisProduct.data.price;
    // console.log(price);
    /* START LOOP: for each paramId in thisProduct.data.params */

    for(let paramId in thisProduct.data.params){
      /* save the element in thisProduct.data.params with key paramId as const param */
      const param = thisProduct.data.params[paramId];
      // console.log('paramId', paramId);
      /* START LOOP: for each optionId in param.options */

      for(let optionId in param.options){
        /* save the element in param.options with key optionId as const option */
        const option = param.options[optionId];
        // console.log('optionId', optionId);
        /* START IF: if option is selected and option is not default */
        const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;

        if (optionSelected && !option.default){
          /* add price of option to variable price */
          price += option.price;
          // console.log('optionPrice', price);
        /* END IF: if option is selected and option is not default */
        /* START ELSE IF: if option is not selected and option is default */
        } else if(!optionSelected && option.default){
          /* deduct price of option from price */
          price -= option.price;
          // console.log('optionPrice', price);
        /* END ELSE IF: if option is not selected and option is default */
        }
        /* END LOOP: for each optionId in param.options */
        const productImages = thisProduct.imageWrapper.querySelectorAll('.' + paramId + '-' + optionId);
        if (optionSelected){
          /* sprawdzamy, czy ten parametr został już dodany do thisProduct.params.
          Jeśli nie, to pod jego kluczem dodajemy jego label oraz pusty obiekt options.
          Następnie do obiektu options dodajemy zaznaczoną opcję, używając jej klucza,
          a jako wartość ustawiając jej label.*/
          if(!thisProduct.params[paramId]){
            thisProduct.params[paramId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;
          for(let image of productImages){
            image.classList.add(classNames.menuProduct.imageVisible);
          }

        } else {

          for (let image of productImages){
            image.classList.remove(classNames.menuProduct.imageVisible);
          }
        }
      }
    /* END LOOP: for each paramId in thisProduct.data.params */
    }
    /* Multiply price by amount */
    // price *= thisProduct.amountWidget.value;
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;

    /* set the contents of thisProduct.priceElem to be the value of variable price *//* ustaw cenę thisProduct.priceElem przy guziku*/
    // thisProduct.priceElem.innerHTML = price;
    thisProduct.priceElem.innerHTML = thisProduct.price;
    // console.log(thisProduct.params);
  }

  initAmountWidget(){
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

    thisProduct.amountWidgetElem.addEventListener('updated', function(){
      thisProduct.processOrder();
    });
  }

  addToCart(){
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    // app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });

    thisProduct.element.dispatchEvent(event);
  }
}

export default Product; //jedną rzecz możemy importować jako domyślną
