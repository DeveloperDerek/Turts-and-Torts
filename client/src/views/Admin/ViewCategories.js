import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import ProductCol from "../../components/Admin/ProductCol";

const ViewCategories = () => {
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/category/getall`)
        .then((res) => setCategories(res.data))
    }, [])
    
    if(categories === null) {
        return(<div>Loading...</div>)
    }

    const viewProduct = (cat) => {
        if (cat === "") {
            setProducts([])
        }
        axios
        .get(`http://localhost:8000/api/category/view-products/${cat}`)
        .then((res) => {
            setCategory(res.data)
            setProducts(res.data.products)
        })
    }
    

    const removeProduct = (id) => {
        const data = {category_id : category._id, product_id: id}
        axios
        .post(`http://localhost:8000/api/category/remove-product`, data)
        .then((res) => viewProduct(res.data._id))
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row px-5">
                    <p className="display-6 text-center py-2">Search Categories</p>
                    <div className="px-5">
                        <div className="form-floating mb-3">
                            <select className="form-control" onChange={(e) => viewProduct(e.target.value)}>
                                <option value="test">Select One</option>
                                {categories.map((cat, idx) => {
                                    return(
                                        <option key={idx} value={cat._id}>{cat.name}</option>
                                        )
                                    })}
                            </select>
                            <label>Category</label>
                        </div>
                    </div>
                    <a className="lead text-center" href={`/admin/edit-category/${category._id}`}>{category.name}</a>
                    <p>{category.description}</p>
                    <ProductCol products={products} destroy={removeProduct} />
                </div>
            </div>
        </div>
    )
}

export default ViewCategories