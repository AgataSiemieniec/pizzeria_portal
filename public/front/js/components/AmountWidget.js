import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget {
  constructor(element){
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;

    thisWidget.getElements(element);

    thisWidget.initActions();
  }

  getElements(){
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  isValid(value){
    const thisWidget = this;


    if(thisWidget.maxValue) {

      return !isNaN(value)
      && value >= settings.amountWidget.defaultMin
      && value <= thisWidget.maxValue;
    } else {

      return !isNaN(value)
      && value >= settings.amountWidget.defaultMin
      && value <= settings.amountWidget.defaultMax;
    }
  }

  parseValue(value){
    return parseFloat(value);
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function(){
      thisWidget.setValue(thisWidget.dom.input.value);
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();

      if(thisWidget.dom.input.step === ''){
        thisWidget.dom.input.step = '1';
      }

      thisWidget.setValue(thisWidget.value - parseFloat(thisWidget.dom.input.step));
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();


      if(thisWidget.dom.input.step === ''){
        thisWidget.dom.input.step = '1';
      }

      thisWidget.setValue(thisWidget.value + parseFloat(thisWidget.dom.input.step));
    });
  }
}

export default AmountWidget;
