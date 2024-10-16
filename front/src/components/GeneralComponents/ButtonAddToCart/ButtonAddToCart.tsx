"use client";

// Vendors
import React from "react";

// Hooks
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext/TokenContext";

// Types
import { IPropsButtonAddToCart } from "./types";
import { IProduct } from "@/components/HomeComponents/Product/types";

// Libraries
import Swal from "sweetalert2";

export const ButtonAddToCart: React.FC<IPropsButtonAddToCart<IProduct>> = ({ product: { id, image, name, price }, quantity, disabled }: IPropsButtonAddToCart<IProduct>): React.ReactElement => {

    const { token } = useToken();
    const { userData } = useUserData();
    const router = useRouter();

    const handleAddProduct = () => {

        if (!token) {

            return (

                Swal.fire({
                    title: "¡Error al agregar producto!",
                    text: `¡Debes tener una cuenta para poder agregar un producto!`,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }),

                router.push("/login")

            );

        };

        const storedProducts = localStorage.getItem(`productsCart-${userData?.id}`);

        const productsCart = storedProducts ? JSON.parse(storedProducts) : [];

        const productExist = productsCart.findIndex((product: IProduct) => product.id === id);

        if (productExist !== -1) {

            productsCart[productExist].quantity += quantity;

            Swal.fire({
                title: "¡Producto agregado con éxito!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });

            return localStorage.setItem(`productsCart-${userData?.id}`, JSON.stringify(productsCart));

        };

        productsCart.push({ id, image, name, price, quantity });

        localStorage.setItem(`productsCart-${userData?.id}`, JSON.stringify(productsCart));

        Swal.fire({
            title: "¡Producto agregado con éxito!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });

    };

    return <button onClick={handleAddProduct} className="px-5 py-3 w-[200px] text-sm cBColor lColor transition-all hover:bg-[#6ca7ecad] disabled:bg-[#373737] md:text-base" disabled={disabled}>AGREGAR AL CARRITO</button>;

};

export default ButtonAddToCart;