import React, { Component } from "react";
import Select from "react-select";
import { SEARCHABLE_ITEMS } from "./Constants";
import "./App.css";

export class App extends Component {
  state = {
    selectedOption: null,
    searchableItems: SEARCHABLE_ITEMS,
    contextItems: [],
  };

  componentDidMount() {
    this.itemInput.focus();
  }

  handleItems = (value, index) => {
    const isValueAlreadyExist = this.state.contextItems.find(
      (item) => item.context === value
    );
    if (!isValueAlreadyExist) {
      let contextItems = this.state.contextItems;
      contextItems.push({
        context: value,
        value: 1000,
        isKey: true,
        mandatory: true,
        recommended: false,
      });
      this.setState({
        searchableItems: this.state.searchableItems.filter(
          (item, itemIndex) => itemIndex !== index
        ),
        contextItems,
        selectedOption: null,
      });
    }
  };

  handleChange = (event, index, field) => {
    let contextItems = this.state.contextItems;
    contextItems[index][field] = event.target.checked;
    if (field === "recommended" && event.target.checked === true) {
      contextItems[index]["isKey"] = false;
      contextItems[index]["mandatory"] = false;
    }
    this.setState({ contextItems });
  };

  removeContextItem = (index) => {
    let value = this.state.contextItems[index].context;
    let searchableItems = this.state.searchableItems;
    searchableItems.push(value);
    this.setState({
      searchableItems,
      contextItems: this.state.contextItems.filter(
        (item, itemIndex) => itemIndex !== index
      ),
    });
  };

  render() {
    return (
      <div>
        <div className="App">
          <div className="item-search-main">
            <span className="item-name">Item Name</span>
            <div className="search-items">
              <Select
                ref={(input) => {
                  this.itemInput = input;
                }}
                value={this.state.selectedOption}
                options={this.state.searchableItems.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                onChange={(opt) => this.handleItems(opt.label, opt.value)}
              />
            </div>
          </div>

          <div className="context-main">
            <div className="context">Context</div>
            <div className="context-table-main">
              <table className="context-table">
                <thead className="context-head">
                  <tr>
                    <th>Context</th>
                    <th>Value</th>
                    <th>isKey</th>
                    <th>Mandatory</th>
                    <th>Recommended</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="context-body">
                  {this.state.contextItems.map((contextItem, index) => {
                    return (
                      <tr key={contextItem.context}>
                        <td>{contextItem.context}</td>
                        <td>{contextItem.value}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={contextItem.isKey}
                            name="isKey"
                            onChange={(event) =>
                              this.handleChange(event, index, "isKey")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={contextItem.mandatory}
                            name="mandatory"
                            onChange={(event) =>
                              this.handleChange(event, index, "mandatory")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={contextItem.recommended}
                            name="recommended"
                            onChange={(event) =>
                              this.handleChange(event, index, "recommended")
                            }
                          />
                        </td>
                        <td>
                          <button onClick={() => this.removeContextItem(index)}>
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-items">
            <button className="save">Save</button>
            <button className="edit">Edit</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
