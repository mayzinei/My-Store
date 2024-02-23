"use client";
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
	// const router = useRouter();
	// const { id } = router.query;
	const { id } = useParams();
	console.log(id);
	const [product, setProduct] = useState<any>(null);

	const nameRef = useRef<HTMLIonInputElement>(null);
	const buyPriceRef = useRef<HTMLIonInputElement>(null);
	const sellPriceRef = useRef<HTMLIonInputElement>(null);

	useEffect(() => {
		const getProducts = async () => {
			const data = await axios.get(`/product/api/${id}`);
			console.log(data.data);
			setProduct(data.data[0]);
		};

		getProducts();
	}, []);

	const handleSave = async () => {
		const formData = new FormData();
		formData.append("name", nameRef.current?.value?.toString() || "");
		formData.append("buyPrice", buyPriceRef.current?.value?.toString() || "");
		formData.append(
			"sellPrice",
			sellPriceRef.current?.value?.toString() || ""
		);
		formData.append("id", id.toString());

		await axios.patch("/product/api", formData).then((res) => {
			console.log("Product Update res", res.data);
			window.location.href = "/product";
		});
	};
	return (
		<div>
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Edit Page</IonTitle>
						<IonButtons slot="end">
							<IonButton expand="block" onClick={() => handleSave()}>
								Save
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonItem>
						<IonInput
							value={product?.Name}
							placeholder="Name"
							ref={nameRef}
							labelPlacement="fixed"
							label="Name"
						/>
					</IonItem>
					<IonItem>
						<IonInput
							value={product?.BuyPrice}
							placeholder="Buy Price"
							ref={buyPriceRef}
							labelPlacement="floating"
							label="Buy Price"
						/>
					</IonItem>
					<IonItem>
						<IonInput
							value={product?.SellPrice}
							placeholder="Sell Price"
							ref={sellPriceRef}
							labelPlacement="stacked"
							label="Sell Price"
						/>
					</IonItem>
				</IonContent>
			</IonPage>
		</div>
	);
}
