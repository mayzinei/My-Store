"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	IonButton,
	IonButtons,
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

	const handleDelete = async (Id: any) => {
		const deletedId = await axios.delete("/product/api/" + Id).then((res) => {
			console.log("Delete Response", res.data);
			getProducts();
		});
		console.log("Deleted Item : ", deletedId);
	};

	const handleView = (Id: any) => {
		window.location.href = "/product/view/" + Id;
	};

	const handleEdit = (Id: any) => {
		window.location.href = "/product/edit/" + Id;
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

						<IonButtons slot="end">
							<IonButton onClick={() => handleView(item.Id)}>
								View
							</IonButton>
							<IonButton onClick={() => handleEdit(item.Id)}>
								Edit
							</IonButton>

							<IonButton onClick={() => handleDelete(item.Id)}>
								Delete
							</IonButton>
						</IonButtons>
					</IonItem>
				))}
			</IonContent>
		</IonPage>
	);
}
