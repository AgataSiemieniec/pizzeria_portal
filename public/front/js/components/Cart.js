import {settings, select, classNames, templates} from './../settings.js';
import utils from './../utils.js';
import CartProduct from './CartProduct.js';

class Cart{
  constructor(element){
    const thisCart = this;

    thisCart.products = [];
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;

    thisCart.getElements(element);
    thisCart.initActions();


    // console.log('new Cart', thisCart);
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;

    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.phone = element.querySelector(select.cart.phone.value);
    // console.log(thisCart.dom.phone);
    thisCart.dom.address = element.querySelector(select.cart.address.value);
    // console.log(thisCart.dom.address);

    /*tworzymy tu tablicę, zawierającą 4 stringi(ciągi znaków). każdy jest kluczem w obiekcie select.cart.tworzymy wlaściwośi
    obiektu thisCart.dom o tych samych kluczach. Każda z nich będzie zawierać kolekcję elementów znalezionych za pomocą odpowiedniego selektora. */

    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];

    for(let key of thisCart.renderTotalsKeys){
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
  }

  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function(event){
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  add(menuProduct){
    const thisCart = this;

    // console.log('adding product', menuProduct);

    /* generate HTML code */
    const generatedHTML = templates.cartProduct(menuProduct);
    /*create DOM element -stworzyć element DOM na podstawie tego kodu produktu,*/
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    /* find menu container - znaleźć na stronie kontener menu*/
    const cartContainer = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    /* wstawić stworzony element DOM do kontenera*/
    cartContainer.appendChild(generatedDOM);

    thisCart.update();
  }

  update(){
    const thisCart = this;

    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for(let product of thisCart.products){
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }

    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;
    console.log('thisCart.totalNumber', thisCart.totalNumber);
    console.log('thisCart.subtotalPrice', thisCart.subtotalPrice);
    console.log('thisCart.totalPrice', thisCart.totalPrice);
    console.log('thisCart.products', thisCart.products);

    for(let key of thisCart.renderTotalsKeys){
      for(let elem of thisCart.dom[key]){
        elem.innerHTML = thisCart[key];
      }
    }
  }

  remove(cartProduct){
    const thisCart = this;
    const indexOfCartProduct = thisCart.products.indexOf(cartProduct);
    console.log('indexOfCartProduct', indexOfCartProduct);

    thisCart.products.splice(indexOfCartProduct, 1);
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }

  sendOrder(){
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.address,
      phone: thisCart.dom.phone,
      totalPrice: thisCart.totalPrice,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      deliveryFee: thisCart.deliveryFee,

      products: [],
    };

    for (let product of thisCart.products){
      product.getData(); // ?
      payload.products.push(product.getData());
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
}

export default Cart;
