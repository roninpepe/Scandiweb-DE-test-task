import { Component } from 'react';
import { IElementProps } from 'types/scandiweb-de-test-task';

class HeaderCategory extends Component<IElementProps> {
  componentDidUpdate() {}

  render() {
    return (
      <a
        href={`../category/${this.props.children}`}
        className={`header__category${
          this.props.location?.pathname === '/category/' + this.props.children
            ? ' header__category_active'
            : ''
        }`}
      >
        {this.props.children}
      </a>
    );
  }
}

export default HeaderCategory;
