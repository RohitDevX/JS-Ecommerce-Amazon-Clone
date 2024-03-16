import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getdeliveryoption } from '../../data/deliverydata.js';
import { formatCurrency } from '../utils/money.js';
export function paymentsummary(){
    let productpriceCents=0;
    let shippingpriceCents=0;
    cart.forEach((cartitem)=>{
        const product=getProduct(cartitem.productId);
       productpriceCents+= product.priceCents* cartitem.quantity;
       const deliveryoptions=getdeliveryoption(cartitem.deliveryoptionId);
       shippingpriceCents+=deliveryoptions.priceCents;
       console.log(shippingpriceCents/100);
    });
    const totalbeforetaxCents= productpriceCents +shippingpriceCents;
    const taxCents=totalbeforetaxCents *0.1;
    const totalcents=totalbeforetaxCents+taxCents;
    const paymentsummaryHTML=`
            <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productpriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            ${shippingpriceCents/100}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            ${formatCurrency(totalbeforetaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalcents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
`;
document.querySelector('.js-summary').innerHTML=paymentsummaryHTML;
}