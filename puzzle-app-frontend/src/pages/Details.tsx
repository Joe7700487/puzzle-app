import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Puzzle} from "../types/Puzzle.tsx";
import Cookies from "js-cookie";
import type {Cart, CartItem} from "../types/Cart.tsx";

export default function Details() {
    const {id} = useParams()
    const [puzzle, setPuzzle] = useState<Puzzle>()
    const [showMessage, setShowMessage] = useState(false)
    const COOKIE_KEY = "shopping_cart"

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/puzzles/' + id);
            const puzzle = await res.json();
            setPuzzle(puzzle)
        }

        fetchData()
    }, [])

    const handleAddToCart = () => {

        const raw = Cookies.get(COOKIE_KEY)
        const cart: Cart = raw ? JSON.parse(raw) : { items: [] }
        const existing = cart.items.find((item: CartItem) => item.id === puzzle?.id)
        const quantity = 1

        const updatedItems = existing
            ? cart.items.map((item: CartItem) =>
                item.id === puzzle?.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
            //: [...cart.items, { id: puzzle.id, price: puzzle.price, quantity }]
            : [...cart.items, { id: puzzle?.id, quantity }]

        Cookies.set(COOKIE_KEY, JSON.stringify({ items: updatedItems }), { expires: 1 })

        setShowMessage(true)
    }

    return (
        <section className="py-2">
            {
                showMessage && (
                    <p className="alert alert-success" role="alert">
                        Item added to cart successfully
                    </p>
                )
            }

            {
                puzzle && (
                    <div className="card text-start">
                        <div className="card-body">
                        <h1 className="h3 card-title">{puzzle.name}</h1>
                        <p className="card-text mb-4">{puzzle.description}</p>
                        <p className="mb-0">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Add to cart
                            </button>
                        </p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}