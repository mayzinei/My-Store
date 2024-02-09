"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IonContent, IonItem, IonPage } from "@ionic/react";

export default function ProductPage() {
	const [products, setProducts] = useState<any>([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		axios.get("/product/api/").then((res) => {
			console.log("Product Data", res.data);
			setProducts(res.data);
		});
	};

	return (
		<div>
			<IonPage>
				<IonContent>
					{products?.map((items: any, index: number) => (
						<IonItem key={index}>{items?.Name}</IonItem>
					))}
				</IonContent>
			</IonPage>
		</div>
	);
}
