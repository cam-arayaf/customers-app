import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={ HomeContainer } />
					<Route exact path="/customers" component={ CustomersContainer } />
					<Switch>
						<Route path="/customers/new" component={ NewCustomerContainer } />
						<Route path="/customers/:dni" render={ props => <CustomerContainer { ...props } dni={ props.match.params.dni } /> } />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

App.displayName = 'App';

export default App;