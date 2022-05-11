import {Component} from "react";

import Info from "../info/info";
import Search from "../search/search";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import EmployeesList from "../employees-list/employees-list";
import Filter from "../filter/filter";

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Victor I.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alex V.', salary: 1000, increase: true, rise: false, id: 2},
        {name: 'Carl S.', salary: 5000, increase: false, rise: false, id: 3},
      ],
      term: '',
      filter: 'all',
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {data: data.filter((item) => item.id !== id)};
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  seachEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.seachEmp(data, term), filter);

    return (
      <div className='app'>
        <Info employees={employees} increased={increased}/>

        <div className='search'>
          <Search onUpdateSearch={this.onUpdateSearch}/>
          <Filter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp}/>
        <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
