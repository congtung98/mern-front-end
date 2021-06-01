import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
const PUBLIC_KEY = 'pk_test_51It8V8CyrW0u6wi2YKxWmlXBcpkjUQmbAjHvg8KfYnyRMbUbitwbXUJopH0BoaMSu4DsMq9uAGeD3Swx2Euo1bQB00yqt7Y5ol'

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
    const { onConfirmOrder, totalPrice } = props;
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm onConfirmOrder={onConfirmOrder} totalPrice={totalPrice} />
        </Elements>
    )
}
