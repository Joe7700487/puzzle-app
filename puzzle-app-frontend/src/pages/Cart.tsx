import {Link} from "react-router";

function Cart() {
    return (
        <>
            <h1>Cart</h1>

            <p>
                Show all products in shopping cart (stored in cookie).
            </p>

            <p>
                <Link to="/Checkout" className="btn btn-primary">Proceed to Checkout</Link>
            </p>
        </>
    )
}

export default Cart
