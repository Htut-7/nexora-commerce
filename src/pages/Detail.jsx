import { useEffect, useState } from "react";
import "../css/Detail.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { FaBackspace, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

export default function Detail() {

    const { id } = useParams();

    const [selectedImage, setSelectedImage] = useState("");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let {addCart}=useCart();

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);
                setError(null);

                const docRef = doc(db, "products", id);
                const snapDoc = await getDoc(docRef);

                if (snapDoc.exists()) {

                    const productData = {
                        id: snapDoc.id,
                        ...snapDoc.data()
                    };

                    setProduct(productData);

                    if (productData.image?.length > 0) {
                        setSelectedImage(productData.image[0]);
                    }

                } else {
                    setError("Product not found");
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchProduct();

    }, [id]);

    if (error) {
        return <p className="detail-error">{error}</p>;
    }

    if (loading) {
        return <span className="detail-spinner"></span>;
    }

    if (!product) {
        return null;
    }

    return (
        <section className="product-detail">

            <div className="detail-left">

                <div className="main-image-container">
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="main-image"
                    />
                </div>

                <div className="thumbnail-list">
                    {product.image?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={product.title}
                            className={
                                selectedImage === img
                                    ? "thumbnail active"
                                    : "thumbnail"
                            }
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>

                <div className="detail-desc">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                </div>

            </div>

            <div className="detail-right">

                <h1>{product.title}</h1>

                <p className="detail-price">
                    ${product.price}
                </p>

                <div className="detail-category">
                    {product.category?.map((pc) => (
                        <span key={pc}>
                            {pc}
                        </span>
                    ))}
                </div>

                <p className="detail-stock">
                    Status: {product.Stock}
                </p>

                <button className="detail-cart-btn" onClick={()=>addCart(product)}>
                    <FaShoppingCart />
                    Add to Cart
                </button>

                <Link to='/products' className="back-btn">
                    <FaBackspace/>
                </Link>

            </div>

        </section>
    );
}