import {loadStripe, type StripeEmbeddedCheckoutOptions} from '@stripe/stripe-js';
import {useCallback} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";



export default function Checkout() {

    const stripePromise = loadStripe("pk_test_51T2GECRvVVDMuFjdLixatB09N75KHgocmh4HoAFvnJoyluacGtHTAovCv5AAlOeurgUxhp5gUCrvSAoZHT8kL5oF00Zd3TEwSd")

    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const res = await fetch("http://localhost:8080/checkout/create-checkout-session", {
            method: "POST",
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options:StripeEmbeddedCheckoutOptions = {fetchClientSecret}

    return (
        <>
            <h1>
                Checkout
            </h1>
            <div id="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </>
    )
}
