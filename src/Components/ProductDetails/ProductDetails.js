import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
	const [shopList, setshopList] = useState([]);

	// https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json
	useEffect(() => {
		axios
			.get(
				`https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json`
			)
			.then((res) => {
				console.log(res.data.groups);
				setshopList(res.data.groups);
				debugger;
			})
			.catch((err) => console.log(err));
	}, []);

	//details, including price, product name and the main hero image
	return (
		<div className='productDetailsContainer'>
			{shopList &&
				shopList.map((data) => {
					return (
						<div className='product-title'>
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
								<img src={data.hero.href} alt={data.hero.alt} key={data.id} />
							</div>
							<div className='product-reviews'>
								<div> Customer Reviews - {data.reviews.averageRating} </div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default ProductDetails;
