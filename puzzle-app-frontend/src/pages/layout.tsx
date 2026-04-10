import {Link, Outlet} from "react-router";

export default function Layout() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <nav className="navbar navbar-expand bg-body-tertiary border-bottom mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="bi bi-film"></i> puzzle store
                    </Link>


                    <div className="d-flex align-items-center">
                        <Link to="/cart" className="text-reset fs-4">
                            <i className="bi bi-cart4"></i>
                        </Link>

                    </div>
                </div>
            </nav>

            <main className="container flex-grow-1 pb-4">
                <Outlet/>
            </main>

            <footer className="border-top py-3 text-center text-muted small">
                puzzle store, &copy; 2026
            </footer>
        </div>
    )
}