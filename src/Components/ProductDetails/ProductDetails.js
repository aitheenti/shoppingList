import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";

import Modal from "../Modal/Modal";
import "./ProductDetails.css";

//if img length > 1 , add buttons

function Images(props) {
	return (
		<div>
			{props.images.map((img, idx) => (
				<div key={idx} className='product-hero-thumbnail-images'>
					<img src={img.href} alt={img.alt} />
				</div>
			))}
		</div>
	);
}

function ProductDetails() {
	const [shopList, setshopList] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState({
		isModalOpen: false,
		details: null,
	});

	useEffect(() => {
		axios
			.get(
				`https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json`
			)
			.then((res) => {
				setshopList(res.data.groups);
				debugger;
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{/* Modal component to display related product images */}
			<Modal
				open={modalIsOpen.isModalOpen}
				onClose={() => setModalIsOpen({ isModalOpen: false, details: null })}
				productInfo={shopList}
			>
				{modalIsOpen.details ? <Images images={modalIsOpen.details} /> : null}
				<FiArrowLeftCircle />
				<FiArrowRightCircle />
			</Modal>

			<h2 className='catalog-heading'> Our Product Catalog</h2>

			{/* Catalog container */}
			<div className='productCatalogContainer'>
				{/* mapping the data to display product name, hero image, price and reviews */}
				{shopList &&
					shopList.map((data) => {
						return (
							<div className='product-container' key={data.id}>
								<div className='productName'> {data.name} </div>

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
										onClick={() => {
											setModalIsOpen({
												isModalOpen: true,
												details: data.images,
											});
										}}
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
