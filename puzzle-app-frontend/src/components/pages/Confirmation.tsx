import {useEffect, useState} from "react";
import Cookies from "js-cookie";

export default function Confirmation() {
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const COOKIE_KEY = "shopping_cart"

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`http://localhost:8080/checkout/session-status?sessionId=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'complete') {
        Cookies.remove(COOKIE_KEY)
        return (
            <section id="success" className="py-2">
                <div className="alert alert-success" role="alert">
                <p className="mb-2">
                    We appreciate your business! A confirmation email will be sent to {customerEmail}.
                </p>

                <p className="mb-0">
                    If you have any questions, please email <a href="mailto:orders@example.com" className="alert-link">orders@example.com</a>.
                </p>
                </div>
            </section>
        )
    }

    return null;
}