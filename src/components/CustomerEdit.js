import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Prompt } from 'react-router-dom';
import CustomersAction from './CustomersActions';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_EDIT } from '../constants/permissions';

const isNumber = value => !Number(value) && 'Numeric field';

const validate = values => {
    const error = {};
    if (!values.name) error.name = 'Name field required';
    if (!values.dni) error.dni = 'DNI field required';
    return error;
}

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) =>
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

class CustomerEdit extends Component {
    componentDidMount() {
        this.txt && this.txt.focus();
    }

    renderField = ({ input, label, meta, name, type, withFocus }) => (
        <div>
            <label htmlFor={ name }>{ label }</label>
            <input
                { ...input }
                type={ type ? type : 'text' }
                ref={ withFocus && (txt => this.txt = txt) }
            />
            { meta.touched && meta.error && <span>{ meta.error }</span> }
        </div>
    );

    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Edit Client</h2>
                <form onSubmit={ handleSubmit }>
                    <Field
                        withFocus
                        name="name"
                        component={ this.renderField }
                        label="Name"
                        parse={ toUpper }
                        format={ toLower }
                    />
                    <Field
                        name="dni"
                        component={ this.renderField }
                        label="DNI"
                    />
                    <Field
                        name="age"
                        component={ this.renderField }
                        type="number"
                        validate={ isNumber }
                        parse={ toNumber }
                        normalize={ onlyGrow }
                        label="Age"
                    />
                    <CustomersAction>
                        <button type="submit" disabled={ pristine || submitting }>Accept</button>
                        <button type="button" disabled={ submitting } onClick={ onBack }>Cancel</button>
                    </CustomersAction>
                    <Prompt when={ !pristine && !submitSucceeded } message="Data will be lost if you continue" />
                </form>
            </div>
        );
    }
}

const CustomerEditForm = reduxForm({ form: 'CustomerEdit', validate })(CustomerEdit);

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired
};

CustomerEdit.displayName = 'CustomerEdit';

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));