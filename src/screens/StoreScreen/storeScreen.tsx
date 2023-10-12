import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../reduxToolkit/store';
// import { addProducts } from '../../reduxToolkit/productSlice';
import { Page } from '../../components/Page';
import s from './storeScreen.sass';
// import {
//   ShortDefinitionProductList,
//   ShortDefinitionProductListItem,
// } from '../../components/shortDefinitionProductList/ShortDefinitionProductList';

const StoreScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const products = useSelector((state: RootState) => state.productSlice.data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const loadMore = useCallback(() => {
    if (!reachedEnd && (totalPages === null || page < totalPages)) {
      setPage(page + 1);
    }
  }, [page, reachedEnd, totalPages]);

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   axios
  //     .get(`https://19429ba06ff2.vps.myjino.ru/api/products?pagination={"pageSize":6,"pageNumber":${page}}`, {
  //       headers,
  //     })
  //     .then((response) => {
  //       dispatch(addProducts(response.data.data));
  //       setLoading(false);

  //       if (response.data.pagination) {
  //         const { total }: { total: number } = response.data.pagination;
  //         setTotalPages(Math.ceil(total / 6)); // 6 - это количество товаров на странице
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Getting data error:', error);
  //       setError('Data loading error');
  //       setLoading(false);
  //     });
  // }, [dispatch, page]);

  // useEffect(() => {
  //   setLoading(false);
  // }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (windowHeight + scrollTop >= documentHeight - 100) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  const transformServerData = (serverData: { data: any[] }) => {
    return serverData.data.map((item: { id: string; photo: string; name: string; desc: string; price: number }) => ({
      id: item.id,
      amount: item.price,
      image: item.photo,
      text: item.name,
      shortDefinition: item.desc,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // const productList: ShortDefinitionProductListItem[] = products.map(
  //   (p) =>
  //     ({
  //       id: p.id,
  //       amount: p.price,
  //       image: p.photo,
  //       text: p.desc,
  //       shortDefinition: p.desc,
  //     } as ShortDefinitionProductListItem)
  // );
  return (
    <Page title={t`StoreScreenTitle`} className={s.root}>
      <div>
        <p>StoreScreenTitle</p>
        {/* <ShortDefinitionProductList shortDefinitionProduct={productList} />
        {!reachedEnd && (totalPages === null || page < totalPages) && <div>Loading more...</div>} */}
      </div>
    </Page>
  );
};

export default StoreScreen;
