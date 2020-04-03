import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Countries from './Countries';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Total from './Total';
import About from './About';
import AboutCorona from './AboutCorona';
import Prevention from './Prevention';
import CountryData from './CountryData';

class App extends Component {
  state = {
    countries: [],
    country: [],
    all: {},
    loading: false
  };

  getCountries = async () => {
    this.setState({ loading: true });

    const res = await axios.get('https://corona.lmao.ninja/countries');

    this.setState({ countries: res.data, loading: false });
  };

  // get all total
  getAll = async () => {
    this.setState({ loading: true });

    const res = await axios.get('https://corona.lmao.ninja/all');

    this.setState({ all: res.data, loading: false });
  };

  //get single country data

  getCountryData = async country => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://corona.lmao.ninja/countries/${country}`
    );

    this.setState({ country: res.data, loading: false });
  };

  async componentDidMount() {
    this.getCountries();
    this.getAll();
    this.getCountryData();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Container fluid={true}>
                    <Row>
                      <Col xs='6'>
                        <Total
                          loading={this.state.loading}
                          all={this.state.all}
                        />
                      </Col>
                      <Col xs='6'>
                        <Container responsive='true'>
                          <Row>
                            <Col className='themed-container'>
                              <Countries
                                loading={this.state.loading}
                                countries={this.state.countries}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/country/:country'
              render={props => (
                <CountryData
                  {...props}
                  getCountryData={this.getCountryData}
                  country={this.state.country}
                  loading={this.state.loading}
                />
              )}
            />
            <Route exact path='/about-covid-19' component={AboutCorona} />
            <Route exact path='/prevention' component={Prevention} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
