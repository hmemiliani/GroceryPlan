import {useCallback} from 'react';

export const useShareableList = () => {
  const formatCategoryList = useCallback(
    (category: string, products: any[]) => {
      if (products.length === 0) return null;

      const uncompletedProducts = products.filter(
        product => !product.completed,
      );
      if (uncompletedProducts.length === 0) return null;

      const formattedList = uncompletedProducts
        .map(product => `- ${product.name} -- x${product.quantity}`)
        .join('\n');

      return `🧺 ${category}:\n${formattedList}`;
    },
    [],
  );

  const formatAllCategories = useCallback(
    (categories: Record<string, any[]>) => {
      const formattedCategories = Object.entries(categories)
        .map(([category, products]) => formatCategoryList(category, products))
        .filter(Boolean)
        .join('\n\n');

      return formattedCategories || 'No hay productos pendientes.';
    },
    [formatCategoryList],
  );

  return {formatCategoryList, formatAllCategories};
};
