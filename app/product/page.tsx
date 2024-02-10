"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	IonButton,
	IonContent,
	IonHeader,
	IonItem,
	IonPage,
	IonTitle,
} from "@ionic/react";

export default function ProductPage() {
	const [products, setProducts] = useState<any>([]);

	useEffect(() => {
		getProducts();
	}, [1]);

	const getProducts = async () => {
		await axios.get("/product/api/").then((res) => {
			console.log("Product Data", res.data);
			setProducts(res.data);
		});
	};

	const handleDelete = async (item: any) => {
		await axios.delete("/product/api/" + item?.Id).then((res) => {
			console.log("Delete Response", res.data);
			getProducts();
		});
		console.log(item);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonTitle>Product List</IonTitle>
			</IonHeader>
			<IonContent>
				{products?.map((item: any, index: number) => (
					<IonItem key={index}>
						{item?.Name}
						<IonButton slot="end">
							{" "}
							<IonButton onClick={() => handleDelete(item)}>
								Delete
							</IonButton>
						</IonButton>
					</IonItem>
				))}
			</IonContent>
		</IonPage>
	);
}
