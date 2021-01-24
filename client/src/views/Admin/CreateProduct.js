import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";

const CreateProduct = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageKey, setImageKey] = useState("");
    const [stock, setStock] = useState("");
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/category/getall")
        .then((res) => setCategories(res.data))
    }, [])

    if(categories === null) {
        return(<div>Loading...</div>)
    }

    const formHandler = (e) => {
        e.preventDefault();
        const data = {title, description, price, imageKey, stock, id: category}
        axios
        .post("http://localhost:8000/api/product/create", data)
        .then((res) => {
            navigate(`/admin/edit-product/${res.data._id}`)
        })
        .catch((err) => console.log(err.response))
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5">
                <p className="display-6 text-center py-2">Add Product</p>
                <form onSubmit={formHandler}>
                    <div className="px-5">
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <label>Title</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option disabled>Select One</option>
                                        {categories.map((cat, idx) => {
                                            return(
                                                <option key={idx} value={cat._id}>{cat.name}</option>
                                            )
                                        })}
                                    </select>
                                    <label>Category</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={imageKey} onChange={(e) => setImageKey(e.target.value)} />
                            <label>Image Url</label>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <label>Price</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                                    <label>Stock</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" style={{height: "100px"}} value={description} onChange={(e) => setDescription(e.target.value)} /> 
                            <label>Description</label>
                        </div>
                        <div className="py-2">
                            <button className="btn btn-dark float-end">ADD PRODUCT</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct