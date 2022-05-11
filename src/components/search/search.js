import {Component} from 'react';

import './search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    }
  }

  onUpdateSearch_ = (e) => {
    const term = e.target.value;
    this.setState({term})
    this.props.onUpdateSearch(term)
  }

  render() {
    return (
      <input
        type='text'
        className='form-control search-input'
        placeholder='Найти сотрудника'
        value={this.state.term}
        onChange={this.onUpdateSearch_ }
      />
    )
  }

}

export default Search;
