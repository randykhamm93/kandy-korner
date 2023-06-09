import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList.js"
import { ProductContainer } from "../products/ProductContainer.js"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 id="heading">Kandy Korner</h1>
                    <div>Your one-stop-shop to get your sweet tooth fix</div>

                    <Outlet />
                </>
            }>
                <Route path="/locations" element={ <LocationList /> } />
                <Route path="/search" element={ <ProductContainer /> } />
            </Route>
        </Routes>
    )
}
