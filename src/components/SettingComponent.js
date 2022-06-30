import React from 'react';

export default class SettingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  setColumn(column) {
    // console.log('nowThis: ', this); //! __DEBUG __this
    this.props.setColumn(Number(column));
  }

  handleChange(e) {
    this.setColumn(e.target.value);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-7 my-4"></div>
          <div className="col-5 my-4">
            <div className="d-flex justify-content align-items-center">
              <span style={{marginRight: '5px', width: '8rem' }}>Số cột: </span>
              <select
                className="form-select"
                onChange={(e) => this.handleChange(e)}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={6}>6</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
