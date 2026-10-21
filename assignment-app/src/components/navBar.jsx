/* 
This component provides links and routing for the pages of the website
 */

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import NotFound from "./pages/notFound";
import SavedResults from "./pages/savedResults";
import CommentOnProject from "./pages/commentOnProject";

export default function NavBar() {
    return (
        <div>
            <div className="sticky-top pb-0" >
                <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme='dark'>
                    <Link to="/" className="navbar-brand ms-4 nav-link ">User Behavior Data</Link>
                    <Link to="/search" className="ms-4 nav-link text-white">Search Through Dataset</Link>
                    <Link to="/savedresults" className="ms-4 nav-link text-white">Saved Aggregate Information</Link>
                    <Link to="/commentonproject" className="ms-4 nav-link text-white">Comment on Project</Link>
                </nav>

                <hr />
                <br className="mb-0 bg-white" />
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/savedresults" element={<SavedResults />} />
                    <Route path="/commentonproject" element={<CommentOnProject />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div >
    )
}