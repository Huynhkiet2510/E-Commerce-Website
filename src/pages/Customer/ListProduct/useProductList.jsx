import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../../../services/ProductListApi";
import axios from "axios";

export const useProductList = (isCategoryPage = false, slugId = null, searchTerm = "") => {
    const [listItem, setListItem] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(500);
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = 12;
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const [tempFilters, setTempFilters] = useState({
        minPrice: searchParams.get("price_min") || "",
        maxPrice: searchParams.get("price_max") || "",
        categoryId: searchParams.get("categoryId") || slugId || null,
        sortBy: "Mới nhất"
    });

    const keywordFromUrl = searchParams.get("keyword") || ""

    const fetchData = useCallback(async (config = {}) => {
        setLoading(true);
        setError(null);
        setListItem([]);
        try {
            const params = {
                offset: (currentPage - 1) * limit,
                limit: limit,
                price_min: searchParams.get("price_min"),
                price_max: searchParams.get("price_max"),
                title: keywordFromUrl || searchTerm,
                categoryId: isCategoryPage ? slugId : searchParams.get("categoryId")
            };

            const res = await getProducts(params, config);
            setListItem(res.data);
        } catch (err) {
            if (axios.isCancel(err)) return;
            setError(err);
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [searchParams, currentPage, isCategoryPage, slugId, keywordFromUrl, searchTerm]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchCategories = async () => {
            try {
                const res = await getCategories(20, { signal: controller.signal })
                setCategories(res.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Lỗi tải danh mục", err);
            }
        };
        fetchCategories();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchData({ signal: controller.signal });
        return () => controller.abort();
    }, [fetchData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (isCategoryPage && slugId) {
            setTempFilters(prev => ({ ...prev, categoryId: slugId }));
        }
    }, [isCategoryPage, slugId]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        params.set("page", "1");
        if (tempFilters.minPrice) params.set("price_min", tempFilters.minPrice);
        if (tempFilters.maxPrice) params.set("price_max", tempFilters.maxPrice);
        if (!isCategoryPage && tempFilters.categoryId) params.set("categoryId", tempFilters.categoryId);
        setSearchParams(params);
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page);
        }
        setSearchParams(params);
    };

    const sortedItems = useMemo(() => {
        let result = [...listItem];
        if (tempFilters.sortBy === "Giá tăng dần") result.sort((a, b) => a.price - b.price);
        else if (tempFilters.sortBy === "Giá giảm dần") result.sort((a, b) => b.price - a.price);
        else result.sort((a, b) => b.id - a.id);
        return result;
    }, [listItem, tempFilters.sortBy]);

    return {
        loading, error, sortedItems, categories, totalPages, currentPage, tempFilters,
        setTempFilters, setCategories, handleInputChange, handleApplyFilters, fetchData,
        handlePageChange, setSearchParams, isFilterOpen, setIsFilterOpen,
    };
};