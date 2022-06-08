import { Component } from 'react';
import { ICatalogItem, IElementProps } from 'types/scandiweb-de-test-task';
import CategoryItem from 'components/Category/Item';

import mock from 'mocks/categoryData.json';

const data = mock.items as ICatalogItem[];

class Category extends Component<IElementProps> {
  category: string = window.location.pathname.substring(10) ?? '';

  items: ICatalogItem[] = data.filter(
    (item) => item.category === this.category
  );

  render() {
    this.items.length = 6;

    return (
      <div className="page__category category">
        <div className="category__name">{this.category}</div>
        <div className="category__cont">
          {this.items.map((item, i) => {
            return <CategoryItem position={i + 1} item={item} key={`${i}`} />;
          })}
        </div>
      </div>
    );
  }
}

export default Category;
