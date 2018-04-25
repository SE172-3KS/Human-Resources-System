import React, {Component} from 'react';
import TableauReport from 'tableau-react';
import tableau from "tableau-api";


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      id: 0,
      newName: ""
    };
  }


  render() {
    return (
      <div>
        <h1>Gender Breakdown</h1>

        <TableauReport url="https://us-west-2b.online.tableau.com/t/3ks/views/GenderBreakdown/Sheet1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no" />
      </div>
    );
  }
}
