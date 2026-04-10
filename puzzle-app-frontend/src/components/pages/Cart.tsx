import {Link} from "react-router";

function Cart() {
    return (
        <section className="py-2">
            <h1 className="h2 mb-3">Cart</h1>

            <p className="text-muted mb-4">
                Show all products in shopping cart (stored in cookie).
            </p>

            <p className="mb-0">
                <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
            </p>
        </section>
    )
}

export default Cart
