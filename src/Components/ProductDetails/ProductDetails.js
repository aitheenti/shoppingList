import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
	const [shopList, setshopList] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	// https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json
	useEffect(() => {
		axios
			.get(
				`https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json`
			)
			.then((res) => {
				// console.log(res.data.groups);
				setshopList(res.data.groups);
			})
			.catch((err) => console.log(err));
	}, []);

	// function displayOverlay(e) {
	// 	e.preventDefault();
	// 	console.log("overlay");
	// }

	//details, including price, product name and the main hero image
	return (
		<>
			<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
				<div>Im an imported Modal </div>
			</Modal>
			<h2 className='catalog-heading'> Our Product Catalog</h2>
			<div className='productCatalogContainer'>
				{shopList &&
					shopList.map((data) => {
						return (
							<div className='product-container'>
								<div className='productName' key={data.id}>
									{" "}
									{data.name}{" "}
								</div>

								<div className='product-price-high'>
									<div key={data.id}>
										{" "}
										${" "}
										{!!data.price
											? data.price.selling
											: data.priceRange.selling.high}
									</div>
								</div>

								<div className='product-hero-image'>
									<img
										src={data.hero.href}
										alt={data.hero.alt}
										key={data.id}
										onClick={() => setModalIsOpen(true)}
									/>
								</div>
								<div className='product-reviews'>
									<div> Customer Reviews - {data.reviews.averageRating} </div>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default ProductDetails;
