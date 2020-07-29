import { numeralDateInputByPosition } from '../../locators/numeralDate';
import { positionOfElement } from '../helper';

Then('I click on first input', () => {
  numeralDateInputByPosition(positionOfElement('first')).click();
});

Then('I type numeral characters {string} in {string} inputs', (text, position) => {
  numeralDateInputByPosition(positionOfElement(position)).clear().type(text);
  numeralDateInputByPosition(positionOfElement(position)).parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('{string} numeral input is set to {string}', (position, text) => {
  numeralDateInputByPosition(positionOfElement(position)).should('have.value', text);
});

Then('I type no numeral characters {string} in inputs', (text) => {
  numeralDateInputByPosition(positionOfElement('first')).clear().type(text);
  numeralDateInputByPosition(positionOfElement('second')).clear().type(text);
  numeralDateInputByPosition(positionOfElement('third')).clear().type(text);
});

Then('inputs have value {string}', (text) => {
  numeralDateInputByPosition(positionOfElement('first')).should('have.value', text);
  numeralDateInputByPosition(positionOfElement('second')).should('have.value', text);
  numeralDateInputByPosition(positionOfElement('third')).should('have.value', text);
});

Then('Date format in {string} input is set to {word}', (position, text) => {
  numeralDateInputByPosition(positionOfElement(position)).should('have.attr', 'placeholder', text);
  numeralDateInputByPosition(positionOfElement(position)).should('have.attr', 'placeholder', text);
  numeralDateInputByPosition(positionOfElement(position)).should('have.attr', 'placeholder', text);
});
