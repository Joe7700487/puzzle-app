import {Link, Outlet} from "react-router";

export default function Layout() {
    return (
        <div className="container-fluid">
            <nav className="navbar mb-4">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <i className="bi bi-film"></i> puzzle store
                    </Link>


                    <div className="d-flex">
                        <Link to="/cart" className="text-reset fs-4">
                            <i className="bi bi-cart4"></i>
                        </Link>

                    </div>
                </div>
            </nav>

            <main className="container-fluid">
                <Outlet/>
            </main>

            <footer className="container-fluid mt-5">
                puzzle store, &copy; 2026
            </footer>
        </div>
    )
}