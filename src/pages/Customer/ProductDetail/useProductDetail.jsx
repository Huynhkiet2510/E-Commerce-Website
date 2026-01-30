import { useState, useEffect } from "react";
import axios from "axios";
import { getProductDetail } from "../../../services/ProductDetailApi";

const useProductDetail = (slug) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeImg, setActiveImg] = useState("");

    const fetchProductDetail = async (signal) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getProductDetail(slug, { signal });
            setProduct(res.data);
            setActiveImg(res.data?.images?.[0])
        } catch (err) {
            if (axios.isCancel(err)) return;
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const controller = new AbortController();
        fetchProductDetail(controller.signal);
        return () => controller.abort();
    }, [slug]);

    return {
        fetchProductDetail, product, loading, error, activeImg, setActiveImg
    };
};

export default useProductDetail;