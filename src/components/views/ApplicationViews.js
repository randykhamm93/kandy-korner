import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList.js"
import { ProductList } from "../products/ProductList.js"
import { NewProductForm } from "../products/NewProductForm.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 id="heading">Kandy Korner</h1>
                    <div>Your one-stop-shop to get your sweet tooth fix</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
								<Route path="products" element={ <ProductList /> } />
								<Route path="products/new" element={ <NewProductForm /> } />
								
            </Route>
        </Routes>
    )
}
