import React from 'react';

export interface Item {
  listing_id: number;
  url?: string;
  MainImage?: {
    url_570xN?: string;
  };
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}

interface ListingProps {
  items?: Item[];
}

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  const formatPrice = (price: string, currencyCode: string): string => {
    const numericPrice = parseFloat(price).toFixed(2);
    switch (currencyCode) {
      case 'USD': return `$${numericPrice}`;
      case 'EUR': return `€${numericPrice}`;
      case 'GBP': return `£${numericPrice}`;
      default: return `${currencyCode} ${numericPrice}`;
    }
  };

  const getStockClass = (quantity: number): string => {
    if (quantity <= 10) return 'stock-low';
    if (quantity <= 20) return 'stock-medium';
    return 'stock-high';
  };

  const truncateTitle = (title: string): string => {
    return title.length > 50 ? title.slice(0, 50) + '…' : title;
  };

  const validItems = items.filter(
    (item): item is Item =>
      item.MainImage !== undefined && item.MainImage.url_570xN !== undefined
  );

  return (
    <div className="listing-container">
      {validItems.map((item) => (
        <div key={item.listing_id} className="product-card">
          <img
            src={item.MainImage!.url_570xN}
            alt={truncateTitle(item.title)}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{truncateTitle(item.title)}</h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.price, item.currency_code)}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;