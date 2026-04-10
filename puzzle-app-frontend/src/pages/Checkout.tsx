import {loadStripe, type StripeEmbeddedCheckoutOptions} from '@stripe/stripe-js';
import {useCallback} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";


export default function Checkout() {

    const stripePromise = loadStripe("pk_test_51T2GECRvVVDMuFjdLixatB09N75KHgocmh4HoAFvnJoyluacGtHTAovCv5AAlOeurgUxhp5gUCrvSAoZHT8kL5oF00Zd3TEwSd")
    const COOKIE_KEY = "shopping_cart"

    const fetchClientSecret = useCallback(async () => {
        // get shopping cart
        const cart = Cookies.get(COOKIE_KEY)

        // Create a Checkout Session
        const res = await fetch("http://localhost:8080/checkout/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: cart
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options:StripeEmbeddedCheckoutOptions = {fetchClientSecret}

    return (
        <section className="py-2">
            <h1 className="h2 mb-4">Checkout</h1>
            <div id="checkout" className="card">
                <div className="card-body">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={options}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            </div>
        </section>
    )
}
