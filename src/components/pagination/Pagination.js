import React from 'react';
import PropTypes from 'prop-types';

var FIRST_PAGE = 1;
var PADDING = 2;

export default class Pagination extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.ensurePage(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.ensurePage(this.props);
  }

  ensurePage(props) {
    var maxPages = this.pages(props);
    if (props.count > 0 && props.page < FIRST_PAGE) {
      this.props.setPage(FIRST_PAGE);
    } else if (props.count > 0 && props.page > maxPages) {
      this.props.setPage(maxPages);
    }
  }

  onSetPage(i, e) {
    e.preventDefault();
    if (i >= 1 && i <= this.pages()) {
      this.props.setPage(i);
    }
  }

  pages(props) {
    if (!props) {
      props = this.props;
    }
    if (props.limit === 0) {
      return 0;
    }
    return Math.ceil(props.count / props.limit);
  }

  render() {
    if (this.pages() > 1) {
      return (
        <ul className="pagination pagination-sm">
          { this.renderPrevious() }
          { this.renderPages() }
          { this.renderNext() }
        </ul>
      );
    }
    return false;
  }

  renderPrevious() {
    if (this.props.page <= FIRST_PAGE) {
      return (
        <li className="page-item disabled">
          <a className='page-link disabled'><i className='fa fa-arrow-left'></i> Previous</a>
        </li>
      );
    } else {
      return (
        <li className="page-item">
          <a href="#" className='page-link' onClick={ this.onSetPage.bind(this, this.props.page - 1) }><i className='fa fa-arrow-left'></i> Previous</a>
        </li>
      );
    }
  }

  renderPages() {
    var pages = [];
    if (this.props.page - PADDING > FIRST_PAGE) {
      pages.push(this.renderPage(FIRST_PAGE));
      if (this.props.page - PADDING !== FIRST_PAGE + 1) {
        pages.push(<li key="ellipsis-first" className="page-item"><a className='page-link disabled'><i className='fa fa-ellipsis-h'></i></a></li>);
      }
    }
    var start = Math.max(this.props.page - PADDING, FIRST_PAGE);
    var end = Math.min(this.props.page + PADDING, this.pages(this.props));
    for (var i = start; i <= end; i++) {
      pages.push(this.renderPage(i));
    }
    if (this.props.page + PADDING < this.pages(this.props)) {
      if (this.props.page + PADDING !== this.pages(this.props) - 1) {
        pages.push(<li key="ellipsis-last" className="page-item"><a className='page-link disabled'><i className='fa fa-ellipsis-h'></i></a></li>);
      }
      pages.push(this.renderPage(this.pages(this.props)));
    }
    return pages;
  }

  renderPage(i) {
    if (i === this.props.page) {
      return <li key={ i } className="page-item active"><a className='page-link disabled'>{ i }</a></li>;
    } else {
      return <li key={ i } className='page-item'><a href="#" className='page-link' onClick={ this.onSetPage.bind(this, i) }>{ i }</a></li>;
    }
  }

  renderNext() {
    if (this.props.page >= this.pages(this.props)) {
      return (
        <li className="page-item disabled">
          <a className='page-link disabled'>Next <i className='fa fa-arrow-right'></i></a>
        </li>
      );
    } else {
      return (
        <li className="page-item">
          <a href="#" className='page-link' onClick={ this.onSetPage.bind(this, this.props.page + 1) }>Next <i className='fa fa-arrow-right'></i></a>
        </li>
      );
    }
  }
}
