import {useEffect, useState} from "react";
import {Link} from "react-router";
import Cookies from "js-cookie";
import type {Cart as ShoppingCart, CartItem} from "../../types/Cart.tsx";
import type {Puzzle} from "../../types/Puzzle.tsx";

const COOKIE_KEY = "shopping_cart";
const PLACEHOLDER_IMAGE = "/placeholder-image.svg";

interface CartRow {
    puzzle: Puzzle;
    quantity: number;
}

// read cart items from cookies
function readCartItems(): CartItem[] {
    const raw = Cookies.get(COOKIE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw) as ShoppingCart;
        if (!Array.isArray(parsed.items)) return [];

        return parsed.items.filter((item: CartItem) =>
            item.quantity > 0
        );
    } catch {
        return [];
    }
}

// save cart items to cookies
function writeCartItems(items: CartItem[]): void {
    if (items.length === 0) {
        Cookies.remove(COOKIE_KEY);
        return;
    }

    Cookies.set(COOKIE_KEY, JSON.stringify({ items }), { expires: 1 });
}

function Cart() {
    // state management
    const [rows, setRows] = useState<CartRow[]>([]);
    const [loading, setLoading] = useState(true);

    // handle quantity updates for cart items
    const handleQuantityChange = (puzzleId: number, rawValue: string): void => {
        const parsed = Number.parseInt(rawValue, 10);
        const nextQuantity = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);

        setRows((prevRows) => {
            const nextRows = prevRows.flatMap((row) => {
                if (row.puzzle.id !== puzzleId) return [row];
                if (nextQuantity === 0) return [];
                return [{ ...row, quantity: nextQuantity }];
            });

            writeCartItems(nextRows.map((row) => ({ id: row.puzzle.id, quantity: row.quantity })));
            return nextRows;
        });
    };

    // load cart items and fetch puzzle details
    useEffect(() => {
        const loadCart = async () => {
            // get cart items from cookies
            const cartItems = readCartItems();
            if (cartItems.length === 0) {
                setRows([]);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:8080/puzzles/");
                const puzzles = (await res.json()) as Puzzle[];
                const puzzleById = new Map(puzzles.map((puzzle) => [puzzle.id, puzzle]));

                // merge cart items with puzzle details
                const nextRows: CartRow[] = cartItems
                    // match cart items with puzzle names
                    .map((item) => {
                        const puzzle = puzzleById.get(item.id);
                        if (!puzzle) return null;
                        return { puzzle, quantity: item.quantity };
                    })
                    .filter((row): row is CartRow => row !== null);

                setRows(nextRows);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    return (
        <section className="py-2">
            <h1 className="h2 mb-4">Cart</h1>

            {loading && <p className="text-muted">Loading cart...</p>}

            {!loading && rows.length > 0 && (
                <div className="list-group mb-4">
                    {rows.map((row) => {
                        const imageSrc = row.puzzle.image?.trim() ? row.puzzle.image : PLACEHOLDER_IMAGE;

                        return (
                            <div key={row.puzzle.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={imageSrc}
                                        alt={row.puzzle.name}
                                        className="rounded"
                                        style={{ width: 48, height: 48, objectFit: "cover", flexShrink: 0 }}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = PLACEHOLDER_IMAGE;
                                        }}
                                    />
                                    <div>
                                        <div>{row.puzzle.name}</div>
                                        <div className="d-flex align-items-center gap-2 mt-1">
                                            <small className="text-muted">Qty</small>
                                            <input
                                                type="number"
                                                min={0}
                                                step={1}
                                                value={row.quantity}
                                                onChange={(e) => handleQuantityChange(row.puzzle.id, e.target.value)}
                                                className="form-control form-control-sm"
                                                style={{ width: 72 }}
                                                aria-label={`Quantity for ${row.puzzle.name}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/details/${row.puzzle.id}`} className="btn btn-outline-primary btn-sm">
                                    View details
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}

            {!loading && rows.length === 0 && (
                <p className="text-muted mb-4">Your cart is empty.</p>
            )}

            <p className="mb-0">
                <Link
                    to="/checkout"
                    className={`btn btn-primary ${rows.length === 0 ? "disabled" : ""}`}
                    aria-disabled={rows.length === 0}
                    onClick={(e) => {
                        if (rows.length === 0) e.preventDefault();
                    }}
                >
                    Proceed to Checkout
                </Link>
            </p>
        </section>
    )
}

export default Cart
