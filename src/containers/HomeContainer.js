import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';

class HomeContainer extends Component {
    handleOnClick = () => {
        this.props.history.push('/customers');
    }

	render() {
		return (
            <div>
                <AppFrame header="Home" body={
                    <div>
                    <img src="https://img-a.udemycdn.com/course/240x135/1374394_f1a8_2.jpg" alt="logo"/>
                        <CustomersActions>
                            <button onClick={ this.handleOnClick }>Client List</button>
                        </CustomersActions>
                    </div>
                } />
            </div>
		);
	}
}

HomeContainer.displayName = 'HomeContainer';

export default withRouter(HomeContainer);